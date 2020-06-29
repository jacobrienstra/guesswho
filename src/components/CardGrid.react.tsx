import React from "react";
import { css } from "@emotion/core";

import CharacterCard from "./CharacterCard.react";

const grid = css`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-content: flex-start;
  width: 100%;
  flex-wrap: wrap;
`;

type Props = {
  fileSrcs: string[];
};

function CardGrid(props: Props): JSX.Element {
  return (
    <div css={grid}>
      {props.fileSrcs.map(
        (src: string): JSX.Element => (
          <CharacterCard fileSrc={src} key={src} />
        )
      )}
    </div>
  );
}

export default CardGrid;
