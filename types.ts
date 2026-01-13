export enum CauseType {
  OPTREKKEND = 'Optrekkend vocht',
  DOORSLAAND = 'Doorslaand vocht',
  CONDENSATIE = 'Condensatie',
  LEKKAGE = 'Lekkage',
  VENTILATIE = 'Ventilatieprobleem',
  KOUDEBRUG = 'Koudebrug'
}

export interface QuestionOption {
  id: string;
  label: string;
  // Each option adds points to specific causes
  scores: Partial<Record<CauseType, number>>; 
}

export interface Question {
  id: number;
  text: string;
  options: QuestionOption[];
}

export interface UserContactInfo {
  name: string;
  phone: string;
  street: string;
  houseNumber: string;
  zipcode: string;
  city: string;
  email: string;
  constructionYear?: number;
}

export interface AnalysisResult {
  topCause: CauseType;
  scores: { 
    cause: CauseType; 
    percentage: number;
    description: string;
  }[];
  summary: string;
  interactionAnalysis: string;
  recommendations: string[];
}

declare global {
  interface window {
    html2pdf: any;
  }
}