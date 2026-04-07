import type { PredictionOutput } from '../types';
import { ResultCard } from './ResultCard';

interface ResultsProps {
  output: PredictionOutput;
  onStartOver: () => void;
}

const RESULT_ITEMS = [
  { icon: '🔥', label: 'Burnout Score', key: 'burnoutScore' as const },
  { icon: '🧠', label: 'Mental Health', key: 'mentalHealth' as const },
  { icon: '⚠️', label: 'Risk Level', key: 'riskLevel' as const },
  { icon: '📉', label: 'Dropout Risk', key: 'dropoutRisk' as const },
];

export function Results({ output, onStartOver }: ResultsProps) {
  return (
    <div className="results-wrapper">
      <div className="results">
        <h2>Your Results</h2>
        <div className="results-grid">
          {RESULT_ITEMS.map((item) => (
            <ResultCard
              key={item.key}
              icon={item.icon}
              label={item.label}
              value={output[item.key]}
            />
          ))}
        </div>
        <button className="btn btn-secondary" onClick={onStartOver}>
          ← Start Over
        </button>
      </div>
    </div>
  );
}
