import { useSelector } from "react-redux";
import React from "react";
import {
  faCheckSquare,
  faTimes,
  faTimesCircle,
  faCheckCircle,
  faInfoCircle,
  faCog,
} from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { css } from "@emotion/core";

import type { RootState } from "./redux/store";
import DeckSelect from "./components/DeckSelect.react";
import CardGrid from "./components/CardGrid.react";

library.add(
  faCheckSquare,
  faTimes,
  faTimesCircle,
  faCheckCircle,
  faInfoCircle,
  faCog
);

const root = css`
  display: block;
  justify-content: center;
  box-sizing: border-box;
  width: 100%;
  margin-right: auto;
  margin-left: auto;
  padding: 16px;
`;

function App(): JSX.Element {
  const gameCards = useSelector((state: RootState) => state.game.gameCards);
  return (
    <>
      <div css={root}>
        <DeckSelect />
        {gameCards ? <CardGrid cards={gameCards} /> : null}
      </div>
      <div id="portal-root" />
    </>
  );
}

export default App;
