import { Question, CauseType } from './types';

export const QUESTIONS: Question[] = [
  {
    id: 1,
    text: "Waar in de woning ziet u de vochtplekken?",
    options: [
      { 
        id: 'q1_ground_low', 
        label: "Helemaal onderaan de muren, vlak boven de vloer of plint", 
        scores: { [CauseType.OPTREKKEND]: 12, [CauseType.KOUDEBRUG]: 2 } 
      },
      { 
        id: 'q1_basement', 
        label: "In de kelder of kruipruimte; de wanden voelen klam of nat aan", 
        scores: { [CauseType.OPTREKKEND]: 8, [CauseType.LEKKAGE]: 4, [CauseType.VENTILATIE]: 3 } 
      },
      { 
        id: 'q1_corners', 
        label: "Hoog in de hoeken van de kamer of rondom het plafond", 
        scores: { [CauseType.CONDENSATIE]: 8, [CauseType.KOUDEBRUG]: 8, [CauseType.LEKKAGE]: 2 } 
      },
      { 
        id: 'q1_middle', 
        label: "Midden op de muur, vaak als een ronde kring of vlek", 
        scores: { [CauseType.DOORSLAAND]: 10, [CauseType.LEKKAGE]: 8 } 
      }
    ]
  },
  {
    id: 2,
    text: "Wat valt u op aan de afwerking van de muur?",
    options: [
      { 
        id: 'q2_salt', 
        label: "Er zit witte, pluizige uitslag op de muur die poedert als ik het aanraak", 
        scores: { [CauseType.OPTREKKEND]: 12, [CauseType.DOORSLAAND]: 4 } 
      },
      { 
        id: 'q2_wallpaper', 
        label: "Het behang laat onderaan los of krult op bij de naden", 
        scores: { [CauseType.OPTREKKEND]: 10, [CauseType.CONDENSATIE]: 4 } 
      },
      { 
        id: 'q2_mold', 
        label: "Ik zie zwarte puntjes of een harige aanslag (schimmel)", 
        scores: { [CauseType.CONDENSATIE]: 12, [CauseType.VENTILATIE]: 8 } 
      },
      { 
        id: 'q2_paint', 
        label: "De verf bladdert af of er zitten duidelijke gele kringen in het stucwerk", 
        scores: { [CauseType.LEKKAGE]: 12, [CauseType.DOORSLAAND]: 6 } 
      }
    ]
  },
  {
    id: 12,
    text: "Is er een duidelijke scheiding te zien waar het vocht stopt?",
    options: [
      {
        id: 'q12_tide',
        label: "Ja, er loopt een horizontale lijn ('golf') een stukje boven de vloer",
        scores: { [CauseType.OPTREKKEND]: 15 }
      },
      {
        id: 'q12_patches',
        label: "Nee, het zijn willekeurige plekken zonder vaste vorm",
        scores: { [CauseType.DOORSLAAND]: 8, [CauseType.LEKKAGE]: 4 }
      },
      {
        id: 'q12_diffuse',
        label: "Nee, de hele muur voelt klam en koud aan zonder duidelijke grens",
        scores: { [CauseType.CONDENSATIE]: 6, [CauseType.KOUDEBRUG]: 6 } 
      }
    ]
  },
  {
    id: 13,
    text: "Ruikt u iets bijzonders in de ruimte?",
    options: [
      {
        id: 'q13_musty',
        label: "Ja, een indringende, muffe 'kelderlucht'",
        scores: { [CauseType.OPTREKKEND]: 8, [CauseType.VENTILATIE]: 4 }
      },
      {
        id: 'q13_sewage',
        label: "Ja, een rioollucht of een bedorven geur",
        scores: { [CauseType.LEKKAGE]: 10 }
      },
      {
        id: 'q13_none',
        label: "Nee, ik ruik niks vreemds",
        scores: {}
      }
    ]
  },
  {
    id: 3,
    text: "Wanneer is het probleem het ergst?",
    options: [
      { 
        id: 'q3_always', 
        label: "Het is er eigenlijk altijd, ongeacht het weer", 
        scores: { [CauseType.OPTREKKEND]: 10, [CauseType.LEKKAGE]: 4 } 
      },
      { 
        id: 'q3_rain', 
        label: "Vooral na een flinke regenbui of harde wind op de buitenmuur", 
        scores: { [CauseType.DOORSLAAND]: 12, [CauseType.LEKKAGE]: 6 } 
      },
      { 
        id: 'q3_winter', 
        label: "Alleen in de koude wintermaanden", 
        scores: { [CauseType.CONDENSATIE]: 10, [CauseType.KOUDEBRUG]: 10 } 
      },
      {
        id: 'q3_shower',
        label: "Direct na het koken, douchen of als er veel mensen binnen zijn",
        scores: { [CauseType.CONDENSATIE]: 12, [CauseType.VENTILATIE]: 8 }
      }
    ]
  },
  {
    id: 6,
    text: "Hoe zien de ramen er in de ochtend uit?",
    options: [
      {
        id: 'q6_often',
        label: "De onderkant van de ramen is kletsnat van de condens",
        scores: { [CauseType.CONDENSATIE]: 12, [CauseType.VENTILATIE]: 10 }
      },
      {
        id: 'q6_double',
        label: "Er zit vocht *tussen* de glasplaten van het dubbele glas",
        scores: { [CauseType.LEKKAGE]: 5 }
      },
      {
        id: 'q6_never',
        label: "De ramen zijn eigenlijk altijd droog",
        scores: { [CauseType.OPTREKKEND]: 5, [CauseType.DOORSLAAND]: 5 }
      }
    ]
  }
];

