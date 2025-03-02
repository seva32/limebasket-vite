import { ReactNode, useState } from "react";
import Cookies from "universal-cookie";

import { Button } from ".";

interface CookieBannerProps {
  children?: ReactNode;
}

function CookieBanner({
  children = "This website uses cookies to improve service, for analytical and advertising purposes.",
}: CookieBannerProps): JSX.Element | null {
  const cookies = new Cookies();
  cookies.set("cookies-consent", "", { path: "/", sameSite: "strict" });
  const [close, setClose] = useState(false);
  const [hasStorage, setHasStorage] = useState(
    cookies.get("cookies-consent") && cookies.get("cookies-consent") !== ""
  );

  const consentAccept = () => {
    setClose(true);
    cookies.set("cookies-consent", "accept", { path: "/", sameSite: "strict" });
    setHasStorage(true);
  };

  const consentReject = () => {
    setClose(true);
    cookies.remove("cookies-consent");
  };

  if (hasStorage) {
    return null;
  }

  return (
    <div
      className={`fixed ${
        close ? "hidden" : "flex"
      } flex-wrap justify-between items-center bottom-0 right-0 left-0 bg-dirty opacity-75 p-4 z-30`}
    >
      <div className="flex flex-wrap justify-between w-full p-4">
        {children}
        <Button size="md" handleClick={consentAccept} padding="p-0" noArrow>
          <span className="font-button text-space">Accept</span>
        </Button>
      </div>
      <button
        type="button"
        onClick={consentReject}
        className="absolute top-0 right-0 border-none"
      >
        <span className="block w-full px-2 bg-lime text-space">X</span>
      </button>
    </div>
  );
}

export default CookieBanner;
