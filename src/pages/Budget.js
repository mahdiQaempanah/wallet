import { React, useEffect, useState, useMemo } from "react";
import { Dropdown, Menu, Table, Container, Image } from "semantic-ui-react";
import EnglishDigitsToFarsi from "./Utils";

let fullname = "ابوالفضل سلطانی";

function BudgetPage() {
  let months = [
    "ژانویه",
    "فوریه",
    "مارس",
    "آوریل",
    "مه",
    "ژوئن",
    "ژوئیه",
    "اوت",
    "سپتامبر",
    "اکتبر",
    "نوامبر",
    "دسامبر",
  ];
  let month_itmes = months.map((item, index) => ({
    value: item,
    active: false,
  }));

  let budget_sample = [
    { categryName: "پوشاک", budget: 210, spent: -10 },
    { categryName: "غذا", budget: 210, spent: 10 },
    { categryName: "پوشاک", budget: 210, spent: -10 },
    { categryName: "همسری", budget: 210, spent: 10 },
    { categryName: "شهریه", budget: 210, spent: -10 },
    { categryName: "میوه", budget: 210, spent: 10 },
    { categryName: "خونه", budget: 210, spent: -10 },
    { categryName: "جنده‌خونه", budget: 210, spent: 10 },
  ];

  const [monthItems, setMonthItems] = useState(month_itmes);
  const [activeMonth, setActiveMonth] = useState(0);
  const [budgetData, setBudgetData] = useState(budget_sample);

  useEffect(() => {
    const newMonthItems = [...monthItems];
    newMonthItems[activeMonth].active = true;
    setMonthItems(newMonthItems);
  }, [activeMonth]);

  function handleSelectMonth(e, data) {
    monthItems[activeMonth].active = false;
    setActiveMonth(data.value);
  }

  function calculateBalance(data) {
    let balance = 0;
    balance = data["budget"] + data["spent"];
    return balance;
  }

  return (
    <div>
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

            <Container style={{ marginTop: '7em' }} textAlign="center">
                <Menu tabular compact>
                    {monthItems.map((item, index) => (
                        <Menu.Item
                            color='blue'
                            inverted
                            name={item.value}
                            key={index}
                            value={index}
                            active={item.active}
                            onClick={(e, data) => handleSelectMonth(e, data)}
                        >
                            {item.value}
                        </Menu.Item>)
                    )}
                </Menu>
            </Container>
            <Container text style={{ marginTop: '2em' }} textAlign="right">
                <Table 
                    textAlign="right"
                    color='blue'
                    singleLine 
                >
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell width={3}/>
                            <Table.HeaderCell width={2}> بودجه </Table.HeaderCell>
                            <Table.HeaderCell width={2}> هزینه </Table.HeaderCell>
                            <Table.HeaderCell width={2}> میزان باقی‌مانده </Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

          <Table.Body>
            {budgetData.map((item, index) => (
              <Table.Row key={index}>
                <Table.Cell>{item.categryName}</Table.Cell>
                <Table.Cell>{EnglishDigitsToFarsi(item.budget)}</Table.Cell>
                <Table.Cell>{EnglishDigitsToFarsi(item.spent)} </Table.Cell>
                <Table.Cell>
                  {EnglishDigitsToFarsi(calculateBalance(item))}
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Container>
    </div>
  );
}

export default BudgetPage;
