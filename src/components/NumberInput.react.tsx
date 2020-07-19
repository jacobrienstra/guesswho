import React from "react";
import { css } from "@emotion/core";

type Props = {
  name: string;
  label: string;
  value?: number;
  min: number;
  max: number;
  onSubmit: (val: number | undefined) => void;
};

const root = css`
  display: flex;
  align-items: center;

  label {
    display: flex;
    align-items: center;
    font-weight: 700;
    font-size: 1.5rem;
    input[type="number"] {
      margin: 0 1rem;
      padding: 0.5rem;
      font-size: 1.5rem;
      border: 2px solid black;
      border-radius: 4px;
      outline: none;
    }
  }
  svg {
    margin-right: 1rem;
  }
`;

function NumberInput(props: Props): JSX.Element {
  const { name, label, value, onSubmit, min, max } = props;

  const [val, setVal] = React.useState(value);

  return (
    <div css={root} className="input">
      <label htmlFor={name}>
        {label}
        <input
          name={name}
          type="number"
          value={val}
          min={min}
          max={max}
          onKeyUp={(e: React.KeyboardEvent): void => {
            if (e.keyCode === 13) {
              // setVal(parseInt(e.target.value, 10));
              if (val && val >= min && val <= max) onSubmit(val);
            }
          }}
          onInput={(e: React.FormEvent<HTMLInputElement>): void => {
            const v = parseInt((e.target as HTMLInputElement).value, 10);
            setVal(v);
            if (v >= min && v <= max) onSubmit(v);
          }}
        />
      </label>
    </div>
  );
}

export default NumberInput;
