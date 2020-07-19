import { Flipper } from "react-flip-toolkit";
import React from "react";
import { css } from "@emotion/core";

import { Card } from "../redux/types";

import CharacterCard from "./CharacterCard.react";

const grid = css`
  display: grid;
  flex-direction: row;
  flex-wrap: wrap;
  grid-auto-rows: 1fr;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  align-content: flex-start;
  justify-content: center;
  width: 100%;
`;

interface Props {
  cards: Card[];
  maxWidth?: number;
  onCardClick?: (card: Card) => void;
}

export default function CardGrid(props: Props): JSX.Element {
  const { cards, maxWidth, onCardClick } = props;

  return (
    <Flipper
      flipKey={cards}
      css={grid}
      spring={{ damping: 21, stiffness: 150 }}
    >
      {cards.map(
        (card: Card): JSX.Element => (
          <CharacterCard
            key={card.id}
            card={card}
            maxWidth={maxWidth}
            onClick={onCardClick ? (): void => onCardClick(card) : undefined}
          />
        )
      )}
    </Flipper>
  );
}
