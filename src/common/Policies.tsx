import React from "react";
import { Link } from "react-router-dom";

interface PoliciesProps {
  textColor: string;
}

function Policies({ textColor }: PoliciesProps): JSX.Element {
  return (
    <div className="z-10">
      <div
        className={`text-${textColor} mx-auto h-24p flex flex-no-wrap items-center`}
      >
        <Link to="/terms">
          <p className="font-link-thin pr-8">
            <strong>Terms of Service</strong>
          </p>
          <p className="font-link-thin">
            <strong>Privacy Policy</strong>
          </p>
        </Link>
      </div>
    </div>
  );
}

export default Policies;
