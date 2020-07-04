import process from "process";

import React, { ChangeEvent } from "react";
import { Octokit } from "@octokit/rest";
import { css } from "@emotion/core";

import Modal from "./Modal.react";
import Button from "./Button.react";

const input = css`
  display: none;
`;

const api = new Octokit({
  auth: process.env.ACCESS_TOKEN,
  userAgent: "guessWho",
  baseUrl: "https://api.github.com",
});

function DeckSelect(): JSX.Element {
  const [isModalShown, setModalShown] = React.useState(false);
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
      <Button
        onClick={(): void => {
          setModalShown(true);
        }}
      >
        Choose Existing Deck
      </Button>
      <Button tag="label" htmlFor="directory">
        Choose Image Directory
        <input
          css={input}
          name="directory"
          id="directory"
          type="file"
          onChange={handleInput}
          {...props}
        />
      </Button>
      <Modal
        title="Choose Deck"
        onClose={(): void => setModalShown(false)}
        isShown={isModalShown}
      />
    </>
  );
}

export default DeckSelect;
