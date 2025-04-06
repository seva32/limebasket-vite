import React from "react";
import { NavLink } from "react-router-dom";
import classnames from "classnames";
import { useDispatch } from "react-redux";

import { Section, Button } from "lime";
import { Head, Policies, Navbar } from "../common";
import Photo from "./Profile.components/Photo";
import Orders from "./Profile.components/Orders";
import { getUserData } from "../store/actions";
import { useAppSelector } from "../store/hooks";

function Profile() {
  const [mainTitle, setMainTitle] = React.useState("Dashboard");
  const [subTitle, setSubTitle] = React.useState("Profile");
  const [hideNav, setHideNav] = React.useState(false);
  const dispatch = useDispatch();
  const users = useAppSelector((state) => state.users);

  const user = JSON.parse(localStorage.getItem("user") || "") || {};

  React.useEffect(() => {
    dispatch(getUserData());
  }, []);

  const handleClickNav = (title: string, sub: string) => {
    setMainTitle(title);
    setSubTitle(sub);
  };

  const onClickCardButton = () => {
    setHideNav(false);
  };

  return (
    <>
      <Head title="Lime Basket | Profile" />

      <div className="relative mb-24r z-0">
        {/* header */}
        <div className="min-h-screen sm:min-h-600p flex flex-col flex-no-wrap items-center relative w-full z-0">
          <div className="flex-none relative w-full h-full">
            <Policies textColor="space" />
          </div>
          <hr className="text-space w-full sm:w-125per z-10 pb-1" />
          <div className="flex-none relative w-full z-10 mb-10">
            <Navbar logged dark clearModal={() => undefined} />
          </div>

          <div className="relative w-full h-auto flex flex-col h-full">
            {/* main content */}
            <div className="w-full h-auto md:flex md:flex-row md:flex-no-wrap my-10">
              {/* side nav */}
              <aside
                className={classnames(
                  "w-4/5 md:w-1/5 mx-auto mb-4 md:mb-8 bg-aero rounded-lg px-8 py-10 md:min-w-140p",
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
                        className="flex items-center justify-start py-4 relative rounded font-subtitle text-space"
                        onClick={() => handleClickNav("Dashboard", "Profile")}
                      >
                        <div className="max-w-30p">
                          <img
                            src="https://res.cloudinary.com/seva32/image/upload/v1605538134/userDark_bufw9v.svg"
                            alt="user account"
                          />
                        </div>
                        <span className="pl-12">User</span>
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
                        className="flex items-center justify-between py-5 relative rounded font-subtitle text-space"
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
                        className="flex items-center justify-between py-5 relative rounded font-subtitle text-space"
                        onClick={() => handleClickNav("Orders", "Orders")}
                      >
                        <div className="w-1/4">
                          <img
                            src="https://res.cloudinary.com/seva32/image/upload/v1606484520/shippingDark_x6cyoj.svg"
                            alt="shipping panel"
                          />
                        </div>
                        <span className="pl-7 w-3/4">Shippings</span>
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
                    <li className="relative flex items-center pt-6 justify-between">
                      <NavLink to="/signout">
                        <svg width="28" height="28" viewBox="0 0 512 512">
                          <path
                            d="M497 273L329 441c-15 15-41 4.5-41-17v-96H152c-13.3 0-24-10.7-24-24v-96c0-13.3 10.7-24 24-24h136V88c0-21.4 25.9-32 41-17l168 168c9.3 9.4 9.3 24.6 0 34zM192 436v-40c0-6.6-5.4-12-12-12H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h84c6.6 0 12-5.4 12-12V76c0-6.6-5.4-12-12-12H96c-53 0-96 43-96 96v192c0 53 43 96 96 96h84c6.6 0 12-5.4 12-12z"
                            fill="#1a1b41ff"
                          />
                        </svg>
                      </NavLink>
                      <NavLink to="/signout">
                        <span className="font-subtitle text-space">
                          Sign out
                        </span>
                      </NavLink>
                    </li>
                  </ul>
                </nav>
              </aside>
              {/* side nav end  */}

              {/* main content */}
              <div className="md:relative md:flex md:flex-col md:flex-no-wrap md:w-4/5">
                <Section
                  width="tw-max-w-full"
                  bgColor="tw-bg-transparent"
                  height="tw-h-full"
                  mainTitle={mainTitle}
                  subTitle={subTitle}
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
                    <Photo
                      avatar={users.userData?.image || ""}
                    />
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
