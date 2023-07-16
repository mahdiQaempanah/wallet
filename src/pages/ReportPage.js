import { React, useEffect, useState, useMemo } from "react";
import {
  Dropdown,
  Menu,
  Table,
  Container,
  Image,
  Segment,
  Grid,
  Form,
  Divider,
  Button,
} from "semantic-ui-react";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Label,
  BarChart,
  Bar,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { useNavigate } from "react-router-dom";

let fullname = "ابوالفضل سلطانی";
let monthlyData = [
  { name: "فروردین", value: 100 },
  { name: "اردیبهشت", value: 200 },
  { name: "خرداد", value: 150 },
  { name: "تیر", value: 50 },
  { name: "مرداد", value: 250 },
  { name: "شهریور", value: 120 },
  { name: "مهر", value: 100 },
  { name: "ابان", value: 200 },
  { name: "اذر", value: 50 },
  { name: "دی", value: 250 },
  { name: "بهمن", value: 120 },
  { name: "اسفند", value: 100 },
];

let percentageData = [
  { expenseType: "غذا", value: 500, color: "#0E7C7B" },
  { expenseType: "مسکن", value: 700, color: "#17BEBB" },
  { expenseType: "حمل و نقل", value: 300, color: "#8AC4FF" },
  { expenseType: "سرگرمی", value: 200, color: "#D62246" },
  { expenseType: "درمان", value: 150, color: "#4B1D3F" },
];

let balanceData = [
  { name: "فروردین", ماه: 1200 },
  { name: "اردیبهشت", ماه: 2200 },
  { name: "خرداد", ماه: 1150 },
  { name: "تیر", ماه: 550 },
  { name: "مرداد", ماه: 5250 },
  { name: "شهریور", ماه: 5120 },
  { name: "مهر", ماه: 3100 },
  { name: "ابان", ماه: 2200 },
  { name: "اذر", ماه: 1050 },
  { name: "دی", ماه: 250 },
  { name: "بهمن", ماه: 120 },
  { name: "اسفند", ماه: 0 },
];

let expenseTypeData = [
  { expenseType: "غذا", "نوع خرج": 500 },
  { expenseType: "مسکن", "نوع خرج": 700 },
  { expenseType: "حمل و نقل", "نوع خرج": 300 },
  { expenseType: "سرگرمی", "نوع خرج": 200 },
  { expenseType: "درمان", "نوع خرج": 150 },
];
function ReportPage() {
  const navigator = useNavigate();
  let render = function (e) {
    return e.expenseType;
  };
  return (
    <>
      <Menu stackable fixed="top" inverted color="teal">
        <Container>
          <Menu.Item as="a" header>
            {fullname}
            <Image
              circular
              size="mini"
              src="https://react.semantic-ui.com/images/avatar/large/steve.jpg"
              style={{ marginRight: "1.5em" }}
            />
          </Menu.Item>
          <Menu.Item
            as="a"
            onClick={() => {
              navigator("/budget");
            }}
          >
            بودجه
          </Menu.Item>
          <Menu.Item
            as="a"
            onClick={() => {
              navigator("/transactions");
            }}
          >
            تراکنش‌ها
          </Menu.Item>
          <Menu.Item
            active
            as="a"
            onClick={() => {
              navigator("/report");
            }}
          >
            گزارش‌ها
          </Menu.Item>
          <Menu.Item
            as="a"
            onClick={() => {
              navigator("/settings");
            }}
          >
            تنظیمات
          </Menu.Item>
          <Menu.Item
            position="left"
            as="a"
            onClick={() => {
              localStorage.removeItem("token");
              window.location.reload();
            }}
          >
            خروج
          </Menu.Item>
        </Container>
      </Menu>

      <div style={{ height: "100vh" }}>
        <Grid divided="vertically" columns={2} style={{ height: "100%" }}>
          <Grid.Row style={{ height: "59%" }}>
            <Grid.Column>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "50vh",
                  marginTop: "60px",
                }}
              >
                <LineChart width={650} height={290} data={monthlyData}>
                  <XAxis dataKey="name" />
                  <YAxis>
                    <Label value="میزان خرج" angle={-90} />
                  </YAxis>
                  <Tooltip />
                  <Line type="monotone" dataKey="value" stroke="#8884d8" />
                </LineChart>
              </div>
            </Grid.Column>
            <Grid.Column>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "50vh",
                  marginTop: "60px",
                }}
              >
                <BarChart width={600} height={290} data={expenseTypeData}>
                  <XAxis dataKey="expenseType" />
                  <YAxis>
                    <Label value="میزان خرج" angle={-90} />
                  </YAxis>
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="نوع خرج" fill="#8884d8" />
                </BarChart>
              </div>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row style={{ height: "41%" }}>
            <Grid.Column>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "40vh",
                  marginTop: "20px",
                }}
              >
                <BarChart width={650} height={290} data={balanceData}>
                  <XAxis dataKey="name" />
                  <YAxis>
                    <Label value="خرج" angle={-90} />
                  </YAxis>
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="ماه" fill="#8884d8" />
                </BarChart>
              </div>
            </Grid.Column>
            <Grid.Column>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "40vh",
                }}
              >
                <PieChart width={730} height={240}>
                  <Pie
                    data={percentageData}
                    dataKey="value"
                    nameKey="expenseType"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    fill="#0E7C7B"
                    labelLine={false}
                  >
                    {percentageData.map((e, i) => (
                      <Cell fill={e.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </div>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    </>
  );
}

export default ReportPage;
