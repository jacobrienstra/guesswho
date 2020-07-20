import Masonry from "react-masonry-css";
import React from "react";
import { css } from "@emotion/core";

import { Card } from "../redux/types";

import CharacterCard from "./CharacterCard.react";

const grid = css`
  /* display: grid;
  flex-direction: row;
  flex-wrap: wrap;
  grid-auto-rows: min-content;
  grid-gap: 8px;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  align-content: flex-start;
  justify-content: center;
  width: 100%; */
  display: flex;
  width: auto;
  margin-left: -30px; /* gutter size offset */

  .card-grid-column {
    padding-left: 30px; /* gutter size */
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
        style={{ marginBottom: "8px" }}
        maxWidth={maxWidth}
        onClick={onCardClick ? (): void => onCardClick(card) : undefined}
      />
    )
  );
  return (
    <Masonry
      css={grid}
      className="card-grid"
      columnClassName="card-grid-column"
      breakpointCols={3}
    >
      {cardElements}
    </Masonry>
  );
}
