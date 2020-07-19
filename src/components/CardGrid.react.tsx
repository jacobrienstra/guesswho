import { Flipper } from "react-flip-toolkit";
import React from "react";
import { css } from "@emotion/core";

import { Card } from "../redux/types";

import CharacterCard from "./CharacterCard.react";

const grid = css`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-content: flex-start;
  justify-content: center;
  width: 100%;
`;

interface OwnProps {
  cards: Card[];
  height?: number;
  onCardClick?: (card: Card) => void;
}

export default function CardGrid(props: OwnProps): JSX.Element {
  const { cards, height, onCardClick } = props;

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
            height={height}
            onClick={onCardClick ? (): void => onCardClick(card) : undefined}
          />
        )
      )}
    </Flipper>
  );
}
