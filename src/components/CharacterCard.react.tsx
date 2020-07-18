import { useSelector } from "react-redux";
import React from "react";
import { cx } from "emotion";
import { css, SerializedStyles } from "@emotion/core";

import { Card } from "../redux/types";

import { RootState } from "src/redux/store";

const card = (height: number): SerializedStyles => css`
  position: relative;
  display: block;
  flex: 0 1 auto;
  box-sizing: border-box; /* width: 100px; */
  margin: 16px;

  /* entire container, keeps perspective */
  perspective: 1000px;
  cursor: pointer;

  .name {
    padding-top: 4px;
    color: black;
    font-weight: 700;
    font-size: 12px;
    text-align: center;
    word-wrap: normal;
  }

  /* flip speed goes here */
  .flipper {
    position: relative;
    transform-style: preserve-3d;
    transition: 0.2s;
  }

  /* flip the pane when hovered */
  &.eliminated .flipper {
    transform: rotateY(180deg);
  }

  &,
  .front,
  .back {
    width: ${height * 0.8}px;
    height: ${height}px;
  }

  /* hide back of pane during swap */
  .front,
  .back {
    position: absolute;
    top: 0;
    left: 0;
    border: 2px solid black;
    border-radius: 6px;
    backface-visibility: hidden;
  }

  /* front pane, placed above back */
  .front {
    z-index: 2;
    background: #e0e0e0;

    /* for firefox 31 */
    transform: rotateY(0deg);
    .container {
      padding: 8px;
    }
  }

  /* back, initially hidden pane */
  .back {
    display: flex;
    align-items: center;
    justify-content: center;
    background: #00a0ff;
    transform: rotateY(180deg);
    .name {
      color: #e0e0e0;
    }
  }
`;

interface Props {
  card: Card;
  height?: number;
  onClick?: () => void;
}

function CharacterCard(props: Props): JSX.Element {
  const { srcUri, name, id } = props.card;
  const { height = 260 } = props;
  const [isVisible, setVisible] = React.useState(true);
  const showName = useSelector((state: RootState) => state.settings.showName);
  return (
    <div
      css={card(height)}
      key={id}
      className={cx({ eliminated: !isVisible }, ["card", "flip-container"])}
      onClick={
        props.onClick ? props.onClick : (): void => setVisible(!isVisible)
      }
    >
      <div className="flipper">
        <div className="front">
          <div className="container">
            <img src={srcUri} alt={name} width={height * 0.8 - 16} />
            {showName ? <div className="name">{name}</div> : null}
          </div>
        </div>
        <div className="back">
          {showName ? <div className="name">{name}</div> : null}
        </div>
      </div>
    </div>
  );
}

export default CharacterCard;
