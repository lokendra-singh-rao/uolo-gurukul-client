import "./App.css";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import TeamPage from "./components/TeamPage";
import CreateProfile from "./components/CreateProfile";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import NotFound from "./components/NotFound";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [showSidebar, setShowSidebar] = useState(false);
  const [teamPageActive, setTeamPageActive] = useState(true);
  return (
    <div className="app">
      <Router>
        <Header setShowSidebar={setShowSidebar} />
        <div className="main-content">
          <ToastContainer />
          <Sidebar
            showSidebar={showSidebar}
            setShowSidebar={setShowSidebar}
            teamPageActive={teamPageActive}
            setTeamPageActive={setTeamPageActive}
          />
          <Routes>
            <Route
              path="/"
              element={<TeamPage setTeamPageActive={setTeamPageActive} />}
            />
            <Route
              path="/create-profile"
              element={<CreateProfile setTeamPageActive={setTeamPageActive} />}
            />
            <Route
              path="*"
              element={<NotFound />}
            />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
