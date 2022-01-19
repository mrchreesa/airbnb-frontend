import { sanityClient } from "../../sanity";
import { isMultiple, toUpperCase } from "../../Libs";
import Image from "../../components/Image";
import HostImage from "../../components/HostImage";

import Review from "../../components/Review";
import Map from "../../components/Map";
import Link from "next/link";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import NavBar from "../../components/NavBar";

const Property = ({
  title,
  location,
  propertyType,
  mainImage,
  images,
  pricePerNight,
  beds,
  bedrooms,
  description,
  host,
  reviews,
}) => {
  const reviewAmount = reviews.length;
  function srcset(image, size, rows = 1, cols = 1) {
    return {
      src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
      srcSet: `${image}?w=${size * cols}&h=${
        size * rows
      }&fit=crop&auto=format&dpr=2 2x`,
    };
  }
  console.log(host);
  return (
    <>
      <NavBar />
      <div className="wrapper">
        <div className="container">
          <h2>
            <b>{title}</b>
          </h2>
          <p>
            {reviewAmount} review{isMultiple(reviewAmount)}
          </p>
          <div className="images-section">
            <div className="image-main">
              <Image
                identifier="main-image"
                className="image-big img"
                image={mainImage}
              />
            </div>
            <div className="sub-images-section">
              {images.map(({ _key, asset }, image) => (
                <Image
                  key={_key}
                  identifier="image"
                  className="img"
                  image={asset}
                />
              ))}
            </div>
          </div>
          <div className="section">
            <div className="information">
              <div className="info-main">
                <h2>
                  <b>
                    {toUpperCase(propertyType)} hosted by {host?.name}{" "}
                  </b>
                </h2>
                <HostImage key={host._key} host={host} />
              </div>
              <p>
                {bedrooms} bedroom{isMultiple(bedrooms)} * {beds} bed
                {isMultiple(beds)}
              </p>
              <hr />
              <h4>
                <b>Enhanced Clean</b>
              </h4>
              <p>
                This host is committed to Airbnb's 5-step enhanced cleaning
                process.
              </p>
              <h4>
                <b>Amenities for everyday living</b>
              </h4>
              <p>
                The host has equipped this place for long stays - kitchen,
                shampoo, conditioner, hairdryer included.
              </p>
              <h4>
                <b>House rules</b>
              </h4>
              <p>
                This place isn't suitable for pets andthe host does not allow
                parties or smoking.
              </p>
              <div className="review">
                <hr />
                <h4>{description}</h4>

                <hr />

                <h2>
                  {reviewAmount} review{isMultiple(reviewAmount)}
                </h2>
                {reviewAmount > 0 &&
                  reviews.map((review) => (
                    <Review key={review._key} review={review} />
                  ))}

                <hr />
                <h2>Location</h2>
              </div>
            </div>
            <div className="price-box">
              <h2>£{pricePerNight}</h2>
              <h4>
                {reviewAmount} review{isMultiple(reviewAmount)}
              </h4>
              <Link href="/">
                <div className="button">Change Dates</div>
              </Link>
            </div>
          </div>

          <Map location={location}></Map>
        </div>
      </div>
    </>
  );
};

export const getServerSideProps = async (pageContext) => {
  const pageSlug = pageContext.query.slug;

  const query = `*[ _type == "property" && slug.current == $pageSlug][0]{
    title,
    location,
    propertyType,
    mainImage,
    images,
    pricePerNight,
    beds,
    bedrooms,
    description,
    host->{
      _id,
      name,
      slug,
      image
    },
    reviews[]{
      ...,
      traveller->{
        _id,
        name,
        slug,
        image
      }
    }
  }`;

  const property = await sanityClient.fetch(query, { pageSlug });

  if (!property) {
    return {
      props: null,
      notFound: true,
    };
  } else {
    return {
      props: {
        title: property.title,
        location: property.location,
        propertyType: property.propertyType,
        mainImage: property.mainImage,
        images: property.images,
        pricePerNight: property.pricePerNight,
        beds: property.beds,
        bedrooms: property.bedrooms,
        description: property.description,
        host: property.host,
        reviews: property.reviews,
      },
    };
  }
};

export default Property;
