import { useState } from 'react'
import './App.css'
import type { PredictionInput, PredictionOutput } from './types'
import { calculateAllPredictions } from './api'
import { FORM_PAGES } from './constants'
import { Header, FormWizard, Results } from './components'

const DEFAULT_INPUT: PredictionInput = {
  age: 18,
  gender: 'Male',
  academicYear: 2,
  studyHoursPerDay: 6,
  examPressure: 5,
  academicPerformance: 75,
  stressLevel: 5,
  anxietyScore: 5,
  depressionScore: 5,
  sleepHours: 7,
  physicalActivity: 5,
  socialSupport: 7,
  screenTime: 4,
  internetUsage: 3,
  financialStress: 5,
  familyExpectation: 6,
}

function App() {
  const [currentPage, setCurrentPage] = useState(0)
  const [input, setInput] = useState<PredictionInput>(DEFAULT_INPUT)
  const [output, setOutput] = useState<PredictionOutput | null>(null)
  const [loading, setLoading] = useState(false)

  const handleInputChange = (field: keyof PredictionInput, value: string | number) => {
    setInput((prev) => ({
      ...prev,
      [field]: typeof value === 'string' ? parseFloat(value) || value : value,
    }))
  }

  const handleSubmit = async () => {
    setLoading(true)
    try {
      const results = await calculateAllPredictions(input)
      setOutput(results)
    } catch (error) {
      console.error('Error calculating predictions:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleStartOver = () => {
    setOutput(null)
    setCurrentPage(0)
    setInput(DEFAULT_INPUT)
  }

  return (
    <div className="app">
      <Header />
      {!output ? (
        <FormWizard
          currentPage={currentPage}
          pages={FORM_PAGES}
          input={input}
          isLoading={loading}
          onPageChange={setCurrentPage}
          onInputChange={handleInputChange}
          onSubmit={handleSubmit}
        />
      ) : (
        <Results output={output} onStartOver={handleStartOver} />
      )}
    </div>
  )
}

export default App

