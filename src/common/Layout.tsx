import { ReactNode } from "react";

import useCountdown from "../utils/hooks/useCountdown";

import { CookieBanner as CookieConsent, Footer } from ".";
// import Back from '../../Figma/bg';

interface LayoutProps {
  children: ReactNode;
}

function Layout({ children }: LayoutProps): JSX.Element {
  useCountdown();
  return (
    <div className="main-container mt-0 mx-auto -mb-24r">
      {/* <Back /> */}
      <CookieConsent />
      {/* page/view container */}
      <div className="w-90% sm:w-4/5 h-full flex flex-col mx-auto">
        {children}
      </div>
      <div className="main-footer h-24r">
        <Footer />
      </div>
    </div>
  );
}

export default Layout;
