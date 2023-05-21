/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import classname from "classname";
import Logo from "../../assets/elite/logo.svg";
import "./index.css";
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
  UncontrolledDropdown,
} from "reactstrap";
import Dashboard from "../../assets/elite/dashboard.svg";
import Wallet from "../../assets/elite/Wallet.svg";
import Activity from "../../assets/elite/Activity.svg";
import Union from "../../assets/elite/Union.svg";
import Settings from "../../assets/elite/Setting.svg";
import { useHistory } from "react-router-dom";

const SideBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const history = useHistory();

  const toggle = () => setIsOpen(!isOpen);
  const role = sessionStorage.getItem("is_Admin");

  const logout = () => {
    localStorage.clear();
    sessionStorage.clear();
    sessionStorage.setItem("token", "");
    sessionStorage.setItem("user_id", "");
    history.push("/login");
  };

  return (
    <aside className="p-0  flex-shrink-1 side-width">
      <nav className="navbar-new navbar-expand-lg navbar-light align-items-start">
        <NavbarBrand href="/" className="pl-0 brand pt-0">
          <img src={Logo} />
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <br />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="flex-column navbar-nav w-100 pt-3 justify-content-between">
            <NavItem className="nav-hover">
              <NavLink
                className="nav-link pl-0 ml-4 d-flex align-item-center"
                href="/dashboard"
              >
                <img src={Dashboard} width="20" />
                <span className="ml-3 nav-link-menu">Dashboard</span>
              </NavLink>
            </NavItem>
            {role === "false" && (
              <NavItem className="nav-hover">
                <NavLink
                  className="nav-link pl-0 ml-4 d-flex align-item-center"
                  href="/wallet"
                >
                  <img src={Wallet} width="20" />
                  <span className="ml-3 nav-link-menu">Wallet</span>
                </NavLink>
              </NavItem>
            )}
            {role === "false" && (
              <NavItem className="nav-hover">
                <NavLink
                  className="nav-link pl-0 ml-4 d-flex align-item-center"
                  href="/port-folio"
                >
                  <img src={Activity} width="20" />
                  <span className="ml-3 nav-link-menu">Portfolio</span>
                </NavLink>
              </NavItem>
            )}
            <NavItem className="nav-hover">
              <NavLink
                className="nav-link pl-0 ml-4 d-flex align-item-center"
                href="/invest"
              >
                <img src={Union} width="16" />
                <span className="ml-3 nav-link-menu">Invest</span>
              </NavLink>
            </NavItem>
            {role === "true" && (
              <NavItem className="nav-hover">
                <NavLink
                  className="nav-link pl-0 ml-4 d-flex align-item-center"
                  href="/users"
                >
                  <img src={Union} width="16" />
                  <span className="ml-3 nav-link-menu">Users</span>
                </NavLink>
              </NavItem>
            )}

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

                <NavItem className="">
                  <NavLink
                    className="nav-link pl-0 ml-4 d-flex align-item-center"
                    onClick={logout}
                    style={{ cursor: "pointer" }}
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
            
          </Nav>
        </Collapse>
      </nav>
    </aside>
  );
};

export default SideBar;
