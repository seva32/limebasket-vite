interface SideNavProps {
  openModal: () => void;
}

function SideNav({ openModal }: SideNavProps): JSX.Element {
  return (
    <nav className="relative w-100p h-screen overflow-hidden opacity-100 select-none flex justify-center items-center">
      <div className="sticky h-150p w-full">
        <div className="flex flex-col justify-between items-center h-full">
          <div>
            <a className="cursor-pointer" href="#top">
              <img
                src="https://res.cloudinary.com/seva32/image/upload/v1605180993/logoRaw_njbho2.svg"
                alt="brand logo"
              />
            </a>
          </div>
          <div>
            <button
              type="button"
              className="cursor-pointer"
              onClick={openModal}
            >
              <img
                src="https://res.cloudinary.com/seva32/image/upload/v1605538134/searchDark_jj26rt.svg"
                alt="search products"
              />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default SideNav;
