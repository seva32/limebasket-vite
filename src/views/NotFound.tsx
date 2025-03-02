import React from "react";
import { useNavigate } from "react-router-dom";

import { Head } from "../common";

const NotFound = () => {
  const timeoutRef = React.useRef<number | null>(null);
  const navigate = useNavigate();

  React.useEffect(() => {
    timeoutRef.current = window.setTimeout(() => navigate("/"), 10000);

    return () => {
      timeoutRef.current && window.clearTimeout(timeoutRef.current);
    };
  });

  return (
    <>
      <Head title="Lime Basket | Not found" />
      <div>
        <div className="w-full min-h-screen flex justify-center items-center mb-24r bg-honeydew">
          <div className="w-1/3 h-auto">
            <img
              alt="not found page"
              src="https://res.cloudinary.com/seva32/image/upload/v1594749987/notfound_yccq99.jpg"
              className="max-w-full"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFound;
