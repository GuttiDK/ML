import type { PredictionInput, PredictionOutput } from './types'

// Use relative URLs - Vite dev proxy will handle routing to remote API
const API_BASE_URL = '/api/ml'

export async function calculateAllPredictions(input: PredictionInput): Promise<PredictionOutput> {
  try {
    // Get burnout and mental health scores in parallel
    const [burnoutResponse, mentalHealthResponse] = await Promise.all([
      fetch(`${API_BASE_URL}/burnoutscore/predict`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(input),
      }),
      fetch(`${API_BASE_URL}/mentalhealth/predict`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(input),
      }),
    ])

    if (!burnoutResponse.ok || !mentalHealthResponse.ok) {
      throw new Error(`Failed to fetch predictions: burnout=${burnoutResponse.status}, mentalHealth=${mentalHealthResponse.status}`)
    }

    const burnoutData = await burnoutResponse.json()
    const mentalHealthData = await mentalHealthResponse.json()

    const burnoutScore = burnoutData.predictedValue || 0
    const mentalHealthIndex = mentalHealthData.predictedValue || 0

    // Get dropout risk using both scores
    const dropoutPayload = {
      ...input,
      burnoutScore,
      mentalHealthIndex,
    }

    const dropoutResponse = await fetch(`${API_BASE_URL}/dropoutrisk/predict`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dropoutPayload),
    })

    let dropoutRisk = 0
    if (dropoutResponse.ok) {
      const data = await dropoutResponse.json()
      dropoutRisk = data.predictedValue || 0
    } else {
      console.warn('Dropout risk prediction failed, using fallback calculation')
      dropoutRisk = (burnoutScore + (10 - mentalHealthIndex)) / 2
    }

    return {
      burnoutScore: Math.min(Math.round(burnoutScore * 10) / 10, 10),
      mentalHealthIndex: Math.min(Math.round(mentalHealthIndex * 10) / 10, 10),
      dropoutRisk: Math.min(Math.round(dropoutRisk * 10) / 10, 10),
    }
  } catch (error) {
    console.error('Error calculating predictions:', error)
    throw new Error('Failed to calculate predictions. Please check your connection and try again.')
  }
}
