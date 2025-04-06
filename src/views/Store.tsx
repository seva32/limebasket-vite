import { useState } from "react";
import classnames from "classnames";

import { Section } from "lime";
import { Head, Policies, Navbar } from "../common";
import Products from "./Store.products";
import NewProduct from "./Store.newProduct";
import Orders from "./Store.orders";

function Store() {
  const [hideNav, setHideNav] = useState(false);
  const [mainTitle, setMainTitle] = useState("Products");
  const [subTitle, setSubTitle] = useState("Products");

  const handleClickNav = (title: string, sub: string) => {
    setMainTitle(title);
    setSubTitle(sub);
  };

  const onClickCardButton = () => {
    setHideNav(false);
  };

  return (
    <>
      <Head title="Lime Basket | Store" />

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

          <div className="relative w-full h-auto flex flex-col" />
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
                      onClick={() => handleClickNav("Products", "Products")}
                    >
                      <div className="w-1/4" style={{maxWidth: "40px"}}>
                        <svg
                          width="70%"
                          height="70%"
                          viewBox="0 0 95.9 122.88"
                          version="1.1"
                        >
                          <g
                            fill="#1a1b41ff"
                            stroke="#1a1b41ff"
                            strokeWidth="2"
                          >
                            <path d="M37.06,5v5a2.52,2.52,0,0,1-2.28,2.5,2.86,2.86,0,0,1-.89.14H24.6V23H71.29V12.68H62a2.81,2.81,0,0,1-.89-.14A2.52,2.52,0,0,1,58.84,10V5ZM18.4,49.25a2.25,2.25,0,1,1,3.74-2.51l1.23,1.82,4.87-5.92a2.25,2.25,0,0,1,3.48,2.86L25,53.7a2,2,0,0,1-.54.5,2.24,2.24,0,0,1-3.12-.61L18.4,49.25Zm0,23.28A2.25,2.25,0,1,1,22.14,70l1.23,1.82,4.87-5.93a2.25,2.25,0,0,1,3.48,2.86L25,77a1.88,1.88,0,0,1-.54.51,2.24,2.24,0,0,1-3.12-.62L18.4,72.53Zm0,24.2a2.25,2.25,0,1,1,3.74-2.51l1.23,1.83,4.87-5.93A2.25,2.25,0,0,1,31.72,93L25,101.18a2,2,0,0,1-.54.5,2.24,2.24,0,0,1-3.12-.61L18.4,96.73Zm5-68.57a3.85,3.85,0,0,1-2.68-1.11c-.09-.09-.14-.18-.23-.27a3.94,3.94,0,0,1-.89-2.41V19.28h-14a.49.49,0,0,0-.4.18.67.67,0,0,0-.18.4v97.4a.42.42,0,0,0,.18.4.56.56,0,0,0,.4.18H90.32a.56.56,0,0,0,.4-.18.44.44,0,0,0,.18-.4V19.86a.67.67,0,0,0-.18-.4.5.5,0,0,0-.4-.18h-14v5.09a3.89,3.89,0,0,1-.9,2.41c-.08.09-.13.18-.22.27a3.85,3.85,0,0,1-2.68,1.11ZM5.62,122.88A5.63,5.63,0,0,1,0,117.26V19.86a5.63,5.63,0,0,1,5.62-5.62h14V11.47A3.79,3.79,0,0,1,23.4,7.68h8.66V4.2a4.14,4.14,0,0,1,1.25-2.95A4.13,4.13,0,0,1,36.25,0h23.4a4.15,4.15,0,0,1,2.94,1.25,4.14,4.14,0,0,1,1.25,3V7.68H72.5a3.79,3.79,0,0,1,3.79,3.79v2.77h14a5.63,5.63,0,0,1,5.63,5.62v97.4a5.63,5.63,0,0,1-5.63,5.62ZM76.37,99.6a2.55,2.55,0,0,0,0-5.09H42.56a2.55,2.55,0,0,0,0,5.09H76.37Zm0-48.8a2.55,2.55,0,0,0,0-5.09H42.56a2.55,2.55,0,0,0,0,5.09Zm0,24.07a2.55,2.55,0,0,0,0-5.09H42.56a2.55,2.55,0,0,0,0,5.09Z" />
                          </g>
                        </svg>
                      </div>
                      <span className="pl-3 w-3/4">Products</span>
                    </button>
                    <ul className="relative">
                      <li className="block text-center md:text-left">
                        <button
                          type="button"
                          className="focus:shadow-custom relative md:left-30p text-indigo-400 text-xs md:text-base hover:text-indigo-900"
                          onClick={() => handleClickNav("Products", "Products")}
                        >
                          Products
                        </button>
                      </li>
                      <li className="block text-center md:text-left">
                        <button
                          type="button"
                          className="focus:shadow-custom relative md:left-30p text-indigo-400 text-xs md:text-base hover:text-indigo-900"
                          onClick={() =>
                            handleClickNav("Products", "New Product")
                          }
                        >
                          New Product
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
                      <div className="w-1/4" style={{maxWidth: "40px"}}>
                        <svg
                          height="80%"
                          version="1.1"
                          viewBox="0 0 60 60"
                          width="80%"
                        >
                          <g
                            fill="none"
                            fillRule="evenodd"
                            stroke="#1a1b41ff"
                            strokeWidth="2"
                          >
                            <g fill="#000000" id="store_products-icon">
                              <path
                                d="M26.2051,26.2929 C25.8141,26.6839 25.8141,27.3159 26.2051,27.7069 L32.2051,33.7069 C32.4001,33.9019 32.6561,33.9999 32.9121,33.9999 C33.1681,33.9999 33.4241,33.9019 33.6191,33.7069 C34.0101,33.3159 34.0101,32.6839 33.6191,32.2929 L27.6191,26.2929 C27.2281,25.9019 26.5961,25.9019 26.2051,26.2929 L26.2051,26.2929 Z M23.6191,30.2929 C23.2281,29.9019 22.5961,29.9019 22.2051,30.2929 C21.8141,30.6839 21.8141,31.3159 22.2051,31.7069 L28.2051,37.7069 C28.4001,37.9019 28.6561,37.9999 28.9121,37.9999 C29.1681,37.9999 29.4241,37.9019 29.6191,37.7069 C30.0101,37.3159 30.0101,36.6839 29.6191,36.2929 L23.6191,30.2929 Z M19.6191,34.2929 C19.2281,33.9019 18.5961,33.9019 18.2051,34.2929 C17.8141,34.6839 17.8141,35.3159 18.2051,35.7069 L24.2051,41.7069 C24.4001,41.9019 24.6561,41.9999 24.9121,41.9999 C25.1681,41.9999 25.4241,41.9019 25.6191,41.7069 C26.0101,41.3159 26.0101,40.6839 25.6191,40.2929 L19.6191,34.2929 Z M38.4981,31.9999 L27.9121,21.4139 L13.3261,35.9999 L23.9121,46.5859 L38.4981,31.9999 Z M28.6191,19.2929 L40.6191,31.2929 C41.0101,31.6839 41.0101,32.3159 40.6191,32.7069 L24.6191,48.7069 C24.4241,48.9019 24.1681,48.9999 23.9121,48.9999 C23.6561,48.9999 23.4001,48.9019 23.2051,48.7069 L11.2051,36.7069 C10.8141,36.3159 10.8141,35.6839 11.2051,35.2929 L27.2051,19.2929 C27.5961,18.9019 28.2281,18.9019 28.6191,19.2929 L28.6191,19.2929 Z M51.8871,36.5749 C51.4091,36.2939 50.7971,36.4549 50.5181,36.9319 L39.0561,56.4819 C38.2281,57.9149 36.3891,58.4079 35.0011,57.6079 L32.7681,56.1609 C32.3061,55.8599 31.6861,55.9929 31.3861,56.4559 C31.0851,56.9199 31.2171,57.5389 31.6811,57.8389 L33.9571,59.3139 C34.7421,59.7669 35.6011,59.9819 36.4491,59.9819 C38.1781,59.9819 39.8611,59.0869 40.7841,57.4879 L52.2431,37.9429 C52.5221,37.4669 52.3631,36.8549 51.8871,36.5749 L51.8871,36.5749 Z M59.9121,4.9999 L59.9121,20.9999 C59.9121,24.0939 58.9281,26.3989 56.6191,28.7069 L26.9211,58.4469 C25.9761,59.3919 24.7201,59.9109 23.3841,59.9109 C22.0481,59.9109 20.7931,59.3919 19.8501,58.4469 L1.4651,40.0629 C0.5201,39.1179 0.0001,37.8619 0.0001,36.5259 C0.0001,35.1899 0.5201,33.9349 1.4651,32.9909 L27.4391,7.0519 C20.6471,5.5079 16.4321,5.4039 15.1981,5.7649 C15.7191,6.2979 17.3421,7.4299 21.2591,8.9739 C21.7731,9.1769 22.0251,9.7569 21.8231,10.2709 C21.6201,10.7849 21.0391,11.0339 20.5261,10.8349 C12.4181,7.6389 12.8921,5.8669 13.0711,5.1999 C13.4421,3.8099 15.4231,3.3469 19.4811,3.7019 C22.7861,3.9909 27.0521,4.8059 31.4931,5.9949 C35.9341,7.1849 40.0341,8.6119 43.0401,10.0149 C46.7351,11.7379 48.2161,13.1269 47.8431,14.5179 C47.4831,15.8599 45.6121,16.0239 44.9971,16.0779 C44.9681,16.0809 44.9381,16.0819 44.9091,16.0819 C44.3961,16.0819 43.9601,15.6889 43.9141,15.1689 C43.8651,14.6189 44.2721,14.1339 44.8231,14.0859 C45.2491,14.0489 45.5321,13.9909 45.7151,13.9389 C45.2871,13.4919 44.2041,12.7949 42.4721,11.9649 C42.1091,12.5769 41.9121,13.2799 41.9121,13.9999 C41.9121,16.2059 43.7061,17.9999 45.9121,17.9999 C48.1181,17.9999 49.9121,16.2059 49.9121,13.9999 C49.9121,11.7939 48.1181,9.9999 45.9121,9.9999 C45.3591,9.9999 44.9121,9.5529 44.9121,8.9999 C44.9121,8.4469 45.3591,7.9999 45.9121,7.9999 C49.2211,7.9999 51.9121,10.6909 51.9121,13.9999 C51.9121,17.3089 49.2211,19.9999 45.9121,19.9999 C42.6031,19.9999 39.9121,17.3089 39.9121,13.9999 C39.9121,12.9969 40.1761,12.0199 40.6471,11.1479 C38.2541,10.1429 35.0441,9.0179 30.9761,7.9269 C30.5471,7.8119 30.1341,7.7069 29.7211,7.6019 L2.8791,34.4059 C2.3121,34.9719 2.0001,35.7259 2.0001,36.5259 C2.0001,37.3279 2.3121,38.0809 2.8791,38.6479 L21.2641,57.0329 C22.3971,58.1659 24.3731,58.1659 25.5061,57.0329 L55.2041,27.2929 C57.1531,25.3449 57.9121,23.5799 57.9121,20.9999 L57.9121,4.9999 C57.9121,3.3459 56.5661,1.9999 54.9121,1.9999 L38.9121,1.9999 C36.3321,1.9999 34.5671,2.7589 32.6191,4.7069 C32.2281,5.0979 31.5961,5.0979 31.2051,4.7069 C30.8141,4.3159 30.8141,3.6839 31.2051,3.2929 C33.5131,0.9839 35.8181,-0.0001 38.9121,-0.0001 L54.9121,-0.0001 C57.6691,-0.0001 59.9121,2.2429 59.9121,4.9999 L59.9121,4.9999 Z"
                                id="price-tag"
                              />
                            </g>
                          </g>
                        </svg>
                      </div>
                      <span className="pl-3 w-3/4">Orders</span>
                    </button>
                    <ul className="relative">
                      <li className="block text-center md:text-left">
                        <button
                          type="button"
                          className="focus:shadow-custom relative md:left-30p text-indigo-400 text-xs md:text-base hover:text-indigo-900"
                          onClick={() => handleClickNav("Orders", "Orders")}
                        >
                          Orders
                        </button>
                      </li>
                      <li className="block text-center md:text-left">
                        <button
                          type="button"
                          className="focus:shadow-custom relative md:left-30p text-indigo-400 text-xs md:text-base hover:text-indigo-900"
                          onClick={() => handleClickNav("Orders", "Incomes")}
                        >
                          Incomes
                        </button>
                      </li>
                      <li className="block text-center md:text-left">
                        <button
                          type="button"
                          className="focus:shadow-custom relative md:left-30p text-indigo-400 text-xs md:text-base hover:text-indigo-900"
                          onClick={() => handleClickNav("Orders", "Xpenses")}
                        >
                          Xpenses
                        </button>
                      </li>
                      <li className="block text-center md:text-left">
                        <button
                          type="button"
                          className="focus:shadow-custom relative md:left-30p text-indigo-400 text-xs md:text-base hover:text-indigo-900"
                          onClick={() => handleClickNav("Orders", "Incomes")}
                        >
                          Spending
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
              className="md:relative md:flex md:flex-col md:flex-no-wrap md:w-4/5"
            >
              <Section
                width="tw-max-w-full"
                bgColor="tw-bg-transparent"
                height="tw-h-full"
                mainTitle={mainTitle}
                subTitle={subTitle}
                onClickCardButton={onClickCardButton}
              >
                {subTitle === "Products" && <Products />}
                {subTitle === "New Product" && <NewProduct />}
                {subTitle === "Orders" && <Orders />}
              </Section>
            </div>
            {/* main content */}
          </div>
        </div>
      </div>
    </>
  );
}

export default Store;
