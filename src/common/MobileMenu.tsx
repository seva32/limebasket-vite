/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from "react";

import { Link } from "react-router-dom";

interface MobileMenuProps {
  dark: boolean;
}

function MobileMenu({ dark }: MobileMenuProps): JSX.Element {
  const buttonRef = React.useRef<HTMLButtonElement>(null);
  const [showSidebar, setShowSidebar] = React.useState(false);
  // animate hamburger from backdrop / links
  const [restoreHamburger, setRestoreHamburger] = React.useState(false);

  React.useEffect(() => {
    const btnRef = buttonRef.current;

    // hamb animation
    const toggleHamburger = () => {
      btnRef?.classList.toggle("hamburger-opened");
      btnRef?.setAttribute(
        "aria-expanded",
        btnRef?.classList?.contains("hamburger-opened") ? "menu opened" : ""
      );

      if (btnRef?.classList.contains("hamburger-opened")) {
        setShowSidebar(true);
      }
      if (!btnRef?.classList.contains("hamburger-opened")) {
        setShowSidebar(false);
      }
    };

    if (btnRef) {
      btnRef.addEventListener("click", toggleHamburger);
    }

    if (restoreHamburger) {
      toggleHamburger();
      setRestoreHamburger(false);
    }

    return () => {
      if (btnRef) {
        btnRef?.removeEventListener("click", toggleHamburger);
      }
    };
  }, [restoreHamburger]);

  return (
    <div className="z-40 relative">
      <div className="relative z-20 h-full w-full">
        <button
          ref={buttonRef}
          className="hamburger-menu bg-transparent cursor-pointer flex p-0 rounded-lg"
          aria-label="Main Menu"
          type="button"
        >
          <svg width="48" height="48" viewBox="0 0 105 105">
            <path
              d="M23,3 h56 a20,20 0 0 1 20,20 v56 a20,20 0 0 1 -20,20 h-56 a20,20 0 0 1 -20,-20 v-56 a20,20 0 0 1 20,-20 z"
              strokeWidth="8"
              strokeLinejoin="round"
              stroke={`${dark ? "#1a1b41ff" : "white"}`}
              fill="none"
            />
            <path
              className="hamburger-line hamburger-line1"
              d="M 20,29.000046 H 80.000231 C 80.000231,29.000046 94.498839,28.817352 94.532987,66.711331 94.543142,77.980673 90.966081,81.670246 85.259173,81.668997 79.552261,81.667751 75.000211,74.999942 75.000211,74.999942 L 25.000021,25.000058"
              stroke={`${dark ? "#1a1b41ff" : "white"}`}
            />
            <path
              className="hamburger-line hamburger-line2"
              d="M 20,50 H 80"
              stroke={`${dark ? "#1a1b41ff" : "white"}`}
            />
            <path
              className="hamburger-line hamburger-line3"
              d="M 20,70.999954 H 80.000231 C 80.000231,70.999954 94.498839,71.182648 94.532987,33.288669 94.543142,22.019327 90.966081,18.329754 85.259173,18.331003 79.552261,18.332249 75.000211,25.000058 75.000211,25.000058 L 25.000021,74.999942"
              stroke={`${dark ? "#1a1b41ff" : "white"}`}
            />
          </svg>
        </button>
        {showSidebar && (
          <div className="absolute pt-40p text-white whitespace-no-wrap">
            <div className="pb-8">
              <Link to="/signin">
                <h2>join</h2>
              </Link>
            </div>
            <div className="pb-8">
              <Link to="/products/all">
                <button type="button" onClick={() => setRestoreHamburger(true)}>
                  <h2>all products</h2>
                </button>
              </Link>
            </div>
            <div className="pb-8">
              <Link to="/products/dogs">
                <button type="button" onClick={() => setRestoreHamburger(true)}>
                  <h2>dogs</h2>
                </button>
              </Link>
            </div>
            <div className="pb-8">
              <Link to="/products/cats">
                <button type="button" onClick={() => setRestoreHamburger(true)}>
                  <h2>cats</h2>
                </button>
              </Link>
            </div>
            <div className="pb-8">
              <Link to="/products/health">
                <button type="button" onClick={() => setRestoreHamburger(true)}>
                  <h2>health</h2>
                </button>
              </Link>
            </div>
            <div className="pb-8">
              <Link to="/#promo" onClick={() => setRestoreHamburger(true)}>
                <button type="button" onClick={() => setRestoreHamburger(true)}>
                  <h2>deal of the day</h2>
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>
      {showSidebar && (
        <div>
          <div className="fixed inset-0 right-75p bg-space z-10" />
          <div
            // ref={buttonRef}
            className="fixed inset-0 bg-lime opacity-50 z-0"
            role="button"
            onClick={() => setRestoreHamburger(true)}
            tabIndex={0}
          />
        </div>
      )}
    </div>
  );
}

export default MobileMenu;
