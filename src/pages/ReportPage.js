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
import { useState } from "react";
import "./MainPage.css";
import { useLocation } from "react-router-dom";
import Chart from "chart.js/auto";
import BarChart from "../components/BarChart";
function ReportPage() {
  const location = useLocation();
  let username = location.state.username;
  console.log(username);

  const userData = {
    labels: ["فروردین", "اردیبهشت", "خرداد"],
    datasets: [
      {
        label: "خرج ماهانه",
        data: [10, 20, 5],
      },
    ],
  };

  console.log(userData);

  return (
    <>
      <NavBar username={username} />
      <Routes>
        <Route path="/home" />
        <Route path="/budget" />
        <Route path="/report" />
        <Route path="/account" />
      </Routes>
      <div style={{ width: 700 }}>
        <BarChart chartData={userData} />
      </div>
    </>
  );
}

export default ReportPage;
