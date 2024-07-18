import React, { useContext } from "react";
import { Link } from "react-router-dom";
import uoloLogo from "../../../assets/uoloLogo.png";
import styles from "./Sidebar.module.css";
import { useLogout } from "../../APIs/Auth";
import logoutIcon from "../../../assets/logoutIcon.png";
import { AuthContext } from "../../../AuthContext";

function Sidebar({ showSidebar, setShowSidebar, teamPageActive }) {
  const logout = useLogout();
  const { setShowLogoutModal } = useContext(AuthContext);

  function handleLogout(e) {
    setShowSidebar(false);
    logout();
    setShowLogoutModal(true);
  }

  return (
    <React.Fragment>
      {showSidebar ? (
        <div
          className={styles.backdrop}
          onClick={() => setShowSidebar(false)}
        ></div>
      ) : (
        <></>
      )}
      <aside
        name="sidebar"
        className={
          showSidebar === true
            ? `${styles.sidebar} ${styles.phoneActive}`
            : styles.sidebar
        }
      >
        <nav>
          <ul>
            <li className={styles.uoloLogoSidebar}>
              <img
                src={uoloLogo}
                alt="uolologo"
              />
            </li>
            <Link
              to={"/"}
              onClick={() => {
                setShowSidebar(false);
              }}
            >
              <li
                className={
                  teamPageActive !== null && teamPageActive ? styles.active : ""
                }
              >
                <svg
                  width="22"
                  height="16"
                  viewBox="0 0 22 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M0 13.2C0 12.6333 0.145833 12.1125 0.4375 11.6375C0.729167 11.1625 1.11667 10.8 1.6 10.55C2.63333 10.0333 3.68333 9.64583 4.75 9.3875C5.81667 9.12917 6.9 9 8 9C9.1 9 10.1833 9.12917 11.25 9.3875C12.3167 9.64583 13.3667 10.0333 14.4 10.55C14.8833 10.8 15.2708 11.1625 15.5625 11.6375C15.8542 12.1125 16 12.6333 16 13.2V14C16 14.55 15.8042 15.0208 15.4125 15.4125C15.0208 15.8042 14.55 16 14 16H2C1.45 16 0.979167 15.8042 0.5875 15.4125C0.195833 15.0208 0 14.55 0 14V13.2ZM17.45 16C17.6333 15.7 17.7708 15.3792 17.8625 15.0375C17.9542 14.6958 18 14.35 18 14V13C18 12.2667 17.7958 11.5625 17.3875 10.8875C16.9792 10.2125 16.4 9.63333 15.65 9.15C16.5 9.25 17.3 9.42083 18.05 9.6625C18.8 9.90417 19.5 10.2 20.15 10.55C20.75 10.8833 21.2083 11.2542 21.525 11.6625C21.8417 12.0708 22 12.5167 22 13V14C22 14.55 21.8042 15.0208 21.4125 15.4125C21.0208 15.8042 20.55 16 20 16H17.45ZM8 8C6.9 8 5.95833 7.60833 5.175 6.825C4.39167 6.04167 4 5.1 4 4C4 2.9 4.39167 1.95833 5.175 1.175C5.95833 0.391667 6.9 0 8 0C9.1 0 10.0417 0.391667 10.825 1.175C11.6083 1.95833 12 2.9 12 4C12 5.1 11.6083 6.04167 10.825 6.825C10.0417 7.60833 9.1 8 8 8ZM18 4C18 5.1 17.6083 6.04167 16.825 6.825C16.0417 7.60833 15.1 8 14 8C13.8167 8 13.5833 7.97917 13.3 7.9375C13.0167 7.89583 12.7833 7.85 12.6 7.8C13.05 7.26667 13.3958 6.675 13.6375 6.025C13.8792 5.375 14 4.7 14 4C14 3.3 13.8792 2.625 13.6375 1.975C13.3958 1.325 13.05 0.733333 12.6 0.2C12.8333 0.116667 13.0667 0.0625 13.3 0.0375C13.5333 0.0125 13.7667 0 14 0C15.1 0 16.0417 0.391667 16.825 1.175C17.6083 1.95833 18 2.9 18 4Z" />
                </svg>{" "}
                &nbsp; All Team Member
              </li>
            </Link>
            <Link
              to={"/create-profile"}
              onClick={() => {
                setShowSidebar(false);
              }}
            >
              <li
                className={
                  teamPageActive !== null && !teamPageActive
                    ? styles.active
                    : ""
                }
              >
                <svg
                  width="22"
                  height="16"
                  viewBox="0 0 22 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M17 7H15C14.7167 7 14.4792 6.90417 14.2875 6.7125C14.0958 6.52083 14 6.28333 14 6C14 5.71667 14.0958 5.47917 14.2875 5.2875C14.4792 5.09583 14.7167 5 15 5H17V3C17 2.71667 17.0958 2.47917 17.2875 2.2875C17.4792 2.09583 17.7167 2 18 2C18.2833 2 18.5208 2.09583 18.7125 2.2875C18.9042 2.47917 19 2.71667 19 3V5H21C21.2833 5 21.5208 5.09583 21.7125 5.2875C21.9042 5.47917 22 5.71667 22 6C22 6.28333 21.9042 6.52083 21.7125 6.7125C21.5208 6.90417 21.2833 7 21 7H19V9C19 9.28333 18.9042 9.52083 18.7125 9.7125C18.5208 9.90417 18.2833 10 18 10C17.7167 10 17.4792 9.90417 17.2875 9.7125C17.0958 9.52083 17 9.28333 17 9V7ZM8 8C6.9 8 5.95833 7.60833 5.175 6.825C4.39167 6.04167 4 5.1 4 4C4 2.9 4.39167 1.95833 5.175 1.175C5.95833 0.391667 6.9 0 8 0C9.1 0 10.0417 0.391667 10.825 1.175C11.6083 1.95833 12 2.9 12 4C12 5.1 11.6083 6.04167 10.825 6.825C10.0417 7.60833 9.1 8 8 8ZM0 14V13.2C0 12.6333 0.145833 12.1125 0.4375 11.6375C0.729167 11.1625 1.11667 10.8 1.6 10.55C2.63333 10.0333 3.68333 9.64583 4.75 9.3875C5.81667 9.12917 6.9 9 8 9C9.1 9 10.1833 9.12917 11.25 9.3875C12.3167 9.64583 13.3667 10.0333 14.4 10.55C14.8833 10.8 15.2708 11.1625 15.5625 11.6375C15.8542 12.1125 16 12.6333 16 13.2V14C16 14.55 15.8042 15.0208 15.4125 15.4125C15.0208 15.8042 14.55 16 14 16H2C1.45 16 0.979167 15.8042 0.5875 15.4125C0.195833 15.0208 0 14.55 0 14ZM2 14H14V13.2C14 13.0167 13.9542 12.85 13.8625 12.7C13.7708 12.55 13.65 12.4333 13.5 12.35C12.6 11.9 11.6917 11.5625 10.775 11.3375C9.85833 11.1125 8.93333 11 8 11C7.06667 11 6.14167 11.1125 5.225 11.3375C4.30833 11.5625 3.4 11.9 2.5 12.35C2.35 12.4333 2.22917 12.55 2.1375 12.7C2.04583 12.85 2 13.0167 2 13.2V14ZM8 6C8.55 6 9.02083 5.80417 9.4125 5.4125C9.80417 5.02083 10 4.55 10 4C10 3.45 9.80417 2.97917 9.4125 2.5875C9.02083 2.19583 8.55 2 8 2C7.45 2 6.97917 2.19583 6.5875 2.5875C6.19583 2.97917 6 3.45 6 4C6 4.55 6.19583 5.02083 6.5875 5.4125C6.97917 5.80417 7.45 6 8 6Z" />
                </svg>{" "}
                &nbsp; Create Profile
              </li>
            </Link>
            {showSidebar && (
              <Link className={styles.sidebarLogoutButton}>
                <li onClick={(e) => handleLogout(e)}>
                  <img src={logoutIcon} /> &nbsp; Logout
                </li>
              </Link>
            )}
          </ul>
        </nav>
      </aside>
    </React.Fragment>
  );
}

export default Sidebar;
