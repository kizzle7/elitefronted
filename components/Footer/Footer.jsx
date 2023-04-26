import { useState } from "react";
import "./index.css";
import logo from "../../assets/images/logo.svg";
import fb from "../../assets/images/fb.svg";
import twitter from "../../assets/images/twitter.svg";
import instagram from "../../assets/images/insta.svg";
import diamond from "../../assets/images/diamond.svg";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer>
      <div className="mt-5 pt-3">
        <div className="row">
          <div className="col-lg-3 col-sm-6">
            <Link to="/">
              <img src={logo} width="50" />
            </Link>
            {/* <div className="diamond-place">
              <img src={diamond} className="w-75" />
            </div> */}
          </div>
          <div className="col-lg-9">
            <div className="col-lg-12">
              <div className="row">
                <div className="col-lg-3 col-sm-6">
                  <p className="footer-title mb-3">COMPANY</p>

                  <a className="footer-sub-text my-4" href="#">
                    About Us
                  </a>
                  <a className="footer-sub-text my-4" href="/reportfraud">
                    Our Story
                  </a>
                  <a className="footer-sub-text my-4" href="/reportfraud">
                    Blog
                  </a>
                  <a className="footer-sub-text my-4" href="/privacy-policy">
                    Privacy Policy
                  </a>
                </div>
                <div className="col-lg-3  col-sm-6">
                  <p className="footer-title mb-3">PRODUCTS</p>
                  <a className="footer-sub-text my-4" href="/support">
                    Prime.x
                  </a>
                  <a className="footer-sub-text my-4" href="/terms&conditions">
                    Merchants
                  </a>
                </div>
                <div className="col-lg-3  col-sm-6">
                  <p className="footer-title mb-3">COMMUNITY</p>
                  <a className="footer-sub-text my-4" href="/support">
                    Prime Verse
                  </a>
                </div>
                <div className="col-lg-3  col-sm-6">
                  <p className="footer-title mb-3">CONTACTS</p>
                  <a className="footer-sub-text my-4" href="/support">
                    Lagos, Nigeria
                  </a>
                  <a className="footer-sub-text my-4" href="/terms&conditions">
                    info@hniprime.com
                  </a>
                  <div className="d-flex justify-content align-items-center">
                    <img src={instagram} className="pr-3" />
                    <img src={fb} className="pr-3" />
                    <img src={twitter} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center pb-5 mb-4 copy-rite">
          <span> © Copyright Hniprime {new Date().getFullYear()} </span>
        </div>
      </div>
    </footer>
  );
};
