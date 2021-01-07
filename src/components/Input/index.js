import { Label } from './styled';

const Input = (params) => {
  const { name, type, value, onChange, placeholder, max, min, step } = params;
  return (
    <Label className="input-label">
      <small>{name}</small>
      <input
        type={type}
        value={value}
        onChange={(e) =>
          onChange(
            type === 'email' || type === 'password'
              ? e.target.value.trim()
              : e.target.value
          )
        }
        placeholder={placeholder}
        max={max}
        min={min}
        step={step}
      />
    </Label>
  );
};

export default Input;
