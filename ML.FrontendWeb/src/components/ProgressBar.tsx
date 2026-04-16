interface ProgressBarProps {
  currentPage: number;
  totalPages: number;
}

export function ProgressBar({ currentPage, totalPages }: ProgressBarProps) {
  const progress = ((currentPage + 1) / totalPages) * 100;

  return (
    <div className="progress-container">
      <div className="progress-text">
        Side {currentPage + 1} of {totalPages}
      </div>
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${progress}%` }}></div>
      </div>
    </div>
  );
}
