<<<<<<< HEAD
import React, { useState } from 'react';
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react'
import { useNavigate } from "react-router-dom";


function LoginForm() {
  const navigate = useNavigate();
  // eslint-disable-next-line no-unused-vars
  const [username, setusername] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [password, setpassword] = useState("");
  const loginRequest = (e) => {
    e.preventDefault()
    // const account = users.find((user) => user.username === username);
    // if (account && account.password === password) {
    //     setauthenticated(true)
    localStorage.setItem("token", "Token 2ce4897a3cc813112038f7665b8d9d27a8aba824");
    navigate("/dashboard");
    // }
  };

  return (
    <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as='h2' color='teal' textAlign='center'>
          وارد کیف پول خود شوید
        </Header>
        <Form size='large' textAlign='center' onSubmit={loginRequest}>
          <Segment stacked>
            <Form.Input 
              fluid 
              icon='user' 
              iconPosition='right' 
              placeholder='نام کاربری' 
              onChange={(e) => setusername(e.target.value)}
            />
            <Form.Input
              fluid
              icon='lock'
              iconPosition='right'
              placeholder='رمز عبور'
              type='password'
              onChange={(e) => setpassword(e.target.value)}
            />

            <Button color='teal' fluid size='large'>
              ورود
            </Button>
          </Segment>
        </Form>
        <Message>
          حساب کاربری ندارید؟ <a href='/signup'>ثبت نام کنید</a>
        </Message>
      </Grid.Column>
    </Grid>
  )
=======
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
import { Link, useNavigate } from "react-router-dom";

function LoginForm() {
  let username = "";
  let password = "";
  let navigator = useNavigate();
  const loginButton = () => {
    // todo(connect to backend)
    navigator("../home", { state: { username: username } });
  };
  return (
    <>
      <Grid
        textAlign="center"
        style={{ height: "100vh" }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h2" color="teal" textAlign="center">
            <Image src="/logo.png" />
            <span>وارد شوید</span>
          </Header>
          <Form size="large">
            <Segment stacked>
              <Form.Input
                fluid
                icon="user"
                iconPosition="left"
                placeholder="Username"
                onChange={(text) => {
                  username = text.target.value;
                }}
              />
              <Form.Input
                fluid
                icon="lock"
                iconPosition="left"
                placeholder="Password"
                type="password"
                onChange={(text) => {
                  password = text.target.value;
                }}
              />

              <Button color="teal" fluid size="large" onClick={loginButton}>
                <span>ورود</span>
              </Button>
            </Segment>
          </Form>
          <Message>
            <span>حساب کاربری ندارید؟</span>
            <a href="/signup">
              <span>ثبت‌نام کنید</span>
            </a>
          </Message>
        </Grid.Column>
      </Grid>
    </>
  );
>>>>>>> origin/budgete_page
}

export default LoginForm;
