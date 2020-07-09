import React from "react";
import { css } from "@emotion/core";

import Modal from "./components/Modal.react";
import DeckSelect from "./components/DeckSelect.react";
import CardGrid from "./components/CardGrid.react";

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
    <div css={root}>
      <DeckSelect />
      <CardGrid />
      <Modal />
    </div>
  );
}

export default App;
