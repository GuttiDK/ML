import { useState } from 'react'
import './App.css'

interface PredictionInput {
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

interface PredictionOutput {
  burnoutScore: number;
  mentalHealth: number;
  riskLevel: number;
  dropoutRisk: number;
}

function App() {
  const [currentPage, setCurrentPage] = useState(0);
  const [input, setInput] = useState<PredictionInput>({
    age: 18,
    gender: 'Dreng',
    yearsLeft: 4,
    studyHours: 8,
    examPressure: 5,
    performance: 75,
    stress: 5,
    anxiety: 5,
    depression: 5,
    sleep: 8,
    physical: 2,
    screenTime: 6,
    internet: 4,
    financialStress: 5,
    familyExpectation: 7,
  });

  const [output, setOutput] = useState<PredictionOutput | null>(null);
  const [loading, setLoading] = useState(false);

  const totalPages = 5;

  const handleInputChange = (field: keyof PredictionInput, value: string | number) => {
    setInput(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const goNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goBackPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const calculatePredictions = async () => {
    setLoading(true);
    try {
      const payload = {
        age: input.age,
        gender: input.gender,
        yearsLeft: input.yearsLeft,
        studyHours: input.studyHours,
        examPressure: input.examPressure,
        performance: input.performance,
        stress: input.stress,
        anxiety: input.anxiety,
        depression: input.depression,
        sleep: input.sleep,
        physical: input.physical,
        screenTime: input.screenTime,
        internet: input.internet,
        financialStress: input.financialStress,
        familyExpectation: input.familyExpectation,
      };

      // Call API for Burnout Score
      const burnoutResponse = await fetch('http://localhost:5000/api/studenthealth/burnout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      let burnoutScore: number;
      if (burnoutResponse.ok) {
        const burnoutData = await burnoutResponse.json();
        burnoutScore = burnoutData.score;
      } else {
        burnoutScore = Math.random() * 10;
      }

      // Call API for Mental Health
      const mentalHealthResponse = await fetch('http://localhost:5000/api/studenthealth/mental-health', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      let mentalHealth: number;
      if (mentalHealthResponse.ok) {
        const mentalHealthData = await mentalHealthResponse.json();
        mentalHealth = mentalHealthData.score;
      } else {
        mentalHealth = Math.random() * 10;
      }

      // Call API for Risk Level
      const riskLevelResponse = await fetch('http://localhost:5000/api/studenthealth/risk-level', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      let riskLevel: number;
      if (riskLevelResponse.ok) {
        const riskLevelData = await riskLevelResponse.json();
        riskLevel = riskLevelData.score;
      } else {
        riskLevel = Math.random() * 10;
      }

      // Call API for Dropout Risk
      const dropoutRiskResponse = await fetch('http://localhost:5000/api/studenthealth/dropout-risk', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      let dropoutRisk: number;
      if (dropoutRiskResponse.ok) {
        const dropoutRiskData = await dropoutRiskResponse.json();
        dropoutRisk = dropoutRiskData.score;
      } else {
        dropoutRisk = (burnoutScore + (10 - mentalHealth)) / 2;
      }

      setOutput({
        burnoutScore: Math.round(burnoutScore * 10) / 10,
        mentalHealth: Math.round(mentalHealth * 10) / 10,
        riskLevel: Math.round(riskLevel * 10) / 10,
        dropoutRisk: Math.round(dropoutRisk * 10) / 10,
      });
    } catch (error) {
      console.error('Error calculating predictions:', error);
      // For demo purposes, generate mock data
      const burnoutScore = Math.random() * 10;
      const mentalHealth = Math.random() * 10;
      const riskLevel = Math.random() * 10;
      const dropoutRisk = (burnoutScore + (10 - mentalHealth)) / 2;

      setOutput({
        burnoutScore: Math.round(burnoutScore * 10) / 10,
        mentalHealth: Math.round(mentalHealth * 10) / 10,
        riskLevel: Math.round(riskLevel * 10) / 10,
        dropoutRisk: Math.round(dropoutRisk * 10) / 10,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <h1>Student Health Prediction</h1>

      {!output ? (
        <div className="form-container">
          {/* Progress Indicator */}
          <div className="progress-container">
            <div className="progress-text">
              Side {currentPage + 1} af {totalPages}
            </div>
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${((currentPage + 1) / totalPages) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Page 1: Personal Information */}
          {currentPage === 0 && (
            <div className="form-section">
              <h2>Side 1 - Personal Information</h2>
              <div className="form-group">
                <label>Age:</label>
                <input
                  type="number"
                  value={input.age}
                  onChange={(e) => handleInputChange('age', parseInt(e.target.value))}
                  min="16"
                  max="30"
                />
              </div>
              <div className="form-group">
                <label>Gender:</label>
                <select
                  value={input.gender}
                  onChange={(e) => handleInputChange('gender', e.target.value as PredictionInput['gender'])}
                >
                  <option value="Dreng">Dreng</option>
                  <option value="Kvinde">Kvinde</option>
                  <option value="Andet">Andet</option>
                </select>
              </div>
              <div className="form-group">
                <label>Years left (år):</label>
                <input
                  type="number"
                  value={input.yearsLeft}
                  onChange={(e) => handleInputChange('yearsLeft', parseInt(e.target.value))}
                  min="0"
                  max="10"
                />
              </div>
            </div>
          )}

          {/* Page 2: Academic Information */}
          {currentPage === 1 && (
            <div className="form-section">
              <h2>Side 2 - Academic Information</h2>
              <div className="form-group">
                <label>Study hours (0-24h):</label>
                <input
                  type="number"
                  value={input.studyHours}
                  onChange={(e) => handleInputChange('studyHours', parseFloat(e.target.value))}
                  min="0"
                  max="24"
                  step="0.5"
                />
              </div>
              <div className="form-group">
                <label>Exam pressure (0-10):</label>
                <input
                  type="number"
                  value={input.examPressure}
                  onChange={(e) => handleInputChange('examPressure', parseInt(e.target.value))}
                  min="0"
                  max="10"
                />
              </div>
              <div className="form-group">
                <label>Performance (0-100):</label>
                <input
                  type="number"
                  value={input.performance}
                  onChange={(e) => handleInputChange('performance', parseInt(e.target.value))}
                  min="0"
                  max="100"
                />
              </div>
            </div>
          )}

          {/* Page 3: Mental Health */}
          {currentPage === 2 && (
            <div className="form-section">
              <h2>Side 3 - Mental Health</h2>
              <div className="form-group">
                <label>Stress (0-10):</label>
                <input
                  type="number"
                  value={input.stress}
                  onChange={(e) => handleInputChange('stress', parseInt(e.target.value))}
                  min="0"
                  max="10"
                />
              </div>
              <div className="form-group">
                <label>Anxiety (0-10):</label>
                <input
                  type="number"
                  value={input.anxiety}
                  onChange={(e) => handleInputChange('anxiety', parseInt(e.target.value))}
                  min="0"
                  max="10"
                />
              </div>
              <div className="form-group">
                <label>Depression (0-10):</label>
                <input
                  type="number"
                  value={input.depression}
                  onChange={(e) => handleInputChange('depression', parseInt(e.target.value))}
                  min="0"
                  max="10"
                />
              </div>
            </div>
          )}

          {/* Page 4: Lifestyle */}
          {currentPage === 3 && (
            <div className="form-section">
              <h2>Side 4 - Lifestyle</h2>
              <div className="form-group">
                <label>Sleep (0-24h):</label>
                <input
                  type="number"
                  value={input.sleep}
                  onChange={(e) => handleInputChange('sleep', parseFloat(e.target.value))}
                  min="0"
                  max="24"
                  step="0.5"
                />
              </div>
              <div className="form-group">
                <label>Physical activity (0-24h):</label>
                <input
                  type="number"
                  value={input.physical}
                  onChange={(e) => handleInputChange('physical', parseFloat(e.target.value))}
                  min="0"
                  max="24"
                  step="0.5"
                />
              </div>
              <div className="form-group">
                <label>Screen Time (0-24h):</label>
                <input
                  type="number"
                  value={input.screenTime}
                  onChange={(e) => handleInputChange('screenTime', parseFloat(e.target.value))}
                  min="0"
                  max="24"
                  step="0.5"
                />
              </div>
            </div>
          )}

          {/* Page 5: External Factors */}
          {currentPage === 4 && (
            <div className="form-section">
              <h2>Side 5 - External Factors</h2>
              <div className="form-group">
                <label>Internet usage (0-24h):</label>
                <input
                  type="number"
                  value={input.internet}
                  onChange={(e) => handleInputChange('internet', parseFloat(e.target.value))}
                  min="0"
                  max="24"
                  step="0.5"
                />
              </div>
              <div className="form-group">
                <label>Financial stress (0-10):</label>
                <input
                  type="number"
                  value={input.financialStress}
                  onChange={(e) => handleInputChange('financialStress', parseInt(e.target.value))}
                  min="0"
                  max="10"
                />
              </div>
              <div className="form-group">
                <label>Family expectation (0-10):</label>
                <input
                  type="number"
                  value={input.familyExpectation}
                  onChange={(e) => handleInputChange('familyExpectation', parseInt(e.target.value))}
                  min="0"
                  max="10"
                />
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="button-group">
            <button
              className="nav-button back-button"
              onClick={goBackPage}
              disabled={currentPage === 0}
            >
              Tilbage
            </button>
            {currentPage < totalPages - 1 ? (
              <button
                className="nav-button next-button"
                onClick={goNextPage}
              >
                Næste
              </button>
            ) : (
              <button
                className="predict-button"
                onClick={calculatePredictions}
                disabled={loading}
              >
                {loading ? 'Beregner...' : 'Forudsig Health Scores'}
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="results">
          <h2>Prediction Results</h2>
          <div className="result-item">
            <span className="result-label">Burnout Score:</span>
            <span className="result-value">{output.burnoutScore}/10</span>
          </div>
          <div className="result-item">
            <span className="result-label">Mental Health:</span>
            <span className="result-value">{output.mentalHealth}/10</span>
          </div>
          <div className="result-item">
            <span className="result-label">Risk Level:</span>
            <span className="result-value">{output.riskLevel}/10</span>
          </div>
          <div className="result-item">
            <span className="result-label">Dropout Risk:</span>
            <span className="result-value">{output.dropoutRisk}/10</span>
          </div>
          <button
            className="reset-button"
            onClick={() => {
              setOutput(null);
              setCurrentPage(0);
            }}
          >
            Start Over
          </button>
        </div>
      )}
    </div>
  );
}

export default App
