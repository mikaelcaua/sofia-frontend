import { ChangeEvent } from 'react';

interface TableFilterProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options?: { value: string; label: string }[];
  type?: 'text' | 'select';
  placeholder?: string;
}

export function TableFilter({
  label,
  value,
  onChange,
  options,
  type = 'text',
  placeholder,
}: TableFilterProps) {
  return (
    <div className="flex flex-col gap-2">
      <span>{label}</span>
      {type === 'select' && options ? (
        <select
          value={value}
          onChange={(e: ChangeEvent<HTMLSelectElement>) => onChange(e.target.value)}
          className="text-xs border border-gray-300 rounded px-2 py-1 font-normal"
        >
          <option value="">{placeholder || `Filtrar ${label}`}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          type="text"
          placeholder={placeholder || `Filtrar ${label}`}
          value={value}
          onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
          className="text-xs border border-gray-300 rounded px-2 py-1 font-normal"
        />
      )}
    </div>
  );
}
