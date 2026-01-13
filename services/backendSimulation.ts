import { QUESTIONS, ADVICE_DATABASE, INTERACTION_INSIGHTS } from '../constants';
import { AnalysisResult, CauseType, UserContactInfo } from '../types';

const ZAPIER_WEBHOOK_URL = 'https://hooks.zapier.com/hooks/catch/946387/ukd9o3l/';

export const submitAnalysisToBackend = async (
  answers: Record<number, string>, 
  contact: UserContactInfo
): Promise<AnalysisResult> => {
  
  await new Promise(resolve => setTimeout(resolve, 1500));

  const rawScores: Record<CauseType, number> = {
    [CauseType.OPTREKKEND]: 0,
    [CauseType.DOORSLAAND]: 0,
    [CauseType.CONDENSATIE]: 0,
    [CauseType.LEKKAGE]: 0,
    [CauseType.VENTILATIE]: 0,
    [CauseType.KOUDEBRUG]: 0
  };

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

  if (contact.constructionYear) {
    const year = contact.constructionYear;
    if (year < 1980) {
        const q1Answer = answers[1];
        if (q1Answer === 'q1_ground_low' || q1Answer === 'q1_basement') {
           rawScores[CauseType.OPTREKKEND] += 10;
        }
    } 
    if (year < 1945) rawScores[CauseType.DOORSLAAND] += 8;
    if (year >= 1975 && year < 1995) rawScores[CauseType.KOUDEBRUG] += 6;
  }

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

  finalResults.sort((a, b) => b.percentage - a.percentage);

  let interactionText = INTERACTION_INSIGHTS["DEFAULT"];
  if (finalResults.length >= 2 && finalResults[1].percentage > 10) {
    const key1 = `${finalResults[0].cause}_${finalResults[1].cause}`;
    const key2 = `${finalResults[1].cause}_${finalResults[0].cause}`;
    interactionText = INTERACTION_INSIGHTS[key1] || INTERACTION_INSIGHTS[key2] || INTERACTION_INSIGHTS["DEFAULT"];
  }

  const topCause = finalResults[0].cause;
  
  const result: AnalysisResult = {
    topCause: topCause,
    scores: finalResults.filter(r => r.percentage > 0),
    summary: ADVICE_DATABASE[topCause].summary,
    interactionAnalysis: interactionText,
    recommendations: ADVICE_DATABASE[topCause].steps
  };

  const payload = {
    naam: contact.name,
    email: contact.email,
    telefoon: contact.phone,
    adres: `${contact.street} ${contact.houseNumber}`,
    postcode: contact.zipcode,
    plaats: contact.city,
    bouwjaar: contact.constructionYear || 'Onbekend',
    hoofdoorzaak: topCause,
    percentage: `${finalResults[0].percentage}%`,
    interactie: interactionText
  };

  if (ZAPIER_WEBHOOK_URL) {
    try {
      await fetch(ZAPIER_WEBHOOK_URL, {
        method: 'POST',
        mode: 'no-cors', 
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
    } catch (error) {
      console.error("Webhook failed:", error);
    }
  }

  return result;
};