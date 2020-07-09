import { connect, MapStateToProps } from "react-redux";
import React from "react";
import { css } from "@emotion/core";

import { DeckState, State } from "../redux/reducers";

import CharacterCard from "./CharacterCard.react";

const grid = css`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-content: flex-start;
  justify-content: center;
  width: 100%;
`;

type Props = DeckState;

function CardGrid(props: Props): JSX.Element {
  const { cards } = props;
  return (
    <div css={grid}>
      {cards
        ? cards.map(
            (card): JSX.Element => (
              <CharacterCard
                fileSrc={card.srcUri}
                key={card.id}
                id={card.id}
                name={card.name}
              />
            )
          )
        : null}
    </div>
  );
}

const mapStateToProps: MapStateToProps<DeckState, {}, State> = (state) => {
  return {
    ...state.deck,
  };
};

export default connect(mapStateToProps)(CardGrid);
