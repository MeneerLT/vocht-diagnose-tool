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
  street: string;
  houseNumber: string;
  zipcode: string;
  city: string;
  email: string;
  constructionYear?: number; // Only keep what we can reliably fetch
}

export interface AnalysisResult {
  topCause: CauseType;
  scores: { 
    cause: CauseType; 
    percentage: number;
    description: string; // Full technical description
  }[];
  summary: string;
  interactionAnalysis: string; // New field for how causes reinforce each other
  recommendations: string[];
}

// Extend Window interface for external libraries
declare global {
  interface Window {
    html2pdf: any;
  }
}