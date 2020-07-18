import { Flipper, Flipped } from "react-flip-toolkit";
import React from "react";
import { cx } from "emotion";
import { css } from "@emotion/core";

const root = css`
  position: relative;

  & .select-option {
    display: flex;
    align-items: center;
    box-sizing: border-box;
    width: 100%;
    margin-bottom: 8px;
    padding: 12px;
    font-weight: 700;
    background-color: var(--lightblue);
    border: solid 2px transparent;
    border-radius: 6px;
    cursor: pointer;
    opacity: 1;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 300ms;
    transition-property: background-color, border-color, opacity;

    &:hover {
      border-color: var(--blue);
    }

    .select-option-content {
      .description {
        opacity: 0.6;
      }
    }

    &.selected {
      position: relative;
      z-index: 2;
      color: white;
      background-color: var(--blue);
    }

    &.not-selected {
      position: absolute;
      cursor: auto;
      opacity: 0;
    }

    &.hidden {
      visibility: hidden;
    }
  }
`;

interface Props {
  items: Array<FancySelectItem>;
  value: string | undefined;
  toggle: (item: FancySelectItem) => void;
}

interface FancySelectItem {
  value: string;
  text: string;
  description?: string;
}

function onStart(e: HTMLElement): void {
  e.classList.remove("hidden");
}

function onComplete(shouldHide: boolean, e: HTMLElement): void {
  if (shouldHide) e.classList.add("hidden");
}

function FancySelect(props: Props): JSX.Element {
  const { value, items, toggle } = props;

  return (
    <Flipper
      flipKey={value}
      css={root}
      spring={{ damping: 21, stiffness: 150 }}
    >
      {items.map((item, i) => {
        const selected = item.value === value;
        const hasSelected = value != null;
        const notSelected = hasSelected && !selected;
        return (
          <Flipped
            key={item.value}
            flipId={item.value}
            onStart={onStart}
            onComplete={(e): void => onComplete(notSelected, e)}
          >
            <div
              className={cx([
                "select-option",
                {
                  selected,
                  "not-selected": notSelected,
                },
              ])}
              style={{ order: selected ? 0 : i + 1 }}
              onClick={
                !hasSelected || selected
                  ? (): void => toggle(item)
                  : (): void => {}
              }
            >
              <div className="select-option-content">
                <div className="text">{item.text}</div>
                <div className="description">{item.description}</div>
              </div>
            </div>
          </Flipped>
        );
      })}
    </Flipper>
  );
}

export default FancySelect;
