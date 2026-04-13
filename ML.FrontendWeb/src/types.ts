export interface PredictionInput {
  age: number;
  gender: string;
  academicYear: number;
  studyHoursPerDay: number;
  examPressure: number;
  academicPerformance: number;
  stressLevel: number;
  anxietyScore: number;
  depressionScore: number;
  sleepHours: number;
  physicalActivity: number;
  socialSupport: number;
  screenTime: number;
  internetUsage: number;
  financialStress: number;
  familyExpectation: number;
}

export interface PredictionOutput {
  burnoutScore: number;
  mentalHealthIndex: number;
  dropoutRisk: number;
}

export interface FormFieldConfig {
  key: keyof PredictionInput;
  label: string;
  type: 'number' | 'select' | 'slider';
  min?: number;
  max?: number;
  step?: string;
  isInteger?: boolean;
  options?: { value: string; label: string }[];
}

export interface PageConfig {
  title: string;
  fields: FormFieldConfig[];
}
