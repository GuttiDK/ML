import type { PageConfig } from './types'

export const FORM_PAGES: PageConfig[] = [
  {
    title: 'Personal Information',
    fields: [
      { key: 'age', label: 'Age', type: 'number', min: 16, max: 30 },
      {
        key: 'gender',
        label: 'Gender',
        type: 'select',
        options: [
          { value: 'Dreng', label: 'Dreng' },
          { value: 'Kvinde', label: 'Kvinde' },
          { value: 'Andet', label: 'Andet' },
        ],
      },
      { key: 'yearsLeft', label: 'Years left (år)', type: 'number', min: 0, max: 10 },
    ],
  },
  {
    title: 'Academic Information',
    fields: [
      { key: 'studyHours', label: 'Study hours (0-24h)', type: 'number', min: 0, max: 24, step: '0.5' },
      { key: 'examPressure', label: 'Exam pressure (0-10)', type: 'number', min: 0, max: 10 },
      { key: 'performance', label: 'Performance (0-100)', type: 'number', min: 0, max: 100 },
    ],
  },
  {
    title: 'Mental Health',
    fields: [
      { key: 'stress', label: 'Stress (0-10)', type: 'number', min: 0, max: 10 },
      { key: 'anxiety', label: 'Anxiety (0-10)', type: 'number', min: 0, max: 10 },
      { key: 'depression', label: 'Depression (0-10)', type: 'number', min: 0, max: 10 },
    ],
  },
  {
    title: 'Lifestyle',
    fields: [
      { key: 'sleep', label: 'Sleep (0-24h)', type: 'number', min: 0, max: 24, step: '0.5' },
      { key: 'physical', label: 'Physical activity (0-24h)', type: 'number', min: 0, max: 24, step: '0.5' },
      { key: 'screenTime', label: 'Screen Time (0-24h)', type: 'number', min: 0, max: 24, step: '0.5' },
    ],
  },
  {
    title: 'External Factors',
    fields: [
      { key: 'internet', label: 'Internet usage (0-24h)', type: 'number', min: 0, max: 24, step: '0.5' },
      { key: 'financialStress', label: 'Financial stress (0-10)', type: 'number', min: 0, max: 10 },
      { key: 'familyExpectation', label: 'Family expectation (0-10)', type: 'number', min: 0, max: 10 },
    ],
  },
]
