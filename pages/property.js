import React, { useState } from "react";
import { sanityClient, urlFor } from "../sanity";
import Link from "next/link";
import { isMultiple } from "../Libs";
import NavBar from "../components/NavBar";

import { styled } from "@mui/styles";
import { Button } from "@mui/material";

export const MyButton = styled(Button)({
  textTransform: "none",
  color: "grey",
  paddingRight: "25px",
  paddingLeft: "10px",
});

const Home = ({ properties }) => {
  console.log(properties);
  const [propertyTypeToggle, setPropertyTypeToggle] = useState("all");
  console.log(propertyTypeToggle);
  return (
    <>
      <NavBar />
      {properties && (
        <div className="main">
          <div className="feed-container">
            <div className="feed-buttons">
              <MyButton onClick={() => setPropertyTypeToggle("all")}>
                All Types
              </MyButton>
              <MyButton onClick={() => setPropertyTypeToggle("house")}>
                Houses
              </MyButton>

              <MyButton onClick={() => setPropertyTypeToggle("flat")}>
                Flats
              </MyButton>

              <MyButton onClick={() => setPropertyTypeToggle("hotel")}>
                Hotels
              </MyButton>
              <MyButton onClick={() => setPropertyTypeToggle("bnb")}>
                Bed And Breakfast
              </MyButton>
            </div>
            <div className="feed">
              {propertyTypeToggle !== "all"
                ? properties
                    .filter(
                      (property) => property.propertyType == propertyTypeToggle
                    )
                    .map((property) => (
                      <Link href={`property/${property.slug.current}`}>
                        <div key={property._id} className="card">
                          <img src={urlFor(property.mainImage)} />

                          <h4>{property.title}</h4>
                          <p className="property-price">
                            <u> £{property.pricePerNight}/per Night</u>
                          </p>
                        </div>
                      </Link>
                    ))
                : properties.map((property) => (
                    <Link href={`property/${property.slug.current}`}>
                      <div key={property._id} className="card">
                        <img src={urlFor(property.mainImage)} />

                        <h4>{property.title}</h4>
                        <p className="property-price">
                          <u> £{property.pricePerNight}/per Night</u>
                        </p>
                      </div>
                    </Link>
                  ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export const getServerSideProps = async () => {
  const query = '*[ _type == "property"]';
  const properties = await sanityClient.fetch(query);

  if (!properties.length) {
    return {
      props: {
        properties: [],
      },
    };
  } else {
    return {
      props: {
        properties,
      },
    };
  }
};

export default Home;
