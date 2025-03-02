/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
/* eslint-disable indent */
/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/tabindex-no-positive */
/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
import React from "react";

import Button from "./Button";

interface DropdownProps {
  title?: string;
  content?: any;
  itemsLocation?: string;
  sortHandler?: any;
  optionInTitle?: boolean;
}

/**
 * dropdown menu
 * @param  {string} title title for button
 * @param  {array} content text for items in dropdown, ex: [
    { title: 'Newest', url: '#products' },
  ]
 * @param  {string} itemsLocation position items, ex: left-0
 * @param  {function} sortHandler cb
 * @param  {boolean} optionInTitle show selected item as the new btn title
 */
function Dropdown({
  title,
  content,
  itemsLocation,
  sortHandler,
  optionInTitle,
}: DropdownProps): JSX.Element {
  const [open, setOpen] = React.useState(false);
  const [mask, setMask] = React.useState(false);
  // btn displays title or the selected value from the dropdown
  const [optionTitle, setOptionTitle] = React.useState("");

  const ESCAPE_KEY = 27;

  const handleKeyDownDropdown = (event: any) => {
    switch (event.keyCode) {
      case ESCAPE_KEY:
        setOpen(false);
        break;
      default:
        break;
    }
  };

  React.useEffect(() => {
    if (open) {
      setMask(true);
      document.addEventListener("keydown", handleKeyDownDropdown);
    } else {
      setMask(false);
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDownDropdown);
    };
  }, [open]);

  const elementHandler = (value: any) => {
    if (optionInTitle) {
      setOptionTitle(value);
    }
    sortHandler(value.toLowerCase());
    setOpen(false);
  };

  const handleKeyDown = (event: any) => {
    if (event.keyCode === 40) {
      if (open) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        document.querySelector(".autofocusstart")?.focus();
      } else {
        setOpen(true);
      }
    }
    if (event.keyCode === 38) setOpen(false);
  };

  return (
    <div className="">
      {mask && (
        <div
          id="mask"
          className="fixed top-0 left-0 right-0 bg-transparent h-screen z-10"
          onClick={() => {
            setMask(false);
            setOpen(false);
          }}
          aria-hidden
        />
      )}
      <label
        htmlFor="test"
        className="dropdown flex flex-col flex-no-wrap relative"
      >
        <Button
          size="md"
          padding="pl-20%"
          handleClick={() => {
            setOpen(!open);
          }}
          handleKeyDown={handleKeyDown}
          arrowDown
        >
          <div className="font-button whitespace-no-wrap h-full w-full">
            {optionInTitle && optionTitle ? optionTitle : title}
          </div>
        </Button>

        {/* <input type="checkbox" className="dd-input hidden" id="test" /> */}
        {mask && (
          <>
            <span
              tabIndex={1}
              className="spanfocus"
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              onFocus={() => document.querySelector(".autofocusend")?.focus()}
            />
            <ul
              className={`dd-menu block absolute top-100% rounded-lg z-20 ${itemsLocation} mt-2 overflow-hidden`}
            >
              {content &&
                content.map((elem: any, i: number) => {
                  const tabIndex = i + 2;
                  const focus =
                    i === 0 ? "autofocusstart" : i === 2 ? "autofocusend" : "";
                  return (
                    <li
                      key={elem.title}
                      onClick={() => elementHandler(elem.title)}
                      aria-hidden
                      className="h-40p cursor-pointer whitespace-no-wrap shadow-inner w-full relative z-0"
                    >
                      <div className="absolute inset-0 bg-lime-70 rounded-lg z-10" />
                      <button
                        type="button"
                        tabIndex={tabIndex}
                        className={`z-20 relative w-full h-full px-10 sm:px-16 md:px-20 lg:px-32 ${focus} rounded-lg hover:bg-lime`}
                      >
                        <div className="font-button">{elem.title}</div>
                      </button>
                    </li>
                  );
                })}
            </ul>
            <span
              tabIndex={5}
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              onFocus={() => document.querySelector(".autofocusstart")?.focus()}
            />
          </>
        )}
      </label>
    </div>
  );
}

export default Dropdown;
