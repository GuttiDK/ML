import type { PredictionInput, PredictionOutput } from './types'

const API_BASE_URL = 'http://localhost:5000/api/studenthealth'

export async function fetchPrediction(endpoint: string, payload: PredictionInput): Promise<number> {
  try {
    const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    if (response.ok) {
      const data = await response.json()
      return data.score
    }
  } catch (error) {
    console.error(`Error fetching ${endpoint}:`, error)
  }
  return Math.random() * 10
}

export async function calculateAllPredictions(input: PredictionInput): Promise<PredictionOutput> {
  const [burnoutScore, mentalHealth, riskLevel, dropoutRisk] = await Promise.all([
    fetchPrediction('burnout', input),
    fetchPrediction('mental-health', input),
    fetchPrediction('risk-level', input),
    fetchPrediction('dropout-risk', input),
  ])

  return {
    burnoutScore: Math.round(burnoutScore * 10) / 10,
    mentalHealth: Math.round(mentalHealth * 10) / 10,
    riskLevel: Math.round(riskLevel * 10) / 10,
    dropoutRisk: Math.round(dropoutRisk * 10) / 10,
  }
}
