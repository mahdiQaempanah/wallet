import React from 'react';
import logo from '../assets/images/logo.png';
// import { useEffect, useState } from "react";
// import { Navigate } from "react-router-dom";
import { Card, Grid, Divider, Dropdown, Menu, Container, Image, Header, Table, Button, Modal, Form, Input, Select, Placeholder, Tab, Icon, Item, Segment } from 'semantic-ui-react'

let fullname = "ابوالفضل سلطانی"

const randomData = [
  {
    "amount": -1000,
    "category": "غذا",
    "description": "خرید مواد غذایی برای مهمونی فردا که علی میزبان ماست.",
    "payee": "محمد",
    "date": "1400/01/01"
  },
  {
    "amount": 2000,
    "category": "مسکن",
    "description": "پرداخت اجاره",
    "payee": "محمد",
    "date": "1400/01/02"
  },
  {
    "amount": 3000,
    "category": "مسکن",
    "description": "پرداخت قبض برق",
    "payee": "محمد",
    "date": "1400/01/08"
  }
]

const categoryOptions = [
  { key: 'food', text: 'غذا', value: 'food' },
  { key: 'housing', text: 'مسکن', value: 'housing' },
  { key: 'transportation', text: 'حمل‌ونقل', value: 'transportation' },
  { key: 'education', text: 'آموزش', value: 'education' },
  { key: 'entertainment', text: 'سرگرمی', value: 'entertainment' },
  { key: 'health', text: 'سلامت', value: 'health' },
  { key: 'clothing', text: 'پوشاک', value: 'clothing' },
  { key: 'other', text: 'سایر', value: 'other' },
]

