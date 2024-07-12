import { ToastContainer, Zoom } from "react-toastify";
import Sidebar from ".././Shared/Sidebar";
import Header from ".././Shared/Header";
import styles from "./Layout.module.css";

export const Layout = ({
  children,
  showSidebar,
  setShowSidebar,
  teamPageActive,
  setTeamPageActive,
}) => (
  <>
    <ToastContainer
      position="top-center"
      limit={3}
      autoClose={1500}
      theme="dark"
      transition={Zoom}
      hideProgressBar
      closeOnClick={false}
      draggable={false}
      newestOnTop
    />
    <Header setShowSidebar={setShowSidebar} />
    <div className={styles.mainContent}>
      <Sidebar
        showSidebar={showSidebar}
        setShowSidebar={setShowSidebar}
        teamPageActive={teamPageActive}
        setTeamPageActive={setTeamPageActive}
      />
      {children}
    </div>
  </>
);
