import process from "process";

import { connect, MapStateToProps } from "react-redux";
import React, { ChangeEvent } from "react";
import CryptoJS from "crypto-js";
import axios from "axios";
import { ReposGetContentResponseData } from "@octokit/types/dist-types/generated/Endpoints";
import { Octokit } from "@octokit/rest";
// import { css } from "@emotion/core";

import { dispatch } from "../redux/store";
import { State, Card } from "../redux/reducers";
import {
  SET_MODAL_SHOWN,
  SET_MODAL_CONTENT,
  SET_DECK_NAME,
  SET_DECK_CARDS,
  SET_SHOW_NAMES,
  SET_MYSTERY_CARD_HASH,
  SET_NUM_CARDS,
} from "../redux/actions";

import CharacterCard from "./CharacterCard.react";
import Button from "./Button.react";

// const input = css`
//   display: none;
// `;

const api = new Octokit({
  auth: process.env.ACCESS_TOKEN,
  userAgent: "guessWho",
  baseUrl: "https://api.github.com",
});

function DeckSelect(props: State): JSX.Element {
  const [guessCard, setCard] = React.useState(null as Card | null);
  // const props = { webkitdirectory: "", directory: "" };

  // const handleInput = async (
  //   event: ChangeEvent<HTMLInputElement>
  // ): Promise<void> => {
  //   event.preventDefault();
  // };

  const setDeck = (name: string): void => {
    dispatch({ type: SET_DECK_NAME, name });
    const res = api.repos.getContent({
      owner: "jacobrienstra",
      repo: "guesswho",
      path: `src/pics/${name}`,
    });
    let keys: string[] | null = null;
    let context: __WebpackModuleApi.RequireContext;
    if (name === "avatar") {
      context = require.context(`../pics/avatar`, true);
      keys = require
        .context(`../pics/avatar`, true, /\.(png|jp(e)?g|svg)$/)
        .keys();
    }
    if (name === "memes") {
      context = require.context(`../pics/memes`, true);
      keys = require
        .context(`../pics/memes`, true, /\.(png|jp(e)?g|svg)$/)
        .keys();
    }
    if (keys != null) {
      Promise.all(keys.map(async (img) => context(img))).then((imgs) => {
        dispatch({ type: SET_DECK_CARDS, srcUris: imgs });
      });
    }
  };

  const getCard = () => {
    const { cards } = props.deck;
    if (cards) {
      const card = cards[Math.floor(Math.random() * cards.length)];
      setCard(card);
    }
  };

  const setHash = (e) => {
    const { cards } = props.deck;
    const hash = e.target.value;
    if (cards) {
      const key = cards.find((card) => card.hash === hash);
      if (key) {
        dispatch({ type: SET_MYSTERY_CARD_HASH, hash: key.hash });
      }
    }
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

            <label htmlFor="hash">
              Hash <input type="text" onChange={setHash} />
            </label>
          </div>
        ),
      });
    });
  };

  return (
    <>
      <Button onClick={getDeck}>Choose Existing Deck</Button>
      <label htmlFor="showNames">
        Show Names
        <input
          name="showNames"
          type="checkbox"
          checked={props.settings.showNames}
          onChange={(e) => {
            dispatch({ type: SET_SHOW_NAMES, showNames: e.target.checked });
          }}
        />
        <label htmlFor="numCards">
          Number of Cards
          <input
            name="numCards"
            type="number"
            min="24"
            max="60"
            step="1"
            value={props.settings.numCards}
            onChange={(e) => {
              dispatch({
                type: SET_NUM_CARDS,
                numCards: parseInt(e.target.value, 10),
              });
            }}
          />
        </label>
      </label>
      <Button onClick={getCard}>Generate card and hash</Button>
      {guessCard ? (
        <>
          <CharacterCard
            name={guessCard.name}
            id={guessCard.id}
            fileSrc={guessCard.srcUri}
            showName={props.settings.showNames}
          />
          <div>{guessCard.hash}</div>
        </>
      ) : null}

      {/* <Button tag="label" html=For="directory">
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

const mapStateToProps: MapStateToProps<State, {}, State> = (state) => {
  return {
    ...state,
  };
};

export default connect(mapStateToProps)(DeckSelect);
