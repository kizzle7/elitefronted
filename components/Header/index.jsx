import React, { useState } from "react";
import "./index.css";
import logo from "../../assets/images/logo.svg";
import { Button } from "../Button/index";
import laptop from "../../assets/images/laptop.svg";
import { Link } from "react-router-dom";
import { ABOUT, CONTACT, COMMUNITY } from "../../routes/path";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";
import { Drawer } from "antd";
export default function Header({
  title,
  sub,
  headerStyle,
  subitle,
  buttonText,
  button,
  noStyle,
  imgGrad,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const active = window.location.pathname.replace("/", "");

  const toggle = () => setIsOpen(!isOpen);

  const [visible, setVisible] = useState(false);
  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };

  const pathname = window.location.pathname
  console.log(pathname)

  return (
    <div className="">
      <div className="header-web ">
        <div className="pt-3 d-flex justify-content-between align-items-center">
          <div className="mr-auto">
            <Link to="/">
              <img src={logo} className="w-100" />
            </Link>
          </div>
          <div className=" d-flex justify-content-between align-items-center">
            <div className={`pr-5 nav-menus-color`}>Solutions</div>
            <Link className={`pr-5 ${pathname === '/about' ? 'nav-menus-color-active' : 'nav-menus-color'}`} to={ABOUT}>
              About
            </Link>
            <Link to={COMMUNITY} className={`pr-5 ${pathname === '/community' ? 'nav-menus-color-active' : 'nav-menus-color'}`}>
              Company
            </Link>
            <Link to={CONTACT} className={`pr-5 ${pathname === '/contact-us' ? 'nav-menus-color-active' : 'nav-menus-color'}`}>
              Contact
            </Link>
            
            <div className="w-100">
              <Button
                text="Get Prime X"
                style={{ background: "#030389", color: "white" }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mobile-header">
        <Navbar light expand="md" style={{ margin: "25px 0" }}>
          <NavbarBrand href="/" style={{ float: "left!important" }}>
            <img src={logo} className="w-100" />
          </NavbarBrand>
          <NavbarToggler onClick={showDrawer} />
        </Navbar>
      </div>

      <header className={
        {
          'full-bg': 'header',
          'no-bg': 'header-no-bg',
          'half-bg': 'header-other-part'

        }[headerStyle]
      }>
        <div className={!noStyle ? "hero-section" : "text-center"}>
          <h1 className={`${imgGrad && 'mt-5 pt-2'}`}>
            <span className='mt-5 hero-text'> {title}</span>{" "}
            <span className="hero-text-warning"> {sub} </span>
          </h1>
          <p className="hero-text-sub pt-2">{subitle}</p>
          {!noStyle && (
            <div className="hero-small-text pt-2">
              <div>
                Created to add value to every stakeholder in the global luxury
                ecosystem.
              </div>
              <div>Hniprime works on a value maximum principle</div>
            </div>
          )}
          {noStyle && <img src={laptop} className="" />}

          <br />
          <br />
          <br />
          {button && (
            <div className="text-center">
              <Button
                text={buttonText}
                style={{ background: "#030389", color: "white" }}
              />
            </div>
          )}
        </div>
      </header>
      <Drawer
        title={false}
        placement="right"
        onClose={onClose}
        visible={visible}
        width={"70%"}
      >
        <Nav className="ml-auto pt-2" navbar>
          <NavItem>
            <NavLink href={ABOUT} className={`nav-texts mr-3`}>
              Solutions
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink href={ABOUT} className={`nav-texts mr-3 `}>
              About
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink href={CONTACT} className={`nav-texts mr-3 `}>
              Contact
            </NavLink>
          </NavItem>
          <br />

          <NavItem>
            <Button
              text="Get Prime X"
              style={{ background: "#030389", color: "white" }}
            />{" "}
          </NavItem>
        </Nav>
      </Drawer>
    </div>
  );
}
const BtnStyle = {
  color: "#fff",
  fontWeight: 500,
  fontSize: "14px",
  padding: "0px 40px",
  lineHeight: "21px",
  background: "##030389",
  height: "41px",
  border: "1px solid #00A859",
};
