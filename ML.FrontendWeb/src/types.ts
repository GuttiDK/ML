export interface PredictionInput {
  age: number;
  gender: 'Dreng' | 'Kvinde' | 'Andet';
  yearsLeft: number;
  studyHours: number;
  examPressure: number;
  performance: number;
  stress: number;
  anxiety: number;
  depression: number;
  sleep: number;
  physical: number;
  screenTime: number;
  internet: number;
  financialStress: number;
  familyExpectation: number;
}

export interface PredictionOutput {
  burnoutScore: number;
  mentalHealth: number;
  riskLevel: number;
  dropoutRisk: number;
}

export interface FormFieldConfig {
  key: keyof PredictionInput;
  label: string;
  type: 'number' | 'select';
  min?: number;
  max?: number;
  step?: string;
  options?: { value: string; label: string }[];
}

export interface PageConfig {
  title: string;
  fields: FormFieldConfig[];
}
