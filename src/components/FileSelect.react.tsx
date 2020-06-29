import React, { ChangeEvent } from "react";
import { css } from "@emotion/core";

const button = css`
  padding: 16px 24px;
  max-width: 240px;
  background-color: #00a0ff;
  display: flex;
  border-radius: 6px;
  color: white;
  font-weight: 700;
  justify-content: center;
  cursor: pointer;
`;

const input = css`
  display: none;
`;

function FileSelect(): JSX.Element {
  const props = { webkitdirectory: "", directory: "" };
  const handleInput = (event: ChangeEvent<HTMLInputElement>): void => {
    event.preventDefault();
  };
  return (
    <>
      <label css={button} htmlFor="directory">
        Choose Image Directory
        <input
          css={input}
          name="directory"
          id="directory"
          type="file"
          onChange={handleInput}
          {...props}
        />
      </label>
    </>
  );
}

export default FileSelect;
