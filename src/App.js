import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import React from "react";
import "react-toastify/dist/ReactToastify.css";
import { AppContent } from "./components/AppContent/AppComponent";
function App() {
  return (
    <div className="app">
      <Router>
        <AppContent />
      </Router>
    </div>
  );
}

export default App;
