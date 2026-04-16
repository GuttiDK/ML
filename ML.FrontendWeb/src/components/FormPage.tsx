import type { PredictionInput, FormFieldConfig } from '../types';
import { FormField } from './FormField';

interface FormPageProps {
  title: string;
  fields: FormFieldConfig[];
  input: PredictionInput;
  onInputChange: (field: keyof PredictionInput, value: string | number) => void;
}

export function FormPage({ title, fields, input, onInputChange }: FormPageProps) {
  return (
    <div className="form-container">
      <h2>{title}</h2>
      {fields.map((field) => (
        <FormField
          key={field.key}
          label={field.label}
          type={field.type}
          value={input[field.key]}
          onChange={(value) => onInputChange(field.key, value)}
          min={field.min}
          max={field.max}
          step={field.step}
          isInteger={field.isInteger}
          options={field.type === 'select' ? (field as any).options : undefined}
        />
      ))}
    </div>
  );
}
