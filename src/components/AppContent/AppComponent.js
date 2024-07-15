import { Route, Routes, useLocation } from "react-router-dom";
import Login from "../Auth/Login/Login.js";
import TeamPage from "../Team/TeamPage/TeamPage.js";
import CreateProfile from "../Profile/CreateProfile/CreateProfile";
import NotFound from "../NotFound/NotFound.js";
import { Layout } from "../Layout/Layout";
import React, { useState } from "react";

export function AppContent() {
  const location = useLocation();
  const [showSidebar, setShowSidebar] = useState(false);
  const [teamPageActive, setTeamPageActive] = useState(null);

  if (location.pathname === "/") {
    return (
      <Routes>
        <Route
          path="/"
          element={<Login />}
        />
      </Routes>
    );
  } else {
    return (
      <Layout
        showSidebar={showSidebar}
        setShowSidebar={setShowSidebar}
        teamPageActive={teamPageActive}
        setTeamPageActive={setTeamPageActive}
      >
        <Routes>
          <Route
            path="/team"
            element={<TeamPage setTeamPageActive={setTeamPageActive} />}
          />
          <Route
            path="/create-profile"
            element={<CreateProfile setTeamPageActive={setTeamPageActive} />}
          />
          <Route
            path="*"
            element={<NotFound setTeamPageActive={setTeamPageActive} />}
          />
        </Routes>
      </Layout>
    );
  }
}
