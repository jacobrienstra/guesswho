import { useSelector } from "react-redux";
import React from "react";
import { cx } from "emotion";
import { css, SerializedStyles } from "@emotion/core";

import { Card } from "../redux/types";

import { RootState } from "src/redux/store";

const cardStyle = (maxWidth: number | undefined): SerializedStyles => css`
  z-index: 0;
  box-sizing: border-box;
  max-width: ${maxWidth}px;
  margin: 0;
  border: 2px solid transparent;
  perspective: 40rem;
  cursor: pointer;
  transition: z-index 0 0.2s, border-color 0.2s;

  /* flip speed goes here */
  .flipper {
    display: flex;
    transform-style: preserve-3d;
    transition: 0.2s;

    /* hide back of pane during swap */
    .front,
    .back {
      min-width: 100%;
      border: 2px solid navy;
      border-radius: 6px;
      backface-visibility: hidden;
    }

    /* front pane, placed above back */
    .front {
      background: var(--lightblue);

      /* transform: rotateY(180deg); */
      .name {
        padding-top: 4px;
        color: black;
        font-weight: 700;
        font-size: 1rem;
        text-align: center;
        word-wrap: normal;
      }
      .container {
        padding: 8px;
        img {
          width: 100%;
        }
      }
    }

    /* back, initially hidden pane */
    .back {
      display: flex;
      align-items: center;
      justify-content: center;
      background: var(--blue);
      transform: rotateX(-180deg) translate(-100%, 0);
      .name {
        color: white;
        font-weight: 700;
      }
    }
  }

  &:hover {
    .flipper {
      .front,
      .back {
        border-color: var(--blue);
      }
    }
  }

  /* flip the pane when hovered */
  &.eliminated .flipper {
    z-index: 1;
    transform: rotateX(-180deg);
    transition-delay: 0s;
  }
`;

type Props = {
  card: Card;
  maxWidth?: number;
  onClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
};

function CharacterCard(props: Props): JSX.Element {
  const { maxWidth, card, onClick, className, style, ...rest } = props;
  const { srcUri, name, id } = card;
  const [isVisible, setVisible] = React.useState(true);
  const showName = useSelector((state: RootState) => state.settings.showName);

  const handleMouseEnter = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ): void => {
    if (e.buttons === 1 || e.buttons === 3) {
      if (onClick) onClick();
      else setVisible(!isVisible);
    }
  };

  return (
    <div
      css={cardStyle(maxWidth)}
      key={id}
      className={cx({ eliminated: !isVisible }, [
        "card",
        "flip-container",
        className,
      ])}
      onClick={onClick || ((): void => setVisible(!isVisible))}
      onMouseEnter={handleMouseEnter}
      onFocus={(): void => {}}
      style={style}
      {...rest}
    >
      <div className="flipper">
        <div className="front">
          <div className="container">
            <img src={srcUri} alt={name} />
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
