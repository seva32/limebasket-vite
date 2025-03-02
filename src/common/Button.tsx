/* eslint-disable react/button-has-type */
import { ReactNode } from "react";
import classnames from "classnames";

interface ButtonProps {
  size?: string;
  children?: ReactNode;
  padding?: string;
  handleClick?: () => void;
  handleKeyDown?: (e: any) => void;
  arrowDown?: boolean;
  disabled?: boolean;
  noArrow?: boolean;
  submit?: boolean;
}

/**
 * general purpose button
 * @param {string} size size options: lg h48, md h40, sm h32, req
 * @param {node} children children components, req
 * @param {boolean} padding add padding, ex: p-0, px-4, opt
 * @param {function} handleClick onClick function handler, opt
 * @param {function} handleKeyDown onKeyDown function handler, opt
 * @param {boolean} arrowDown places the arrow icon downwards, opt
 * @param {boolean} disabled disabled prop
 * @param {boolean} noArrow dont show arrow
 * @param {boolean} submit submit type
 */

function Button({
  size,
  children,
  padding,
  handleClick,
  handleKeyDown,
  arrowDown,
  disabled,
  noArrow,
  submit,
}: ButtonProps): JSX.Element {
  return (
    <div className={`hero-button-wrap ${padding || "p-8 pt-0"}`}>
      <div className="bg-lime hero-clip-button hero-button-shadow relative">
        <button
          className={classnames(
            "w-full flex flex-no-wrap justify-between items-center",
            {
              "h-48p": size === "lg",
              "h-40p": size === "md",
              "h-32p": size === "sm",
            }
          )}
          type={submit ? "submit" : "button"}
          onClick={handleClick}
          onKeyDown={handleKeyDown}
          disabled={disabled}
        >
          <div
            className={classnames("flex justify-center items-center w-full", {
              "pl-6": size === "lg",
              "pl-5": size === "md",
              "pl-4": size === "sm",
              "px-6": size === "lg" && noArrow,
              "px-5": size === "md" && noArrow,
              "px-4": size === "sm" && noArrow,
            })}
          >
            {children}
          </div>
          {!noArrow && (
            <div
              className={classnames(
                `flex justify-center items-center ${
                  arrowDown ? "transform rotate-90" : ""
                }`,
                {
                  "px-6": size === "lg",
                  "px-5": size === "md",
                  "px-4": size === "sm",
                }
              )}
            >
              <img
                src="https://res.cloudinary.com/seva32/image/upload/v1605538132/arrowVector_cjpryt.svg"
                alt="button icon"
              />
            </div>
          )}
        </button>
      </div>
    </div>
  );
}

export default Button;
