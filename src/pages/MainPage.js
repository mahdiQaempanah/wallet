import React from "react";
import {
  Dropdown,
  Image,
  Menu,
  Container,
} from "semantic-ui-react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./MainPage.css";
import { useLocation } from "react-router-dom";

let fullname = "ابوالفضل سلطانی";

function MainPage() {
  const location = useLocation();
  let username = location.state.username;
  console.log(username);
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
      <Routes>
        <Route path="/home" />
        <Route path="/budget" />
        <Route path="/report" />
        <Route path="/account" />
      </Routes>
    </div>
  );
}

export default MainPage;
