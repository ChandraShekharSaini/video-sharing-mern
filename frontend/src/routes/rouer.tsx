import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "../pages/Home";
import SignupPage from "../pages/auth/Signup";
import SigninPage from "../pages/auth/Signin";

const rouer = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/sign-up" element={<SignupPage />} />

        <Route path="/sign-in" element={<SigninPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default rouer;
