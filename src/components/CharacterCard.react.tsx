import React from "react";
import { css } from "@emotion/core";

type Props = {
  fileSrc: string;
};

function capitalize(s: string): string {
  return s
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function getFileName(f: string): string {
  const parts = f.split("/");
  if (parts) {
    const last = parts.pop();
    if (last) return last.split(".")[0];
  }
  return f.split(".")[0];
}

const card = css`
  padding: 8px;
  background: #e0e0e0;
  border: 2px solid black;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  cursor: pointer;
  flex: 0 1 auto;
  margin: 16px;
  width: 100px;
  box-sizing: content-box;

  & .name {
    color: black;
    font-weight: 700;
    font-size: 18px;
    word-wrap: break-word;
    text-align: center;
    padding-top: 4px;
  }

  & .back {
    background: #00a0ff;
  }
`;

function CharacterCard(props: Props): JSX.Element {
  const { fileSrc } = props;
  const [isVisible, setVisible] = React.useState(true);
  const name = capitalize(getFileName(fileSrc));
  return (
    <div css={card} onClick={(): void => setVisible(!isVisible)}>
      {isVisible ? (
        <>
          <img src={fileSrc} alt={name} width={100} />
          <div className="name">{name}</div>{" "}
        </>
      ) : (
        <div className="back" />
      )}
    </div>
  );
}

export default CharacterCard;
