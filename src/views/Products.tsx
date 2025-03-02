/* eslint-disable no-nested-ternary */
import React from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { Link } from "react-router-dom";
import classnames from "classnames";
import { Card } from "lime";
import { useParams, useLocation } from "react-router-dom";

import { listProducts } from "../store/actions";
import useSticky from "../utils/hooks/useSticky";
import useMediaQuery from "../utils/hooks/useMediaQuery";
import randomKey from "../utils/misc/randomKey";
import { PRODUCT_SEARCH_KEY_RESET } from "../store/actions/shop/shopActionTypes/productActionTypes";

import {
  Head,
  Dropdown,
  BottomMenu,
  Navbar,
  Policies,
  Side,
  bg as Back,
} from "../common";
import Loading from "../common/LoaderLoading";

function Products() {
  const { id } = useParams();
  const [category, setCategory] = React.useState(id);
  const location = useLocation();

  const { isPortrait } = useMediaQuery();
  const [showSearchModal, setShowSearch] = React.useState(false);
  const { element, isSticky } = useSticky();

  const dispatch = useAppDispatch();

  const auth = useAppSelector((state) => state.auth);
  const { authenticated } = auth;
  const productList: { products: any; loading: boolean; error: string } =
    useAppSelector((state) => state.productList);
  const products = productList.products;
  const loading = productList.loading;
  const error = productList.error;

  const productSearchKey = useAppSelector((state) => state.productSearchKey);
  const searchKeyword = productSearchKey.key;

  React.useEffect(() => {
    const value = id !== "all" ? id : "";
    setCategory(value);
  }, [id]);

  React.useEffect(() => {
    const hash = location.hash; // eslint-disable-line
    if (hash && document.getElementById(hash.substr(1))) {
      document
        .getElementById(hash.substr(1))?.scrollIntoView({ behavior: "smooth" });
    }
  }, [location.hash]);

  React.useEffect(() => {
    dispatch(listProducts(category, searchKeyword, ""));
  }, [category, searchKeyword, dispatch]);

  const sortHandler = (value: string) => {
    dispatch(listProducts(category, searchKeyword, value));
  };

  const selectContent = [
    { title: "Newest", url: "#products" },
    { title: "Lowest", url: "#products" },
    { title: "Highest", url: "#products" },
  ];

  const openModal = () => {
    setShowSearch(true);
  };

  const clearModal = () => {
    setShowSearch(false);
  };

  return (
    <div className="w-full h-full relative mb-24r z-0" id="top">
      <Head title="Lime Basket | Products" />
      <Back />
      <div className="relative w-full">
        <div className="absolute bg-white w-full h-screen transform scalex111 sm:scale-x-125">
          <div
            className={classnames("max-w-full h-full bg-cover bg-center", {
              "bg-product-portrait": id === "dogs",
              "sm:bg-product-landscape": id === "dogs",
              "bg-all-portrait":
                id === "all" || id === "health",
              "sm:bg-all-landscape":
                id === "all" || id === "health",
              "bg-cats-portrait": id === "cats",
              "sm:bg-cats-landscape": id === "cats",
            })}
          />
        </div>
      </div>
      <div className="hidden sm:flex absolute h-full w-5% -left-2.5% sm:w-10% sm:-left-10% top-0 z-0">
        <div
          className={`hidden sm:flex flex-col justify-center items-center h-screen w-full sticky top-1p transition-all duration-300 ${
            isSticky ? "ml-0" : "-ml-170"
          }`}
        >
          <Side openModal={openModal} />
        </div>
      </div>

      {/* hero */}
      <div className="w-full h-screen sm:min-h-600p flex flex-col flex-no-wrap justify-between items-center relative z-10">
        {/* policies - hero text - CTA */}
        <div className="sm:min-h-600p flex-grow flex flex-col flex-no-wrap items-center relative w-full">
          <div className="flex-none relative w-full">
            <Policies textColor="white" />
          </div>
          <hr className="text-white w-full sm:w-125per z-10 pb-1" />
          <div className="flex-none relative w-full z-10">
            <Navbar
              logged={!!authenticated}
              showSearchModal={showSearchModal}
              clearModal={clearModal}
            />
            {!isPortrait && <BottomMenu color="white" />}
          </div>
          <div className="flex-none relative w-full">
            <ul className="w-full">
              <li className="w-full text-center block">
                <h1 className="pt-12 sm:pt-0 text-white">
                  {id !== "all"
                    ? id
                    : "all our products"}
                </h1>
              </li>
              <li className="w-full text-center block">
                <h3 className="pt-2 sm:pt-0 text-white">
                  Make your furry friend happy
                </h3>
              </li>
            </ul>
          </div>
          <div className="flex-grow flex flex-col justify-end relative">
            <ul>
              <li className="relative w-24 h-16 mx-auto flex">
                <Link to="#list">
                  <button type="button">
                    <div className="aspect-ratio-16/9 relative w-full h-full" />
                    <img
                      src="https://res.cloudinary.com/seva32/image/upload/v1605537057/ArrowDown_f7oq3l.svg"
                      className="absolute left-0 top-0 w-full h-full object-cover animate-bounce"
                      alt="go to next screen"
                    />
                  </button>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* products list */}

      {loading ? (
        <div className="w-full h-200p flex justify-center items-center">
          <div className="w-200p">
            <Loading />
          </div>
        </div>
      ) : error ? (
        <div className="w-full mb-12 h-53r sm:h-29r lg:h-36r xl:h-43r relative flex justify-center sm:mx-6 md:mx-8 lg:mx-12">
          <div className="font-body text-space">
            An error ocurred while loading the results, please try again.
          </div>
        </div>
      ) : (
        <div className="relative h-auto w-full z-0" id="catalog">
          <div className="w-full h-80p flex flex-no-wrap justify-between items-center">
            <div className="w-1/3" />
            <div className="w-1/3">
              <h3 className="text-center" ref={element}>
                {`Category: ${
                  id !== "all" ? id : "All products"
                }`}
              </h3>
              <h3 className="text-center">
                {`Filter: ${searchKeyword || "no filter applied"}`}
                {searchKeyword && (
                  <button
                    type="button"
                    className="text-red pl-4"
                    onClick={() => dispatch({ type: PRODUCT_SEARCH_KEY_RESET })}
                  >
                    (X)
                  </button>
                )}
              </h3>
            </div>
            <div className="w-1/3">
              <Dropdown
                title="sort"
                content={selectContent}
                itemsLocation="right-0"
                sortHandler={sortHandler}
                optionInTitle
              />
            </div>
          </div>

          {/* catalog card list */}
          <div
            className="w-full h-auto flex flex-wrap justify-around items-center pt-12 mb-100p"
            id="list"
          >
            {products &&
              products.map((p: any) => (
                <Card
                  imgSrc={p.image}
                  brandLogo="https://res.cloudinary.com/seva32/image/upload/v1604425921/logo_rblope.svg"
                  linkTo={`/product/${p._id}`}
                  productId={p._id}
                  name={p.name}
                  buttonContent="Add to Cart"
                  description={p.description}
                  buttonLinkTo={`/cart/${p._id}?qty=1`}
                  width="tw-w-is-10 sm:tw-w-is-5 md:tw-w-is-3"
                  key={randomKey()}
                  classname="m-4"
                />
              ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Products;

/* <Dropdown
  title="Sort by"
  itemsLocation="items-end"
  content={selectContent}
  sortHandler={sortHandler}
/>; */
