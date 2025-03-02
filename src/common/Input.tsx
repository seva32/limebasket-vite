/* eslint-disable @typescript-eslint/no-empty-function */
import React, { FormEvent } from "react";

// import { useAppDispatch as useDispatch} from "../store/hooks";
// import { setSearchProductKey } from '../store/actions';
import useScape from "../utils/hooks/useScape";

interface InputProps {
  w: string;
  closeModal?: () => void;
  navigate?: () => void;
  blockAction?: boolean;
}

/**
 * input element
 * @param {string} w width, ex: w-full, w-12
 * @param {function} closeModal cb when needed a close action after submit
 * @param {function} onSearchKey provided by redux
 * @param {function} navigate cb to navigate page
 * @param {boolean} blockAction prevent change in redux (excludes onSearchKey under submition)
 * true = no redux action fires
 */

function Input({
  w,
  closeModal = () => {},
  navigate,
  blockAction = false,
}: InputProps): JSX.Element {
  const [searchKeyword, setSearchKeyword] = React.useState("");
  // const dispatch = useDispatch();

  useScape(closeModal);

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // if (!blockAction) {
    //   dispatch(setSearchProductKey(searchKeyword))
    // }
    setSearchKeyword("");
    closeModal();
    navigate?.();
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
