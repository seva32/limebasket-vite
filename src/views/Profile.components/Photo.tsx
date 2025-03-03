import React, { useRef } from "react";
import axios, { AxiosInstance } from "axios";

import { Modal, Button } from "../../common";

interface PhotoProps {
  avatar?: string;
}

const url =
  process.env.NODE_ENV === "development"
    ? "http://localhost:4939/lime-api"
    : "https://lime-api.sfantini.us/lime-api";

function Photo({ avatar }: PhotoProps): JSX.Element {
  const [image, setImage] = React.useState("");
  const [uploading, setUploading] = React.useState(false);
  const [showModal, setShowModal] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");

  const axiosinstance = useRef<AxiosInstance>();

  const toggleModalState = () => {
    setShowModal(false);
    setErrorMessage("");
  };

  React.useEffect(() => {
    const authHeader =
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      require("../../utils/misc/auth-header").default;
    const defaultOptions = {
      headers: authHeader,
    };
    axiosinstance.current = axios.create(defaultOptions);

    if (!image) {
      const imgUrl = avatar || "Not available";
      setImage(imgUrl);
    }
  }, [avatar, image]);

  const uploadFileHandler = (e: any) => {
    const file = e.target.files[0];
    const bodyFormData = new FormData();
    bodyFormData.append("image", file);
    setUploading(true);
    axiosinstance?.current
      ?.post(`${url}/shop/uploads/profile`, bodyFormData)
      .then((response) => {
        const imagePath = response.data.filePath || "No image available";
        setImage(imagePath);
        setUploading(false);
      })
      .catch((err) => {
        const msg = err.response.data.message || "Try again";
        setErrorMessage(msg);
        setShowModal(true);
        setUploading(false);
      });
  };

  return (
    <div>
      <span className="pl-4 md:pl-8 font-body block">
        <b>Image preview</b>
      </span>
      <br />
      <div className="w-full bg-white flex justify-center">
        {image && image !== "" && image !== "Not available" ? (
          <img
            alt="Profile"
            src={`${image}`}
            className="inline w-200p h-200p object-cover text-center"
            onError={() => setImage("Not available")}
          />
        ) : (
          <svg
            className="flex-shrink-0 text-center w-full bg-white"
            width="200"
            height="200"
            viewBox="0 0 48 48"
          >
            <g>
              <path d="M24,26c6.6,0,12-5.4,12-12S30.6,2,24,2c-6.6,0-12,5.4-12,12S17.4,26,24,26z M24,4c5.5,0,10,4.5,10,10s-4.5,10-10,10   c-5.5,0-10-4.5-10-10S18.5,4,24,4z" />
              <path d="M33,28H15C7.8,28,2,33.8,2,41v5h2v-5c0-6.1,4.9-11,11-11h18V28z" />
              <polygon points="46,38 40,38 40,32 38,32 38,38 32,38 32,40 38,40 38,46 40,46 40,40 46,40  " />
            </g>
          </svg>
        )}
      </div>
      <br />
      <span className="pl-4 md:pl-8 font-body">
        <b>Add / change image</b>
      </span>
      <div className="w-full flex flex-col justify-center items-center mt-2 mb-2 md:mt-4 p-2 md:p-4">
        <input
          defaultValue={image.split("-")[image.split("-").length - 1]}
          type="text"
          name="image"
          id="image"
          className="mb-2 md:mb-4"
          readOnly
        />
        <Button padding="p-0" noArrow>
          <div className="relative flex flex-no-wrap py-5p md:py-8p lg:py-10p px-20p">
            <input
              className="absolute top-0 left-0 opacity-0 w-165p h-40p cursor-pointer font-0"
              type="file"
              onChange={uploadFileHandler}
            />
            <svg
              className="flex-shrink self-center"
              width="30"
              height="22"
              viewBox="0 0 24 16"
            >
              <title />
              <desc />
              <defs />
              <g
                fill="currentColor"
                fillRule="evenodd"
                id="Page-1"
                stroke="none"
                strokeWidth="1"
              >
                <g
                  fill="#202644"
                  id="Core"
                  transform="translate(-126.000000, -46.000000)"
                >
                  <g id="backup" transform="translate(126.000000, 46.000000)">
                    <path
                      d="M19.4,6 C18.7,2.6 15.7,0 12,0 C9.1,0 6.6,1.6 5.4,4 C2.3,4.4 0,6.9 0,10 C0,13.3 2.7,16 6,16 L19,16 C21.8,16 24,13.8 24,11 C24,8.4 21.9,6.2 19.4,6 L19.4,6 Z M14,9 L14,13 L10,13 L10,9 L7,9 L12,4 L17,9 L14,9 L14,9 Z"
                      id="Shape"
                    />
                  </g>
                </g>
              </g>
            </svg>
            <div className="ml-2 font-button text-space flex justify-center items-center">
              {uploading && "Uploading..."}
              {!uploading && "Select Image"}
            </div>
          </div>
        </Button>
      </div>
      {showModal && (
        <Modal
          id="modal"
          isOpen={showModal}
          onClose={toggleModalState}
          title="Upload failed!"
        >
          <div className="box-body ">{` ${errorMessage} `}</div>
        </Modal>
      )}
    </div>
  );
}

export default Photo;
