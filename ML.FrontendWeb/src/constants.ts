import type { PageConfig } from './types'

export const FORM_PAGES: PageConfig[] = [
  {
    title: 'Personal Information',
    fields: [
      { key: 'age', label: 'Age', type: 'slider', min: 15, max: 120, isInteger: true },
      {
        key: 'gender',
        label: 'Gender',
        type: 'select',
        options: [
          { value: 'Male', label: 'Dreng' },
          { value: 'Female', label: 'Kvinde' },
          { value: 'Other', label: 'Andet' },
        ],
      },
      { key: 'academicYear', label: 'Academic year', type: 'slider', min: 0, max: 10, isInteger: true },
    ],
  },
  {
    title: 'Academic Information',
    fields: [
      { key: 'studyHoursPerDay', label: 'Study hours per day (0-24h)', type: 'slider', min: 0, max: 24, isInteger: true },
      { key: 'examPressure', label: 'Exam pressure (0-10)', type: 'slider', min: 0, max: 10, isInteger: true },
      { key: 'academicPerformance', label: 'Academic performance (0-100)', type: 'slider', min: 0, max: 100, isInteger: true },
    ],
  },
  {
    title: 'Mental Health',
    fields: [
      { key: 'stressLevel', label: 'Stress level (0-10)', type: 'slider', min: 0, max: 10, isInteger: true },
      { key: 'anxietyScore', label: 'Anxiety score (0-10)', type: 'slider', min: 0, max: 10, isInteger: true },
      { key: 'depressionScore', label: 'Depression score (0-10)', type: 'slider', min: 0, max: 10, isInteger: true },
    ],
  },
  {
    title: 'Lifestyle',
    fields: [
      { key: 'sleepHours', label: 'Sleep hours (0-24h)', type: 'slider', min: 0, max: 24, isInteger: true },
      { key: 'physicalActivity', label: 'Physical activity (0-24h)', type: 'slider', min: 0, max: 24, isInteger: true },
      { key: 'screenTime', label: 'Screen time (0-24h)', type: 'slider', min: 0, max: 24, isInteger: true },
    ],
  },
  {
    title: 'External Factors',
    fields: [
      { key: 'internetUsage', label: 'Internet usage (0-24h)', type: 'slider', min: 0, max: 24, isInteger: true },
      { key: 'financialStress', label: 'Financial stress (0-10)', type: 'slider', min: 0, max: 10, isInteger: true },
      { key: 'familyExpectation', label: 'Family expectation (0-10)', type: 'slider', min: 0, max: 10, isInteger: true },
    ],
  },
  {
    title: 'Social Support',
    fields: [
      { key: 'socialSupport', label: 'Social support (0-10)', type: 'slider', min: 0, max: 10, isInteger: true },
    ],
  },
]
