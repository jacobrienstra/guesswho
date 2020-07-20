import { useDispatch, useSelector } from "react-redux";
import { PortalWithState } from "react-portal";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { css } from "@emotion/core";

import NumberInput from "./NumberInput.react";
import Modal from "./Modal.react";
import Checkbox from "./Checkbox.react";

import type { RootState } from "src/redux/store";
import { setNumCards, setShowName } from "src/redux/reducers/settings";

const root = css`
  border-radius: 4px;
  svg {
    margin: 8px 0;
    padding: 4px;
    cursor: pointer;
    &:hover {
      color: white;
      background: black;
    }
  }
`;

const modalContent = css`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 16px 32px;

  .numCards,
  .showName {
    display: flex;
    align-items: center;
    margin-bottom: 1rem;

    .data {
      font-weight: bold;
      font-size: 1.2rem;
    }
  }
`;

function Settings(): JSX.Element {
  const dispatch = useDispatch();
  const numCards = useSelector((state: RootState) => state.settings.numCards);
  const showName = useSelector((state: RootState) => state.settings.showName);

  return (
    <PortalWithState closeOnEsc>
      {({ closePortal, openPortal, portal }): JSX.Element => (
        <div css={root}>
          <FontAwesomeIcon
            size="2x"
            icon="cog"
            onClick={openPortal}
            className="settings"
          />
          {portal(
            <Modal title="Settings" onClose={closePortal}>
              <div className="content" css={modalContent}>
                <div className="numCards">
                  <NumberInput
                    name="numCards"
                    label="Number of Cards"
                    value={numCards}
                    min={24}
                    max={48}
                    onSubmit={(val): void => {
                      if (val) dispatch(setNumCards(val));
                    }}
                  />
                  <div className="data">Current Setting: {numCards}</div>
                </div>
                <div className="showName">
                  <Checkbox
                    value={showName}
                    label="Show Names"
                    onToggle={(val): void => {
                      dispatch(setShowName(val));
                    }}
                  />
                  <div className="data">{showName ? "Yeah" : "No"}</div>
                </div>
              </div>
            </Modal>
          )}
        </div>
      )}
    </PortalWithState>
  );
}

export default Settings;
