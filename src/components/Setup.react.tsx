import {
  connect,
  MapStateToProps,
  useDispatch,
  useSelector,
} from "react-redux";
import ReactLoading from "react-loading";
import { useAsync, StatusTypes } from "react-async";
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
import { fetchDecks } from "src/redux/reducers/game";

const loading = css`
  display: flex;
  align-content: center;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const selector = css`
  display: flex;
  width: 100%;
  height: 100%;
  direction: row;

  .sidebar {
    display: flex;
    flex: 0 1 auto;
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
    flex: 3 0 auto;
    flex-direction: column;
    padding: 16px;
  }
`;
interface Props {
  onClose: () => void;
}

function Setup(props: Props): JSX.Element {
  const [step, setStep] = React.useState<number>(0);
  const dispatch = useDispatch();
  const decks = useSelector((state: RootState) => state.game.decks.value);
  const decksStatus = useSelector(
    (state: RootState) => state.game.decks.status
  );

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
          <Button onClick={prevStep} hidden={atFirstStep}>
            Back
          </Button>
          <Button onClick={nextStep} hidden={atLastStep}>
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
                if (decksStatus === Status.hasSucceeded) {
                  return (
                    <FancySelect
                      items={decks.map((deck) => {
                        return {
                          value: deck,
                          text: capitalize(deck),
                        };
                      })}
                      value={props.chosenDeck}
                      toggle={(item): void => {
                        if (props.chosenDeck === item.value) {
                          dispatch({ type: SET_DECK_NAME, name: null });
                        } else {
                          dispatch({ type: SET_DECK_NAME, name: item.value });
                        }
                      }}
                    />
                  );
                }
                break;
              }
              case 1: {
                if (cardsStatus.isPending) {
                  return (
                    <div css={loading}>
                      <ReactLoading type="spin" color="var(--blue)" />
                    </div>
                  );
                }
                if (cardsStatus.data) {
                  return <CardGrid cards={props.allCards} />;
                }
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
