import process from "process";

import React, { ChangeEvent } from "react";
import { Octokit } from "@octokit/rest";
import { css } from "@emotion/core";

import { dispatch } from "../redux/store";
import { SET_MODAL_SHOWN, SET_MODAL_CONTENT } from "../redux/actions";

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
  const props = { webkitdirectory: "", directory: "" };

  const handleInput = async (
    event: ChangeEvent<HTMLInputElement>
  ): Promise<void> => {
    event.preventDefault();
  };
  return (
    <>
      <Button
        onClick={(): void => {
          dispatch({
            type: SET_MODAL_CONTENT,
            title: "Choose Existing Deck",
            content: <div>Loading...</div>,
          });
          dispatch({ type: SET_MODAL_SHOWN, isShown: true });
          const res = api.repos.getContent({
            owner: "jacobrienstra",
            repo: "guesswho",
            path: "src/pics",
          });
          res.then((results) => {
            dispatch({
              type: SET_MODAL_CONTENT,
              content: <div />,
            });
            console.log(res);
          });
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
      <Modal />
    </>
  );
}

export default DeckSelect;
