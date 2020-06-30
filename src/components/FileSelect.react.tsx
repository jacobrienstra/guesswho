import process from "process";

import React, { ChangeEvent } from "react";
import { Octokit } from "@octokit/rest";
import { css } from "@emotion/core";

const button = css`
  display: flex;
  justify-content: center;
  max-width: 240px;
  padding: 16px 24px;
  color: white;
  font-weight: 700;
  background-color: #00a0ff;
  border-radius: 6px;
  cursor: pointer;
`;

const input = css`
  display: none;
`;

const api = new Octokit({
  auth: process.env.ACCESS_TOKEN,
  userAgent: "guessWho",
  baseUrl: "https://api.github.com",
});

function FileSelect(): JSX.Element {
  const props = { webkitdirectory: "", directory: "" };
  const handleInput = async (
    event: ChangeEvent<HTMLInputElement>
  ): Promise<void> => {
    event.preventDefault();
    const res = await api.repos.getContent({
      owner: "jacobrienstra",
      repo: "guesswho",
      path: "src/pics",
    });
    console.log(res);
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
