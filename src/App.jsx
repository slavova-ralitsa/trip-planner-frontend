import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home"; 
import WelcomeSplash from "./pages/WelcomeSplash";

function HomeWithSplash() {
  const [showSplash, setShowSplash] = useState(
    () => !sessionStorage.getItem("splashSeen")
  );

  const handleDone = () => {
    sessionStorage.setItem("splashSeen", "true");
    setShowSplash(false);
  };

  return showSplash
    ? <WelcomeSplash onDone={handleDone} />
    : <Home />;
}

function App() {
  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/home" element={<HomeWithSplash />} /> 
      <Route path="*" element={<Login />} /> 
    </Routes>
  );
}

export default App;