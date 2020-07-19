import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { css } from "@emotion/core";

type Props = {
  label: string;
  value: boolean;
  onToggle: (val: boolean) => void;
};

const root = css`
  display: flex;
  .label {
    display: flex;
    align-items: center;
    font-weight: 700;
    font-size: 1.5rem;
  }
  svg {
    margin: 0 1rem;
    cursor: pointer;
  }
`;

function Checkbox(props: Props): JSX.Element {
  const { label, value = false, onToggle } = props;
  const [val, setVal] = React.useState<boolean>(value);
  const toggle = (): void => {
    setVal(!val);
    onToggle(!val);
  };
  return (
    <div css={root}>
      <span className="label">{label}</span>
      {val ? (
        <FontAwesomeIcon
          icon="check-square"
          size="2x"
          color="var(--green)"
          onClick={toggle}
        />
      ) : (
        <FontAwesomeIcon icon={["far", "square"]} size="2x" onClick={toggle} />
      )}
    </div>
  );
}

export default Checkbox;
