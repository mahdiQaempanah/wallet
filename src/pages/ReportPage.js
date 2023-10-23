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

let percentageData = [
  { expenseType: "غذا", value: 500, color: "#0E7C7B" },
  { expenseType: "مسکن", value: 700, color: "#17BEBB" },
  { expenseType: "حمل و نقل", value: 300, color: "#8AC4FF" },
  { expenseType: "سرگرمی", value: 200, color: "#D62246" },
  { expenseType: "درمان", value: 150, color: "#4B1D3F" },
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
  const username = localStorage.getItem("username");
  const token = localStorage.getItem("token");
  const fullname = localStorage.getItem("fullname");
  const [monthlyData, setMonthlyData] = useState([]);
  const [balanceData, setBalanceData] = useState([]);

  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Token ${token}`);

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };
  var url = "http://localhost:8000/api/report/expend/2023";

  useEffect(() => {
    fetch(url, requestOptions)
      .then((response) => {
        return response.text();
      })
      .then((result) => {
        let monthlyDataTemp = [
          { name: "January", value: 100 },
          { name: "Februray", value: 200 },
          { name: "March", value: 150 },
          { name: "April", value: 50 },
          { name: "May", value: 250 },
          { name: "June", value: 120 },
          { name: "July", value: 100 },
          { name: "Auguest", value: 200 },
          { name: "September", value: 50 },
          { name: "October", value: 250 },
          { name: "November", value: 120 },
          { name: "December", value: 100 },
        ];
        var data = JSON.parse(result);
        for (var key in data) {
          monthlyDataTemp[key - 1]["value"] = parseInt(-data[key]);
        }
        setMonthlyData(monthlyDataTemp);
      })
      .catch((error) => console.log("error", error));
  }, []);

  useEffect(() => {
    var url = "http://localhost:8000/api/report/inventory/2023";

    fetch(url, requestOptions)
      .then((response) => {
        return response.text();
      })
      .then((result) => {
        let balanceDataTemp = [
          { name: "January", value: 100 },
          { name: "Februray", value: 200 },
          { name: "March", value: 150 },
          { name: "April", value: 50 },
          { name: "May", value: 250 },
          { name: "June", value: 120 },
          { name: "July", value: 100 },
          { name: "Auguest", value: 200 },
          { name: "September", value: 50 },
          { name: "October", value: 250 },
          { name: "November", value: 120 },
          { name: "December", value: 100 },
        ];
        var data = JSON.parse(result);
        for (var key in data) {
          balanceDataTemp[key - 1]["value"] = parseInt(data[key]);
        }
        setBalanceData(balanceDataTemp);
      })
      .catch((error) => console.log("error", error));
  }, []);

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
            position="left"
            as="a"
            onClick={() => {
              localStorage.removeItem("token");
              navigator("/login");
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
                <LineChart width={650} height={290} data={balanceData}>
                  <XAxis dataKey="name" />
                  <YAxis>
                    <Label value="value" angle={-90} />
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
                <BarChart width={650} height={290} data={monthlyData}>
                  <XAxis dataKey="name" />
                  <YAxis>
                    <Label value="خرج" angle={-90} />
                  </YAxis>
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" fill="#8884d8" />
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
