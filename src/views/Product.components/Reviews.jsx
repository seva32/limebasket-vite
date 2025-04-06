import React from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import isEmpty from "lodash.isempty";

import { Alert, Button } from "../../common";
import { reduceFormValues, checkAllFieldsValid } from "./reviewsFormHelper";
import { saveProductReview } from "../../store/actions/shop/productActions";

function Reviews({ user, product }) {
  const formFields = {
    value: "",
    valid: true,
    typeMismatch: false,
    errMsg: [],
  };
  // reviewName is the main title for the review
  const [reviewName, setReviewName] = React.useState({
    ...formFields,
    fieldName: "reviewName",
    required: true,
  });
  // aditional review comments
  const [reviewComments, setReviewComments] = React.useState({
    ...formFields,
    fieldName: "reviewComments",
    required: true,
  });

  // check every field has a value and show error if allfieldsreq = true
  const [allFieldsRequired, setAllFieldsRequired] = React.useState(false);

  const modal = React.useRef();
  const modalOverlay = React.useRef();
  const focusedElementBeforeModal = React.useRef();
  const focusableElements = React.useRef();
  const form = React.useRef();
  const reviewNameEl = React.useRef(); // to focus first elem for a11y
  const timeoutRef = React.useRef();
  // shows error when user is not logged
  const [reviewError, setReviewError] = React.useState(false);

  const productReviewSave = useSelector((state) => state.productReviewSave);
  const {
    loading: reviewLoading,
    success: reviewSaveSuccess,
    error: reviewSaveError,
  } = productReviewSave;

  const dispatch = useDispatch();

  const closeModal = React.useCallback(() => {
    // reseting values
    setAllFieldsRequired(false);
    setReviewName({ ...reviewName, errMsg: [] });
    setReviewComments({ ...reviewComments, errMsg: [] });

    // Hide the modal and overlay
    modal.current?.classList.remove("show");
    modalOverlay.current?.classList.remove("show");
    form.current.reset();

    // Set focus back to element that had it before the modal was opened
    focusedElementBeforeModal.current?.focus();
  }, [reviewComments, reviewName]);

  React.useEffect(() => {
    if (reviewSaveSuccess || reviewSaveError) {
      closeModal();
    }
  }, [reviewSaveSuccess, reviewSaveError, closeModal]);

  React.useEffect(() => {
    // Find all focusable children
    const focusableElementsString =
      'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"], [contenteditable]';
    const focusableEl = modal.current.querySelectorAll(focusableElementsString);
    // Convert NodeList to Array
    focusableElements.current = Array.prototype.slice.call(focusableEl);

    if (reviewError) {
      timeoutRef.current = window.setTimeout(() => setReviewError(false), 5000);
    }

    return () => window.clearTimeout(timeoutRef.current);
  }, [reviewError, product]);

  React.useEffect(() => {
    if (reviewSaveSuccess || reviewSaveError) {
      closeModal();
    }
  }, [reviewSaveSuccess, reviewSaveError, closeModal]);

  const submitAddReview = (e) => {
    e.preventDefault();
    const formEl = e.target;
    const formValues = reduceFormValues(
      formEl.elements,
      reviewName,
      reviewComments
    );
    checkAllFieldsValid(formValues, setAllFieldsRequired);
    // formValues.reviewName && formValues.reviewComments undefined
    // if one field value is missing, here allfieldsrequired is false (in next tick)
    if (formValues.reviewName && formValues.reviewComments && formValues.rate) {
      setReviewName({ ...formValues.reviewName });
      setReviewComments({ ...formValues.reviewComments });
      if (
        !formValues.reviewName.errMsg.length &&
        !formValues.reviewComments.errMsg.length
      ) {
        // save review
        dispatch(
          saveProductReview(product._id, {
            userNickname: user.nickname,
            name: formValues.reviewName.value,
            rating: formValues.rate.value,
            comment: formValues.reviewComments.value,
          })
        );
      } else {
        // clear errors from last submit
        formValues.reviewName.errMsg = [];
        formValues.reviewComments.errMsg = [];
      }
    }
  };

  const openModal = () => {
    if (isEmpty(user)) {
      setReviewError(true);
      return;
    }

    // Save current focus
    if (focusedElementBeforeModal.current)
      focusedElementBeforeModal.current = document.activeElement || null;

    // Show the modal and overlay
    modal.current.classList.add("show");
    modalOverlay.current.classList.add("show");

    // Focus first child
    // firstTabStop.focus();
    reviewNameEl.current.focus();
  };

  function trapTabKey(e) {
    const firstTabStop = focusableElements.current[0];
    const lastTabStop =
      focusableElements.current[focusableElements.current.length - 1];
    // Check for TAB key press
    if (e.keyCode === 9) {
      // SHIFT + TAB
      if (e.shiftKey) {
        if (document.activeElement === firstTabStop) {
          e.preventDefault();
          lastTabStop.focus();
        }

        // TAB
      } else if (document.activeElement === lastTabStop) {
        e.preventDefault();
        firstTabStop.focus();
      }
    }

    // ESCAPE
    if (e.keyCode === 27) {
      closeModal();
    }
  }

  const navRadioGroup = (evt) => {
    const star1 = document.getElementById("star1");
    const star2 = document.getElementById("star2");
    const star3 = document.getElementById("star3");
    const star4 = document.getElementById("star4");
    const star5 = document.getElementById("star5");

    if (["ArrowRight", "ArrowLeft", "ArrowDown", "ArrowUp"].includes(evt.key)) {
      evt.preventDefault();
      if (evt.key === "ArrowRight" || evt.key === "ArrowDown") {
        switch (evt.target.id) {
          case "star1":
            star2.focus();
            star2.checked = true;
            break;
          case "star2":
            star3.focus();
            star3.checked = true;
            break;
          case "star3":
            star4.focus();
            star4.checked = true;
            break;
          case "star4":
            star5.focus();
            star5.checked = true;
            break;
          case "star5":
            star1.focus();
            star1.checked = true;
            break;
        }
      } else if (evt.key === "ArrowLeft" || evt.key === "ArrowUp") {
        switch (evt.target.id) {
          case "star1":
            star5.focus();
            star5.checked = true;
            break;
          case "star2":
            star1.focus();
            star1.checked = true;
            break;
          case "star3":
            star2.focus();
            star2.checked = true;
            break;
          case "star4":
            star3.focus();
            star3.checked = true;
            break;
          case "star5":
            star4.focus();
            star4.checked = true;
            break;
        }
      }
    }
  };

  const setFocus = (_evt) => {
    const rateRadios = document.getElementsByName("rate");
    const rateRadiosArr = Array.from(rateRadios);
    const anyChecked = rateRadiosArr.some((radio) => radio.checked === true);
    if (!anyChecked) {
      const star1 = document.getElementById("star1");
      star1.focus();
    }
  };

  return (
    <div className="review_section w-full my-8 mx-auto relative z-0">
      <div className="flex justify-start py-2 md:py-4">
        <div className="border-space border-2 md:border-4 rounded-lg bg-white">
          <button
            type="button"
            id="review-add-btn"
            className="px-2 font-button text-space"
            aria-label="add review"
            title="Add Review"
            onClick={openModal}
          >
            Add Review{" "}
            <span className="font-button text-space">
              <strong>+</strong>
            </span>
          </button>
        </div>
      </div>

      {reviewError && (
        <div className="w-full md:w-1/2 lg:w-1/3 mb-2">
          <Alert
            title="Please sign in!"
            content="You must be logged to add a review."
            exclamation
          />
        </div>
      )}

      {/* review card */}
      {!product.reviews.length ? (
        <div className="block font-body text-space">
          No reviews for this product.
        </div>
      ) : (
        <ul className="w-full relative">
          {product.reviews.map((review) => (
            <div key={review._id} className="w-full relative">
              <li>
                <div className="blog-card relative flex flex-row flex-no-wrap mx-0 p-1 shadow rounded-lg bg-dirty border-space border-2 z-0">
                  <div className="meta relative z-0 h-auto bg-honeydew rounded-l-lg">
                    <img
                      alt="product review"
                      className="photo px-6 w-75p h-75p md:w-100p md:h-100p lg:w-150p lg:h-150p m-0 bg-honeydew rounded-tl-lg"
                      src={
                        "https://res.cloudinary.com/seva32/image/upload/v1602277227/avatar_vkmaep.svg"
                      }
                    />
                  </div>
                  <div className="description p-2 md:p-4 relative z-10 bg-white rounded-r-lg w-full">
                    <span className="block font-body-bold text-space">
                      {review.name}
                    </span>
                    <div>
                      {[1, 2, 3, 4, 5].map((num) => (
                        <span
                          key={num}
                          className={`fa fa-star ${
                            num <= review.rating ? "checked" : ""
                          }`}
                        />
                      ))}
                    </div>
                    <br />
                    <span className="block font-small text-space uppercase">
                      {`${review.userNickname} - ${review.createdAt.substring(
                        0,
                        10
                      )}`}
                    </span>
                    <p className="font-small">{review.comment}</p>
                  </div>
                </div>
              </li>
              <br />
            </div>
          ))}
        </ul>
      )}

      {/* form modal to add a review  */}
      <div
        id="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="add-review-header"
        className="fixed-center relative z-30 flex-col border-space border-2 md:border-4 rounded-lg  transition-all duration-300 overflow-hidden hidden w-256p md:w-500p lg:w-600p bg-dirty"
        ref={modal}
        onKeyDown={trapTabKey}
        aria-hidden="true"
      >
        {/* processing review */}
        {reviewLoading && (
          <div className="absolute inset-0 bg-white z-10 flex justify-center items-center">
            <svg className="spinner-review" viewBox="0 0 50 50">
              <circle
                className="path"
                cx="25"
                cy="25"
                r="20"
                fill="none"
                strokeWidth="5"
              />
            </svg>
          </div>
        )}

        {/* form */}
        <button
          type="button"
          className="close-btn cursor-pointer h-10p md:h-20p lg:h-30p flex justify-center"
          aria-label="close"
          title="Close"
          onClick={closeModal}
        >
          <span className="text-space font-2rem">
            <strong>x</strong>
          </span>
        </button>
        <div
          id="review-form-container"
          className="p-6 w-full font-body text-space"
        >
          <div id="add-review-header" className="m-0 p-2 md:p-4 text-center">
            <span className="text-white bg-space rounded px-2 py-1">
              Add Review
            </span>
          </div>
          <form
            id="review-form"
            ref={form}
            onSubmit={submitAddReview}
            className="flex flex-col bg-dirty p-20p md:p-30p"
            noValidate
          >
            {allFieldsRequired && (
              <div className="w-full md:w-1/2 lg:w-1/3">
                <Alert
                  title="All fields are required"
                  content="Add name, rating (with stars), and comment."
                  exclamation
                />
              </div>
            )}
            <div className="fieldset">
              <label className="block font-bold mb-5p" htmlFor="reviewName">
                Review title
              </label>
              <input
                defaultValue={reviewName.value}
                className="block w-full bg-honeydew rounded border-space border-2 md:border-4 p-2"
                name="reviewName"
                id="reviewName"
                ref={reviewNameEl}
                required
              />
              {reviewName.errMsg.length > 0 && (
                <div className="w-full md:w-1/2 lg:w-1/3">
                  <Alert
                    title="Error!"
                    content={reviewName.errMsg.join(" ")}
                    exclamation
                  />
                </div>
              )}
            </div>
            <div className="fieldset">
              <label className="block font-bold my-5p">Rating</label>
              <div className="rate h-25p md:h-40p flex flex-row-reverse items-start justify-end">
                <input
                  type="radio"
                  id="star5"
                  name="rate"
                  value="5"
                  onKeyDown={navRadioGroup}
                  onFocus={setFocus}
                  className="inline-block"
                  required
                />
                <label
                  htmlFor="star5"
                  title="5 stars"
                  className="inline-block my-0 pt-5p pr-1 h-15p md:h-20p lg:h-30p font-2rem -top-1"
                >
                  5 stars
                </label>
                <input
                  type="radio"
                  id="star4"
                  name="rate"
                  value="4"
                  onKeyDown={navRadioGroup}
                  className="inline-block"
                />
                <label
                  htmlFor="star4"
                  title="4 stars"
                  className="inline-block my-0 pt-5p pr-1 h-15p md:h-20p lg:h-30p font-2rem -top-1"
                >
                  4 stars
                </label>
                <input
                  type="radio"
                  id="star3"
                  name="rate"
                  value="3"
                  onKeyDown={navRadioGroup}
                  className="inline-block"
                />
                <label
                  htmlFor="star3"
                  title="3 stars"
                  className="inline-block my-0 pt-5p pr-1 h-15p md:h-20p lg:h-30p font-2rem -top-1"
                >
                  3 stars
                </label>
                <input
                  type="radio"
                  id="star2"
                  name="rate"
                  value="2"
                  onKeyDown={navRadioGroup}
                  className="inline-block"
                />
                <label
                  htmlFor="star2"
                  title="2 stars"
                  className="inline-block my-0 pt-5p pr-1 h-15p md:h-20p lg:h-30p font-2rem -top-1"
                >
                  2 stars
                </label>
                <input
                  type="radio"
                  id="star1"
                  name="rate"
                  value="1"
                  onKeyDown={navRadioGroup}
                  onFocus={setFocus}
                  className="inline-block"
                />
                <label
                  htmlFor="star1"
                  title="1 star"
                  className="inline-block my-0 pt-5p pr-1 h-15p md:h-20p lg:h-30p font-2rem -top-1"
                >
                  1 star
                </label>
              </div>
            </div>

            <div className="fieldset">
              <label className="block font-bold mb-5p" htmlFor="reviewComments">
                Review comment
              </label>
              <textarea
                name="reviewComments"
                id="reviewComments"
                cols="20"
                rows="5"
                required
                className="w-full bg-honeydew rounded border-space border-2 md:border-4 p-2"
              />
              {reviewComments.errMsg.length > 0 && (
                <div className="w-full md:w-1/2 lg:w-1/3">
                  <Alert
                    title="Error!"
                    content={reviewComments.errMsg.join(" ")}
                    exclamation
                  />
                </div>
              )}
            </div>
            <div className="fieldset self-end pt-2 md:pt-4">
              <Button w="25%" submit id="submit-review-btn">
                Submit
              </Button>
            </div>
          </form>
        </div>
      </div>
      {/* modal backdrop */}
      <div
        className="modal-overlay fixed-center h-200vh w-111% sm:w-125% z-20 bg-black opacity-0 transition-all duration-300 m-0 p-0 hidden"
        ref={modalOverlay}
        onClick={closeModal}
        aria-hidden="true"
      />
    </div>
  );
}

Reviews.propTypes = {
  user: PropTypes.object, // eslint-disable-line
  product: PropTypes.object.isRequired, // eslint-disable-line
};

Reviews.defaultProps = {
  user: {},
};

export default Reviews;
