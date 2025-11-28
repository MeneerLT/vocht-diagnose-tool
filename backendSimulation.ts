
import { QUESTIONS, ADVICE_DATABASE, INTERACTION_INSIGHTS } from '../constants';
import { AnalysisResult, CauseType, UserContactInfo } from '../types';

/**
 * SERVICE: VERWERKING & VERZENDING
 * 
 * Dit bestand regelt de logica voor het berekenen van de score en het versturen van de data.
 * De data wordt verstuurd naar een Zapier Webhook.
 */

// ============================================================================
// STAP 1: PLAK HIERONDER JOUW ZAPIER WEBHOOK URL
// ============================================================================
const ZAPIER_WEBHOOK_URL = 'https://hooks.zapier.com/hooks/catch/946387/ukd9o3l/';


export const submitAnalysisToBackend = async (
  answers: Record<number, string>, 
  contact: UserContactInfo
): Promise<AnalysisResult> => {
  
  // 1. Simuleer netwerk vertraging
  await new Promise(resolve => setTimeout(resolve, 2000));

  // 2. Bereken Scores
  const rawScores: Record<CauseType, number> = {
    [CauseType.OPTREKKEND]: 0,
    [CauseType.DOORSLAAND]: 0,
    [CauseType.CONDENSATIE]: 0,
    [CauseType.LEKKAGE]: 0,
    [CauseType.VENTILATIE]: 0,
    [CauseType.KOUDEBRUG]: 0
  };

  // Punten obv antwoorden
  Object.entries(answers).forEach(([questionId, selectedOptionId]) => {
    const qId = parseInt(questionId);
    const question = QUESTIONS.find(q => q.id === qId);
    if (!question) return;

    const option = question.options.find(o => o.id === selectedOptionId);
    if (!option || !option.scores) return;

    Object.entries(option.scores).forEach(([cause, score]) => {
      rawScores[cause as CauseType] += score || 0;
    });
  });

  // Punten obv Bouwjaar (BAG Data)
  if (contact.constructionYear) {
    const year = contact.constructionYear;
    
    // Oude woningen hebben vaker last van optrekkend vocht door ontbrekende waterkering
    if (year < 1990) {
        // Alleen extra punten als er ook indicatoren zijn (zoals begane grond)
        // Check of Q1 (Locatie) is beantwoord met begane grond/kelder
        const q1Answer = answers[1];
        if (q1Answer === 'q1_ground_low' || q1Answer === 'q1_basement') {
           rawScores[CauseType.OPTREKKEND] += 10; // Flinke boost voor oudere woningen op BG
        }
        
        if (year < 1945) {
            rawScores[CauseType.DOORSLAAND] += 6; // Steensmuren slaan sneller door
        }
    } 
    
    if (year >= 1975 && year < 1990) {
        rawScores[CauseType.KOUDEBRUG] += 6; // Na-isolatie tijdperk, vaak koudebruggen
        rawScores[CauseType.CONDENSATIE] += 4;
    } 
    
    if (year >= 1990) {
        rawScores[CauseType.VENTILATIE] += 6; // Potdichte huizen, ventilatie cruciaal
        rawScores[CauseType.CONDENSATIE] += 4;
    }
  }

  // Normaliseer naar percentages
  let totalPoints = 0;
  Object.values(rawScores).forEach(score => {
    if (score > 0) totalPoints += score;
  });

  const finalResults = Object.entries(rawScores).map(([cause, score]) => {
    let percentage = 0;
    if (totalPoints > 0 && score > 0) {
      percentage = Math.round((score / totalPoints) * 100);
    }
    return {
      cause: cause as CauseType,
      percentage,
      description: ADVICE_DATABASE[cause as CauseType].description
    };
  });

  // Sorteer aflopend
  finalResults.sort((a, b) => b.percentage - a.percentage);

  // Bepaal Interactie Analyse (Samenhang)
  let interactionText = INTERACTION_INSIGHTS["DEFAULT"];
  
  if (finalResults.length >= 2) {
    const top1 = finalResults[0].cause;
    const top2 = finalResults[1].cause;
    
    // Check of er een specifieke combinatie bestaat
    // Probeer volgorde A_B en B_A
    const key1 = `${top1}_${top2}`;
    const key2 = `${top2}_${top1}`;
    
    if (INTERACTION_INSIGHTS[key1]) {
        interactionText = INTERACTION_INSIGHTS[key1];
    } else if (INTERACTION_INSIGHTS[key2]) {
        interactionText = INTERACTION_INSIGHTS[key2];
    }
  }

  // Bepaal winnaar
  const topCause = finalResults[0].cause;
  
  // Stel resultaat samen - Filter nu alle resultaten > 0%
  const result: AnalysisResult = {
    topCause: topCause,
    scores: finalResults.filter(r => r.percentage > 0),
    summary: ADVICE_DATABASE[topCause].summary,
    interactionAnalysis: interactionText,
    recommendations: ADVICE_DATABASE[topCause].steps
  };

  // 3. Verstuur data naar Zapier
  const payload = {
    datum: new Date().toLocaleDateString('nl-NL'),
    tijd: new Date().toLocaleTimeString('nl-NL'),
    
    // Klantgegevens
    naam: contact.name,
    email: contact.email,
    straat: contact.street,
    huisnummer: contact.houseNumber,
    postcode: contact.zipcode,
    plaats: contact.city,
    
    // Woningkenmerken (BAG)
    bouwjaar: contact.constructionYear || 'Onbekend',

    // Resultaten
    hoofdoorzaak: topCause,
    percentage_hoofdoorzaak: `${finalResults[0].percentage}%`,
    
    secundaire_oorzaak: finalResults[1]?.cause || 'Geen',
    percentage_secundair: finalResults[1] ? `${finalResults[1].percentage}%` : '0%',
    
    interactie_analyse: interactionText,

    // Ruwe data voor debugging
    full_report_summary: result.summary
  };

  if (ZAPIER_WEBHOOK_URL) {
    try {
      await fetch(ZAPIER_WEBHOOK_URL, {
        method: 'POST',
        mode: 'no-cors', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });
      console.log("🚀 Data succesvol verstuurd naar Zapier Webhook");
      console.log("Payload:", payload);
    } catch (error) {
      console.error("❌ Fout bij versturen naar Webhook:", error);
    }
  } else {
    console.warn("⚠️ LET OP: GEEN ZAPIER URL INGESTELD.");
    console.log("Deze data zou verstuurd zijn:", payload);
  }

  return result;
};