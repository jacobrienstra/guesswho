import { connect, MapStateToProps } from "react-redux";
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
}

export default function CardGrid(props: OwnProps): JSX.Element {
  const { cards } = props;

  return (
    <div css={grid}>
      {cards.map(
        (card: Card): JSX.Element => (
          <CharacterCard key={card.id} card={card} />
        )
      )}
    </div>
  );
}

// const mapStateToProps: MapStateToProps<DeckState & SettingsState, {}, State> = (
//   state
// ) => {
//   return {
//     ...state.deck,
//     ...state.settings,
//   };
// };

// export default connect(mapStateToProps)(CardGrid);
