import { useState, useEffect } from "react";
import { RouteProp } from "../app/appRoutes";
import {
  fetchPosts,
  posts as postsSelector,
} from "../store/reducers/postsReducer";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { persistor } from "../store";

import { Link, useLocation } from "react-router-dom";
import { Card, Button } from "lime";
import {
  Head,
  BottomMenu,
  Navbar,
  Policies,
  Side,
  bg as Back,
} from "../common";
import useMediaQuery from "../utils/hooks/useMediaQuery";
import useSticky from "../utils/hooks/useSticky";
import Feed from "./Home.insta/Feed";

// type HomeProps = RouteProp;

function Home() {
  const { isPortrait } = useMediaQuery();
  const location = useLocation();

  const [showSearchModal, setShowSearch] = useState(false);

  const { element, isSticky } = useSticky();

  const auth = useAppSelector((state) => state.auth);
  const { authenticated } = auth;

  useEffect(() => {
    const hash = location.hash; // eslint-disable-line
    if (hash && document.getElementById(hash.substr(1))) {
      if (document)
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        document
          .getElementById(hash.substr(1))
          .scrollIntoView({ behavior: "smooth" });
    }
  }, [location.hash]);

  const openModal = () => {
    setShowSearch(true);
  };

  const clearModal = () => {
    setShowSearch(false);
  };

  return (
    <>
      <Head title="Lime Basket | Home" />
      {/* bg */}
      <Back />
      <div className="bg-pink absolute top-0 left-0 right-0 h-screen sm:min-h-600p w-full z-0" />
      <div className="bg-home-small sm:bg-home md:bg-home-md bg-no-repeat bg-local bg-cover bg-center absolute top-0 left-0 min-w-full h-screen sm:min-h-600p z-0" />
      <div className="absolute h-full w-5% sm:w-10% left-0 top-0 z-0">
        <div
          className={`hidden sm:flex flex-col justify-center items-center h-screen w-full sticky top-1p transition-all duration-300 ${
            isSticky ? "ml-0" : "-ml-170"
          }`}
        >
          <Side openModal={openModal} />
        </div>
      </div>

      <div className="relative mb-24r" id="top">
        {/* first screen */}
        {/* policies - hero text - CTA */}
        <div className="h-screen sm:min-h-600p flex flex-col flex-no-wrap items-center relative w-full">
          <div className="flex-none relative w-full">
            <Policies textColor="white" />
          </div>
          <hr className="text-white w-full sm:w-125per z-10 pb-1" />
          <div className="flex-none relative w-full z-10">
            <Navbar
              logged={!!authenticated}
              showSearchModal={showSearchModal}
              clearModal={clearModal}
            />
            {!isPortrait && <BottomMenu color="white" />}
          </div>
          <div className="flex-none relative w-full">
            <ul className="w-full">
              <li className="w-full text-center block">
                <h1 className="pt-12 sm:pt-0 text-white whitespace-no-wrap">
                  Wellcome to Lime Basket
                </h1>
              </li>
              <li className="w-full text-center block">
                <h3 className="pt-2 sm:pt-0 text-white">Your #1 pet store</h3>
              </li>
            </ul>
          </div>
          <div className="flex-grow relative flex flex-col justify-center">
            <div className="flex-grow h-full w-full flex justify-center items-center lg:pb-8">
              <Link to="/products/all">
                <Button size="lg">
                  <div className="font-button whitespace-no-wrap">
                    shop now!
                  </div>
                </Button>
              </Link>
            </div>
            <div className="relative w-24 h-16 mx-auto flex">
              <Link to="/#catalog">
                <button type="button">
                  <div className="aspect-ratio-16/9 relative w-full h-full" />
                  <img
                    src="https://res.cloudinary.com/seva32/image/upload/v1605537057/ArrowDown_f7oq3l.svg"
                    className="absolute left-0 top-0 w-full h-full object-cover animate-bounce"
                    alt="go to next screen"
                  />
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* second screen */}
        {/* ref is for dropdown navbar animation */}
        <div
          className="w-full h-auto min-h-screen flex flex-col flex-no-wrap justify-between items-center relative background-lime-light"
          id="catalog"
        >
          <div className="flex-none w-full h-16" />
          <div className="flex-none w-full h-80p flex flex-col justify-between items-center text-space">
            <h1 className="" ref={element}>
              Explore the catalog
            </h1>
            <hr className="w-full" />
          </div>
          <div className="flex flex-col sm:flex-row justify-around items-center flex-grow w-full my-24 z-0">
            <Card
              mainTitle="Dogs"
              imgSrc="https://res.cloudinary.com/seva32/image/upload/v1605302491/cardDogBg_e6qza7.png"
              brandLogo="https://res.cloudinary.com/seva32/image/upload/v1604425921/logo_rblope.svg"
              linkTo="/products/dogs"
              buttonLinkTo="/products/dogs"
              buttonContent="Shop now!"
              width={isPortrait ? "tw-w-is-10" : "tw-w-is-3"}
              height="tw-h-480p"
            />
            <div className="h-24" />
            <Card
              mainTitle="Cats"
              imgSrc="https://res.cloudinary.com/seva32/image/upload/v1605302491/cardCatBg_g05gho.png"
              brandLogo="https://res.cloudinary.com/seva32/image/upload/v1604425921/logo_rblope.svg"
              linkTo="/products/cats"
              buttonLinkTo="/products/cats"
              buttonContent="Shop now!"
              width={isPortrait ? "tw-w-is-10" : "tw-w-is-3"}
              height="tw-h-480p"
            />
            <div className="h-24" />
            <Card
              mainTitle="Health"
              imgSrc="https://res.cloudinary.com/seva32/image/upload/v1605302491/cardHealthBg_lrmwjh.png"
              brandLogo="https://res.cloudinary.com/seva32/image/upload/v1604425921/logo_rblope.svg"
              linkTo="/products/health"
              buttonLinkTo="/products/health"
              buttonContent="Shop now!"
              width={isPortrait ? "tw-w-is-10" : "tw-w-is-3"}
              height="tw-h-480p"
            />
          </div>
        </div>

        {/* third screen */}
        <div
          className="w-full h-auto min-h-screen flex flex-col flex-no-wrap justify-start items-center relative"
          id="promo"
        >
          <div className="w-full h-16" />
          <div className="w-full h-80p flex flex-col justify-between items-center text-space">
            <h1 className="">Deal of the day</h1>
            <hr className="w-full" />
          </div>
          <div className="flex flex-col sm:flex-row justify-between items-center w-full my-24">
            <div className="w-80% p-2 sm:p-0 sm:w-1/2 h-300p sm:h-350p lg:h-400p xl:h-500p flex flex-col justify-start items-center background-dirty-light rounded-t-lg sm:rounded-l-lg shadow-md">
              <div className="w-full flex flex-col justify-around items-center pt-4">
                <div className="font-subtitle-semibold uppercase">
                  Orthopedic Cat Bowl
                </div>
                <div className="w-full sm:w-90% lg:w-70% flex flex-no-wrap justify-between font-subtitle pt-2 lg:pt-6 xl:pt-10">
                  <div>$79.99 USD</div>
                  <div>$59.99 USD</div>
                  <div className="text-red">
                    <strong>SAVE 25%!</strong>
                  </div>
                </div>
              </div>
              <div className="sm:w-90% lg:w-70% pt-16 sm:pt-6 lg:pt-12 xl:pt-20">
                <p className="font-body">
                  <strong>STABLE STAND & NON SLIP</strong> Food and water feeder
                  holds 6.7 ounces, this raised cat bowl is a good choice for
                  messy eater. Slightly inclined surface prevents food spill
                  out. Safe base is anti-overturned, with a non-slip sticker at
                  the bottom.
                </p>
                <p className="font-body pt-2 lg:pt-4 xl:pt-10">
                  <strong>EASY TO USE & WASH</strong> Simply press the cat bowl
                  into 0/15 degree buckle, it will keep secure in place. Bowls
                  are removable. Dishwasher Safe, NO microwave. Attractive
                  design looks great in home decoration.
                </p>
              </div>
              <div className="pt-16 sm:pt-6 lg:pt-12 xl:pt-20">
                <Link to="/cart/5fb7a4d4a9e12d21dcb6fb56?qty=1">
                  <Button size="md">
                    <div className="font-button whitespace-no-wrap">
                      add to cart
                    </div>
                  </Button>
                </Link>
              </div>
            </div>
            <div className="flex flex-row justify-center items-stretch w-80% sm:w-1/2 h-300p sm:h-350p lg:h-400p xl:h-500p overflow-hidden rounded-b-lg sm:rounded-l-none sm:rounded-r-lg shadow-md">
              <div className="relative aspect-ratio-square sm:pb-0 w-full min-h-full">
                <img
                  src="https://res.cloudinary.com/seva32/image/upload/v1604878396/dealCat_ybjcho.png"
                  alt="Cat feeder deal of the day"
                  className="absolute object-cover shadow-md sm:h-350p lg:h-400p xl:h-500p rounded-b-lg sm:rounded-l-none sm:rounded-r-lg"
                />
              </div>
            </div>
          </div>
        </div>

        {/* fourth screen */}
        <div className="w-full h-auto min-h-screen flex flex-col flex-no-wrap justify-start items-center relative">
          <div className="w-full h-16" />
          <div className="w-full h-80p flex flex-col justify-between items-center text-space">
            <h1 className="">sharing stories</h1>
            <hr className="w-full" />
          </div>
          <div className="flex flex-col sm:flex-row justify-around items-center flex-grow w-full">
            <Feed
              // userName="muddypawsrescuenyc"
              className="w-full mx-auto flex flex-col flex-no-wrap justify-center items-center"
              classNameLoading=""
            />
          </div>
        </div>

        {/* fifth screen */}
        <div className="w-full h-auto flex flex-col flex-no-wrap justify-start items-center relative mb-24 sm:pb-24">
          <div className="w-full h-16" />
          <div className="w-full h-80p flex flex-col justify-between items-center text-space">
            <h1 className="">our guarantee</h1>
            <hr className="w-full" />
          </div>
          <div className="flex flex-col sm:flex-row justify-around items-center flex-grow w-full h-auto p-8">
            <div className="relative w-3/5 sm:w-1/4 pb-6 sm:pb-0">
              <img
                src="https://res.cloudinary.com/seva32/image/upload/v1605627827/medall1_icctbu.svg"
                alt="free worldwide shipping"
                className="min-w-full h-auto"
              />
            </div>
            <div className="relative w-3/5 sm:w-1/4 pb-6 sm:pb-0 ">
              <img
                src="https://res.cloudinary.com/seva32/image/upload/v1605627827/Medall2_m4lvbd.svg"
                alt="30 day money back guarantee"
                className="min-w-full h-auto sm:-mb-48"
              />
            </div>
            <div className="relative w-3/5 sm:w-1/4 pb-6 sm:pb-0 ">
              <img
                src="https://res.cloudinary.com/seva32/image/upload/v1605627829/Medall3_i2xp4s.svg"
                alt="safe checkout"
                className="min-w-full h-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// function Home(props: Props) {
//   const dispatch = useAppDispatch();
//   const { list, loading } = useAppSelector(postsSelector);

//   useEffect(() => {
//     persistor.purge();
//     dispatch(fetchPosts());
//   }, []);

//   useEffect(() => {
//     console.log("list ", list);
//     console.log("loading ", loading);
//   }, [list, loading]);

//   useEffect(() => {
//     (async () => {
//       props.loadData?.(
//         await new Promise((resolve, _reject) =>
//           setTimeout(() => {
//             resolve("wooooow");
//           }, 3000)
//         )
//       );
//     })();
//   }, []);
//   return <div className="bg-lime">Page: {props.page}</div>;
// }

export default Home;
