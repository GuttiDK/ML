interface ResultCardProps {
  icon: string;
  label: string;
  value: number;
}

export function ResultCard({ icon, label, value }: ResultCardProps) {
  return (
    <div className="result-card">
      <div className="result-icon">{icon}</div>
      <div className="result-label">{label}</div>
      <div className="result-value">{value}</div>
      <div className="result-max">/10</div>
    </div>
  );
}
