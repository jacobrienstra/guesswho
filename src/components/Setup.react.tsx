import { useDispatch, useSelector } from "react-redux";
import ReactLoading from "react-loading";
import React from "react";
import { cx } from "emotion";
import { css } from "@emotion/core";

import { capitalize } from "../util";

import Modal from "./Modal.react";
import Input from "./Input.react";
import FancySelect from "./FancySelect.react";
import CharacterCard from "./CharacterCard.react";
import Button from "./Button.react";

import { Status, Card } from "src/redux/types";
import { RootState } from "src/redux/store";
import {
  setDeckAndCards,
  setDeck,
  setPlayerCard,
  setPlayerName,
} from "src/redux/reducers/game";
import { fetchDecks, selectAllCards } from "src/redux/reducers/api";

const loading = css`
  display: flex;
  align-content: center;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const selector = css`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;

  .sidebar {
    display: flex;
    flex: 0 0 auto;
    flex-direction: column;
    padding: 16px;
    border-right: 2px solid black;

    .step {
      padding: 8px 16px;
      font-weight: 700;
      border-radius: 4px;
      cursor: pointer;
    }

    .current {
      color: white;
      background: var(--blue);
    }
  }

  .content {
    display: flex;
    flex: 3 1 auto;
    flex-direction: column;
    padding: 16px;
    overflow-x: hidden;
    overflow-y: auto;
  }
`;
interface Props {
  onClose: () => void;
}

function Setup(props: Props): JSX.Element {
  const [step, setStep] = React.useState<number>(0);
  const dispatch = useDispatch();
  const decks = useSelector((state: RootState) => state.api.decks.value);
  const decksStatus = useSelector((state: RootState) => state.api.decks.status);
  const cardsStatus = useSelector((state: RootState) => state.api.cards.status);
  const cards = useSelector((state: RootState) => selectAllCards(state));
  const playerCard = useSelector((state: RootState) => state.game.playerCard);
  const deck = useSelector((state: RootState) => state.game.deck);
  const playerName = useSelector((state: RootState) => state.game.playerName);
  const opponentName = useSelector(
    (state: RootState) => state.game.opponentName
  );
  const oppCardError = useSelector(
    (state: RootState) => state.game.oppCardError
  );
  const opponentCard = useSelector(
    (state: RootState) => state.game.opponentCard
  );

  const toggleDeck = (value: string): void => {
    if (deck === value) {
      dispatch(setDeck(undefined));
    } else {
      dispatch(setDeckAndCards(value));
    }
  };

  const toggleCard = (card: Card): void => {
    if (playerCard === card.id) {
      dispatch(setPlayerCard(undefined));
    } else {
      dispatch(setPlayerCard(card));
    }
  };

  interface Step {
    name: string;
    neededData: any;
  }

  const steps: Step[] = [
    { name: "Choose Deck", neededData: deck },
    { name: "Choose Card", neededData: playerCard },
    { name: "Choose Opponent", neededData: opponentCard },
  ];
  const atLastStep = step === steps.length - 1;
  const atFirstStep = step === 0;
  const canAdvance = !atLastStep && steps[step].neededData != null;
  const nextStep = (): void => {
    if (canAdvance) {
      setStep(step + 1);
    }
  };

  const prevStep = (): void => {
    if (!atFirstStep) {
      setStep(step - 1);
    }
  };

  React.useEffect(() => {
    if (decksStatus === Status.unFetched) {
      dispatch(fetchDecks());
    }
  }, [decksStatus, dispatch]);

  return (
    <Modal
      title="Setup"
      onClose={props.onClose}
      footer={
        <>
          <Button onClick={prevStep} disabled={atFirstStep}>
            Back
          </Button>
          <Button onClick={nextStep} disabled={atLastStep || !canAdvance}>
            Next
          </Button>
        </>
      }
    >
      <div css={selector}>
        <div className="sidebar">
          {steps.map((s, i) => (
            <div
              key={s.name}
              className={cx(["step", { current: step === i }])}
              onClick={(): void => {
                if (steps.slice(0, i).every((st) => st.neededData != null))
                  setStep(i);
              }}
            >
              {s.name}
            </div>
          ))}
        </div>
        <div className="content">
          {((): JSX.Element | null => {
            switch (step) {
              case 0: {
                if (decksStatus === Status.isPending) {
                  return (
                    <div css={loading}>
                      <ReactLoading type="spin" color="var(--blue)" />
                    </div>
                  );
                }
                if (decksStatus === Status.hasSucceeded && decks) {
                  return (
                    <FancySelect
                      items={decks.map((d) => {
                        return {
                          value: d,
                          text: capitalize(d),
                        };
                      })}
                      selectedValue={deck}
                      toggle={(item): void => {
                        toggleDeck(item.value);
                      }}
                    />
                  );
                }
                break;
              }
              case 1: {
                if (cardsStatus === Status.isPending && cards) {
                  return (
                    <div css={loading}>
                      <ReactLoading type="spin" color="var(--blue)" />
                    </div>
                  );
                }
                if (cardsStatus === Status.hasSucceeded && cards) {
                  return (
                    <FancySelect
                      items={cards.map((card) => {
                        return { ...card, value: card.id, text: card.name };
                      })}
                      selectedValue={playerCard}
                      toggle={toggleCard}
                      element={(item) => (
                        <CharacterCard
                          maxWidth={100}
                          card={{ ...item }}
                          {...item}
                        />
                      )}
                    />
                  );
                }
                break;
              }
              case 2: {
                return (
                  <Input
                    name="playerName"
                    label="Your Name"
                    value={playerName}
                    isValid={playerName != null && playerName !== ""}
                    onSubmit={(val): void => {
                      dispatch(setPlayerName(val));
                    }}
                  />
                );
              }
              default: {
                return null;
              }
            }
            return null;
          })()}
        </div>
      </div>
    </Modal>
  );
}

export default Setup;
