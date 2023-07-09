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
}

export default LoginForm