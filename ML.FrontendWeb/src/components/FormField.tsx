interface FormFieldProps {
  label: string;
  type: 'number' | 'select' | 'slider';
  value: string | number;
  onChange: (value: string | number) => void;
  min?: number;
  max?: number;
  step?: string;
  isInteger?: boolean;
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
  isInteger,
  options,
}: FormFieldProps) {
  const numValue = typeof value === 'string' ? parseFloat(value) : value;
  
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
      ) : type === 'slider' ? (
        <div className="slider-group">
          <input
            type="range"
            value={numValue}
            onChange={(e) => onChange(isInteger ? parseInt(e.target.value) : parseFloat(e.target.value))}
            min={min}
            max={max}
            step={isInteger ? '1' : step || '0.1'}
            className="slider"
          />
          <div className="slider-value">{numValue}</div>
        </div>
      ) : (
        <input
          type="number"
          value={value}
          onChange={(e) => {
            const inputValue = e.target.value;
            if (isInteger) {
              const intValue = parseInt(inputValue);
              if (!isNaN(intValue)) onChange(intValue);
            } else {
              onChange(inputValue);
            }
          }}
          min={min}
          max={max}
          step={isInteger ? '1' : step}
        />
      )}
    </div>
  );
}
