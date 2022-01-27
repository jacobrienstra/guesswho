import Masonry from "react-masonry-css";
import React from "react";
import { css } from "@emotion/core";

import { Card } from "../redux/types";

import CharacterCard from "./CharacterCard.react";

const grid = css`
  /* display: grid;
  flex-direction: row;
  flex-wrap: wrap;
  grid-auto-rows: 200px;
  grid-gap: 8px;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  align-content: flex-start;
  justify-content: center;
  width: 100%; */
  display: flex;
  margin-left: -16px;

  .card-grid-column {
    width: 100%;
    padding-left: 16px; /* gutter size */
    background-clip: padding-box;
  }
`;

interface Props {
  cards: Card[];
  maxWidth?: number;
  onCardClick?: (card: Card) => void;
}

export default function CardGrid(props: Props): JSX.Element {
  const { cards, maxWidth, onCardClick } = props;
  const cardElements = cards.map(
    (card: Card): JSX.Element => (
      <CharacterCard
        key={card.id}
        card={card}
        className="card"
        style={{ marginBottom: "8px" }}
        maxWidth={maxWidth}
        onClick={onCardClick ? (): void => onCardClick(card) : undefined}
      />
    )
  );
  return (
    // <Masonry
    //   css={grid}
    //   className="card-grid"
    //   columnClassName="card-grid-column"
    //   breakpointCols={4}
    // >
    <div css={grid}>{cardElements}</div>
    // </Masonry>
  );
}
