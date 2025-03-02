/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/static-property-placement */
import { Component } from "react";
import Media from "./Media";
import randomKey from "../../utils/misc/randomKey";

const fakePost = {
  src: "https://res.cloudinary.com/seva32/image/upload/v1605733788/madeline-bowen-98TISJ-x2FA-unsplash_eb4ctd.jpg",
  url: "https://unsplash.com/photos/98TISJ-x2FA",
  alt: "Meet our newest senior gentleman, Clayton! 😍 Clayton is around ten years old and looks like a #Terrier mix. He's a pocket sized 12 pounds but would benefit from gaining a little bit of holiday weight",
};
const fakePost2 = {
  src: "https://res.cloudinary.com/seva32/image/upload/v1605734264/sarah-shull-0ImqAx2eZIQ-unsplash_vcakmd.jpg",
  url: "https://unsplash.com/photos/0ImqAx2eZIQ",
  alt: "You know her, and you love her — our resident superstar, Lady, is the star of this week's #TransformationTuesday as we take a look at her dramatic weight loss journey! 😱 Swipe",
};

const fakePost3 = {
  src: "https://res.cloudinary.com/seva32/image/upload/v1605734639/tim-trad-1zhWmkyWPGY-unsplash_csglas.jpg",
  url: "https://unsplash.com/photos/1zhWmkyWPGY",
  alt: "Temperatures are dropping, and we know everyone's looking for the perfect winter cuddle buddy. We have one especially cute pup who might be the perfect fit for you— Lupita! 😍",
};

class Feed extends Component<
  { className: string; classNameLoading: string },
  { loading: boolean; media: any }
> {
  static defaultProps = {
    className: "",
    classNameLoading: "",
  };

  constructor(props: any) {
    super(props);

    this.state = {
      loading: true,
      media: [fakePost, fakePost2, fakePost3, fakePost3, fakePost, fakePost2],
    };
  }

  override render() {
    // if (this.state.error) throw this.state.error;

    const className = this.state.loading
      ? [this.props.className, this.props.classNameLoading].join(" ")
      : this.props.className;

    return (
      <>
        <div className={className}>
          {this.state.media.slice(0, 3).map((media: any) => (
            <Media
              key={randomKey()}
              src={media.src}
              url={media.url}
              alt={media.alt}
            />
          ))}
        </div>
        <div className={className}>
          {this.state.media.slice(-3).map((media: any) => (
            <Media
              key={randomKey()}
              src={media.src}
              url={media.url}
              alt={media.alt}
            />
          ))}
        </div>
      </>
    );
  }
}

export default Feed;

// usage
// <Feed
//     userName="jamespaulmoriarty"
//     className="[nombre de las clases css para el feed]"
//     classNameLoading="[nombre de la clase css para loading state]"
//   />
