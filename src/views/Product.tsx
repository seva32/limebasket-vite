import React from "react";
import { Link } from "react-router-dom";
import { useParams, useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../store/hooks";

import { detailsProduct } from "../store/actions/shop/productActions";
import { PRODUCT_REVIEW_SAVE_RESET } from "../store/actions/shop/shopActionTypes/productActionTypes";
import Reviews from "./Product.components/Reviews";
import { Head, Alert, Policies, Navbar, Button, Textarea } from "../common";
import Loading from "../common/LoaderLoading";

function Prod() {
  const [nickname, setNickname] = React.useState<{
    nickname: string;
    image: string;
  } | null>(null);
  const [showNoItemsMsg, setShowNoItemsMsg] = React.useState(false);
  const timeoutRef = React.useRef();
  const { id } = useParams();
  const navigate = useNavigate();

  const [showSearchModal, setShowSearch] = React.useState(false);
  const [showQuestion, setShowQuestion] = React.useState(false);
  const [showReviews, setShowReviews] = React.useState(false);

  const productDetails: { product: any; loading: boolean; error: string } =
    useAppSelector((state) => state.productDetails);
  const product = productDetails.product;
  const loading = productDetails.loading;
  const error = productDetails.error;

  const authen = useAppSelector((state) => state.auth);
  const auth = authen.authenticated;

  const productReviewSave = useAppSelector((state) => state.productReviewSave);
  const { success: reviewSaveSuccess, error: reviewSaveError } =
    productReviewSave;

  const dispatch = useAppDispatch();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [product, id, nickname]);

  React.useEffect(() => {
    if (auth) {
      const user = JSON.parse(localStorage.getItem("user") || "") || {};
      if (user.nickname) {
        setNickname({ nickname: user.nickname, image: user.image });
      }
    }
  }, [auth]);

  React.useEffect(() => {
    if (error) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      timeoutRef.current = window.setTimeout(() => {
        navigate("/");
      }, 5000);
    }
    return () => window.clearTimeout(timeoutRef.current);
  }, [error, navigate]);

  React.useEffect(() => {
    dispatch(detailsProduct(id));
  }, [dispatch, id]);

  React.useEffect(() => {
    if (reviewSaveSuccess || reviewSaveError !== "") {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      timeoutRef.current = window.setTimeout(() => {
        dispatch({ type: PRODUCT_REVIEW_SAVE_RESET });
        dispatch(detailsProduct(id));
      }, 5000);
    }

    if (showNoItemsMsg) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      timeoutRef.current = window.setTimeout(() => {
        setShowNoItemsMsg(false);
      }, 5000);
    }

    return () => window.clearTimeout(timeoutRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reviewSaveError, reviewSaveSuccess, dispatch, showNoItemsMsg]);

  function formatCurrency(value: any) {
    return Number(value).toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  }

  const clearModal = () => {
    setShowSearch(false);
  };

  if (error) {
    return (
      <>
        <Head title="Lime Basket | Product" />
        <div className="w-full h-screen flex justify-center items-start p-32">
          <h1 className="">Something went wrong...</h1>
        </div>
      </>
    );
  }

  return (
    <>
      <Head title="Lime Basket | Product" />

      <div className="relative mb-24r z-0" id="top">
        {/* product screen */}
        <div className="min-h-screen sm:min-h-600p flex flex-col flex-no-wrap items-center relative w-full z-0">
          <div className="flex-none relative w-full">
            <Policies textColor="space" />
          </div>
          <hr className="text-space w-full sm:w-125per z-10 pb-1" />
          <div className="flex-none relative w-full z-10">
            <Navbar
              logged={!!auth}
              showSearchModal={showSearchModal}
              clearModal={clearModal}
              dark
            />
          </div>
          <div className="flex-none relative w-full text-center block">
            <h1 className="pt-12 text-space whitespace-no-wrap">
              Lime Basket Products
            </h1>
          </div>

          {loading ? (
            <div className="w-full h-200p flex justify-center items-center">
              <div className="w-200p">
                <Loading />
              </div>
            </div>
          ) : (
            <div className="flex-grow relative flex flex-col justify-center min-w-full">
              <div className="flex flex-col sm:flex-row justify-between items-center min-w-full my-24">
                {/* product price details cart */}
                <div className="w-80% p-2 sm:p-0 sm:w-1/2 h-300p sm:h-350p lg:h-400p flex flex-col justify-start items-center background-dirty-light rounded-t-lg sm:rounded-l-lg sm:rounded-r-none shadow-md">
                  {/* name price */}
                  <div className="flex-none w-full flex flex-col justify-around items-center pt-4">
                    <div className="font-subtitle-semibold font-2rem uppercase text-space">
                      <strong>{product.name}</strong>
                      <div className="font-small mt-1 text-space">
                        <a href="#reviews-section">{`${product.numReviews} reviews`}</a>
                        <br />
                        {[1, 2, 3, 4, 5].map((num) => (
                          <span
                            key={num}
                            className={`fa fa-star ${
                              num <= product.rating ? "checked" : ""
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <div className="w-full sm:w-90% lg:w-70% flex flex-col flex-no-wrap justify-end items-end font-subtitle pt-2 lg:pt-6 xl:pt-10">
                      <div className="text-space">
                        Price{" "}
                        <strong>{`${formatCurrency(product.price)}`}</strong>
                      </div>
                      <div className="text-space">
                        Status:{" "}
                        <strong>
                          {product.countInStock > 0
                            ? "In Stock"
                            : "Unavailable."}
                        </strong>
                      </div>
                    </div>
                  </div>
                  {/* details */}
                  <div className="flex-none sm:w-90% lg:w-70% pt-16 sm:pt-12 md:pt-16 lg:pt-20">
                    <p className="font-body">
                      <strong>PRODUCT DETAILS </strong>
                      {product.description}
                    </p>
                    <p className="font-body pt-2 lg:pt-4 xl:pt-10">
                      <strong>EASY TO USE </strong> Lorem ipsum, dolor sit amet
                      consectetur adipisicing elit. Deleniti eaque maiores animi
                      nemo ea ratione, in, ipsum ad esse at magnam nobis.
                      Possimus, quidem. Repellat.
                    </p>
                  </div>
                  {/* btn cart */}
                  <div className="flex-grow flex justify-center items-center">
                    <Link to={`/cart/${product._id}?qty=1`}>
                      <Button size="lg" padding="p-0">
                        <div className="font-button whitespace-no-wrap">
                          add to cart
                        </div>
                      </Button>
                    </Link>
                  </div>
                </div>

                {/* product img */}
                <div className="flex w-80% sm:w-1/2 h-300p sm:h-350p lg:h-400p overflow-hidden rounded-b-lg sm:rounded-l-none sm:rounded-r-lg shadow-md">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full max-w-full object-cover shadow-md rounded-b-lg sm:rounded-l-none sm:rounded-r-lg"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* contact reviews */}
        {loading ? null : (
          <div className="w-full h-auto relative z-10">
            {/* contact = ask question */}
            <div className="w-full flex flex-col flex-no-wrap justify-center items-center h-auto py-8">
              <Button
                size="md"
                padding="p-0"
                arrowDown
                handleClick={() => setShowQuestion(!showQuestion)}
              >
                <div className="font-button whitespace-no-wrap">
                  ask a question
                </div>
              </Button>
              <div
                className={`w-full ${
                  showQuestion ? "max-h-full" : "max-h-none"
                } overflow-hidden backface bg-lime-70 rounded-lg mt-2`}
              >
                <div className="w-4/5 sm:w-3/5 mx-auto py-12">
                  <Textarea
                    name="accordion-question"
                    id="accordion-question"
                    handlerSubmit={() => setShowQuestion(false)}
                  />
                </div>
              </div>
            </div>
            {/* reviews */}
            <div className="w-full flex flex-col flex-no-wrap justify-center items-center h-auto py-8">
              <Button
                size="md"
                padding="p-0"
                arrowDown
                handleClick={() => setShowReviews(!showReviews)}
              >
                <div className="font-button whitespace-no-wrap">reviews</div>
              </Button>

              {/* review processing outcome */}
              {reviewSaveSuccess && (
                <div className="w-full md:w-1/2 lg:w-1/3">
                  <Alert
                    title="Product review saved!"
                    content="Your review will show in this product page."
                    exclamation
                  />
                </div>
              )}
              {reviewSaveError && reviewSaveError !== "" && (
                <div className="w-full md:w-1/2 lg:w-1/3">
                  <Alert
                    title="Error processing your review"
                    content="Your product review couldnt be saved, please try again later."
                    exclamation
                  />
                </div>
              )}

              {/* review accordion */}
              <div
                className={`w-full ${
                  showReviews ? "max-h-full" : "max-h-none overflow-hidden"
                } backface bg-lime-70 rounded-lg mt-2`}
              >
                <div
                  id="reviews-section"
                  className="block mx-auto my-0 py-2 md:py-6 w-4/5"
                >
                  <Reviews user={nickname} product={product} />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* second screen */}
        <div className="w-full h-auto flex flex-col flex-no-wrap justify-start items-center relative mb-24 sm:pb-24 z-negative">
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

export default Prod;
