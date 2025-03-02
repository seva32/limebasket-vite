/* eslint-disable react/jsx-no-target-blank */
interface MediaProps {
  url: string; // eslint-disable-line
  src: string; // eslint-disable-line
  alt: string; // eslint-disable-line
}

function Media({ url, src, alt }: MediaProps): JSX.Element {
  return (
    <div className="relative w-3/5 my-8 p-8 pb-32 shadow-lg background-dirty-light rounded-md">
      <a href={url} rel="noopener" target="_blank">
        <img src={src} alt={alt} className="rounded-md" />

        <div className="absolute bottom-0 w-4/5 h-24 mx-auto">
          <p className="truncate-overflow text-space font-body">{alt}</p>
        </div>
      </a>
    </div>
  );
}

export default Media;
