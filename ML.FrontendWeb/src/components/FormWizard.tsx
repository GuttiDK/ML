import type { PredictionInput, PageConfig } from '../types';
import { ProgressBar } from './ProgressBar';
import { FormPage } from './FormPage';
import { Navigation } from './Navigation';

interface FormWizardProps {
  currentPage: number;
  pages: PageConfig[];
  input: PredictionInput;
  isLoading: boolean;
  onPageChange: (page: number) => void;
  onInputChange: (field: keyof PredictionInput, value: string | number) => void;
  onSubmit: () => void;
}

export function FormWizard({
  currentPage,
  pages,
  input,
  isLoading,
  onPageChange,
  onInputChange,
  onSubmit,
}: FormWizardProps) {
  const totalPages = pages.length;
  const currentPageData = pages[currentPage];

  const handleBack = () => {
    if (currentPage > 0) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="form-wrapper">
      <ProgressBar currentPage={currentPage} totalPages={totalPages} />
      <FormPage
        title={currentPageData.title}
        fields={currentPageData.fields}
        input={input}
        onInputChange={onInputChange}
      />
      <Navigation
        currentPage={currentPage}
        totalPages={totalPages}
        isLoading={isLoading}
        onBack={handleBack}
        onNext={handleNext}
        onSubmit={onSubmit}
      />
    </div>
  );
}
