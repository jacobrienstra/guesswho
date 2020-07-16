import { connect, MapStateToProps } from "react-redux";
import ReactLoading from "react-loading";
import { useAsync } from "react-async";
import React from "react";
import { cx } from "emotion";
import { css } from "@emotion/core";
import { IItemsResponse } from "@directus/sdk-js/dist/types/schemes/response/Item";
import SDK from "@directus/sdk-js";

import { capitalize } from "../util";
import { State } from "../redux/reducers";

import Modal from "./Modal.react";
import FancySelect from "./FancySelect.react";
import Button from "./Button.react";

import { dispatch } from "src/redux/store";
import { SET_DECK_NAME } from "src/redux/actions";

export const sdk = new SDK({
  url: "http://167.172.1.48/",
  project: "guesswho",
  mode: "cookie",
});

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
type OwnProps = {
  onClose: () => void;
};

type StateProps = {
  chosenDeck: string | null;
};
const getDeck = async (): Promise<IItemsResponse> => sdk.getItems("decks");

function Setup(props: OwnProps & StateProps): JSX.Element {
  const [step, setStep] = React.useState<number>(0);
  const { run, isPending, data } = useAsync({ deferFn: getDeck });
  const steps = ["Select Deck", "Get Card"];
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
    run();
  }, [run]);

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
          {isPending ? (
            <div css={loading}>
              <ReactLoading type="spin" color="var(--blue)" />
            </div>
          ) : null}
          {data ? (
            <FancySelect
              items={data.data.map((deck: Record<string, any>) => {
                return { value: deck.name, text: capitalize(deck.name) };
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
          ) : null}
        </div>
      </div>
    </Modal>
  );
}

const mapStateToProps: MapStateToProps<StateProps, OwnProps, State> = (
  state
) => {
  return {
    chosenDeck: state.deck.name,
  };
};

export default connect(mapStateToProps)(Setup);
