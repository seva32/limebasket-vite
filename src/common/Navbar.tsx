import React from "react";
import { Link } from "react-router-dom";
// import { useAppDispatch as useDispatch } from "../store/hooks";
import { useNavigate } from "react-router-dom";

import useScape from "../utils/hooks/useScape";
import useMediaQuery from "../utils/hooks/useMediaQuery";
// import { PRODUCT_SEARCH_KEY_RESET } from "../store/actions/shop/shopActionTypes/productActionTypes";

import MobileMenu from "./MobileMenu";
import Input from "./Input";

interface NavbarProps {
  logged: boolean;
  clearModal: () => void;
  dark?: boolean;
  showSearchModal?: boolean;
  noSearchNoBag?: boolean;
}

const Navbar = ({
  logged,
  clearModal,
  dark = false,
  showSearchModal = false,
  noSearchNoBag = false,
}: NavbarProps): React.ReactElement => {
  const [showMenu, setShowMenu] = React.useState(false);
  const [showModal, setShowModal] = React.useState(false);
  const [isAmdin, setIsAmdin] = React.useState(false);
  const [shouldNavigate, setShouldNavigate] = React.useState(false);

  // const dispatch = useDispatch();
  const navigate = useNavigate();

  useScape(() => {
    setShowModal(false);
    clearModal();
    // dispatch({ type: PRODUCT_SEARCH_KEY_RESET });
  });
  const { isPortrait } = useMediaQuery();

  React.useEffect(() => {
    if (isPortrait) {
      setShowMenu(true);
    } else {
      setShowMenu(false);
    }

    if (logged) {
      const user = JSON.parse(localStorage.getItem("user") || "") || {};
      if (user && user.roles) {
        const storeView = user.roles.includes("ROLE_ADMIN");
        if (storeView) {
          setIsAmdin(true);
        }
      }
    }

    if (shouldNavigate) {
      navigate("/products/all#catalog");
      setShouldNavigate(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPortrait, setShowMenu, logged, shouldNavigate]);

  return (
    <>
      {/* search modal */}
      {(showModal || showSearchModal) && (
        <>
          <div
            className="fixed inset-0 z-998 bg-lime opacity-50"
            onClick={() => {
              setShowModal(false);
              clearModal();
            }}
            role="button"
            tabIndex={0}
            aria-hidden="true"
          />
          <div className="fixed top-0 left-0 right-0 h-144p bg-space flex justify-between sm:justify-center items-center px-2.5r z-999">
            <div className="absolute-center top-25p">
              <p className="font-body font-2rem whitespace-no-wrap uppercase text-dirty">
                Search Lime Basket Products
              </p>
            </div>
            <img
              src="https://res.cloudinary.com/seva32/image/upload/v1605538134/searchWhite_brjwlo.svg"
              alt="search products"
              className="w-48p h-48p"
            />
            <Input
              w="w-full"
              closeModal={() => {
                setShowModal(false);
                clearModal();
              }}
              navigate={() => setShouldNavigate(true)}
            />
          </div>
        </>
      )}

      <nav className="flex items-center justify-between relative w-full h-80p mt-4">
        {/* nav items */}
        <ul className="w-full flex h-full z-20 relative">
          {/* left items */}
          <li className="w-1/3 flex flex-no-wrap justify-start items-center">
            <div className="w-1/3 relative">
              {showMenu && <MobileMenu dark={dark} />}
              {!showMenu && logged && (
                <div className="w-auto min-w-48p flex justify-start" title="Account">
                  <Link to="/profile">
                    <img
                      src={
                        dark
                          ? "https://res.cloudinary.com/seva32/image/upload/v1605538134/userDark_bufw9v.svg"
                          : "https://res.cloudinary.com/seva32/image/upload/v1605538134/userWhite_cdsffg.svg"
                      }
                      alt="account"
                      className="w-48p h-48p"
                    />
                  </Link>
                </div>
              )}
              {!showMenu &&
                !logged &&
                window.location.pathname !== "/signin" && (
                  <div className="w-auto min-w-48p flex justify-start" title="Sign in">
                    <Link to="/signin">
                      <img
                        src={
                          dark
                            ? "https://res.cloudinary.com/seva32/image/upload/v1605538134/signinDark_gyhken.svg"
                            : "https://res.cloudinary.com/seva32/image/upload/v1605538134/singinWhite_pjysrb.svg"
                        }
                        alt="signin"
                        className="w-48p h-48p"
                      />
                    </Link>
                  </div>
                )}
            </div>

            {logged && isAmdin && (
              <div
                className={`${showMenu ? "w-full flex justify-end" : "w-1/3"}`}
                title="Admin system"
              >
                <Link to="/store">
                  <img
                    src={
                      dark
                        ? "https://res.cloudinary.com/seva32/image/upload/v1605538132/gearDark_goaeu8.svg"
                        : "https://res.cloudinary.com/seva32/image/upload/v1605538132/gearWhite_bih0l1.svg"
                    }
                    alt="admin system"
                    className="w-48p h-48p"
                  />
                </Link>
              </div>
            )}
          </li>

          {/* middle items */}
          <li className="w-1/3 mx-auto flex">
            <div className="relative w-full flex justify-center items-center" title="Lime Basket">
              <Link to="/">
                <img
                  src="https://res.cloudinary.com/seva32/image/upload/v1605180993/logoRaw_njbho2.svg"
                  alt="brand logo"
                  className="sm:w-270p sm:h-72p"
                />
              </Link>
            </div>
          </li>

          {/* right items */}
          {noSearchNoBag ? (
            <div className="w-1/3 flex" />
          ) : (
            <li className="w-1/3 flex flex-no-wrap justify-end items-center">
              <button type="button" onClick={() => setShowModal(!showModal)} title="Search">
                <img
                  src={
                    dark
                      ? "https://res.cloudinary.com/seva32/image/upload/v1605538134/searchDark_jj26rt.svg"
                      : "https://res.cloudinary.com/seva32/image/upload/v1605538134/searchWhite_brjwlo.svg"
                  }
                  alt="search products"
                  className="w-48p h-48p"
                />
              </button>
              <div className="w-1/3 flex justify-end ml-6" title="Cart">
                <Link to="/cart">
                  <img
                    src={
                      dark
                        ? "https://res.cloudinary.com/seva32/image/upload/v1605994562/bagDark_zrfspp.svg"
                        : "https://res.cloudinary.com/seva32/image/upload/v1605994562/bagWhite_fsphhg.svg"
                    }
                    alt="cart"
                    className="w-48p h-48p"
                  />
                </Link>
              </div>
            </li>
          )}
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
