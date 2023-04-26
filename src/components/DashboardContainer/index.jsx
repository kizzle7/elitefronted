/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, useRef } from "react";
import SideBar from "./Sidebar";
import Logo from "../../assets/elite/logo.svg";
import { Drawer } from "antd";
import Dashboard from "../../assets/elite/dashboard.svg";
import Wallet from "../../assets/elite/Wallet.svg";
import Activity from "../../assets/elite/Activity.svg";
import Union from "../../assets/elite/Union.svg";
import Close from "../../assets/elite/close.svg";
import { error, success } from "../../components/Alert/index";
import Settings from "../../assets/elite/Setting.svg";
import { useHistory } from "react-router-dom";
import axios from "axios";
import MyComponent from "react-fullpage-custom-loader";
import config from "../../config";
import {
  Collapse,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Nav,
  NavbarBrand,
  NavbarToggler,
  NavItem,
  NavLink,
  Navbar,
  UncontrolledDropdown,
} from "reactstrap";
import "./index.css";
export const DashboardContainer = ({ children, pageTitle, subTitle }) => {
  const [visible, setVisible] = useState(false);
  const [userdetails, setUserDetails] = useState({});
  const [load, setLoad] = useState(false);
  const history = useHistory();
  const onClose = () => {
    setVisible(false);
  };

  const logout = () => {
    localStorage.clear();
    sessionStorage.clear();
    history.push("/login");
  };

  if (!sessionStorage.getItem("token")) {
    history.push("/login");
  }

  useEffect(() => {
    getUser();
  }, []);

  const getUser = () => {
    setLoad(true);
    axios
      .get(`${config.baseUrl}user/${sessionStorage.getItem("user_id")}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setLoad(false);
        if (res.data.userInfo) {
          setUserDetails(res.data.userInfo);
        }
      })
      .catch((err) => {
        setLoad(false);
      });
  };

  return (
    <div className="container-fluid">
       {load && (
        <MyComponent
          loaderType="cube-transition"
          height="100%"
          sentences={["Please wait..."]}
          wrapperBackgroundColor="rgba(0,0,0,0.5)"
        />
      )}
      <div className="row flex-column flex-md-row dashboard">
        <div className="col-md-2 col-12 bg-line-side show-web">
          <SideBar />
        </div>

        <div className="col-12 show-mobile pt-2">
          <Navbar light expand="md" style={{ padding: 0, margin: 0 }}>
            <NavbarBrand href="/">
              <img src={Logo} className="w-100" />
            </NavbarBrand>
            <NavbarToggler
              onClick={() => {
                setVisible(true);
              }}
            />
          </Navbar>
        </div>

        <div className="col-12 col-lg-10">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <div className="pt-4 pg-title">{pageTitle}</div>
              <small style={{ color: "#6E778B" }}>{subTitle}</small>
            </div>
            <div>
              <i className="fa fa-user-circle"></i> {userdetails?.email}
            </div>
          </div>

          <div className="">{children}</div>
        </div>
      </div>

      <Drawer
        title={false}
        placement="right"
        onClose={onClose}
        closable={false}
        visible={visible}
        width={"70%"}
      >
        <Nav className=" pt-2" navbar>
          <div className="text-center">
            <div
              className="text-right pb-3"
              onClick={() => {
                setVisible(false);
              }}
            >
              <img src={Close} width="20" />
            </div>
            <div>
              <NavItem className="nav-hover">
                <NavLink
                  className="nav-link pl-0 ml-4 d-flex align-item-center"
                  href="/dashboard"
                >
                  <img src={Dashboard} width="20" />
                  <span className="ml-3 nav-link-menu">Dashboard</span>
                </NavLink>
              </NavItem>
              <NavItem className="nav-hover">
                <NavLink
                  className="nav-link pl-0 ml-4 d-flex align-item-center"
                  href="/wallet"
                >
                  <img src={Wallet} width="20" />
                  <span className="ml-3 nav-link-menu">Wallet</span>
                </NavLink>
              </NavItem>
              <NavItem className="nav-hover">
                <NavLink
                  className="nav-link pl-0 ml-4 d-flex align-item-center"
                  href="/port-folio"
                >
                  <img src={Activity} width="20" />
                  <span className="ml-3 nav-link-menu">Portfolio</span>
                </NavLink>
              </NavItem>
              <NavItem className="nav-hover">
                <NavLink
                  className="nav-link pl-0 ml-4 d-flex align-item-center"
                  href="/invest"
                >
                  <img src={Union} width="16" />
                  <span className="ml-3 nav-link-menu">Invest</span>
                </NavLink>
              </NavItem>

              <div className="set-part">
                <NavItem className="nav-hover">
                  <NavLink
                    className="nav-link pl-0 ml-4 d-flex align-item-center"
                    href="/profile"
                  >
                    <img src={Settings} width="16" />
                    <span className="ml-3 nav-link-menu">Settings</span>
                  </NavLink>
                </NavItem>

                <br />
                <NavItem className="pt-5">
                  <NavLink
                    className="nav-link pl-0 ml-4 d-flex align-item-center"
                    onClick={logout}
                  >
                    <img src={Settings} width="16" />
                    <span
                      className="ml-3 nav-link-menu"
                      style={{ color: "red" }}
                    >
                      Log Out
                    </span>
                  </NavLink>
                </NavItem>
              </div>
            </div>
          </div>
          <br />
        </Nav>
      </Drawer>
    </div>
  );
};
