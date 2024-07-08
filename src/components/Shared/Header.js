import React from "react";
import uoloLogo from "../../assets/uoloLogo.png";
import userIcon from "../../assets/userIcon.png";
import arrowDown from "../../assets/arrowDown.svg";
import navbarMenu from "../../assets/navbarMenu.png";
import userMenu from "../../assets/userMenu.png";
import { Link } from "react-router-dom";
import styles from "./Header.module.css";

const Navbar = ({ setShowSidebar }) => {
  return (
    <div className={styles.navbar}>
      <div className={styles.navbarMenu}>
        <img
          onClick={() => {
            setShowSidebar(true);
          }}
          src={navbarMenu}
          alt="navbarMenu"
        />
      </div>
      <div className={styles.navbarLogo}>
        <Link to={"/team"}>
          <img
            src={uoloLogo}
            alt="navbar-logo"
          />
        </Link>
      </div>
      <div className={styles.navbarUser}>
        <div className={styles.navbarUserIcon}>
          <img
            src={userIcon}
            alt="user-logo"
          />
        </div>
        <div className={styles.navbarUserInfo}>
          <div className={styles.navbarUserName}>Vikrant</div>
          <div className="navbar-user-dropdown">
            <img
              src={arrowDown}
              alt="arrowDown"
            />
          </div>
        </div>
      </div>
      <div className={styles.navbarUserMenu}>
        <img
          src={userMenu}
          alt="userMenu"
        />
      </div>
    </div>
  );
};

export default Navbar;
