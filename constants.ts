
import { Question, CauseType } from './types';

// Uitgebreide vragenlijst met bouwkundige focus
export const QUESTIONS: Question[] = [
  {
    id: 1,
    text: "Waar in de woning manifesteert het probleem zich het duidelijkst?",
    options: [
      { 
        id: 'q1_ground_low', 
        label: "Begane grond: Uitsluitend onderaan de muur (tot max. 1,5 meter hoog)", 
        scores: { [CauseType.OPTREKKEND]: 12, [CauseType.KOUDEBRUG]: 2 } 
      },
      { 
        id: 'q1_basement', 
        label: "In de kelder (onder maaiveld) of kruipruimte", 
        scores: { [CauseType.OPTREKKEND]: 8, [CauseType.LEKKAGE]: 4, [CauseType.VENTILATIE]: 3 } 
      },
      { 
        id: 'q1_corners', 
        label: "Plafondhoeken, rondom ramen of bovenin de kamer", 
        scores: { [CauseType.CONDENSATIE]: 8, [CauseType.KOUDEBRUG]: 8, [CauseType.LEKKAGE]: 4 } 
      },
      { 
        id: 'q1_midden', 
        label: "Midden op de muur (vlekken) of rondom kozijnen", 
        scores: { [CauseType.DOORSLAAND]: 10, [CauseType.KOUDEBRUG]: 4 } 
      }
    ]
  },
  {
    id: 2,
    text: "Hoe omschrijft u het schadebeeld visueel?",
    options: [
      { 
        id: 'q2_salt', 
        label: "Witte uitslag (zoutkristallen/poeder), afbladderende verf/stucwerk", 
        scores: { [CauseType.OPTREKKEND]: 12, [CauseType.DOORSLAAND]: 4 } 
      },
      { 
        id: 'q2_mold', 
        label: "Zwarte spikkels of donkere schimmelvorming", 
        scores: { [CauseType.CONDENSATIE]: 10, [CauseType.VENTILATIE]: 8, [CauseType.KOUDEBRUG]: 6 } 
      },
      { 
        id: 'q2_stain', 
        label: "Scherp afgetekende kringen (geel/bruin) die groter worden", 
        scores: { [CauseType.LEKKAGE]: 10 } 
      },
      { 
        id: 'q2_wet', 
        label: "De muur voelt klam aan of is donker verkleurd, zonder schimmel", 
        scores: { [CauseType.DOORSLAAND]: 6, [CauseType.OPTREKKEND]: 6, [CauseType.CONDENSATIE]: 2 } 
      }
    ]
  },
  {
    id: 12, // Nieuwe vraag specifiek voor Optrekkend Vocht diagnose
    text: "Is er een duidelijke 'grens' zichtbaar waar het vocht stopt?",
    options: [
      {
        id: 'q12_tide',
        label: "Ja, er is een horizontale lijn of golvende rand (zoutrand) zichtbaar boven de plint",
        scores: { [CauseType.OPTREKKEND]: 15 } // Zeer sterke indicator
      },
      {
        id: 'q12_patchy',
        label: "Nee, het zijn losse vlekken verspreid over de muur",
        scores: { [CauseType.DOORSLAAND]: 8, [CauseType.CONDENSATIE]: 4 }
      },
      {
        id: 'q12_diffuse',
        label: "Nee, het loopt geleidelijk over van vochtig naar droog (diffuus)",
        scores: { [CauseType.CONDENSATIE]: 6, [CauseType.KOUDEBRUG]: 6 } 
      }
    ]
  },
  {
    id: 3,
    text: "Wanneer verergert de situatie?",
    options: [
      { 
        id: 'q3_always', 
        label: "Het is constant aanwezig, weer of geen weer", 
        scores: { [CauseType.OPTREKKEND]: 10, [CauseType.LEKKAGE]: 4 } 
      },
      { 
        id: 'q3_rain', 
        label: "Duidelijk zichtbaar na regenval (aan de regenzijde)", 
        scores: { [CauseType.DOORSLAAND]: 10, [CauseType.LEKKAGE]: 6 } 
      },
      { 
        id: 'q3_winter', 
        label: "Voornamelijk in het stookseizoen (winter / koude dagen)", 
        scores: { [CauseType.CONDENSATIE]: 8, [CauseType.KOUDEBRUG]: 10, [CauseType.VENTILATIE]: 6 } 
      }
    ]
  },
  {
    id: 4,
    text: "Wat is de situatie aan de buitenzijde van de muur?",
    options: [
      { 
        id: 'q4_high', 
        label: "De tuin/bestrating ligt hoog (tegen of boven de binnenvoer)", 
        scores: { [CauseType.OPTREKKEND]: 10, [CauseType.DOORSLAAND]: 4 } 
      },
      { 
        id: 'q4_crack', 
        label: "Er zitten scheuren in de gevel of het voegwerk is slecht", 
        scores: { [CauseType.DOORSLAAND]: 10 } 
      },
      { 
        id: 'q4_normal', 
        label: "Normale situatie, maaiveld ligt lager dan de vloer, gevel oogt goed", 
        scores: { } 
      }
    ]
  },
  {
    id: 5,
    text: "Hoe is de ventilatie in de woning geregeld?",
    options: [
      { 
        id: 'q5_old', 
        label: "Natuurlijke ventilatie (alleen roosters/ramen)", 
        scores: { [CauseType.VENTILATIE]: 8, [CauseType.CONDENSATIE]: 6 } 
      },
      { 
        id: 'q5_mech', 
        label: "Mechanische afzuiging (box) aanwezig", 
        scores: { [CauseType.VENTILATIE]: -2 } 
      },
      { 
        id: 'q5_wtw', 
        label: "Balansventilatie (WTW) systeem", 
        scores: { [CauseType.VENTILATIE]: -5 } 
      }
    ]
  },
  {
    id: 6,
    text: "Beslaan de ramen aan de binnenzijde (condens)?",
    options: [
      {
        id: 'q6_often',
        label: "Ja, regelmatig ('s ochtends of bij koken)",
        scores: { [CauseType.CONDENSATIE]: 10, [CauseType.VENTILATIE]: 8 }
      },
      {
        id: 'q6_sometimes',
        label: "Soms, alleen bij extreem koud weer",
        scores: { [CauseType.CONDENSATIE]: 4, [CauseType.KOUDEBRUG]: 4 }
      },
      {
        id: 'q6_never',
        label: "Nee, zelden of nooit",
        scores: {}
      }
    ]
  },
  {
    id: 7,
    text: "Heeft u recent (na-)-isolatie toegepast (bijv. spouwmuur)?",
    options: [
      {
        id: 'q7_cavity',
        label: "Ja, spouwmuurisolatie of gevelisolatie",
        scores: { [CauseType.VENTILATIE]: 6, [CauseType.DOORSLAAND]: 6 } // Kans op vochtdoorslag bij verkeerde isolatie of koudebrugverplaatsing
      },
      {
        id: 'q7_no',
        label: "Nee, geen recente wijzigingen aan de schil",
        scores: {}
      }
    ]
  },
  {
    id: 8,
    text: "Waar bevindt de schimmel zich ten opzichte van meubels?",
    options: [
      {
        id: 'q8_yes',
        label: "Achter kasten, banken of gordijnen (weinig luchtstroming)",
        scores: { [CauseType.KOUDEBRUG]: 8, [CauseType.CONDENSATIE]: 8 }
      },
      {
        id: 'q8_no',
        label: "Op een open, vrijliggende muur",
        scores: { [CauseType.DOORSLAAND]: 4, [CauseType.OPTREKKEND]: 4 }
      },
      {
        id: 'q8_none',
        label: "Geen schimmel, alleen vochtplekken/zout",
        scores: { [CauseType.OPTREKKEND]: 6 }
      }
    ]
  },
  {
    id: 9,
    text: "Moet u de CV-ketel vaak bijvullen (drukverlies)?",
    options: [
      {
        id: 'q9_yes',
        label: "Ja, de druk loopt langzaam terug",
        scores: { [CauseType.LEKKAGE]: 12 }
      },
      {
        id: 'q9_no',
        label: "Nee, de druk blijft stabiel",
        scores: {}
      }
    ]
  },
  {
    id: 11,
    text: "Wat is de situatie in de kruipruimte?",
    options: [
      {
        id: 'q11_wet',
        label: "Er staat vaak water in of de grond is modderig",
        scores: { [CauseType.OPTREKKEND]: 10, [CauseType.CONDENSATIE]: 4 }
      },
      {
        id: 'q11_dry',
        label: "Deze is droog (of er liggen schelpen/isolatie)",
        scores: {}
      },
      {
        id: 'q11_none',
        label: "Geen kruipruimte aanwezig (betonvloer op zand)",
        scores: { [CauseType.OPTREKKEND]: 4, [CauseType.KOUDEBRUG]: 2 }
      }
    ]
  }
];

