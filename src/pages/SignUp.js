import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Form,
  Grid,
  Header,
  Image,
  Message,
  Segment,
} from "semantic-ui-react";

function SignUp() {
  let username = "";
  let password = "";
  let navigate = useNavigate();
  const signUpButton = () => {
    // todo(connect to backend)
    navigate("/login");
  };

  return (
    <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" color="teal" textAlign="center">
          <Image src="/logo.png" />
          <span>ثبت‌نام کنید</span>
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

            <Button color="teal" fluid size="large" onClick={signUpButton}>
              <span>ثبت‌نام</span>
            </Button>
          </Segment>
        </Form>
        <Message>
          <span>حساب کاربری دارید؟.</span>
          <a href="/login">
            <span>وارد شوید</span>
          </a>
        </Message>
      </Grid.Column>
    </Grid>
  );
}

export default SignUp;
