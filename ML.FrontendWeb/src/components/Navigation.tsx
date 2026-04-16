interface NavigationProps {
  currentPage: number;
  totalPages: number;
  isLoading: boolean;
  onBack: () => void;
  onNext: () => void;
  onSubmit: () => void;
}

export function Navigation({
  currentPage,
  totalPages,
  isLoading,
  onBack,
  onNext,
  onSubmit,
}: NavigationProps) {
  const isLastPage = currentPage === totalPages - 1;

  return (
    <div className="button-group">
      <button
        className="btn btn-secondary"
        onClick={onBack}
        disabled={currentPage === 0}
      >
        ← Tilbage
      </button>
      {!isLastPage ? (
        <button className="btn btn-primary" onClick={onNext}>
          Næste →
        </button>
      ) : (
        <button
          className="btn btn-success"
          onClick={onSubmit}
          disabled={isLoading}
        >
          {isLoading ? 'Calculating...' : 'Get Results'}
        </button>
      )}
    </div>
  );
}
