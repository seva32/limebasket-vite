// import { useAppSelector as useSelector } from "../store/hooks";

import Loading from "./LoaderLoading";
import { Head, Policies, Navbar } from ".";

const Loader = () => {
  //   const auth = useSelector((state) => state.auth);
  //   const { authenticated } = auth;
  const authenticated = false;

  return (
    <>
      <Head title="Lime Basket | Signin" />

      <div className="relative mb-24r z-0">
        {/* header */}
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
            />
          </div>
          <div className="w-20% pt-20">
            <Loading />
          </div>
        </div>
      </div>
    </>
  );
};

export default Loader;