export const INTERACTION_INSIGHTS: Record<string, string> = {
  [`${CauseType.OPTREKKEND}_${CauseType.CONDENSATIE}`]: 
    "Er is een gevaarlijke wisselwerking: het optrekkend vocht maakt de muren koud en verzadigd. Een natte muur isoleert niet, waardoor de temperatuur van het oppervlak daalt. Hierdoor slaat woonvocht (van koken/douchen) nog sneller neer als condens, wat de schimmelgroei exponentieel versnelt.",

  [`${CauseType.OPTREKKEND}_${CauseType.DOORSLAAND}`]:
    "Uw woning wordt van twee kanten aangevallen: grondwater trekt omhoog én regenwater dringt via de gevel naar binnen. Dit wijst op een zeer poreuze bouwconstructie. Het vocht in de muur kan bij vorst uitzetten, wat leidt tot structurele schade aan uw metselwerk.",

  [`${CauseType.CONDENSATIE}_${CauseType.VENTILATIE}`]:
    "Dit is een klassiek binnenklimaat-probleem. De geproduceerde luchtvochtigheid kan de woning niet verlaten. Zonder mechanische ventilatie of constante luchtstroom blijft de lucht verzadigd, wat niet alleen slecht is voor uw huis, maar ook voor uw gezondheid (astma/allergieën).",

  [`${CauseType.KOUDEBRUG}_${CauseType.CONDENSATIE}`]:
    "De koudebruggen trekken het vocht in de lucht aan als een magneet. Dit is vaak een constructiefout waarbij isolatie ontbreeker of onderbroken is. Het vocht slaat precies op die koude punten neer.",
    
  ["DEFAULT"]: 
    "Vochtproblemen staan zelden op zichzelf. Een bouwkundig gebrek veroorzaakt vaak een verhoogde luchtvochtigheid in de hele woning, wat vervolgens secundaire problemen zoals schimmel op kleding of in kasten veroorzaakt."
};

export const ADVICE_DATABASE: Record<CauseType, { summary: string, description: string, steps: string[] }> = {
  [CauseType.OPTREKKEND]: {
    summary: "Sterke indicatie van optrekkend grondvocht via de fundering.",
    description: "Uw muren werken als een spons die grondwater opzuigt. De mineralen en zouten in dit water blijven achter in uw muren en trekken continu nieuw vocht aan uit de lucht (hygroscopische werking).",
    steps: [
      "Muurvoetventilatie: Plaatsen van keramische elementen om de muur op natuurlijke wijze te drogen.",
      "SKEV-inspectie: Laat een expert het zoutgehalte meten om de juiste injectiemethode te bepalen.",
      "Saneren: Verwijder besmet stucwerk tot minstens 50cm boven de vochtgrens."
    ]
  },
  [CauseType.DOORSLAAND]: {
    summary: "De gevel is niet langer waterdicht en laat regenwater door.",
    description: "Door verouderd voegwerk of poreuze stenen dringt regenwater diep in de gevel door. Dit zorgt voor koude binnenmuren en een enorm verlies aan isolatiewaarde.",
    steps: [
      "Hydrofoberen: De gevel behandelen met een onzichtbare, waterafstotende coating.",
      "Voegwerk herstellen: Kapotte voegen uithakken en opnieuw voegen.",
      "Impregneren: Een professionele laag aanbrengen die de muur laat ademen maar water stopt."
    ]
  },
  [CauseType.CONDENSATIE]: {
    summary: "Woonvocht slaat neer op koude oppervlakken.",
    description: "Warme lucht bevat veel vocht. Zodra deze lucht afkoelt tegen een muur of raam, verandert het in water. Dit is de perfecte voedingsbodem voor zwarte schimmel.",
    steps: [
      "Ventilatie: Zorg voor een constante luchtstroom via roosters of ramen.",
      "Verwarming: Houd de woning op een constante temperatuur (minimaal 15-18 graden).",
      "Schimmelbestrijding: De plekken reinigen met een anti-schimmel middel na verbetering van ventilatie."
    ]
  },
  [CauseType.LEKKAGE]: {
    summary: "Vermoedelijk een defect in leidingen of afvoeren.",
    description: "Lekkages zijn vaak herkenbaar aan scherpe kringen en een snelle verergering. Het water kan via plafonds of vloeren een lange weg afleggen.",
    steps: [
      "Lekdetectie: Met infrarood of traceergas het lek opsporen zonder hakwerk.",
      "CV-druk: Controleer of uw ketel druk verliest.",
      "Inspectie: Controleer kitranden en voegen in de badkamer."
    ]
  },
  [CauseType.VENTILATIE]: {
    summary: "Onvoldoende luchtverversing zorgt voor een ongezond klimaat.",
    description: "De woning is te goed 'ingepakt'. Het vocht van bewoners (ademen, zweten, koken) blijft hangen. Dit zorgt voor muffe geuren en klamme muren.",
    steps: [
      "Mechanische Ventilatie: Laat uw ventilatiesysteem reinigen en correct afstellen.",
      "Roosters: Zorg dat roosters in ramen altijd open staan.",
      "Doorstroming: Kort deuren in zodat lucht onder de deur door kan stromen."
    ]
  },
  [CauseType.KOUDEBRUG]: {
    summary: "Plaatselijke koude plekken in de constructie trekken vocht aan.",
    description: "Een koudebrug is een onderbreking in de isolatie. Dit deel van de muur is veel kouder, waardoor vocht hier als eerste neerslaat.",
    steps: [
      "Warmtebeeldscan: Exact in kaart brengen waar de isolatie ontbreekt.",
      "Na-isolatie: Het koude punt van buiten of binnen extra isoleren.",
      "Ventilatie: De luchtvochtigheid verlagen om condensatie op het koude punt te voorkomen."
    ]
  }
};