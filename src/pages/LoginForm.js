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
    navigator("../home", { username });
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
}

export default LoginForm;
