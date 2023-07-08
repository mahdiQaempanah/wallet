import React, { useState } from "react";
import * as AiIcons from "react-icons/ai";
import { Link } from "react-router-dom";
import { Sidebar } from "semantic-ui-react";
import { SidebarData } from "./SideBarData";
import "./NavBar.css";
import { IconContext } from "react-icons";
function NavBar() {
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => {
    console.log("clicked");
    setSidebar(!sidebar);
  };

  return (
    <>
      <IconContext.Provider value={{ color: "#fff" }}>
        <div className="navbar">
          <Link to="#" className="menu-bars">
            {/* <FaIcons.FaBars onClick={showSidebar}></FaIcons.FaBars> */}
          </Link>
        </div>
        <nav className={sidebar ? "nav-menu active" : "nav-menu active"}>
          <ul className="nav-menu-items" onClick={showSidebar}>
            <li className="navbar-toggle">
              <Link to="#" className="menu-bars">
                {/* <AiIcons.AiOutlineClose></AiIcons.AiOutlineClose> */}
              </Link>
            </li>
            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default NavBar;
