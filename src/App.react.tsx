import React from "react";
import { css } from "@emotion/core";

import CardGrid from "./components/CardGrid.react";

const root = css`
  justify-content: center;
  display: block;
  box-sizing: border-box;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  padding: 16px;
`;

function App(): JSX.Element {
  const [images, setImages] = React.useState([] as string[]);
  React.useEffect(() => {
    const fetch = async (): Promise<void> => {
      const context = require.context("./pics", true);
      const keys = require
        .context("./pics", true, /\.(png|jp(e)?g|svg)$/)
        .keys();
      const imgs = await Promise.all(keys.map(async (img) => context(img)));
      setImages(imgs);
    };
    fetch();
  }, []);
  return (
    <div css={root}>
      <CardGrid fileSrcs={images} />
    </div>
  );
}

export default App;
