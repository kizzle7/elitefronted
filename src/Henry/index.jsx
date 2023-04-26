import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Modal } from "antd";
import "./index.css";

export default function App() {
  const [kycModal, setKyc] = useState(false);
  const [show, setShow] = useState(false);
  const [load, setLoad] = useState(false);
  const [msg, setMsg] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [date, setDate] = useState("");
  const closeKyc = () => {
    setKyc(false);
    setName("")
    setDate("")
    setEmail("")
    setAddress("")
    setShow(false)
  };

  const openKyc = () => {
    setKyc(true);
  };

  
  const submitKyc = (e) => {
    e.preventDefault();
    if (email && name && date && address) {
      setLoad(true);
      setMsg("Your information has been sent successfully");
      setTimeout(() => {
        setShow(true);
        setLoad(false);
      }, 2000);
    }
  };
  return (
    <div>
      <div className="container pt-3">
        <div className="link-menu d-flex justify-content align-items-center">
          <Link to="/">
            <div className="mr-4 logo-part">Stablesmartfix</div>
          </Link>
          <Link to="/wallets">
            <div className="mr-4">Import Wallet</div>
          </Link>
          <Link to="/wallets">
            <div>Create New Wallet</div>
          </Link>
        </div>
        <div className="text-center">
          <p className="lead-text">
            Remote Bloks is a simple, secure, non-custodial wallet for restoring
            and connecting decentralized Crypto assets across various networks.
          </p>
        </div>
        <br />
        <br />
        <div className="row container mobile-shift ">
          <div className="col-md-4 col-12 new-cards">
            <div>
              <div className="dot-dark">
                <div className="d-flex justify-content-center align-items-center">
                  <i class="fa fa-link pt-3 text-white"></i>
                </div>
              </div>
              <div className="text-color">CONNECT</div>
              <div className="text-color">Access your wallet here.</div>
              <br />
              <Link to="/wallets">
                <button className="button-dark">IMPORT WALLET</button>
              </Link>
              <br />
              <Link to="/wallets">
                <button className="button-dark">TOKEN MIGRATION</button>
              </Link>
              <br />
              <Link to="/wallets">
                <button className="button-dark">CLAIM REWARD</button>
              </Link>
              <br />
              <Link to="/wallets">
                <button className="button-dark">REACCTIVATE WALLET</button>
              </Link>
            </div>
          </div>
          <div className="col-md-4 col-12 new-cards">
            <div>
              <div className="dot-dark">
                <div className="d-flex justify-content-center align-items-center">
                  <i class="fa fa-link pt-3 text-white"></i>
                </div>
              </div>{" "}
              <div className="text-color">CONNECT</div>
              <div className="text-color">Access your wallet here.</div>
            </div>
            <div className="d-flex justify-content align-items-end h-75">
              <button className="button-dark" onClick={openKyc}>
                REGISTER KYC
              </button>
            </div>
          </div>
          <div className="col-md-4 col-12 new-cards">
            <div>
              <div className="dot-white">
                <div className="d-flex justify-content-center align-items-center">
                  <i class="fa fa-link pt-3 text-dark"></i>
                </div>
              </div>
              <div className="text-color">NEW TOREMOTE BLOKS?</div>
              <div className="text-color">
                Create a new wallet to send, receive and swap Crypto Assets.
              </div>
            </div>
            <div className="d-flex justify-content align-items-end h-75">
              <Link to="/wallets">
                <button className="button-danger">REACTIVATE WALLET</button>
              </Link>
            </div>
          </div>
        </div>
        <small className="d-flex justify-content-center align-items-center pt-3 text-color">
          By using this application you agree to the Terms of Use
        </small>
      </div>

      <Modal
        title="Register Kyc"
        visible={kycModal}
        onCancel={closeKyc}
        footer={false}
        width={650}
        centered
      >
        {show && <p className="text-center text-success">{msg}</p>}
        <div className="row">
          <div className="col-md-6 col-12">
            <div className="form-group">
              <input
                class="form-control form-control-sm"
                type="text"
                placeholder="Name"
                aria-label=".form-control-lexample"
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
            </div>
          </div>
          <div className="col-md-6 col-12">
            <div className="form-group">
              <input
                class="form-control form-control-sm"
                type="text"
                placeholder="Email"
                aria-label=".form-control-lg example"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </div>
          </div>
          <div className="col-md-6 col-12">
            <div className="form-group">
              <input
                class="form-control form-control-sm"
                type="date"
                aria-label=".form-control-lg example"
                onChange={(e) => setDate(e.target.value)}
                value={date}
              />
            </div>
          </div>
          <div className="col-md-6 col-12">
            <div className="form-group">
              <input
                class="form-control form-control-sm"
                type="text"
                placeholder="Address"
                aria-label=".form-control-lg example"
                onChange={(e) => setAddress(e.target.value)}
                value={address}
              />
            </div>
          </div>
        </div>
        <div className="form-group">
          <input
            class=""
            type="file"
            placeholder="Address"
            aria-label=".form-control-lg example"
          />
        </div>
        <div class="form-check">
          <input
            class="form-check-input"
            type="checkbox"
            value=""
            id="flexCheckDefault"
          />
          <label class="form-check-label" for="flexCheckDefault">
            By checking the box below, I agree to the site's terms and
            conditions.
          </label>
        </div>
        <br />
        <div class="d-flex justify-content-end align-items-center">
          <button
            type="button"
            class="btn btn-primary"
            style={{ backgroundColor: "#4d2d57", border: "1px solid #4d2d57" }}
            onClick={submitKyc}
          >
            {load ? (
              <div
                class="spinner-border"
                role="status"
                style={{ width: "1.3rem", height: "1.3rem" }}
              >
                <span class="visually-hidden"></span>
              </div>
            ) : (
              "Submit"
            )}
          </button>
        </div>
      </Modal>
    </div>
  );
}
