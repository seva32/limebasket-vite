import React, { FormEvent } from "react";

import useScape from "../utils/hooks/useScape";
import { useProducts } from "../contexts/productContext";

interface InputProps {
  w: string;
  closeModal?: () => void;
}

/**
 * input element
 * @param {string} w width, ex: w-full, w-12
 * @param {function} closeModal cb when needed a close action after submit
 */

function Input({ w, closeModal = () => {} }: InputProps): React.ReactElement {
  const { searchKeyword, setSearchKeyword } = useProducts();

  useScape(closeModal);

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    closeModal();
  };

  return (
    <form onSubmit={submitHandler} className="w-full">
      <input
        name="searchKeyword"
        type="text"
        placeholder="Search Products"
        className={`h-30p border-white rounded-md ${w} font-pretitle font-2rem outline-none focus:outline-none focus:shadow-custom text-space px-6`}
        onChange={(e) => setSearchKeyword(e.target.value)}
        value={searchKeyword}
      />
    </form>
  );
}

export default Input;
