import React from "react";
import uoloLogo from "../../assets/uoloLogo.png";
import userIcon from "../../assets/userIcon.png";
import arrowDown from "../../assets/arrowDown.svg";
import navbarMenu from "../../assets/navbarMenu.png";
import userMenu from "../../assets/userMenu.png";
import { Link } from "react-router-dom";

const Navbar = ({ setShowSidebar }) => {
  return (
    <div className="navbar flex">
      <div className="navbar-menu">
        <img
          onClick={() => {
            setShowSidebar(true);
          }}
          src={navbarMenu}
          alt="navbarMenu"
        />
      </div>
      <div className="navbar-logo">
        <Link to={"/team"}>
          <img
            src={uoloLogo}
            alt="navbar-logo"
          />
        </Link>
      </div>
      <div className="navbar-user flex">
        <div className="navbar-user-icon">
          <img
            src={userIcon}
            alt="user-logo"
          />
        </div>
        <div className="navbar-user-info flex">
          <div className="navbar-user-name">Vikrant</div>
          <div className="navbar-user-dropdown">
            <img
              src={arrowDown}
              alt="arrowDown"
            />
          </div>
        </div>
      </div>
      <div className="navbar-user-menu">
        <img
          src={userMenu}
          alt="userMenu"
        />
      </div>
    </div>
  );
};

export default Navbar;
