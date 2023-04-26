import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import "./index.css";
import stable from "../assets/stable.jpeg";
import meta from "../assets/meta-mask.jpeg";
import trust from "../assets/trust.jpeg";
import argent from "../assets/argent.jpeg";
import binance from "../assets/binance.jpeg";
import pillar from "../assets/pillar.jpeg";
import yoroi from "../assets/yoyoi.jpeg";
import token from "../assets/token.jpeg";
import vexain from "../assets/vexain.jpeg";
import velas from "../assets/velas.jpeg";
import safemoon from "../assets/safe-moon.jpeg";

export default function App() {
  return (
    <div>
      <div className="container pt-3">
        <div className="link-menu-wallet d-flex justify-content-between align-items-center">
          <Link to="/">
            <h4 className="mr-4">Apps</h4>
          </Link>
          <Link to="/wallets">
            <h4>Wallet</h4>
          </Link>
        </div>
        <div className="d-flex justify-content-center align-items-center">
          <img
            src="https://res.cloudinary.com/crunchbase-production/image/upload/c_lpad,h_256,w_256,f_auto,q_auto:eco,dpr_1/bftsslxvhe2yaih6nyl9"
            style={{ width: "50px" }}
          />
        </div>

        <div className="text-center">Connect Wallet</div>
        <br />
        <br />
        <div className="row container webview">
          <div className="col-md-4 col-12 cards">
            <div className="text-center">
              <Link to="/phrase">
                <img
                  src={stable}
                  style={{ width: "60%", borderRadius: "50%" }}
                />
                <div class="m-auto pt-3">Stable Fund</div>
              </Link>
            </div>
          </div>
          <div className="col-md-4 col-12 cards">
            <div className="text-center">
              <Link to="/phrase">
                <img
                  src={trust}
                  style={{ width: "60%", borderRadius: "50%" }}
                />
                <div class="m-auto pt-3">Trust Wallet</div>
              </Link>
            </div>
          </div>
          <div className="col-md-4 col-12 cards">
            <Link to="/phrase">
              <img
                src={meta}
                style={{ width: "60%", borderRadius: "50%" }}
              />
              <div class="m-auto pt-3">Meta Mask</div>
            </Link>
          </div>
          <div className="col-md-4 col-12 cards">
            <Link to="/phrase">
              <img
                src={argent}
                style={{ width: "60%", borderRadius: "50%" }}
              />
              <div class="m-auto">Argent</div>
            </Link>
          </div>
          <div className="col-md-4 col-12 cards">
            <Link to="/phrase">
              <img
                src={meta}
                style={{ width: "60%", borderRadius: "50%" }}
              />
              <div class="m-auto pt-3">Meta Mask</div>
            </Link>
          </div>
          <div className="col-md-4 col-12 cards">
            <Link to="/phrase">
              <img
                src={binance}
                style={{ width: "60%", borderRadius: "50%" }}
              />
              <div class="m-auto pt-3">Binance Smart Chain</div>
            </Link>
          </div>
          <div className="col-md-4 col-12 cards">
            <Link to="/phrase">
              <img
                src={pillar}
                style={{ width: "60%", borderRadius: "50%" }}
              />
              <div class="m-auto pt-3">Pillar</div>
            </Link>
          </div>
          <div className="col-md-4 col-12 cards">
            <Link to="/phrase">
              <img
                src={yoroi}
                style={{ width: "60%", borderRadius: "50%" }}
              />
              <div class="m-auto pt-3">Yoroi</div>
            </Link>
          </div>
          <div className="col-md-4 col-12 cards">
            <Link to="/phrase">
              <img
                src={token}
                style={{ width: "60%", borderRadius: "50%" }}
              />
              <div class="m-auto pt-3">TokenPocket</div>
            </Link>
          </div>
          <div className="col-md-4 col-12 cards">
            <Link to="/phrase">
              <img
                src={vexain}
                style={{ width: "60%", borderRadius: "50%" }}
              />
              <div class="m-auto pt-3">Vechain</div>
            </Link>
          </div>
          <div className="col-md-4 col-12 cards">
            <Link to="/phrase">
              <img
                src={velas}
                style={{ width: "60%", borderRadius: "50%" }}
              />
              <div class="m-auto pt-3">Velas</div>
            </Link>
          </div>
          <div className="col-md-4 col-12 cards">
            <Link to="/phrase">
              <img
                src={safemoon}
                style={{ width: "60%", borderRadius: "50%" }}
              />
              <div class="m-auto pt-3">Safemoon</div>
            </Link>
          </div>
          <div className="col-md-4 col-12 cards">
            <Link to="/phrase">
              <img
                src={stable}
                style={{ width: "60%", borderRadius: "50%" }}
              />
              <div class="m-auto pt-3">Others</div>
            </Link>
          </div>
        </div>
        <div className="mobileview">
          <div className="d-flex justify-content-between align-items-center  mobileview">
            <div className="col-6  cards">
              <div className="text-center">
                <Link to="/phrase">
                  <img
                    src={stable}
                    style={{ width: "100%", borderRadius: "50%" }}
                  />
                  <div class="m-auto pt-3">Stable Fund</div>
                </Link>
              </div>
            </div>
            <div className="col-6  cards">
              <Link to="/phrase">
                <img
                  src={trust}
                  style={{ width: "100%", borderRadius: "50%" }}
                />
                <div class="m-auto pt-3">Trust Wallet</div>
              </Link>
            </div>
            <div className="col-6 cards">
              <Link to="/phrase">
                <img
                  src={meta}
                  style={{ width: "100%", borderRadius: "50%" }}
                />
                <div class="m-auto pt-3">Meta Mask</div>
              </Link>
            </div>
          </div>
          <div className="d-flex justify-content-between align-items-center  mobileview">
            <div className="col-6 cards">
              <Link to="/phrase">
                <img
                  src={argent}
                  style={{ width: "100%", borderRadius: "50%" }}
                />
                <div class="m-auto pt-3">Argent</div>
              </Link>
            </div>
            <div className="col-6 cards">
              <Link to="/phrase">
                <img
                  src={meta}
                  style={{ width: "100%", borderRadius: "50%" }}
                />
                <div class="m-auto pt-3">Meta Mask</div>
              </Link>
            </div>
          </div>
          <div className="d-flex justify-content-between align-items-center  mobileview">
            <div className="col-6 cards">
              <Link to="/phrase">
                <img
                  src={binance}
                  style={{ width: "100%", borderRadius: "50%" }}
                />
                <div class="m-auto pt-3">Binance </div>
              </Link>
            </div>
            <div className="col-6 cards">
              <Link to="/phrase">
                <img
                  src={pillar}
                  style={{ width: "100%", borderRadius: "50%" }}
                />
                <div class="m-auto pt-3">Pillar</div>
              </Link>
            </div>
          </div>
          <div className="d-flex justify-content-between align-items-center  mobileview">
            <div className="col-6 cards">
              <Link to="/phrase">
                <img
                  src={yoroi}
                  style={{ width: "100%", borderRadius: "50%" }}
                />
                <div class="m-auto pt-3">Yoroi</div>
              </Link>
            </div>
            <div className="col-6 cards">
              <Link to="/phrase">
                <img
                  src={token}
                  style={{ width: "100%", borderRadius: "50%" }}
                />
                <div class="m-auto pt-3">TokenPocket</div>
              </Link>
            </div>
          </div>
          <div className="d-flex justify-content-between align-items-center  mobileview">
            <div className="col-6 cards">
              <Link to="/phrase">
                <img
                  src={vexain}
                  style={{ width: "100%", borderRadius: "50%" }}
                />
                <div class="m-auto pt-3">Vechain</div>
              </Link>
            </div>
            <div className="col-6 cards">
              <Link to="/phrase">
                <img
                  src={velas}
                  style={{ width: "100%", borderRadius: "50%" }}
                />
                <div class="m-auto pt-3">Velas</div>
              </Link>
            </div>
          </div>
          <div className="d-flex justify-content-between align-items-center  mobileview">
            <div className="col-6 cards">
              <Link to="/phrase">
                <img
                  src={safemoon}
                  style={{ width: "100%", borderRadius: "50%" }}
                />
                <div class="m-auto pt-3">Safemoon</div>
              </Link>
            </div>
            <div className="col-6 cards">
              <Link to="/phrase">
                <img
                  src={stable}
                  style={{ width: "100%", borderRadius: "50%" }}
                />
                <div class="m-auto pt-3">Others</div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
