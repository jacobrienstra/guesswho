import { connect, MapStateToProps } from "react-redux";
import React from "react";
import { css } from "@emotion/core";

import { DeckState, State, SettingsState } from "../redux/reducers";

import CharacterCard from "./CharacterCard.react";

const grid = css`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-content: flex-start;
  justify-content: center;
  width: 100%;
`;

type Props = DeckState & SettingsState;

function CardGrid(props: Props): JSX.Element {
  const { cards } = props;
  // Shuffle array
  const shuffled = cards ? cards.sort(() => 0.5 - Math.random()) : [];
  // Get sub-array of first n elements after shuffled
  const selected = shuffled.slice(0, props.numCards);
  return (
    <div css={grid}>
      {cards
        ? selected.map(
            (card): JSX.Element => (
              <CharacterCard
                fileSrc={card.srcUri}
                key={card.id}
                id={card.id}
                name={card.name}
                showName={props.showNames}
              />
            )
          )
        : null}
    </div>
  );
}

const mapStateToProps: MapStateToProps<DeckState & SettingsState, {}, State> = (
  state
) => {
  return {
    ...state.deck,
    ...state.settings,
  };
};

export default connect(mapStateToProps)(CardGrid);
