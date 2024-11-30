import Home from "./assets/Home";
import Login from "./assets/Login";
import React from "react";
import { MyProvider } from "./assets/components/Context";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
   
    return (
      <MyProvider>
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
            </Routes>
        </Router>
        </MyProvider>
    );
};

export default App;
