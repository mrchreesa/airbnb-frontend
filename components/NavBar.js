import { Button } from "@mui/material";
import Menu from "../images/menu.png";

const NavBar = () => {
  return (
    <div className="container-nav">
      <div className="nav">
        <div className="logo"></div>
        <div className="empty"></div>

        <div className="menu">
          <Button style={{ backgroundColor: "transparent", borderRadius: 30 }}>
            <p className="host-btn">Become a host</p>
          </Button>
          <Button style={{ backgroundColor: "transparent" }}>
            <div className="btn-menu"></div>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
