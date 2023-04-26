/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import classname from "classname";
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

const SideBar = () => {
  const history = useLocation();
  const pathname = history.pathname;
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const logout = () => {
    localStorage.clear();
    sessionStorage.clear();
  };

  return (
    <aside className="p-0 bg-white flex-shrink-1 side-width">
      <nav className="navbar-new navbar-expand-lg navbar-light align-items-start">
        <NavbarBrand href="/" className="pl-0 brand pt-0">
          <p>Sidebar</p>
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav
            className="flex-column navbar-nav w-100 justify-content-between top-top"
            id="third-step"
          >
            <NavItem className="nav-hover">
              <NavLink className="nav-link pl-0 ml-4" href="/login">
                <LogoutIcon />
                <span className="ml-3">Logout</span>
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </nav>
    </aside>
  );
};

export default SideBar;