// Teksten voor interactie-analyse (hoe oorzaken elkaar versterken)
export const INTERACTION_INSIGHTS: Record<string, string> = {
  [`${CauseType.OPTREKKEND}_${CauseType.CONDENSATIE}`]: 
    "Er is sprake van een klassieke 'vicieuze cirkel': Het optrekkend vocht zorgt ervoor dat de muren koud en nat zijn. Een natte muur isoleert slecht, waardoor het muuroppervlak afkoelt. Op dit koude oppervlak condenseert vervolgens het woonvocht (koken/douchen), wat het probleem verergert. Alleen ventileren helpt niet zolang de muurvoet nat blijft.",

  [`${CauseType.OPTREKKEND}_${CauseType.DOORSLAAND}`]:
    "Uw muren worden vermoedelijk van twee kanten belast: grondvocht trekt omhoog én regenwater dringt van buiten naar binnen. Dit wijst op poreus metselwerk. Het vocht in de muur kan bij vorst uitzetten, waardoor voegen en stenen barsten en de muur nog meer water doorlaat.",

  [`${CauseType.CONDENSATIE}_${CauseType.VENTILATIE}`]:
    "Dit is een probleem van het binnenklimaat. Door onvoldoende luchtverversing stijgt de relatieve luchtvochtigheid. Deze 'volle' lucht zoekt de koudste plekken op (ramen, hoeken) en slaat daar neer. Zonder mechanische afvoer kan het vocht dat u dagelijks produceert (circa 10 liter per gezin) de woning niet verlaten.",

  [`${CauseType.KOUDEBRUG}_${CauseType.CONDENSATIE}`]:
    "Thermische bruggen (koudebruggen) zijn plekken waar de isolatie onderbroken is. De combinatie met condensatie is gevaarlijk voor de constructie: het vocht slaat specifiek neer op de constructiedelen (balken, lateien). Dit kan leiden tot onzichtbare houtrot of corrosie achter de afwerklaag.",

  [`${CauseType.LEKKAGE}_${CauseType.DOORSLAAND}`]:
    "Een lekkage (bijv. dakgoot) kan ervoor zorgen dat een specifiek deel van de gevel overbelast raakt met water. Hierdoor raakt de steen verzadigd en slaat het vocht door naar binnen. Het oplossen van de lekkage is stap 1, maar de muur zal daarna nog maanden nodig hebben om uit te dampen.",
    
  ["DEFAULT"]: 
    "Vochtproblemen komen zelden alleen. Vaak zorgt de primaire oorzaak voor een verhoging van de luchtvochtigheid in huis, waardoor secundaire schimmelvorming op andere plekken ontstaat. Het is cruciaal om de bron aan te pakken, en niet alleen de symptomen (zoals schimmel) weg te poetsen."
};


