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
  const [username, setUsername] = React.useState("");
  const [firstname, setFirstname] = React.useState("");
  const [lastname, setLastname] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [hasError, setHasError] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  const [errors, setErrors] = React.useState({
    "firstname": undefined,
    "lastname": undefined,
    "username": undefined,
    "password": undefined,
    "confirmPassword": undefined,
    "email": undefined
  })
  let navigate = useNavigate();
  const signUpButton = () => {
    for (let key in errors) {
      if (errors[key] !== undefined) {
        setHasError(true);
        setErrorMessage("لطفا خطاهای فرم را برطرف کنید");
        return false
      }
    }
    if (username.length === 0 || password.length === 0 || firstname.length === 0 || lastname.length === 0 || email.length === 0) {
      setHasError(true);
      setErrorMessage("لطفا تمامی اطلاعات را پر کنید");
      return false
    }
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "username": username,
      "password": password,
      "first_name": firstname,
      "last_name": lastname,
      "email": email,
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch("http://localhost:8000/api/register/", requestOptions)
      .then(response => {
        if (response.status < 200 || response.status >= 300) {
          response.text().then(result => {
            setHasError(true);
            if (result.includes("username")) {
              setErrorMessage("نام کاربری تکراری است")
            }
            else if (result.includes("email")) {
              setErrorMessage("ایمیل تکراری است")
            }
            else {
              setErrorMessage(result);
            }
          });
          return
        }
        navigate("/login");
      })
      .catch(error => {
        setHasError(true);
        setErrorMessage(error);
      });
  };

  console.log(hasError)

  return (
    <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" color="teal" textAlign="center">
          <Image src="/logo.png" />
          <span>ثبت‌نام کنید</span>
        </Header>
        <Form size="large" error={hasError}>
          <Segment stacked>
            <Form.Group widths={"equal"}>
              <Form.Input
                id={"firstname"}
                fluid
                icon="user"
                iconPosition="left"
                placeholder="نام"
                onChange={(text) => {
                  setFirstname(text.target.value);
                }}
                error={errors["firstname"]}
              />
              <Form.Input
                id={"lastname"}
                fluid
                icon="id card"
                iconPosition="left"
                placeholder="نام خانوادگی"
                onChange={(text) => {
                  setLastname(text.target.value);
                }}
                error={errors["lastname"]}
              />
            </Form.Group>
            <Form.Group widths={"equal"}>
              <Form.Input
                id={"username"}
                fluid
                icon="smile"
                iconPosition="left"
                placeholder="نام کاربری"
                onChange={(text) => {
                  setUsername(text.target.value);
                }}
                error={errors["username"]}
              />
              <Form.Input
                id={"email"}
                fluid
                icon="mail"
                iconPosition="left"
                placeholder="ایمیل"
                onChange={(text) => {
                  if (text.target.value.length === 0 || text.target.value.match(/^[\w]+@([\w-]+\.)+[\w-]{2,4}$/))
                    setErrors({ ...errors, "email": undefined });
                  else
                    setErrors({ ...errors, "email": "ایمیل نامعتبر است" });
                  setEmail(text.target.value);
                }}
                error={errors["email"]}

              />
            </Form.Group>
            <Form.Group widths={"equal"}>
              <Form.Input
                id={"password"}
                fluid
                icon="lock"
                iconPosition="left"
                placeholder="گذرواژه"
                type="password"
                onChange={(text) => {
                  setPassword(text.target.value);
                  let newErrors = {...errors}
                  if (text.target.value.length === 0 || text.target.value.length >= 8)
                    newErrors["password"] = undefined;
                  else
                    newErrors["password"] = "گذرواژه باید حداقل ۸ کاراکتر باشد";
                  
                  if (confirmPassword.length === 0 || text.target.value === confirmPassword)
                    newErrors["confirmPassword"] = undefined;
                  else
                    newErrors["confirmPassword"] = "گذرواژه‌ها با هم برابر نیستند";
                  setErrors(newErrors);
                  }}
                error={errors["password"]}
              />
              <Form.Input
                id={"confirmPassword"}
                fluid
                icon="lock"
                iconPosition="left"
                placeholder="تایید گذرواژه"
                type="password"
                onChange={(text) => {
                  if (text.target.value.length === 0 || text.target.value === password)
                    setErrors({ ...errors, "confirmPassword": undefined });
                  else
                    setErrors({ ...errors, "confirmPassword": "گذرواژه‌ها با هم برابر نیستند" });
                  setConfirmPassword(text.target.value);
                }}
                error={errors["confirmPassword"]}
              />
            </Form.Group>

            <Button color="teal" fluid size="large" onClick={signUpButton}>
              <span>ثبت‌نام</span>
            </Button>
            <Message
              error
              header='خطا'
              content={errorMessage}
            />
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
