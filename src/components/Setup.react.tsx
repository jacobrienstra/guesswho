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
      border-radius: 4px;
      cursor: pointer;
    }

    .current {
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
const getDeck = async (): Promise<IItemsResponse> => sdk.getItems("decks");

function Setup(props: OwnProps & State): JSX.Element {
  const [step, setStep] = React.useState<number>(0);
  const { run, isPending, data } = useAsync({ deferFn: getDeck });
  const steps = ["Select Deck", "Get Card"];

  React.useEffect(() => {
    run();
  }, [run]);

  return (
    <Modal title="Setup" onClose={props.onClose}>
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
            <>
              {/* {data.data.map((deck: Record<string, any>) => (
                <Button
                  key={deck.name}
                  onClick={(): void => {
                    dispatch({ type: SET_DECK_NAME, name: deck.name });
                  }}
                >
                  {capitalize(deck.name)}
                </Button>
              ))} */}
              <FancySelect
                items={[
                  { value: "test", text: "Test 1" },
                  { value: "test 2", text: "Test 2" },
                  { value: "test 3", text: "Test 3" },
                  { value: "test 4", text: "Test 4" },
                ]}
                value={props.deck.name}
                toggle={(item): void => {
                  if (props.deck.name === item.value) {
                    dispatch({ type: SET_DECK_NAME, name: null });
                  } else {
                    dispatch({ type: SET_DECK_NAME, name: item.value });
                  }
                }}
              />
            </>
          ) : null}
        </div>
      </div>
    </Modal>
  );
}

const mapStateToProps: MapStateToProps<State, OwnProps, State & OwnProps> = (
  state
) => {
  return {
    ...state,
  };
};

export default connect(mapStateToProps)(Setup);
