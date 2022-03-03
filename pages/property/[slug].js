import React, { useState } from "react";
import { sanityClient } from "../../sanity";
import { isMultiple, toUpperCase } from "../../Libs";
import Image from "../../components/Image";
import HostImage from "../../components/HostImage";
import moment from "moment";

import Review from "../../components/Review";
import Map from "../../components/Map";
import Link from "next/link";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import NavBar from "../../components/NavBar";
import Calendar from "../../components/Calendar";
import CheckInOut from "../../components/CheckInOut";

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
  const today = moment().date();
  console.log(today);
  const [value, setValue] = useState([null, null]);
  let startDate;
  value.length ? (startDate = value[0]) : (startDate = null);
  let endDate;
  value.length ? (endDate = value[1]) : (endDate = null);
  let totalDaysStay;
  endDate
    ? (totalDaysStay = moment(endDate).diff(moment(startDate), "days"))
    : (totalDaysStay = 1);
  let totalPriceNights = pricePerNight * totalDaysStay;
  let totalPrice = totalPriceNights + 30;
  const reviewAmount = reviews.length;
  function srcset(image, size, rows = 1, cols = 1) {
    return {
      src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
      srcSet: `${image}?w=${size * cols}&h=${
        size * rows
      }&fit=crop&auto=format&dpr=2 2x`,
    };
  }
  console.log(title);
  console.log(location);
  console.log(location);
  return (
    <>
      <NavBar />
      <div className="wrapper">
        <div className="container">
          <h2>
            <b>{title}</b>
          </h2>
          {reviews ? (
            <p>
              {reviewAmount} review{isMultiple(reviewAmount)}
            </p>
          ) : null}

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
              <Calendar value={value} setValue={setValue} />
              <div className="review">
                <hr />
                <h4>{description}</h4>
                <hr />
                {reviews && (
                  <h2>
                    {reviewAmount} review{isMultiple(reviewAmount)}
                  </h2>
                )}
                {reviews !== null || reviews !== undefined ? (
                  reviews.map((review) => (
                    <Review key={review._key} review={review} />
                  ))
                ) : (
                  <h4>No Reviews Yet</h4>
                )}

                <hr />
                <h2>Location</h2>
              </div>
            </div>
            <div className="price-box">
              <h2>£{pricePerNight}</h2>
              <p>/night</p>
              <div className="empty1"></div>
              {reviews && (
                <h4>
                  {reviewAmount} review{isMultiple(reviewAmount)}
                </h4>
              )}
              <CheckInOut value={value} setValue={setValue} />
              <Link href="/property">
                <div className="button">Change Dates</div>
              </Link>

              <div className="sub-total">
                <div className="sub-total-item">
                  <p>
                    £{pricePerNight} x {totalDaysStay} nights
                  </p>{" "}
                  <p>
                    <u>Cleaning fee</u>
                  </p>
                  <p>
                    <u>Service fee</u>
                  </p>
                  <h4>Total </h4>
                </div>
                <div className="empty2"></div>
                <div className="sub-total-price">
                  <p>£{totalPriceNights}</p>
                  <p>£20 </p>
                  <p>£10</p>
                  <h3>£{totalPrice}</h3>
                </div>
              </div>
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
