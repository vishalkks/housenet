import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "antd/dist/reset.css";
import background from "./static/home_background.png";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import GoogleApiWrapper from "./pages/Search";
import ErrorComponent from "./pages/Error";
import LogoutComponent from "./pages/Logout";
import DetailedPage from "./pages/Detailed";
import withNavigation from "./components/WithNavigation";
import withParams from "./components/withParams";
import Header from "./components/Headers";
import Footer from "./components/Footer";
import AuthenticatedRoute from "./components/AuthenticatedRoute";
import "./App.css";
import "./bootstrap.css";

const LoginComponentWithNavigation = withNavigation(Signin);
const HeaderComponentWithNavigation = withNavigation(Header);
const LogoutComponentWithNavigation = withNavigation(LogoutComponent);
const SearchComponentWithParams = withParams(GoogleApiWrapper);

const App = () => (
  <div
    className="app"
    style={{
      backgroundImage: `url(${background})`,
      height: "1000px",
      backgroundSize: "100% 100%",
    }}
  >
    <BrowserRouter>
      <HeaderComponentWithNavigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-up" element={<Signup />} />
        <Route path="/sign-in" element={<LoginComponentWithNavigation />} />
        <Route
          path="/search"
          element={
            <AuthenticatedRoute>
              <SearchComponentWithParams />
            </AuthenticatedRoute>
          }
        />
        <Route path="/detailed" element={<DetailedPage />} />
        <Route
          path="/logout"
          element={
            // AuthenticatedRoute needs to be removed because when we logout, we are not an authenticated user 
            // therefore we are not an authenticated user anymore

            // <AuthenticatedRoute>
              <LogoutComponentWithNavigation />
            // </AuthenticatedRoute>
          }
        />
        <Route path="*" element={<ErrorComponent />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  </div>
);

export default App;
