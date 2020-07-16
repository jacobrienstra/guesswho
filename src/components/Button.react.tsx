import React, { PropsWithChildren } from "react";
import { cx } from "emotion";
import { css } from "@emotion/core";

const button = css`
  display: block;
  align-items: flex-start;
  justify-content: center;
  box-sizing: content-box;
  min-width: 100px;
  max-width: 240px;
  margin: 8px 0;
  padding: 16px 24px;
  color: white;
  font-weight: 700;
  font-size: 1rem;
  text-align: center;
  background-color: var(--blue);
  border: none;
  border-radius: 4px;
  outline: none;
  cursor: pointer;

  &.disabled {
    color: black;
    background: var(--disabled);
    cursor: auto;
  }

  &.hidden {
    visibility: hidden;
  }
`;

interface Props {
  onClick?: (e: React.MouseEvent) => void;
  tag?: keyof JSX.IntrinsicElements;
  disabled?: boolean;
  hidden?: boolean;
  [key: string]: any;
}

function Button(props: PropsWithChildren<Props>): JSX.Element {
  const {
    tag: Tag = "button",
    onClick,
    disabled = false,
    hidden = false,
    ...rest
  } = props;
  return (
    <Tag
      {...rest}
      css={button}
      onClick={onClick}
      className={cx({ disabled, hidden })}
    >
      {props.children}
    </Tag>
  );
}

export default Button;
