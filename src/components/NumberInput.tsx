import { useState } from "react";

type Props = {
  value: number;
  onChange: (value: number) => void;
};

export default function NumberInput({ value, onChange }: Props) {
  const [displayValue, setdisplayValue] = useState(String(value));

  return (
    <input
      className="py-2 rounded-lg border w-16 text-center appearance-none"
      type="text"
      value={displayValue}
      onBlur={() => {
        setdisplayValue(String(value));
      }}
      onChange={({ currentTarget: { value } }) => {
        const number = Number(value);

        if (Number.isNaN(number)) {
          return;
        }

        onChange(number);
        setdisplayValue(value);
      }}
    />
  );
}
