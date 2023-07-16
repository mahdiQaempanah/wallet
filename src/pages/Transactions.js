import React, { useEffect } from 'react';
import EnglishDigitsToFarsi from './Utils';
import { useNavigate } from "react-router-dom";
import { Menu, Container, Image, Header, Table, Button, Modal, Form, Input, Select, Icon, Segment } from 'semantic-ui-react'

export default function Transactions() {
  const token = localStorage.getItem("token")
  const fullname = localStorage.getItem("fullname")
  const navigator = useNavigate()
  const [categories, setCategories] = React.useState([])
  const [open, setOpen] = React.useState(false)
  const [data, setData] = React.useState([])
  const [sum, setSum] = React.useState(0)
  const [selectedTransaction, setSelectedTransaction] = React.useState(null)
  const [errors, setErrors] = React.useState({
    "amount": undefined,
    "category": undefined,
    "description": undefined,
    "payee": undefined,
    "date": undefined
  })
  const [newTransaction, setNewTransaction] = React.useState({
    "amount": undefined,
    "category": undefined,
    "description": undefined,
    "payee": undefined,
    "date": undefined
  })

  useEffect(() => {
    fetchData()
  }, [data])

  useEffect(() => {
    let sum = 0
    data.forEach((transaction) => {
      sum += +transaction.amount
    })
    setSum(sum)
  }, [data])

  // if (localStorage.getItem("token") === null) {
  //   return <Navigate to="/login" />;
  // }

  useEffect(() => {
    if (categories.length !== 0)
      return categories

    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Token ${token}`);

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch("http://localhost:8000/api/categories/", requestOptions)
      .then(response => response.json())
      .then(result => {
        const categories = []
        for (let i = 0; i < result.length; i++) {
          categories.push({
            key: result[i].name,
            text: result[i].name,
            value: result[i].name
          })
        }
        setCategories(categories)
      })
      .catch(error => console.log('error', error));
  }, [])

  async function fetchData() {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Token ${token}`);

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    try {
      const response = await fetch("http://localhost:8000/api/records/", requestOptions)
      const result = await response.json()
      setData(result)
    }
    catch (error) {
      console.log('error', error);
    }
  }

  const addTransactionField = (name, value) => {
    let tmp = { ...newTransaction }
    tmp[name] = value
    setNewTransaction(tmp)
  }

  function RemoveTransaction(transaction_id) {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Token ${token}`);

    var requestOptions = {
      method: 'DELETE',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch(`http://localhost:8000/api/records/${transaction_id}/`, requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));

    let newData = [...data]
    let index = newData.findIndex((transaction) => transaction.id === transaction_id)
    newData.splice(index, 1)
    setData(newData)
  }

  function ValidateTransaction(transaction) {
    let errors = {
      "amount": undefined,
      "category": undefined,
      "description": undefined,
      "payee": undefined,
      "date": undefined
    }
    if (transaction['date'] === undefined)
      errors['date'] = 'تاریخ را وارد کنید'
    if (transaction['amount'] === undefined)
      errors['amount'] = 'مبلغ را وارد کنید'
    if (transaction['category'] === undefined)
      errors['category'] = 'دسته‌بندی را وارد کنید'
    if (transaction['description'] === undefined)
      errors['description'] = 'توضیحات را وارد کنید'
    else if (transaction['description'].trim() === '')
      errors['description'] = 'توضیحات نمی‌تواند خالی باشد '
    if (transaction['payee'] === undefined)
      errors['payee'] = 'دریافت‌کننده را وارد کنید'
    setErrors(errors)
    for (let key in errors)
      if (errors[key] !== undefined)
        return false
    return true
  }

  async function AddTransaction(transaction) {

    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Token ${token}`);
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "amount": transaction.amount,
      "category": transaction.category,
      "description": transaction.description,
      "date": transaction.date,
      "payee": transaction.payee,
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch("http://localhost:8000/api/records/", requestOptions)
      .then(response => response.text())
      .then(result => {
        transaction['id'] = JSON.parse(result)['id']
      })
      .catch(error => console.log('error', error));

    let newData = [...data]
    newData.push(transaction)
    setData(newData)
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
          <Menu.Item as='a' onClick={() => { navigator("/budget") }}>بودجه</Menu.Item>
          <Menu.Item active as='a' onClick={() => { navigator("/transactions") }}>تراکنش‌ها</Menu.Item>
          <Menu.Item as='a' onClick={() => { navigator("/report") }}>گزارش‌ها</Menu.Item>
          <Menu.Item as='a' onClick={() => { navigator("/settings") }}>تنظیمات</Menu.Item>
          <Menu.Item position='left' as='a' onClick={() => {
            localStorage.removeItem("token");
            // window.location.reload();
            navigator("/login")
          }}>خروج</Menu.Item>
        </Container>
      </Menu>

      <Container
        style={
          {
            marginTop: '7em',
          }
        }
        textAlign='right'
      >

        <Header as='h1' textAlign='right' color='blue'>مدیریت هزینه‌ها</Header>
        <Table color='yellow' fixed singleLine selectable textAlign='right'>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell width={2} sorted="ascending">
                تاریخ
              </Table.HeaderCell>
              <Table.HeaderCell width={2}>دریافت‌کننده</Table.HeaderCell>
              <Table.HeaderCell width={2}>دسته‌بندی</Table.HeaderCell>
              <Table.HeaderCell width={7}>توضیحات</Table.HeaderCell>
              <Table.HeaderCell width={2}>مبلغ</Table.HeaderCell>
              <Table.HeaderCell width={1}></Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {data.map((transaction, index) => (
              <Table.Row key={transaction.id}>
                <Table.Cell>
                  {new Date(transaction.date).toLocaleDateString('en-US', {
month: '2-digit',day: '2-digit',year: 'numeric'})}</Table.Cell>
                <Table.Cell>{transaction.payee}</Table.Cell>
                <Table.Cell>{transaction.category}</Table.Cell>
                <Table.Cell>{transaction.description}</Table.Cell>
                <Table.Cell>
                  {(() => {
                    if (transaction.amount > 0)
                      return (
                        <span style={{ color: "green" }}>
                          {EnglishDigitsToFarsi(transaction.amount)} هزار تومان
                        </span>
                      );
                    else
                      return (
                        <span style={{ color: "red" }}>
                          {EnglishDigitsToFarsi(transaction.amount)} هزار تومان
                        </span>
                      );
                  })()}
                </Table.Cell>
                <Table.Cell collapsing>
                  <Modal
                    closeIcon
                    open={selectedTransaction !== null}
                    trigger={<Button icon color='orange' inverted> <Icon name='trash alternate' /> </Button>}
                    onClose={() => setSelectedTransaction(null)}
                    onOpen={() => setSelectedTransaction(transaction.id)}
                  >
                    <Modal.Content>
                      <Segment vertical textAlign="right">
                        آیا مطمئنید که می‌خواهید این تراکنش را حذف کنید؟
                      </Segment>
                    </Modal.Content>
                    <Modal.Actions>
                      <Button color='red' onClick={() => setSelectedTransaction(null)}>
                        خیر، بذار بمونه
                        <Icon name="remove" />
                      </Button>
                      <Button color='green' onClick={() => {
                        RemoveTransaction(selectedTransaction)
                        setSelectedTransaction(null);
                      }}>
                        بله، حذفش کن
                        <Icon name="checkmark" />
                      </Button>
                    </Modal.Actions>
                  </Modal>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>

          <Table.Footer fullWidth>
            <Table.Row>
              <Table.HeaderCell colSpan="4">
                <Modal
                  onClose={() => setOpen(false)}
                  onOpen={() => setOpen(true)}
                  open={open}
                  trigger={<Button primary>تراکنش جدید</Button>}
                  style={{ textAlign: "right" }}
                >
                  <Modal.Header>تراکنش جدید</Modal.Header>
                  <Modal.Content>
                    <Modal.Description>
                      <Form id="add-transaction">
                        <Form.Group widths="equal">
                          <Form.Field
                            id="date"
                            label="تاریخ"
                            control={Input}
                            type='date'
                            placeholder='تاریخ'
                            onChange={(e, { value }) => addTransactionField('date', value)}
                            error={errors['date']}
                          />
                          <Form.Field
                            id='payee'
                            control={Input}
                            label='دریافت‌کننده'
                            placeholder='دریافت‌کننده'
                            onChange={(e, { value }) => addTransactionField('payee', value)}
                            error={errors['payee']}
                          />
                          <Form.Field
                            id='category'
                            control={Select}
                            options={categories}
                            label='دسته‌بندی'
                            placeholder='دسته‌بندی'
                            onChange={(e, { value }) => addTransactionField('category', value)}
                            error={errors['category']}
                          />
                          <Form.Field
                            id="amount"
                            label="مبلغ"
                            control={Input}
                            type='number'
                            placeholder='مبلغ'
                            onChange={(e, { value }) => addTransactionField('amount', value)}
                            error={errors['amount']}
                          />
                        </Form.Group>
                        <Form.Field
                          id="description"
                          control={Input}
                          label='توضیحات'
                          placeholder='توضیحات'
                          onChange={(e, { value }) => addTransactionField('description', value)}
                          error={errors['description']}
                        />
                      </Form>
                    </Modal.Description>
                  </Modal.Content>

                  <Modal.Actions>
                    <Button color="black" onClick={() => setOpen(false)}>
                      انصراف
                    </Button>
                    <Button
                      content="ثبت"
                      labelPosition="right"
                      icon="checkmark"
                      onClick={() => {
                        if (ValidateTransaction(newTransaction) === false)
                          return
                        AddTransaction(newTransaction)
                        setOpen(false)
                      }}
                      positive
                    />
                  </Modal.Actions>
                </Modal>
              </Table.HeaderCell>
              <Table.HeaderCell colSpan='2'>
                <Header as='h3' color='teal' textAlign='right'>
                  <Header.Content>
                    مجموع
                    <Header.Subheader>
                      {EnglishDigitsToFarsi(sum)} هزار تومان
                    </Header.Subheader>
                  </Header.Content>
                </Header>
              </Table.HeaderCell>
            </Table.Row>
          </Table.Footer>
        </Table>
      </Container>
    </div>
  );
}
