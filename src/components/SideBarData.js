import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import * as BiIcons from "react-icons/bi";
import * as RiIcons from "react-icons/ri";

export const SidebarData = [
  {
    title: "خانه",
    path: "/home",
    icon: <AiIcons.AiFillHome />,
    cName: "nav-text",
  },
  {
    title: "گزارش",
    path: "/report",
    icon: <BiIcons.BiSolidReport />,
    cName: "nav-text",
  },
  {
    title: "بودجه",
    path: "/budget",
    icon: <BiIcons.BiWallet />,
    cName: "nav-text",
  },
  {
    title: "حساب کاربری",
    path: "/account",
    icon: <RiIcons.RiAccountCircleFill />,
    cName: "nav-text",
  },
];
