import React, { useEffect } from "react";
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
  const navigator = useNavigate();
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [hasError, setHasError] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  const loginButton = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    console.log(username);
    console.log(password);
    var raw = JSON.stringify({
      "username": username,
      "password": password
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch("http://localhost:8000/api/login/", requestOptions)
      .then(response => {
        if (response.status < 200 || response.status >= 300) {
          setHasError(true);
          setErrorMessage("نام کاربری یا رمز عبور اشتباه است");
          throw new Error(response["message"]);
        }
        return response.text()
      })
      .then(result => {
        console.log(result);
        let token = JSON.parse(result)["token"];
        localStorage.setItem("token", token);
        getUserData(token);
      })
      .catch(error => console.log('error', error));
  };

  useEffect(() => {
    if (localStorage.getItem("token") !== null) {
      navigator("/transactions");
    }
  }, []);

  function getUserData(token) {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Token ${token}`);

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch("http://localhost:8000/api/token/", requestOptions)
      .then(response => response.text())
      .then(result => {
        let data = JSON.parse(result);
        console.log(data);
        localStorage.setItem("username", data["username"]);
        localStorage.setItem("email", data["email"]);
        localStorage.setItem("fullname", data["first_name"] + " " + data["last_name"]);
      })
      .catch(error => console.log('error', error));
  }

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
          <Form size="large" error={hasError}>
            <Segment stacked>
              <Form.Input
                fluid
                icon="user"
                iconPosition="left"
                placeholder="Username"
                onChange={(text) => {
                  setUsername(text.target.value);
                }}
              />
              <Form.Input
                fluid
                icon="lock"
                iconPosition="left"
                placeholder="Password"
                type="password"
                onChange={(text) => {
                  setPassword(text.target.value);
                }}
              />

              <Button color="teal" fluid size="large" onClick={loginButton}>
                <span>ورود</span>
              </Button>
            </Segment>
            <Message
              error
              header="خطا"
              content={errorMessage}
            />
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
