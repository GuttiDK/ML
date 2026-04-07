interface FormFieldProps {
  label: string;
  type: 'number' | 'select';
  value: string | number;
  onChange: (value: string | number) => void;
  min?: number;
  max?: number;
  step?: string;
  options?: { value: string; label: string }[];
}

export function FormField({
  label,
  type,
  value,
  onChange,
  min,
  max,
  step,
  options,
}: FormFieldProps) {
  return (
    <div className="form-group">
      <label>{label}</label>
      {type === 'select' ? (
        <select value={value} onChange={(e) => onChange(e.target.value)}>
          {options?.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          min={min}
          max={max}
          step={step}
        />
      )}
    </div>
  );
}
