import { ToastContainer, Zoom } from "react-toastify";
import Sidebar from "./Sidebar";
import Header from "./Header";

export const Layout = ({
  children,
  showSidebar,
  setShowSidebar,
  teamPageActive,
  setTeamPageActive,
}) => (
  <>
    <Header setShowSidebar={setShowSidebar} />
    <div className="main-content">
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
