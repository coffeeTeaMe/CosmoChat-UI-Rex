import React from "react";
import Chat from "./pages/Chat"; // Adjust the path if needed
import "./App.css";
import Activity from "./pages/Activity";
import Home from "./pages/Home";
import Navigation from "./components/Navigation";
import ChatHistory from "./components/ChatHistory";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    // <div className="App">
    //   <Activity />
    // </div>
    <Router>
      <Navigation />
      <Routes>
        <Route exact path="/home" element={<Home />} />
        <Route exact path="/chat" element={<Chat />} />
        <Route exact path="/chat/:sessionId" element={<Chat />} />
        <Route path="/activities" element={<Activity />} />
        <Route exact path="/chat-history" element={<ChatHistory />} />
      </Routes>
    </Router>
  );
}

export default App;
