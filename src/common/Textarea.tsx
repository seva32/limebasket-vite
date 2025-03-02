import React from "react";

interface TextareaProps {
  name: string;
  id: string;
  handlerSubmit: any;
  w?: string;
  h?: string;
}

/**
 * textarea
 * @param {string} name name
 * @param {string} id id
 * @param {string} handlerSubmit function at form submit
 * @param {string} w width, default value is w-full
 * @param {string} h height, default value is h-full
 */

function Textarea({
  name,
  id,
  handlerSubmit,
  w = "w-full",
  h = "h-full",
}: TextareaProps): JSX.Element {
  const [msg, setMsg] = React.useState("");

  React.useEffect(() => {
    document.getElementById(id)?.focus();
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    document.getElementById(id)?.select();
  });

  const handleSubmit = (e: any) => {
    e.preventDefault();
    handlerSubmit(msg);
    setMsg("");
  };

  return (
    <form
      id="textarea-form"
      onSubmit={handleSubmit}
      className="flex flex-col flex-no-wrap justify-center items-center"
    >
      <textarea
        form="textarea-form"
        name={name}
        id={id}
        wrap="soft"
        maxLength={50}
        placeholder="Enter your message."
        className={`${w} ${h} font-body bg-honeydew text-space p-6 rounded-lg`}
        onChange={(e) => setMsg(e.target.value)}
      />
      <button type="submit" className="pt-4">
        <img
          src="https://res.cloudinary.com/seva32/image/upload/v1605994465/envelopeDark_nch0lb.svg"
          alt="send"
          className="bg-white"
        />
      </button>
    </form>
  );
}

export default Textarea;
