function Footer() {
  const petHealt = () => (
    <>
      <p className="self-end sm:self-center font-body-bold uppercase pb-4">
        Pet Health
      </p>
      <p className="self-end sm:self-center font-body pb-4">
        Dog Health
        <i className="fas fa-angle-left pl-1" />
      </p>
      <p className="self-end sm:self-center font-body pb-4">
        Cat Health
        <i className="fas fa-angle-left pl-1" />
      </p>
    </>
  );

  const customerSupport = () => (
    <>
      <p className="sm:self-center font-body-bold uppercase pb-4">
        Customer Support
      </p>
      <p className="sm:self-center font-body">
        <i className="fas fa-angle-right pr-1" />
        Contact Us
      </p>
    </>
  );

  return (
    <div className="w-full h-full bg-lime">
      <div className="w-90% ml-5% sm:w-4/5 sm:ml-10% h-full flex flex-col flex-no-wrap justify-between relative">
        <div className="flex-grow w-full h-full flex flex-col flex-no-wrap">
          <div className="w-full h-full flex flex-no-wrap">
            <div className="w-1/2 sm:w-1/4 h-full py-4 flex justify-start flex-col flex-no-wrap">
              <p className="font-body-bold uppercase pb-4">Avalabity</p>
              <p className="font-body">
                <i className="fas fa-angle-right pr-1" />
                Monday - Saturday
              </p>
              <p className="font-body pb-4">8am : 10pm</p>
              <p className="font-body">
                <i className="fas fa-angle-right pr-1" />
                Sunday
              </p>
              <p className="font-body pb-4">8am : 6pm</p>
              <div className="sm:hidden">{customerSupport()}</div>
            </div>
            <div className="hidden sm:flex flex-col justify-start py-4 w-1/4 h-full">
              {customerSupport()}
            </div>
            <div className="hidden sm:flex flex-col justify-start py-4 w-1/4 h-full">
              {petHealt()}
            </div>
            <div className="w-1/2 sm:w-1/4 h-full py-4 flex justify-start flex-col flex-no-wrap">
              <p className="self-end font-body-bold uppercase pb-4">About Us</p>
              <p className="self-end font-body pb-4">
                Company Info
                <i className="fas fa-angle-left pl-1" />
              </p>
              <p className="self-end font-body pb-4">
                Exhibition Activities
                <i className="fas fa-angle-left pl-1" />
              </p>
              <p className="self-end font-body pb-4">
                FAQ
                <i className="fas fa-angle-left pl-1" />
              </p>
              <div className="sm:hidden flex flex-col justify-end">
                {petHealt()}
              </div>
            </div>
          </div>
        </div>
        <div className="flex-none h-border-t border-space h-10 flex justify-center items-center">
          <p className="font-body text-center">
            © {new Date(Date.now()).getFullYear()} LIME BASKET  --  ALL RIGHTS
            RESERVED
          </p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
