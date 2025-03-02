import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";

import { saveShipping } from "../store/actions/shop/cartActions";
import useRequireAuth from "../utils/hooks/useRequireAuth";

import { Policies, Navbar, Button, Head } from "../common";

function Shipping() {
  useRequireAuth();
  const navigate = useNavigate();
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");

  const dispatch = useAppDispatch();

  const auth = useAppSelector((state) => state.auth);
  const { authenticated } = auth;

  const submitHandler = (e: any) => {
    e.preventDefault();
    dispatch(saveShipping({ address, city, postalCode, country }));
    navigate("payment");
  };

  return (
    <>
      <Head title="Lime Basket | Shipping" />

      <div className="relative mb-24r z-0">
        {/* product screen */}
        <div className="min-h-screen sm:min-h-600p flex flex-col flex-no-wrap items-center relative w-full z-0">
          <div className="flex-none relative w-full">
            <Policies textColor="space" />
          </div>
          <hr className="text-space w-full sm:w-125per z-10 pb-1" />
          <div className="flex-none relative w-full z-10">
            <Navbar
              logged={!!authenticated}
              showSearchModal={false}
              clearModal={() => undefined}
              dark
              noSearchNoBag
            />
          </div>
          <div className="flex-none relative w-full text-center block">
            <h1 className="pt-12 text-space whitespace-no-wrap">
              Shipping info
            </h1>
          </div>
          <form
            onSubmit={submitHandler}
            className="w-90% sm:w-3/5 min-h-53r sm:min-h-29r lg:min-h-36r xl:min-h-43r mt-16 relative"
          >
            <ul className="relative w-full h-full flex flex-col flex-no-wrap justify-center items-center font-body text-space">
              <li className="w-full flex-grow h-40p bg-honeydew rounded-lg shadow-md flex items-center mb-4">
                <label htmlFor="address" className="inline-block w-1/3 pl-4">
                  Address
                </label>
                <input
                  required
                  className="inline-block w-2/3 h-30p pl-4 mr-4 rounded-md"
                  type="text"
                  name="address"
                  id="address"
                  onChange={(e) => setAddress(e.target.value)}
                />
              </li>
              <li className="w-full flex-grow h-40p bg-honeydew rounded-lg shadow-md flex items-center mb-4">
                <label htmlFor="city" className="inline-block w-1/3 pl-4">
                  City
                </label>
                <input
                  required
                  className="inline-block w-2/3 h-30p pl-4 mr-4 rounded-md"
                  type="text"
                  name="city"
                  id="city"
                  onChange={(e) => setCity(e.target.value)}
                />
              </li>
              <li className="w-full flex-grow h-40p bg-honeydew rounded-lg shadow-md flex items-center mb-4">
                <label htmlFor="postalCode" className="inline-block w-1/3 pl-4">
                  Postal Code
                </label>
                <input
                  required
                  className="inline-block w-2/3 h-30p pl-4 mr-4 rounded-md"
                  type="text"
                  name="postalCode"
                  id="postalCode"
                  onChange={(e) => setPostalCode(e.target.value)}
                />
              </li>
              <li className="w-full flex-grow h-40p bg-honeydew rounded-lg shadow-md flex items-center mb-4">
                <label htmlFor="country" className="inline-block w-1/3 pl-4">
                  Country
                </label>
                <input
                  required
                  className="inline-block w-2/3 h-30p pl-4 mr-4 rounded-md"
                  type="text"
                  name="country"
                  id="country"
                  onChange={(e) => setCountry(e.target.value)}
                />
              </li>

              <li className="w-1/2 pt-40p">
                <Button size="md" padding="p-0" submit>
                  <div className="font-button">place order</div>
                </Button>
              </li>
            </ul>
          </form>
        </div>
      </div>
    </>
  );
}

export default Shipping;
