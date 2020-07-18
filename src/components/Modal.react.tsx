import React, { PropsWithChildren } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { css } from "@emotion/core";

const overlay = css`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 201;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgb(33, 33, 33);
  border-color: rgb(33, 33, 33);
  border-radius: inherit;
  opacity: 0.46;
  transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1), z-index 1ms;
  will-change: opacity;
`;

const root = css`
  &.container {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 202;
    display: flex;
    justify-content: center;
    width: 100%;
    height: 100%;
    outline: none;
    transition: 0.2s cubic-bezier(0.25, 0.8, 0.25, 1) z-index 1ms;

    .modal {
      position: fixed;
      z-index: 202;
      display: flex;
      flex-direction: column;
      box-sizing: content-box;
      width: calc(100% - 16px);
      max-width: 600px;
      height: calc(100% - 16px);
      max-height: 90%;
      margin: 24px;
      overflow-y: hidden;
      background: white;
      border-radius: 4px;
      box-shadow: 0 11px 15px -7px rgba(0, 0, 0, 0.2),
        0 24px 38px 3px rgba(0, 0, 0, 0.14), 0 9px 46px 8px rgba(0, 0, 0, 0.12);
      transform-origin: center center;
      opacity: 1;
      transition: 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);

      .header {
        display: flex;
        flex-shrink: 0;
        align-items: center;
        justify-content: space-between;
        padding: 8px 24px;
        border-bottom: 2px solid black;

        .title {
          margin-right: 12px;
          font-size: 16px;
        }

        .button {
          padding: 6px 10px;
          border-radius: 4px;
          cursor: pointer;

          &:hover {
            color: white;
            background-color: var(--blue);
          }
        }
      }

      .body {
        position: relative;
        display: flex;
        flex: 1 1 auto;
        overflow-x: hidden;
        overflow-y: auto;
      }

      .footer {
        display: flex;
        flex-direction: row;
        flex-shrink: 0;
        align-items: center;
        justify-content: space-between;
        padding: 8px 24px;
        border-top: 2px solid black;

        & > *:not(:last-child) {
          margin-right: 8px;
        }
      }
    }
  }
`;

interface Props {
  title: string;
  footer?: React.ReactNode;
  onClose: () => void;
}
function Modal(props: PropsWithChildren<Props>): JSX.Element | null {
  return (
    <>
      <div css={overlay}>""</div>
      <div css={root} className="container">
        <div className="modal">
          <div className="header">
            <h2 className="title">{props.title}</h2>
            <FontAwesomeIcon
              icon="times"
              size="lg"
              className="button"
              onClick={props.onClose}
            />
          </div>
          <div className="body">{props.children}</div>
          {props.footer ? <div className="footer">{props.footer}</div> : null}
        </div>
      </div>
    </>
  );
}

export default Modal;
