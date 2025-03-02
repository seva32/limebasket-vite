import React from "react";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../store/hooks";

import { PRODUCT_SEARCH_KEY_RESET } from "../store/actions/shop/shopActionTypes/productActionTypes";

interface BottomMenuProps {
  color?: string;
}

function BottomMenu({ color }: BottomMenuProps): JSX.Element {
  const dispatch = useAppDispatch();

  return (
    <ul
      className={`text-${color} sm:h-40p xl:h-50p w-3/5 mx-auto flex flex-no-wrap justify-around items-center`}
    >
      <li className="mx-4">
        <Link to="/products/all">
          <button
            className="font-link-spaced px-2 whitespace-no-wrap"
            type="button"
            onClick={() => dispatch({ type: PRODUCT_SEARCH_KEY_RESET })}
          >
            All products
          </button>
        </Link>
      </li>
      <li className="mx-4">
        <Link to="/products/dogs">
          <button
            className="font-link-spaced px-2 whitespace-no-wrap"
            type="button"
            onClick={() => dispatch({ type: PRODUCT_SEARCH_KEY_RESET })}
          >
            Dogs
          </button>
        </Link>
      </li>
      <li className="mx-4">
        <Link to="/products/cats">
          <button
            className="font-link-spaced px-2 whitespace-no-wrap"
            type="button"
            onClick={() => dispatch({ type: PRODUCT_SEARCH_KEY_RESET })}
          >
            Cats
          </button>
        </Link>
      </li>
      <li className="mx-4">
        <Link to="/products/health">
          <button
            className="font-link-spaced px-2 whitespace-no-wrap"
            type="button"
            onClick={() => dispatch({ type: PRODUCT_SEARCH_KEY_RESET })}
          >
            Health
          </button>
        </Link>
      </li>
      <li className="mx-4">
        <Link to="/#promo">
          <button
            className="font-link-spaced px-2 whitespace-no-wrap"
            type="button"
          >
            Deal of the day
          </button>
        </Link>
      </li>
    </ul>
  );
}

export default BottomMenu;
