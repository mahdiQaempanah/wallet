import React, { useEffect } from 'react';
import EnglishDigitsToFarsi from './Utils';
import { Navigate } from "react-router-dom";
import { Dropdown, Menu, Container, Image, Header, Table, Button, Modal, Form, Input, Select, Icon, Segment } from 'semantic-ui-react'

let fullname = "ابوالفضل سلطانی";

const randomData = [
  {
    "id": 10,
    "amount": -1000,
    "category": "غذا",
    "description": "خرید مواد غذایی برای مهمونی فردا که علی میزبان ماست.",
    "payee": "محمد",
    "date": "1400/01/01"
  },
  {
    "id": 12,
    "amount": 2000,
    "category": "مسکن",
    "description": "پرداخت اجاره",
    "payee": "محمد",
    "date": "1400/01/02"
  },
  {
    "id": 14,
    "amount": 3000,
    "category": "مسکن",
    "description": "پرداخت قبض برق",
    "payee": "محمد",
    "date": "1400/01/08"
  }
]

var newID = 5;

const categoryOptions = [
  { key: 'food', text: 'غذا', value: 'غذا' },
  { key: 'housing', text: 'مسکن', value: 'مسکن' },
  { key: 'transportation', text: 'حمل‌ونقل', value: 'حمل‌و‌نقل' },
  { key: 'education', text: 'آموزش', value: 'آموزش' },
  { key: 'entertainment', text: 'سرگرمی', value: 'سرگرمی' },
  { key: 'health', text: 'سلامت', value: 'سلامت' },
  { key: 'clothing', text: 'پوشاک', value: 'پوشاک' },
  { key: 'other', text: 'سایر', value: 'سایر' },
]

export default function Transactions() {
  const [open, setOpen] = React.useState(false)
  const [data, setData] = React.useState(randomData)
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
    let sum = 0
    data.forEach((transaction) => {
      sum += +transaction.amount
    })
    setSum(sum)
  }, [data])
  
  // if (localStorage.getItem("token") === null) {
  //   return <Navigate to="/login" />;
  // }

  const addTransactionField = (name, value) => {
    let tmp = { ...newTransaction }
    tmp[name] = value
    setNewTransaction(tmp)
  }

  function RemoveTransaction(transaction) {
    let newData = [...data]
    let index = newData.indexOf(transaction)
    console.log(transaction)
    console.log(index)
    console.log(newData)

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

  function AddTransaction(transaction) {
    console.log(transaction)
    let newT = {
      "id": newID + 1,
      "amount": transaction['amount'],
      "category": transaction['category'],
      "description": transaction['description'],
      "payee": transaction['payee'],
      "date": transaction['date']
    }
    newID += 1
    let newData = [...data]
    newData.push(newT)
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
          <Menu.Item as='a'>بودجه</Menu.Item>
          <Menu.Item active as='a'>تراکنش‌ها</Menu.Item>
          <Menu.Item as='a'>گزارش‌ها</Menu.Item>
          <Menu.Item as='a'>تنظیمات</Menu.Item>
          <Menu.Item position='left' as='a' onClick={() => {
            localStorage.removeItem("token");
            window.location.reload();
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
              <Table.HeaderCell width={2}>پرداختگر</Table.HeaderCell>
              <Table.HeaderCell width={2}>دسته‌بندی</Table.HeaderCell>
              <Table.HeaderCell width={7}>توضیحات</Table.HeaderCell>
              <Table.HeaderCell width={2}>مبلغ</Table.HeaderCell>
              <Table.HeaderCell width={1}></Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {data.map((transaction, index) => (
              <Table.Row key={transaction.id}>
                <Table.Cell>{transaction.date}</Table.Cell>
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
                    onOpen={() => setSelectedTransaction(transaction)}
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
                            control={Select}
                            label='پرداختگر'
                            options={[
                              {
                                key: "mohammad",
                                text: "محمد",
                                value: "mohammad",
                              },
                              { key: "ali", text: "علی", value: "ali" },
                              { key: "reza", text: "رضا", value: "reza" },
                            ]}
                            placeholder='پرداختگر'
                            onChange={(e, { value }) => addTransactionField('payee', value)}
                            error={errors['payee']}
                          />
                          <Form.Field
                            id='category'
                            control={Select}
                            options={categoryOptions}
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
