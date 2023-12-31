import { React, useEffect, useState, useMemo } from "react";
import { Icon, Menu, Table, Container, Image } from "semantic-ui-react";
import EnglishDigitsToFarsi from "./Utils";
import { useNavigate } from "react-router-dom";
import food from '../assets/images/food.jpeg'
import src from '../assets/images/edu.jpeg'

function BudgetPage() {
  const token = localStorage.getItem("token");
  const fullname = localStorage.getItem("fullname");
  const navigator = useNavigate();
  const monthList = [
    "January",
    "Februray",
    "March",
    "April",
    "May",
    "June",
    "July",
    "Auguest",
    "September",
    "October",
    "November",
    "December",
  ];

  const [activeMonth, setActiveMonth] = useState(1);
  const [activeYear, setActiveYear] = useState(2023);
  const [budgetData, setBudgetData] = useState([]);

  useEffect(() => {
    fetchBudget();
  }, [activeMonth])

  function fetchBudget() {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Token ${token}`);

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch(`http://localhost:8000/api/budget/?month=${activeMonth}&year=${activeYear}`, requestOptions)
      .then(response => response.text())
      .then(result => {
        let data = JSON.parse(result);
        console.log(data);
        setBudgetData(data);
      })
      .catch(error => console.log('error', error));
  }

  function calculateBalance(data) {
    let balance = 0;
    balance = data["budget"] + data["spent"];
    return balance;
  }

  return (
    <div>
      <Menu stackable fixed='top' inverted color='teal'>
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
          <Menu.Item active as='a' onClick={() => { navigator("/budget") }}>بودجه</Menu.Item>
          <Menu.Item as='a' onClick={() => { navigator("/transactions") }}>تراکنش‌ها</Menu.Item>
          <Menu.Item as='a' onClick={() => { navigator("/report") }}>گزارش‌ها</Menu.Item>
          <Menu.Item position='left' as='a' onClick={() => {
            localStorage.removeItem("token");
            navigator("/login")
          }}>خروج</Menu.Item>
        </Container>
      </Menu>

      <Container style={{ marginTop: '7em' }} textAlign="center">
        <Menu tabular compact>
          {monthList.map((item, index) => (
            <Menu.Item
              color='orange'
              inverted
              name={item}
              key={index}
              value={index}
              active={activeMonth === index + 1}
              onClick={() => {
                setActiveMonth(index + 1);
              }}
            >
              {item}
            </Menu.Item>)
          )}
        </Menu>
      </Container>

      {/* <Container style={{ marginTop: '3em' }}>
        <Card.Group itemsPerRow={4}>
          {budgetData.map((item, index) => (
            <Card key={index}>
              <Image src={food} ui={false} />
              <Card.Content>
                <Card.Header>{item["category"]}</Card.Header>
                <Card.Meta>
                  <span className='date'>بودجه: {item["budget"]}</span>
                </Card.Meta>
                <Card.Description>
                  هزینه: {item["spent"]}
                </Card.Description>
              </Card.Content>
              <Card.Content extra>
                باقی‌مانده: {calculateBalance(item)}
              </Card.Content>
            </Card>
          ))}
        </Card.Group>
      </Container> */}


      <Container text style={{ marginTop: '2em' }} textAlign="right">
        <Table
          textAlign="right"
          color='yellow'
          celled
        >
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell width={3} />
              <Table.HeaderCell width={2}> بودجه </Table.HeaderCell>
              <Table.HeaderCell width={2}> هزینه </Table.HeaderCell>
              <Table.HeaderCell width={2}> میزان باقی‌مانده </Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {budgetData.map((item, index) => (
              <Table.Row key={index}>
                <Table.Cell>{item.category}</Table.Cell>
                <Table.Cell>{EnglishDigitsToFarsi(item.budget)} هزار تومان</Table.Cell>
                <Table.Cell>{EnglishDigitsToFarsi(item.spent)} هزار تومان</Table.Cell>
                <Table.Cell>
                  {(() => {
                    let balance = calculateBalance(item);
                    if (balance >= 0)
                      return (
                        <span>
                          {EnglishDigitsToFarsi(balance)} هزار تومان
                        </span>
                      );
                    else
                      return (
                        <span style={{ color: "red" }}>
                          {EnglishDigitsToFarsi(balance)} هزار تومان
                        </span>
                      );
                  })()}
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>

          <Table.Footer fullWidth>
            <Table.Row>
              <Table.HeaderCell>
                مجموع
              </Table.HeaderCell>
              <Table.HeaderCell>
                {EnglishDigitsToFarsi(budgetData.reduce((a, b) => a + b.budget, 0))} هزار تومان
              </Table.HeaderCell>
              <Table.HeaderCell>
                {EnglishDigitsToFarsi(budgetData.reduce((a, b) => a + b.spent, 0))} هزار تومان
              </Table.HeaderCell>
              <Table.HeaderCell>
                {(() => {
                  let balance = budgetData.reduce((a, b) => a + calculateBalance(b), 0);
                  if (balance >= 0)
                    return (
                      <span>
                        {EnglishDigitsToFarsi(balance)} هزار تومان
                      </span>
                    );
                  else
                    return (
                      <span style={{ color: "red" }}>
                        {EnglishDigitsToFarsi(balance)} هزار تومان
                      </span>
                    );
                })()}
              </Table.HeaderCell>
            </Table.Row>
          </Table.Footer>

        </Table>
      </Container>
    </div>
  );
}

export default BudgetPage;
