import React from "react";
import {
  Button,
  Form,
  Grid,
  Header,
  Image,
  Message,
  Segment,
} from "semantic-ui-react";
import NavBar from "../components/NavBar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./MainPage.css";
import { useLocation } from "react-router-dom";
function MainPage() {
  const location = useLocation();
  let username = location.state.username;
  console.log(username);
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/home" />
        <Route path="/budget" />
        <Route path="/report" />
        <Route path="/account" />
      </Routes>
    </>
  );
}

export default MainPage;
