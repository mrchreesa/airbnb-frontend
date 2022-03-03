import React, { useState } from "react";
import { sanityClient, urlFor } from "../sanity";
import Link from "next/link";
import { isMultiple } from "../Libs";
import NavBar from "../components/NavBar";

import { styled } from "@mui/styles";
import { Button } from "@mui/material";
export const MyButton = styled(Button)({
  textTransform: "none",
  color: ` #ff385c`,
  fontSize: "1.2em",
  fontWeight: "bold",
});
export const ButtonBlack = styled(Button)({
  textTransform: "none",
  color: "white",
  backgroundColor: "#111111",
  fontSize: "1em",
  padding: 13,
  borderRadius: 12,
});

const Landing = ({ properties }) => {
  return (
    <div className="landing-container">
      <NavBar />
      <div className="landing-main-wrapper">
        <div className="landing-main">
          <h1>Not sure where to go? Perfect.</h1>
          <Link href="/property">
            <MyButton
              className="btn-landing"
              style={{
                marginBottom: 60,
                backgroundColor: "white",
                borderRadius: 35,
                padding: "20px 40px",
                color: `linear-gradient(to right #ff385c, #bd1e59)`,
              }}
            >
              I'm flexible
            </MyButton>
          </Link>
        </div>
      </div>
      <div className="landing-gift-wrapper">
        <div className="landing-gift">
          <div className="left">
            <p>Introducing</p>
            <h1>
              Airbnb <br /> gift cards
            </h1>
            <ButtonBlack className="button-gifts">Shop Now</ButtonBlack>
          </div>
          <div className="right"></div>
        </div>
      </div>
      <div className="lading-inspiration">
        <div className="landing-text">
          <h1>Inspiration for you next trip</h1>
        </div>
        <div className="landing-insp-btns">
          <Link href="/property">
            <div className="area-main brighton">
              <div className="area img1"></div>
              <div className=" content-img">
                <h2>London</h2>
                <p>10 miles away</p>
              </div>
            </div>
          </Link>
          <Link href="/property">
            <div className="area-main london">
              <div className="area img2"></div>
              <div className=" content-img">
                <h2>West Midlands</h2>
                <p>47 miles away</p>
              </div>
            </div>
          </Link>
          <Link href="/property">
            <div className="area-main east">
              <div className="area img3"></div>
              <div className=" content-img">
                <h2>East Sussex</h2>
                <p>60 miles away</p>
              </div>
            </div>
          </Link>
          <Link href="/property">
            <div className="area-main west">
              <div className="area img4"></div>
              <div className=" content-img">
                <h2>Surrey</h2>
                <p>32 miles away</p>
              </div>
            </div>
          </Link>
        </div>
      </div>
      <div className="footer">
        <div className="footer-container">
          <div className="support foot-item">
            <p>
              <b>Support</b>
            </p>
            <button>
              <p>Help Centre</p>
            </button>
            <button>
              <p>Safety information</p>
            </button>
            <button>
              <p>Cancellation options</p>
            </button>
            <button>
              <p>Our COVID-19 Response</p>
            </button>
            <button>
              <p>Supporting people with disabilities</p>
            </button>
            <button>
              <p>Report a neighbourhood concern</p>
            </button>
          </div>
          <div className="community foot-item">
            <p>
              <b>Community</b>
            </p>
            <button>
              <p>Airbnb.org: disaster relief housing</p>
            </button>
            <button>
              <p>Support Afghan refugees</p>
            </button>
            <button>
              <p>Celebrating diversity & belonging</p>
            </button>
            <button>
              <p>Combating discrimination</p>
            </button>
          </div>
          <div className="hosting foot-item">
            <p>
              <b>Hosting</b>
            </p>
            <button>
              <p>Try hosting</p>
            </button>
            <button>
              <p>AirCover: protection for Hosts</p>
            </button>
            <button>
              <p>Explore hosting resources</p>
            </button>
            <button>
              <p>Visit our community forum</p>
            </button>
            <button>
              <p>How to host responsibly</p>
            </button>
          </div>
          <div className="about foot-item">
            <p>
              <b>About</b>
            </p>
            <button>
              <p>Newsroom</p>
            </button>
            <button>
              <p>Learn about new features</p>
            </button>
            <button>
              <p>Letter from our founders</p>
            </button>
            <button>
              <p>Careers</p>
            </button>
            <button>
              <p>Investors</p>
            </button>
            <button>
              <p>Airbnb Luxe</p>
            </button>
          </div>
        </div>
      </div>{" "}
      <div className="footer-nav-wrapper">
        <div className="footer-nav-container">
          <div className="footer-nav">
            <ul>
              <li>
                <button>© 2022 Airbnb, Inc.</button>
              </li>
              <li>
                <button>Privacy</button>
              </li>
              <li>
                <button>Terms</button>
              </li>
              <li>
                <button>Sitemap</button>
              </li>
              <li>
                <button>UK Modern Slavery Act</button>
              </li>
              <li>
                <button>Company details</button>
              </li>
            </ul>
          </div>
          {/* <div className="empty"></div> */}
          <div className="footer-nav-right">
            <div className="menu-footer">
              <ul>
                <li>Enlgish(GB)</li>
                <li>£ GBP</li>
              </ul>
              <div className="social fb"></div>
              <div className="social ig"></div>
              <div className="social twitter"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
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

export default Landing;
