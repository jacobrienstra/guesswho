import { PortalWithState } from "react-portal";
import React from "react";
import { css } from "@emotion/core";

import Setup from "./Setup.react";
import Button from "./Button.react";

const root = css`
  display: flex;
  justify-content: center;
  width: 100%;
`;

// const props = { webkitdirectory: "", directory: "" };

// const handleInput = async (
//   event: ChangeEvent<HTMLInputElement>
// ): Promise<void> => {
//   event.preventDefault();
// };

function DeckSelect(): JSX.Element {
  return (
    <PortalWithState closeOnEsc>
      {({ closePortal, openPortal, portal }): JSX.Element => (
        <div css={root}>
          <Button onClick={openPortal}>Game Setup</Button>
          {portal(<Setup onClose={closePortal} />)}
        </div>
      )}
    </PortalWithState>
  );
}

export default DeckSelect;

{
  /* <label htmlFor="showNames">
        Show Names
        <input
          name="showNames"
          type="checkbox"
          checked={props.settings.showNames}
          onChange={(e) => {
            dispatch({ type: SET_SHOW_NAMES, showNames: e.target.checked });
          }}
        />
        <label htmlFor="numCards">
          Number of Cards
          <input
            name="numCards"
            type="number"
            min="24"
            max="60"
            step="1"
            value={props.settings.numCards}
            onChange={(e) => {
              dispatch({
                type: SET_NUM_CARDS,
                numCards: parseInt(e.target.value, 10),
              });
            }}
          />
        </label>
      </label> */
  /* <Button tag="label" html=For="directory">
        Upload New Deck
        <input
          css={input}
          name="directory"
          id="directory"
          type="file"
          onChange={handleInput}
          {...props}
        />
      </Button>  */
}
