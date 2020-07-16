import React from "react";
import {
  faCheckSquare,
  faTimes,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { css } from "@emotion/core";

import Modal from "./components/Modal.react";
import DeckSelect from "./components/DeckSelect.react";
import CardGrid from "./components/CardGrid.react";

library.add(faCheckSquare, faTimes, faTimesCircle);

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
  return (
    <>
      <div css={root}>
        <DeckSelect />
        <CardGrid />
      </div>
      <div id="portal-root" />
    </>
  );
}

export default App;
