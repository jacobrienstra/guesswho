import React from "react";
import { cx } from "emotion";
import { css } from "@emotion/core";

const card = css`
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
    width: 216px;
    height: 260px;
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

type Props = {
  fileSrc: string;
  name: string;
  id: number;
  showName: boolean;
};

function CharacterCard(props: Props): JSX.Element {
  const { fileSrc, name, id } = props;
  const [isVisible, setVisible] = React.useState(true);
  return (
    <div
      css={card}
      key={id}
      className={cx({ eliminated: !isVisible }, ["card", "flip-container"])}
      onClick={(): void => setVisible(!isVisible)}
    >
      <div className="flipper">
        <div className="front">
          <div className="container">
            <img src={fileSrc} alt={name} width={200} />
            {props.showName ? <div className="name">{name}</div> : null}
          </div>
        </div>
        <div className="back">
          {props.showName ? <div className="name">{name}</div> : null}
        </div>
      </div>
    </div>
  );
}

export default CharacterCard;
