/* eslint-disable react/button-has-type */
import classnames from "classnames";
import { ReactNode } from "react";

interface ButtonProps {
  submit?: boolean;
  children?: ReactNode;
  onClick?: () => void;
  noPadding?: boolean;
  shrink?: boolean;
  tableCell?: boolean;
  px?: string;
  py?: string;
  w?: string;
}

function Button({
  submit = false,
  children = null,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onClick = () => {},
  noPadding = false,
  shrink = false,
  px = "",
  py = "",
  w = "",
  tableCell = false,
}: ButtonProps): JSX.Element {
  return (
    <button
      type={submit ? "submit" : "button"}
      className={classnames(
        `border-solid flex justify-center border-2 md:border-4 border-space rounded md:rounded-lg ${
          noPadding ? "p-0" : "py-5p md:py-8p lg:py-10p px-20p"
        } ${px} ${py} ${w} cursor-pointer whitespace-no-wrap text-space bg-white font-button`,
        {
          "flex-shrink": shrink,
          "table-cell": tableCell,
        }
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

Button.defaultProps = {
  submit: false,
  noPadding: false,
  shrink: false,
  tableCell: false,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onClick: () => {},
  px: "",
  py: "",
  w: "",
};

export default Button;
