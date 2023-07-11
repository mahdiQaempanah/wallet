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
} from "recharts";

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

let balanceData = [
  { name: "فروردین", موجودی: 1200 },
  { name: "اردیبهشت", موجودی: 2200 },
  { name: "خرداد", موجودی: 1150 },
  { name: "تیر", موجودی: 550 },
  { name: "مرداد", موجودی: 5250 },
  { name: "شهریور", موجودی: 5120 },
  { name: "مهر", موجودی: 3100 },
  { name: "ابان", موجودی: 2200 },
  { name: "اذر", موجودی: 1050 },
  { name: "دی", موجودی: 250 },
  { name: "بهمن", موجودی: 120 },
  { name: "اسفند", موجودی: 0 },
];

let expenseTypeData = [
  { expenseType: "غذا", مقدار: 500 },
  { expenseType: "اجاره خانه", مقدار: 700 },
  { expenseType: "حمل و نقل", مقدار: 300 },
  { expenseType: "سرگرمی", مقدار: 200 },
];
function ReportPage() {
  return (
    <>
      <Menu fixed="top" inverted>
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
          <Menu.Item as="a">Home</Menu.Item>

          <Dropdown item simple text="Dropdown">
            <Dropdown.Menu>
              <Dropdown.Item>List Item</Dropdown.Item>
              <Dropdown.Item>List Item</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Header>Header Item</Dropdown.Header>
              <Dropdown.Item>
                <i className="dropdown icon" />
                <span className="text">Submenu</span>
                <Dropdown.Menu>
                  <Dropdown.Item>List Item</Dropdown.Item>
                  <Dropdown.Item>List Item</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown.Item>
              <Dropdown.Item>List Item</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
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
                <LineChart width={400} height={300} data={monthlyData}>
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
                <BarChart width={600} height={340} data={expenseTypeData}>
                  <XAxis dataKey="expenseType" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="مقدار" fill="#8884d8" />
                </BarChart>
              </div>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row style={{ height: "45%" }}>
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
                <BarChart width={600} height={340} data={balanceData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="موجودی" fill="#8884d8" />
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
                <h1>4</h1>
              </div>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    </>
  );
}

export default ReportPage;
