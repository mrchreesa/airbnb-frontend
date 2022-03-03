import * as React from "react";
import { Button, AppBar } from "@mui/material";
import ProfileMenu from "../components/ProfileMenu";
import Link from "next/link";
import { useRouter } from "next/router";
import PropTypes from "prop-types";

import CssBaseline from "@mui/material/CssBaseline";
import useScrollTrigger from "@mui/material/useScrollTrigger";

function ElevationScroll(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

ElevationScroll.propTypes = {
  children: PropTypes.element.isRequired,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};
const NavBar = (props) => {
  const router = useRouter();
  if (router.pathname === "/") {
    return (
      <>
        {/* <CssBaseline /> */}
        <ElevationScroll {...props}>
          <AppBar style={{ backgroundColor: "black" }}>
            <div className="container-nav">
              <div className="nav">
                <Link href="/">
                  <div className="logo-landing"></div>
                </Link>
                <div className="empty"></div>

                <div className="menu">
                  <Button
                    style={{
                      backgroundColor: "transparent",
                      borderRadius: 30,
                      color: "white",
                      textTransform: "none",
                    }}
                  >
                    Become a host
                  </Button>

                  <Button
                    style={{ backgroundColor: "transparent", borderRadius: 30 }}
                  >
                    {" "}
                    <ProfileMenu />
                  </Button>
                </div>
              </div>
            </div>
          </AppBar>
        </ElevationScroll>
      </>
    );
  } else if (router.pathname === "/property/[slug]") {
    return (
      <>
        <div className="container-nav">
          <div className="nav">
            <Link href="/">
              <div className="logo"></div>
            </Link>
            <div className="empty"></div>

            <div className="menu">
              <Button
                style={{
                  backgroundColor: "transparent",
                  borderRadius: 30,
                  color: "grey",
                  textTransform: "none",
                }}
              >
                Become a host
              </Button>

              <Button
                style={{ backgroundColor: "transparent", borderRadius: 30 }}
              >
                {" "}
                <ProfileMenu />
              </Button>
            </div>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        {/* <CssBaseline /> */}
        <ElevationScroll {...props}>
          <AppBar style={{ backgroundColor: "white" }}>
            <div className="container-nav">
              <div className="nav">
                <Link href="/">
                  <div className="logo"></div>
                </Link>
                <div className="empty"></div>

                <div className="menu">
                  <Button
                    style={{
                      backgroundColor: "transparent",
                      borderRadius: 30,
                    }}
                  >
                    <p className="host-btn">Become a host</p>
                  </Button>

                  <Button
                    style={{
                      backgroundColor: "transparent",
                      borderRadius: 30,
                    }}
                  >
                    {" "}
                    <ProfileMenu />
                  </Button>
                </div>
              </div>
            </div>
          </AppBar>
        </ElevationScroll>
      </>
    );
  }
};

export default NavBar;