export default function Transactions() {
  // const [authenticated, setauthenticated] = useState(localStorage.getItem("token"));

  // if (!authenticated)
  //   return <Navigate replace to="/login" />;
  const [open, setOpen] = React.useState(false)
  const [data, setData] = React.useState(randomData)
  const [sum, setSum] = React.useState(sumData())
  const [openDelete, setOpenDelete] = React.useState(false)



  function EnglishDigitsToFarsi(num) {
    function convertor(num) {
      let str = num.toString();
      var e2f = {
        '0': '۰',
        '1': '۱',
        '2': '۲',
        '3': '۳',
        '4': '۴',
        '5': '۵',
        '6': '۶',
        '7': '۷',
        '8': '۸',
        '9': '۹'
      };
      return str.replace(/[0-9]/g, function (match) { return e2f[match]; });
    }

    if (num >= 0)
      return convertor(num) + '+'
    else
      return convertor(-num) + '-'
  }

  function RemoveTransaction(index) {
    let newData = data
    newData.splice(index, 1)
    setData(newData)
    setSum(sumData())
  }

  function AddTransaction(form) {
    console.log(form.elements)
    let newTransaction = {
      "amount": form['amount'].value,
      "category": form['category'].value,
      "description": form['description'].value,
      "payee": form['payee'].value,
      "date": form['date'].value
    }
    data.push(newTransaction)
    setSum(sum + parseInt(newTransaction.amount))
  }

  function sumData() {
    let sum = 0
    data.forEach((transaction) => {
      sum += transaction.amount
    })
    return sum
  }

  return (
    <div>
      <Menu fixed='top' inverted>
        <Container>
          <Menu.Item as='a' header>
            {fullname}
            <Image circular size='mini' src='https://react.semantic-ui.com/images/avatar/large/steve.jpg' style={{ marginRight: '1.5em' }} />
          </Menu.Item>
          <Menu.Item as='a'>Home</Menu.Item>

          <Dropdown item simple text='Dropdown'>
            <Dropdown.Menu>
              <Dropdown.Item>List Item</Dropdown.Item>
              <Dropdown.Item>List Item</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Header>Header Item</Dropdown.Header>
              <Dropdown.Item>
                <i className='dropdown icon' />
                <span className='text'>Submenu</span>
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

      <Container style={{ marginTop: '7em' }} textAlign='right'>

        <Table color='purple' fixed singleLine selectable textAlign='right'>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell width={2} sorted='ascending'>تاریخ</Table.HeaderCell>
              <Table.HeaderCell width={2}>پرداختگر</Table.HeaderCell>
              <Table.HeaderCell width={2}>دسته‌بندی</Table.HeaderCell>
              <Table.HeaderCell width={7}>توضیحات</Table.HeaderCell>
              <Table.HeaderCell width={2}>مبلغ</Table.HeaderCell>
              <Table.HeaderCell width={1}></Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {data.map((transaction, index) => (
              <Table.Row key={index}>
                <Table.Cell>{transaction.date}</Table.Cell>
                <Table.Cell>{transaction.payee}</Table.Cell>
                <Table.Cell>{transaction.category}</Table.Cell>
                <Table.Cell>{transaction.description}</Table.Cell>
                <Table.Cell>
                  {
                    (() => {
                      if (transaction.amount > 0)
                        return <span style={{ color: 'green' }}>{EnglishDigitsToFarsi(transaction.amount)} هزار تومان</span>
                      else
                        return <span style={{ color: 'red' }}>{EnglishDigitsToFarsi(transaction.amount)} هزار تومان</span>
                    })()
                  }
                </Table.Cell>
                <Table.Cell collapsing>
                  <Modal
                    closeIcon
                    open={openDelete}
                    trigger={<Button icon color='purple' inverted> <Icon name='trash alternate' /> </Button>}
                    onClose={() => setOpenDelete(false)}
                    onOpen={() => setOpenDelete(true)}
                  >
                    <Modal.Content>
                      <Segment vertical textAlign='right'>
                        آیا مطمئنید که می‌خواهید این تراکنش را حذف کنید؟
                      </Segment>
                    </Modal.Content>
                    <Modal.Actions>
                      <Button color='red' onClick={() => setOpenDelete(false)}>
                        خیر، بذار بمونه
                        <Icon name='remove' />
                      </Button>
                      <Button color='green' onClick={() => {
                        setOpenDelete(false);
                        RemoveTransaction(index)
                      }}>
                        بله، حذفش کن
                        <Icon name='checkmark' />
                      </Button>
                    </Modal.Actions>
                  </Modal>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>

          <Table.Footer fullWidth>
            <Table.Row>
              <Table.HeaderCell colSpan='4'>
                <Modal
                  onClose={() => setOpen(false)}
                  onOpen={() => setOpen(true)}
                  open={open}
                  trigger={<Button primary>تراکنش جدید</Button>}
                  style={{ textAlign: 'right' }}
                >
                  <Modal.Header>تراکنش جدید</Modal.Header>
                  <Modal.Content>
                    <Modal.Description>
                      <Form
                        id="add-transaction"
                      >
                        <Form.Group widths='equal'>
                          <Form.Field
                            id='date'
                            label='تاریخ'
                            control={Input}
                            type='date'
                            placeholder='تاریخ'
                          />
                          <Form.Field
                            id='payee'
                            control={Input}
                            label='پرداختگر'
                            options={[
                              { key: 'mohammad', text: 'محمد', value: 'mohammad' },
                              { key: 'ali', text: 'علی', value: 'ali' },
                              { key: 'reza', text: 'رضا', value: 'reza' },
                            ]}
                          />
                          <Form.Field
                            id='category'
                            control={Input}
                            // options={categoryOptions}
                            label='دسته‌بندی'
                            placeholder='دسته‌بندی'
                          />
                          <Form.Field
                            id='amount'
                            label='مبلغ'
                            control={Input}
                            type='number'
                            placeholder='مبلغ'
                          />
                        </Form.Group>
                        <Form.Field
                          id='description'
                          control={Input}
                          label='توضیحات'
                          placeholder='توضیحات'
                        />
                      </Form>
                    </Modal.Description>
                  </Modal.Content>

                  <Modal.Actions>
                    <Button color='black' onClick={() => setOpen(false)}>
                      انصراف
                    </Button>
                    <Button
                      content="ثبت"
                      labelPosition='right'
                      icon='checkmark'
                      onClick={() => {
                        setOpen(false)
                        let form = document.getElementById("add-transaction")
                        // let form = document.forms['add-transactions']
                        AddTransaction(form)
                      }}
                      positive
                    />
                  </Modal.Actions>
                </Modal>
              </Table.HeaderCell>
              <Table.HeaderCell colSpan='2'>
                <Header as='h3' color='purple' textAlign='right'>
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
};
