import { React, useEffect, useState, useMemo } from "react";
import {
  Grid,
  Menu,
  Table,
  Segment,
  Container,
} from "semantic-ui-react";
import { Link, useNavigate } from "react-router-dom";
import { act } from "react-dom/test-utils";

function BudgetPage() {
    let months = ["ژانویه", "فوریه", "مارس", "آوریل", "مه", "ژوئن", "ژوئیه", "اوت", "سپتامبر", "اکتبر", "نوامبر", "دسامبر"];
    let month_itmes = months.map((item, index) => ({value: item, active: false}));

    let budget_sample = [{budget: '210', spent:'-10', balance: '20'}, {categryName: 'food', budget: '210', spent:'10', balance: '20'},
    {budget: '210', spent:'-10', balance: '20'}, {categryName: 'food', budget: '210', spent:'10', balance: '20'},
    {budget: '210', spent:'-10', balance: '20'}, {categryName: 'food', budget: '210', spent:'10', balance: '20'},
    {budget: '210', spent:'-10', balance: '20'}, {categryName: 'food', budget: '210', spent:'10', balance: '20'}]


    const [monthItems, setMonthItems] = useState(month_itmes)
    const [activeMonth, setActiveMonth] = useState(0)
    const [budgetData, setBudgetData] = useState(budget_sample)

    useEffect(() => {
        const newMonthItems = [...monthItems];
        newMonthItems[activeMonth].active = true;
        setMonthItems(newMonthItems)
    }, [activeMonth]);
    function handleSelectMonth(e, data){
        monthItems[activeMonth].active = false 
        setActiveMonth(data.value)
    }

    return (
        <Container style={{ marginTop: '7em' }} textAlign='right'>
            <Segment>
                <Container textAlign='center'>
                    <Menu tabular compact>
                        {monthItems.map((item, index) => (
                            <Menu.Item
                            name = {item.value}
                            key = {index}
                            value = {index}
                            active = {item.active}
                            onClick= {(e, data) => handleSelectMonth(e, data)}
                            >
                            {item.value}
                            </Menu.Item>)
                            )}
                    </Menu>
                </Container>
                <Table celled selectable>
                    <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Budgeted</Table.HeaderCell>
                        <Table.HeaderCell>Spent</Table.HeaderCell>
                        <Table.HeaderCell>Balance</Table.HeaderCell>
                    </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {budgetData.map((item, index) => (<Table.Row>
                            <Table.Cell>{item.budget}</Table.Cell>
                            {item.spent > 0 ? <Table.Cell><font color="#0c8018">{item.spent}</font></Table.Cell> : <Table.Cell><font color="#7f0404">{item.spent}</font></Table.Cell>}
                            <Table.Cell>{item.balance}</Table.Cell>
                            </Table.Row>))}
                    </Table.Body>
                </Table>
            </Segment>
        </Container>
    );
}

export default BudgetPage;
