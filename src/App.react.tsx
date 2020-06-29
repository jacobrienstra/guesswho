import React from "react";
import { css } from "@emotion/core";

import FileSelect from "./components/FileSelect.react";

const root = css`
  display: flex;
  margin: 0 auto;
  justify-content: center;
  width: 100%;
  padding: 16px;
  max-width: 1280px;
`;

function App(): JSX.Element {
  return (
    <div css={root}>
      <FileSelect />
    </div>
  );
}

export default App;
