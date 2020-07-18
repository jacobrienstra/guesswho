import { useDispatch, useSelector } from "react-redux";
import ReactLoading from "react-loading";
import React from "react";
import { cx } from "emotion";
import { css } from "@emotion/core";

import { capitalize } from "../util";

import Modal from "./Modal.react";
import FancySelect from "./FancySelect.react";
import CardGrid from "./CardGrid.react";
import Button from "./Button.react";

import { Status } from "src/redux/types";
import { RootState } from "src/redux/store";
import { setDeckAndCards, setDeck } from "src/redux/reducers/game";
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
  const deck = useSelector((state: RootState) => state.game.deck);

  const steps = ["Choose Deck", "Choose Card"];
  const atLastStep = step === steps.length - 1;
  const atFirstStep = step === 0;
  const nextStep = (): void => {
    if (!atLastStep) {
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
          <Button onClick={nextStep} disabled={atLastStep}>
            Next
          </Button>
        </>
      }
    >
      <div css={selector}>
        <div className="sidebar">
          {steps.map((s, i) => (
            <div
              key={s}
              className={cx(["step", { current: step === i }])}
              onClick={(): void => {
                setStep(i);
              }}
            >
              {s}
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
                      value={deck}
                      toggle={(item): void => {
                        if (deck === item.value) {
                          dispatch(setDeck(undefined));
                        } else {
                          dispatch(setDeckAndCards(item.value));
                        }
                      }}
                    />
                  );
                }
                break;
              }
              case 1: {
                if (cardsStatus === Status.isPending) {
                  return (
                    <div css={loading}>
                      <ReactLoading type="spin" color="var(--blue)" />
                    </div>
                  );
                }
                if (cardsStatus === Status.hasSucceeded && cards) {
                  return <CardGrid cards={cards} height={100} />;
                }
                break;
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