export const ADVICE_DATABASE: Record<CauseType, { summary: string, description: string, steps: string[] }> = {
  [CauseType.OPTREKKEND]: {
    summary: "Op basis van uw antwoorden is er een sterke indicatie van optrekkend vocht. Dit ontstaat doordat grondvocht via de fundering in het poreuze metselwerk omhoog trekt.",
    description: "Bij optrekkend vocht werkt het metselwerk als een spons. Grondwater, vaak rijk aan zouten en mineralen, wordt capillair opgezogen. Zodra het water verdampt aan het muuroppervlak, blijven de zouten achter (hygroscopische zouten). Deze zouten trekken opnieuw vocht aan uit de lucht, waardoor de muur zelfs bij droog weer nat blijft. Dit tast stucwerk aan en zorgt voor een ongezond binnenklimaat.",
    steps: [
      "Muurvoetventilatie (Aanbevolen): Een wetenschappelijk bewezen oplossing is het plaatsen van keramische elementen in de buitenmuur. Dit doorbreekt de capillaire werking door ventilatie in de muur zelf.",
      "Specialistische meting: Een SKEV-expert kan met professionele, gespecialiseerde meetapparatuur (zoals carbidmeting) het exacte vochtpercentage en de zoutbelasting bepalen.",
      "Injectage: Chemische blokkade door injectie, hoewel dit bij oude muren met scheuren soms minder effectief is dan ventilatie.",
      "Saneren: Het verwijderen van zout-belast stucwerk is noodzakelijk, anders blijven vochtplekken zichtbaar."
    ]
  },
  [CauseType.DOORSLAAND]: {
    summary: "De verstrekte gegevens wijzen sterk in de richting van doorslaand vocht. De gevel is waarschijnlijk poreus of beschadigd.",
    description: "Doorslaand vocht treedt op wanneer de buitengevel zijn waterkerende functie verliest. Regenwater wordt niet afgevoerd, maar opgezogen door de steen. Bij langdurige regenval raakt de muur verzadigd en trekt het vocht naar binnen. Dit verlaagt de isolatiewaarde van de muur drastisch (een natte muur isoleert niet), wat weer leidt tot hogere stookkosten en koudeval.",
    steps: [
      "Gevelinspectie: Controle op scheurvorming, loszittend voegwerk en de staat van de stenen.",
      "Hydrofoberen: Het impregneren van de gevel met een ademend, waterafstotend middel.",
      "Spouwcontrole: Uitsluiten van 'speciebaarden' (valspecie) in de spouw die als brug voor water dienen.",
      "Dakdetails: Controle van overstekken, goten en hemelwaterafvoeren die de gevel mogelijk overbelasten."
    ]
  },
  [CauseType.CONDENSATIE]: {
    summary: "Het beeld komt overeen met condensatieproblematiek. Een disbalans tussen vochtproductie en ventilatie.",
    description: "Condensatie is een probleem van het binnenklimaat, niet direct van de bouwkundige staat. Warme lucht kan meer vocht bevatten dan koude lucht. Als warme, vochtige binnenlucht afkoelt tegen een koud oppervlak (raam, koude muur), moet het waterdamp kwijt: condens. Als dit structureel gebeurt, ontstaat de ideale voedingsbodem voor de zwarte schimmel (Aspergillus niger), die schadelijk is voor de gezondheid.",
    steps: [
      "Hygrometrie: Continu meten van Relatieve Luchtvochtigheid (RV). Streefwaarde is 40-60%.",
      "Ventilatiebalans: Een specialist berekent of de aanwezige roosters/systemen voldoende capaciteit hebben voor de gezinsgrootte.",
      "Dauwpuntanalyse: Bepalen bij welke temperatuur condens optreedt in uw specifieke situatie.",
      "Gedragsaanpassing: Ventileren tijdens koken/douchen en de woning niet te sterk laten afkoelen 's nachts."
    ]
  },
  [CauseType.LEKKAGE]: {
    summary: "De symptomen duiden op een technische lekkage in leidingwerk, dak of afvoer.",
    description: "In tegenstelling tot bouwfysische vochtproblemen, is dit een incidenteel defect. Een leidingbreuk, losgeraakte felsnaad of dakpanlekkage zorgt voor lokale wateroverlast. Het gevaar is dat water zich onvoorspelbaar verplaatst via kanalen in vloeren of muren, waardoor de vlek niet altijd direct onder het lek zit.",
    steps: [
      "Niet-destructief onderzoek: Gebruik van thermografie, traceergas of akoestiek om het lek te vinden zonder hak- en breekwerk.",
      "Drukproef: Het afpersen van waterleidingen om drukverlies te constateren.",
      "Endoscopie: Inspectie in schachten of spouwmuren met een camera.",
      "Herstel & Droging: Na reparatie moet vaak geforceerde bouwdroging plaatsvinden."
    ]
  },
  [CauseType.VENTILATIE]: {
    summary: "Onvoldoende luchtverversing lijkt de hoofdoorzaak. De woning kan zijn vocht niet kwijt.",
    description: "Moderne of na-geïsoleerde woningen zijn vaak 'luchtdicht'. Zonder actief ventilatiesysteem stapelt leefvocht zich op. Dit leidt tot een bedompte lucht, hoofdpijnklachten en schimmelgroei op onverwachte plekken (zoals achter kasten). Het is geen lekkage, maar een gebrek aan 'ademhaling' van de woning.",
    steps: [
      "Debietmeting: Meten hoeveel lucht er werkelijk wordt afgezogen in keuken/badkamer.",
      "Kanaalinspectie: Reinigen van vervuilde ventilatiekanalen en ventilatiebox.",
      "Overstroomvoorziening: Controleren of er kieren onder binnendeuren zijn (minimaal 1-2 cm) voor luchtverplaatsing.",
      "Mechanische Ventilatie: Plaatsen of upgraden van een ventilatiebox, bij voorkeur CO2- of vochtgestuurd."
    ]
  },
  [CauseType.KOUDEBRUG]: {
    summary: "Er is sprake van thermische bruggen: lokale koude plekken in de constructie waar vocht neerslaat.",
    description: "Een koudebrug is een onderbreking in de isolatielaag. Bijvoorbeeld een betonnen latei boven een raam die doorloopt van binnen naar buiten, of vervuiling in de spouwmuur. Dit deel van de muur is in de winter veel kouder dan de rest. Warme binnenlucht koelt daar lokaal sterk af, met condensatie en schimmel als gevolg, precies op de vorm van de koudebrug.",
    steps: [
      "Thermografie (Warmtebeeld): Een infraroodscan is de enige manier om koudebruggen exact te visualiseren.",
      "Isolatieherstel: Na-isoleren van de buitengevel of binnenzijde (met vochtregulerende materialen).",
      "Klimaatbeheersing: Zolang de koudebrug niet is opgelost, moet de luchtvochtigheid extra laag gehouden worden.",
      "Verwarming: Plaatselijke verwarming verbeteren om het koude oppervlak op temperatuur te houden."
    ]
  }
};