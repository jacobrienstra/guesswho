import { useSelector, useDispatch } from "react-redux";
import React from "react";
import {
  faCheckSquare,
  faTimes,
  faTimesCircle,
  faCheckCircle,
  faInfoCircle,
  faCog,
} from "@fortawesome/free-solid-svg-icons";
import { faSquare } from "@fortawesome/free-regular-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { css } from "@emotion/core";

import { nameCase } from "./util";
import type { RootState } from "./redux/store";
import { endGame } from "./redux/reducers/game";
import { selectCardById } from "./redux/reducers/api";
import Settings from "./components/Settings.react";
import DeckSelect from "./components/DeckSelect.react";
import CharacterCard from "./components/CharacterCard.react";
import CardGrid from "./components/CardGrid.react";
import Button from "./components/Button.react";

library.add(
  faCheckSquare,
  faTimes,
  faTimesCircle,
  faCheckCircle,
  faInfoCircle,
  faCog,
  faSquare
);

const root = css`
  display: block;
  justify-content: center;
  box-sizing: border-box;
  width: 100%;
  margin-right: auto;
  margin-left: auto;
  padding: 16px;
  text-align: center;
`;

const header = css`
  display: flex;
  flex-direction: column;

  .level2 {
    display: flex;
    justify-content: center;
  }

  .cardLabel {
    margin-bottom: 8px;
    color: var(--green);
    font-weight: bold;
    font-size: 2.5rem;
  }

  .level1 {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    .info {
      display: flex;
      flex: 1 1 25%;
      justify-content: flex-end;
    }

    .buttonHolder {
      display: flex;
      flex: 1 1 25%;
      align-items: center;
      .settings {
        margin-right: 1rem;
      }
    }
    .title {
      flex: 1 1 50%;
      font-size: 64px;
      font-family: "Modak", cursive;
      line-height: 1em;
      text-align: center;
      vertical-align: middle;
    }
  }

  .opponent {
    font-weight: bold;
    font-size: 2rem;
    .name {
      color: var(--red);
    }
  }
`;

function App(): JSX.Element {
  const dispatch = useDispatch();
  const gameCards = useSelector((state: RootState) => state.game.gameCards);
  const opponentCode = useSelector(
    (state: RootState) => state.game.opponentCode
  );
  const playerCardId = useSelector((state: RootState) => state.game.playerCard);
  const playerCard = useSelector((state: RootState) =>
    selectCardById(state, playerCardId || "-1")
  );

  const isPlaying = useSelector((state: RootState) => state.game.isPlaying);

  return (
    <>
      <div css={root}>
        <div css={header}>
          <div className="level1">
            <div className="buttonHolder">
              <Settings />
              <Button
                onClick={(): void => {
                  dispatch(endGame());
                }}
                hidden={!isPlaying}
              >
                End Game
              </Button>
            </div>
            <div className="title">GUESS WHO?!</div>
            <div className="info opponent">
              {opponentCode && isPlaying ? (
                <>
                  Opponent:
                  <span className="name">
                    &nbsp;
                    {nameCase(opponentCode.split("-")[0])}
                  </span>
                </>
              ) : null}
            </div>
          </div>
          <div className="level2">
            <div className="info">
              {playerCard && isPlaying ? (
                <>
                  <div className="cardLabel">Your card:</div>
                  <CharacterCard
                    maxWidth={300}
                    card={playerCard}
                    canFlip={false}
                  />
                </>
              ) : null}
            </div>
          </div>
        </div>
        <DeckSelect />
        {gameCards && isPlaying ? <CardGrid cards={gameCards} /> : null}
      </div>
      <div id="portal-root" />
    </>
  );
}

export default App;
