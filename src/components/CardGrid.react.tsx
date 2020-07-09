import { connect, MapStateToProps } from "react-redux";
import React from "react";
import { css } from "@emotion/core";

import { DeckState, State, SettingsState, Card } from "../redux/reducers";

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
  let selected: Card[] | null = null;
  let shuffled: Card[] | null = null;
  let hashCard: Card | undefined;
  if (cards) {
    if (props.hash) {
      hashCard = cards.find((card) => card.hash === props.hash);
      const nonHashed = cards.filter((card) => card.hash !== props.hash);
      shuffled = nonHashed.sort(() => 0.5 - Math.random());
    } else {
      shuffled = cards.sort(() => 0.5 - Math.random());
    }

    // Get sub-array of first n elements after shuffled
    selected = [...shuffled.slice(0, props.numCards)];
    if (hashCard) {
      selected.push(hashCard);
    }
  }
  return (
    <div css={grid}>
      {selected
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
