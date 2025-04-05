import React from "react";

interface AlertProps {
  title: string;
  content: string;
  toggleAlert?: (value: boolean) => void;
  bell?: boolean;
  exclamation?: boolean;
  close?: boolean;
}

function Alert({
  title,
  content,
  toggleAlert,
  bell = false,
  exclamation = false,
  close = false,
}: AlertProps): React.ReactElement {
  const icon = bell ? "fa-bell" : exclamation ? "fa-exclamation" : "fa-comment"; // eslint-disable-line
  return (
    <div className="w-full text-white px-3 py-2 my-3 border-0 flex flex-no-wrap justify-center items-center rounded relative bg-red">
      <span className="inline-block mr-3 align-middle bg-united rounded">
        <i className={`font-body fas ${icon}`} />
      </span>
      <span className="flex flex-col align-middle">
        <b className="uppercase font-body-bold">
          <small>{title}</small>
        </b>
        <small className="font-small">{content}</small>
      </span>
      {close && (
        <button
          type="button"
          onClick={() => {
            toggleAlert?.(false);
          }}
          className="bg-transparent font-2rem leading-none right-0 top-0 mt-4 mr-6 outline-none focus:outline-none"
        >
          <span className="absolute top-0 right-0 mr-10p">×</span>
        </button>
      )}
    </div>
  );
}

export default Alert;
