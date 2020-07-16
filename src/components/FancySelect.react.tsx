import { TransitionGroup, CSSTransition } from "react-transition-group";
import { Flipper, Flipped } from "react-flip-toolkit";
import React from "react";
import { HandleEnterUpdateDelete } from "flip-toolkit/lib/types";
import { cx } from "emotion";
import { css } from "@emotion/core";

const root = css`
  display: flex;
  flex-direction: column;

  & .select-option {
    display: flex;
    align-items: center;
    box-sizing: border-box;
    margin-bottom: 8px;
    padding: 12px;
    background-color: white;
    border: 2px solid var(--blue);
    border-radius: 6px;
    cursor: pointer;
    opacity: 1;
    transition-timing-function: ease-in-out;
    transition-duration: 1000ms;
    transition-property: background-color, border-color;

    &:hover {
      border-color: black;
    }

    .select-content {
      .description {
        opacity: 0.6;
      }
    }

    &.active {
      z-index: 2;
      color: white;
      background-color: var(--blue);
      border-color: black;

      &:hover {
        border-color: var(--blue);
      }
    }

    &.hidden {
      visibility: hidden;
    }

    @keyframes fadeOut {
      0% {
        opacity: 1;
      }
      100% {
        opacity: 0;
      }
    }

    &.fadeOut {
      animation: fadeOut 2s forwards;
      animation-timing-function: cubic-bezier(0.47, 0, 0.745, 0.715);
    }
  }
`;

interface Props {
  items: Array<FancySelectItem>;
  value: string | null;
  toggle: (item: FancySelectItem) => void;
}

interface FancySelectItem {
  value: string;
  text: string;
  description?: string;
}

function FancySelect(props: Props): JSX.Element {
  const { value, items, toggle } = props;

  const onExit = (
    el: HTMLElement,
    i: number,
    removeElement: () => void
  ): void => {
    // eslint-disable-next-line no-param-reassign

    setTimeout(() => {
      el.classList.add("fadeOut");
      setTimeout(removeElement, 2000);
    }, i * 1000);
  };

  const onComplete = (el: HTMLElement): void => {
    // eslint-disable-next-line no-param-reassign

    // setTimeout(() => {
    el.classList.add("hidden");
    // });
  };

  const onStart = (el: HTMLElement): void => {
    // eslint-disable-next-line no-param-reassign

    // setTimeout(() => {
    el.classList.remove("hidden");
    // });
  };

  const animationOrder: HandleEnterUpdateDelete = ({
    hideEnteringElements,
    animateEnteringElements,
    animateExitingElements,
    animateFlippedElements,
  }) => {
    hideEnteringElements();
    animateEnteringElements();
    (animateFlippedElements() as Promise<void>).then(animateExitingElements);
  };

  const visibleItems =
    value === null ? items : items.filter((item) => item.value === value);
  return (
    <Flipper
      flipKey={value}
      css={root}
      spring={{ damping: 17, stiffness: 10 }}
      // handleEnterUpdateDelete={animationOrder}
    >
      {items.map((item, i) => (
        <Flipped
          key={item.value}
          flipId={item.value}
          stagger
          onComplete={onComplete}
          onStart={onStart}
        >
          <div
            className={cx([
              "select-option",
              {
                active: item.value === value,
                // fadeOut: value !== null && item.value !== value,
              },
            ])}
            style={{ order: item.value === value ? 0 : i + 1 }}
            onClick={(): void => toggle(item)}
          >
            <div className="select-content">
              <div className="text">{item.text}</div>
              <div className="description">{item.description}</div>
            </div>
          </div>
        </Flipped>
      ))}
    </Flipper>
  );
}

export default FancySelect;
