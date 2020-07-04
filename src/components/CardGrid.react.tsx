import React from "react";
import { css } from "@emotion/core";

import CharacterCard from "./CharacterCard.react";

const grid = css`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-content: flex-start;
  justify-content: center;
  width: 100%;
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
