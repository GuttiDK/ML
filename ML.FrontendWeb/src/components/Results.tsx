import type { PredictionOutput } from '../types';
import { ResultCard } from './ResultCard';

interface ResultsProps {
  output: PredictionOutput;
  onStartOver: () => void;
}

const RESULT_ITEMS = [
  { label: 'Burnout Score', key: 'burnoutScore' as const },
  { label: 'Mental Health Index', key: 'mentalHealthIndex' as const },
  { label: 'Dropout Risk', key: 'dropoutRisk' as const },
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
