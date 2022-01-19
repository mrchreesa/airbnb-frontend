import { urlFor } from "../sanity";

const HostImage = ({ host }) => {
  console.log(host);
  return (
    <div className="review-box">
      <img
        src={urlFor(host?.image.asset)
          .width(50)
          .height(50)
          .crop("focalpoint")
          .auto("format")}
      />
    </div>
  );
};
export default HostImage;
