/* eslint-disable react/jsx-curly-newline */
/* eslint-disable no-nested-ternary */
import React from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import useMediaQuery from "../utils/hooks/useMediaQuery";
import classnames from "classnames";
import isEmpty from "lodash.isempty";

import { Section, Button } from "lime";
import { Head, Policies, Navbar } from "../common";
import Photo from "./Profile.components/Photo";
import Orders from "./Profile.components/Orders";

function Profile() {
  const [mainTitle, setMainTitle] = React.useState("Dashboard");
  const [subTitle, setSubTitle] = React.useState("Profile");
  const [hideNav, setHideNav] = React.useState(false);
  const [hideContent, setHideContent] = React.useState(false);
  const isMobile = useMediaQuery();
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user") || "") || {};

  React.useEffect(() => {
    if (isEmpty(user) || user === undefined) {
      navigate("/signin");
    }

    if (isMobile) {
      setHideNav(false);
      setHideContent(true);
    } else {
      setHideNav(false);
      setHideContent(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMobile]);

  const handleClickNav = (title: string, sub: string) => {
    setMainTitle(title);
    setSubTitle(sub);
    if (isMobile) {
      setHideNav(true);
      setHideContent(false);
    }
  };

  const onClickCardButton = () => {
    setHideContent(true);
    setHideNav(false);
  };

  return (
    <>
      <Head title="Lime Basket | Profile" />

      <div className="relative mb-24r z-0">
        {/* header */}
        <div className="min-h-screen sm:min-h-600p flex flex-col flex-no-wrap items-center relative w-full z-0">
          <div className="flex-none relative w-full">
            <Policies textColor="space" />
          </div>
          <hr className="text-space w-full sm:w-125per z-10 pb-1" />
          <div className="flex-none relative w-full z-10 mb-10">
            <Navbar logged dark clearModal={() => undefined} />
          </div>

          <div className="relative w-full h-auto flex flex-col">
            {/* actions: calendar signout */}
            <div className="relative w-full h-auto flex justify-center items-stretch">
              <div className="actions h-40p">
                <ul className="h-full flex">
                  <li className="w-12 h-full flex justify-center items-center relative cursor-pointer px-4 text-space">
                    <NavLink to="/">
                      <svg width="20" height="20" viewBox="0 0 640 512">
                        <path
                          d="M112,192a24,24,0,0,0-24-24H24a24,24,0,0,0,0,48H88A24,24,0,0,0,112,192ZM51.66,64.78l55.42,32a24,24,0,1,0,24-41.56l-55.42-32a24,24,0,1,0-24,41.56ZM520.94,100a23.8,23.8,0,0,0,12-3.22l55.42-32a24,24,0,0,0-24-41.56l-55.42,32a24,24,0,0,0,12,44.78ZM320,512a64,64,0,0,0,64-64H256A64,64,0,0,0,320,512ZM616,168H552a24,24,0,0,0,0,48h64a24,24,0,0,0,0-48ZM479.92,208c0-77.69-54.48-139.91-127.94-155.16V32a32,32,0,1,0-64,0V52.84C214.56,68.09,160.08,130.31,160.08,208c0,102.31-36.14,133.53-55.47,154.28A31.28,31.28,0,0,0,96,384c.11,16.41,13,32,32.09,32H511.91c19.11,0,32-15.59,32.09-32a31.23,31.23,0,0,0-8.61-21.72C516.06,341.53,479.92,310.31,479.92,208Z"
                          fill="currentColor"
                        />
                      </svg>
                    </NavLink>
                  </li>
                  <li className="w-12 h-full flex justify-center items-center relative cursor-pointer px-4 text-space">
                    <NavLink to="/">
                      <svg width="16" height="16" viewBox="0 0 448 512">
                        <path
                          d="M0 464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V192H0v272zm320-196c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40zm0 128c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40zM192 268c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40zm0 128c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40zM64 268c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12H76c-6.6 0-12-5.4-12-12v-40zm0 128c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12H76c-6.6 0-12-5.4-12-12v-40zM400 64h-48V16c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v48H160V16c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v48H48C21.5 64 0 85.5 0 112v48h448v-48c0-26.5-21.5-48-48-48z"
                          fill="currentColor"
                        />
                      </svg>
                    </NavLink>
                  </li>
                  <li className="w-12 h-full flex justify-center items-center relative cursor-pointer px-4 text-space">
                    <NavLink to="/signout">
                      <svg width="18" height="18" viewBox="0 0 512 512">
                        <path
                          d="M497 273L329 441c-15 15-41 4.5-41-17v-96H152c-13.3 0-24-10.7-24-24v-96c0-13.3 10.7-24 24-24h136V88c0-21.4 25.9-32 41-17l168 168c9.3 9.4 9.3 24.6 0 34zM192 436v-40c0-6.6-5.4-12-12-12H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h84c6.6 0 12-5.4 12-12V76c0-6.6-5.4-12-12-12H96c-53 0-96 43-96 96v192c0 53 43 96 96 96h84c6.6 0 12-5.4 12-12z"
                          fill="currentColor"
                        />
                      </svg>
                    </NavLink>
                  </li>
                </ul>
              </div>
            </div>
            {/* actions: calendar signout end */}

            {/* main content */}
            <div className="w-full h-auto md:flex md:flex-row md:flex-no-wrap my-10">
              {/* side nav */}
              <aside
                className={classnames(
                  "w-4/5 md:w-1/5 mx-auto mb-4 md:mb-8 bg-aero rounded-lg p-4 md:min-w-140p",
                  {
                    hidden: hideNav,
                  }
                )}
              >
                <nav className="w-full">
                  <ul className="w-full">
                    <li className="relative block">
                      <button
                        type="button"
                        className="flex items-center my-0 mx-2 p-3 relative rounded font-subtitle text-space"
                        onClick={() => handleClickNav("Dashboard", "Profile")}
                      >
                        <div className="w-1/4">
                          <img
                            src="https://res.cloudinary.com/seva32/image/upload/v1605538134/userDark_bufw9v.svg"
                            alt="user account"
                          />
                        </div>
                        <span className="pl-3 w-3/4">Dashboard</span>
                      </button>
                      <ul className="relative">
                        <li className="block text-center md:text-left">
                          <button
                            type="button"
                            className="relative md:left-30p font-body"
                            onClick={() =>
                              handleClickNav("Dashboard", "Profile")
                            }
                          >
                            Profile
                          </button>
                        </li>
                        <li className="block text-center md:text-left">
                          <button
                            type="button"
                            className="relative md:left-30p font-body"
                            onClick={() => handleClickNav("Dashboard", "Photo")}
                          >
                            Photo
                          </button>
                        </li>
                        <li className="block text-center md:text-left">
                          <button
                            type="button"
                            className="relative md:left-30p font-body"
                            onClick={() =>
                              handleClickNav("Dashboard", "Account")
                            }
                          >
                            Account
                          </button>
                        </li>
                      </ul>
                    </li>
                    <li className="relative block">
                      <button
                        type="button"
                        className="flex items-center my-0 mx-2 p-3 relative rounded font-subtitle text-space"
                        onClick={() => handleClickNav("Orders", "Orders")}
                      >
                        <div className="w-1/3">
                          <img
                            src="https://res.cloudinary.com/seva32/image/upload/v1606484129/orderDark_qmzxur.svg"
                            alt="orders panel"
                          />
                        </div>
                        <span className="text-left pl-5">Orders</span>
                      </button>
                      <ul className="relative">
                        <li className="block text-center md:text-left">
                          <button
                            type="button"
                            className="relative md:left-30p font-body"
                            onClick={() => handleClickNav("Orders", "Orders")}
                          >
                            Orders
                          </button>
                        </li>
                        <li className="block text-center md:text-left">
                          <button
                            type="button"
                            className="relative md:left-30p font-body"
                            onClick={() => handleClickNav("Orders", "Incomes")}
                          >
                            Incomes
                          </button>
                        </li>
                        <li className="block text-center md:text-left">
                          <button
                            type="button"
                            className="relative md:left-30p font-body"
                            onClick={() => handleClickNav("Orders", "Xpenses")}
                          >
                            Xpenses
                          </button>
                        </li>
                        <li className="block text-center md:text-left">
                          <button
                            type="button"
                            className="relative md:left-30p font-body"
                            onClick={() => handleClickNav("Orders", "Incomes")}
                          >
                            Spending
                          </button>
                        </li>
                      </ul>
                    </li>
                    <li className="relative block">
                      <button
                        type="button"
                        className="flex items-center my-0 mx-2 p-3 relative rounded font-subtitle text-space"
                        onClick={() => handleClickNav("Orders", "Orders")}
                      >
                        <div className="w-1/4">
                          <img
                            src="https://res.cloudinary.com/seva32/image/upload/v1606484520/shippingDark_x6cyoj.svg"
                            alt="shipping panel"
                          />
                        </div>
                        <span className="pl-3 w-3/4">Shippings</span>
                      </button>
                      <ul className="relative">
                        <li className="block text-center md:text-left">
                          <button
                            type="button"
                            className="relative md:left-30p font-body"
                          >
                            Delivered
                          </button>
                        </li>
                        <li className="block text-center md:text-left">
                          <button
                            type="button"
                            className="relative md:left-30p font-body"
                          >
                            Pending
                          </button>
                        </li>
                        <li className="block text-center md:text-left">
                          <button
                            type="button"
                            className="relative md:left-30p font-body"
                          >
                            Cancelled
                          </button>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </nav>
              </aside>
              {/* side nav end  */}

              {/* main content */}
              <div
                className={classnames(
                  "md:relative md:flex md:flex-col md:flex-no-wrap md:w-4/5",
                  {
                    hidden: hideContent,
                  }
                )}
              >
                <Section
                  width="tw-max-w-full"
                  bgColor="tw-bg-transparent"
                  height="tw-h-full"
                  mainTitle={mainTitle}
                  subTitle={subTitle}
                  arrow={isMobile}
                  onClickCardButton={onClickCardButton}
                >
                  {subTitle === "Profile" && (
                    <div>
                      <span className="pl-4 md:pl-8 font-body mb-5 inline-block">
                        <b>Your nickname:</b>
                        {` ${(user && user.nickname) || "User"}`}
                      </span>
                      <br />
                      <span className="pl-4 md:pl-8 font-body">
                        <b>Registered email address:</b>
                        {` ${(user && user.email) || ""}`}
                      </span>
                    </div>
                  )}
                  {subTitle === "Photo" && (
                    <Photo avatar={(user && user.image) || ""} />
                  )}
                  {subTitle === "Account" && (
                    <div>
                      <span className="pl-4 md:pl-8 font-body">
                        <b>Your email address is:</b>
                        {` ${(user && user.email) || ""}`}
                      </span>
                      <br />
                      <div className="w-full flex justify-center mt-8 md:mt-12">
                        <Button size="sm">
                          <NavLink to="/reset-password">
                            Change password
                          </NavLink>
                        </Button>
                      </div>
                    </div>
                  )}
                  {subTitle === "Orders" && <Orders />}
                </Section>
              </div>
              {/* main content */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
