import { urlFor } from "../sanity";

const Image = ({ identifier, image }) => {
  return (
    <div className={identifier === "main-image" ? "main-image" : "image"}>
      <img className="image-property" src={urlFor(image).auto("format")} />
    </div>
  );
};

export default Image;
