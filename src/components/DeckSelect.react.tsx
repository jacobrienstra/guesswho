import process from "process";

import React, { ChangeEvent } from "react";
import { ReposGetContentResponseData } from "@octokit/types/dist-types/generated/Endpoints";
import { Octokit } from "@octokit/rest";
import { css } from "@emotion/core";

import { dispatch } from "../redux/store";
import {
  SET_MODAL_SHOWN,
  SET_MODAL_CONTENT,
  SET_DECK_NAME,
  SET_DECK_CARDS,
} from "../redux/actions";

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

  const setDeck = (name: string) => {
    dispatch({ type: SET_DECK_NAME, name });
    const context = require.context(`./pics/${name}`, true);
    const keys = require
      .context(`./pics/${name}`, true, /\.(png|jp(e)?g|svg)$/)
      .keys();
    Promise.all(keys.map(async (img) => context(img))).then((imgs) =>
      dispatch({ type: SET_DECK_CARDS, srcUris: imgs })
    );
  };

  const getDeck = (): void => {
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
        content: (
          <div>
            {(results.data as any).map(
              (folder: ReposGetContentResponseData) => (
                <Button onClick={() => setDeck(folder.name)} key={folder.sha}>
                  {folder.name}
                </Button>
              )
            )}
          </div>
        ),
      });
    });
  };

  return (
    <>
      <Button onClick={getDeck}>Choose Existing Deck</Button>
      {/* <Button tag="label" htmlFor="directory">
        Upload New Deck
        <input
          css={input}
          name="directory"
          id="directory"
          type="file"
          onChange={handleInput}
          {...props}
        />
      </Button> */}
    </>
  );
}

export default DeckSelect;
