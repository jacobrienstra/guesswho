import { Flipper, Flipped } from "react-flip-toolkit";
import React from "react";
import { cx } from "emotion";
import { css } from "@emotion/core";

const defaultOption = css`
  display: flex;
  flex: 1 1 100%;
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

  &.selected {
    color: white;
    background-color: var(--blue);
  }

  .select-option-content {
    .description {
      opacity: 0.6;
    }
  }
`;

const root = css`
  position: relative;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

  & .select-option {
    &.selected {
      position: relative;
      z-index: 2;
    }

    &.not-selected {
      position: absolute;
      cursor: auto;
      opacity: 1;
    }

    &.hidden {
      visibility: hidden;
    }
  }
`;

function onStart(e: HTMLElement): void {
  e.classList.remove("hidden");
}

function onComplete(shouldHide: boolean, e: HTMLElement): void {
  if (shouldHide) e.classList.add("hidden");
}

type Item<T> = {
  value: string | number;
  text: string;
  description?: string;
} & T;

// T = extra properties
interface Props<T> {
  items: Item<T>[];
  selectedValue: string | number | undefined;
  toggle: (item: Item<T>) => void;
  element?: React.FC<Item<T>>;
}

const Default: React.FC<Item<{}>> = (props: Item<{}>): JSX.Element => (
  <div css={defaultOption} {...props}>
    <div className="select-option-content">
      <div className="text">{props.text}</div>
      <div className="description">{props.description}</div>
    </div>
  </div>
);

function FancySelect<T>({
  items,
  selectedValue,
  toggle,
  element,
}: Props<T>): JSX.Element {
  const mapper = (
    item: Item<T>,
    i: number,
    selected: boolean,
    hasSelected: boolean,
    notSelected: boolean
  ): JSX.Element => {
    const Element = element || Default;
    return (
      <Element
        {...item}
        id={item.value}
        className={cx([
          "select-option",
          {
            selected,
            "not-selected": notSelected,
          },
        ])}
        style={{ order: selected ? 0 : i + 1 }}
        onClick={(e: Event): void => {
          e.preventDefault();

          if (!hasSelected || selected) toggle(item);
        }}
      />
    );
  };

  return (
    <Flipper
      flipKey={selectedValue}
      css={root}
      spring={{ damping: 21, stiffness: 150 }}
    >
      {items.map((item, i) => {
        const { value } = item;
        const selected = value === selectedValue;
        const hasSelected = selectedValue != null;
        const notSelected = hasSelected && !selected;
        return (
          <Flipped
            key={value}
            flipId={value}
            onStart={onStart}
            onComplete={(e): void => onComplete(notSelected, e)}
          >
            {mapper(item, i, selected, hasSelected, notSelected)}
          </Flipped>
        );
      })}
    </Flipper>
  );
}

export default FancySelect;
