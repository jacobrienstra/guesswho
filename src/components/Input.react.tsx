import React, { ChangeEvent } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { css } from "@emotion/core";

import Button from "./Button.react";

type Props = {
  name: string;
  label: string;
  value?: string;
  isValid: boolean;
  onSubmit: (val: string | undefined) => void;
  submitText?: string;
};

const root = css`
  display: flex;
  align-items: center;

  label {
    display: flex;
    align-items: center;
    font-weight: 700;
    font-size: 1.5rem;
    input[type="text"] {
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

function Input(props: Props): JSX.Element {
  const {
    name,
    label,
    value,
    isValid,
    onSubmit,
    submitText = isValid ? "ReSubmit" : "Submit",
  } = props;

  const [val, setVal] = React.useState(value);

  return (
    <div css={root}>
      <label htmlFor={name}>
        {label}
        <input
          name={name}
          type="text"
          value={val}
          onChange={(e: ChangeEvent<HTMLInputElement>): void => {
            setVal(e.target.value);
          }}
        />
      </label>
      {isValid ? (
        <FontAwesomeIcon icon="check-circle" color="green" size="2x" />
      ) : (
        <FontAwesomeIcon icon="info-circle" color="grey" size="2x" />
      )}

      <Button
        disabled={val == null || val === "" || val === value}
        onClick={(): void => onSubmit(val)}
      >
        {submitText}
      </Button>
    </div>
  );
}

export default Input;
