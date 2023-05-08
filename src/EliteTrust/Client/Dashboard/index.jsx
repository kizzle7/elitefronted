import React, { useEffect, useState, useRef } from "react";
import { DashboardContainer } from "../../../components/DashboardContainer/index";
import Frame from "../../../assets/elite/Frame.svg";
import elips from "../../../assets/elite/elips.svg";
import Btc from "../../../assets/elite/btc.svg";
import BtcBlack from "../../../assets/elite/btc-black.svg";
import BtcPurple from "../../../assets/elite/btc-purple.svg";
import BtcGreen from "../../../assets/elite/btc-green.svg";

import chart from "../../../assets/elite/chart.svg";
import cardFrame from "../../../assets/elite/skeleton.svg";
import rib from "../../../assets/elite/rib.svg";
import { Button } from "../../../components/Button/index";
import Table from "../../../components/Table/index";
import FundDrawer from "../../../components/Fund/";
import axios from "axios";
import config from "../../../config";

import "./index.css";
export default function Index(props) {
  const [openDeposit, setOpenDeposit] = useState(false);
  const [userdetails, setUserDetails] = useState({});
  const [data, setData] = useState([]);
  const [investAmt, setInvestAmt] = useState(0);
  const [crypto, setCrypto] = useState([]);

  const getUser = () => {
    axios
      .get(`${config.baseUrl}user/${sessionStorage.getItem("user_id")}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        if (res.data.userInfo) {
          setUserDetails(res.data.userInfo);
        }
      })
      .catch((err) => {});
  };

  

  useEffect(() => {
    getPlans();
    getUser();
    getInvestment();
  }, []);

  const getInvestment = () => {
    axios
      .get(
        `${config.baseUrl}getinvestments/${sessionStorage.getItem("user_id")}`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        if (res.data) {
          setData(res.data.myinvtesments);
          let inflows = res.data?.myinvtesments.filter(
            (a) => a.status === "Matured"
          );
          setInvestAmt(inflows.reduce((n, { amount }) => n + amount, 0));
        }
      })
      .catch((err) => {});
  };

  const getPlans = () => {
    axios
      .get(`${config.baseUrl}getplans`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        if (res.data) {
          let cryptoInvest = res.data?.plans.filter(
            (a) => a.invest_type === "Crypto"
          );
          let mutualInvest = res.data?.plans.filter(
            (a) => a.invest_type === "Mutual"
          );
          setCrypto(cryptoInvest);
        }
      })
      .catch((err) => {});
  };

  return (
    <div>
      <DashboardContainer
        pageTitle="Dashboard"
        subTitle="Hi babamo explore your investments"
      >
        <div className="row">
          <div className="col-md-7"></div>
          <div className="col-md-5 pb-3">
            <div className="mute-head">Investment Market</div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-7 col-12">
            <div className="row">
              <div className="col-md-7 col-12">
                <div className="invest-cardB">
                  <div className="drk-card">
                    <small>Portfolio balance</small>
                    <h4 className="pt-1">
                      ${userdetails?.portfolio}
                      <span>
                        <sup>0</sup>
                      </span>
                    </h4>
                    <small className="pt-2">
                      Available Bal: ${userdetails?.wallet}
                    </small>
                    <br />

                    <div className="d-flex mt-4 justify-content align-items-center">
                      <div
                        className="btn-white"
                        onClick={() => {
                          setOpenDeposit(true);
                        }}
                      >
                        Deposit
                      </div>
                      <div className="ml-3">
                        <Button
                          text="Withdraw"
                          onClick={() => {
                            setOpenDeposit(true);
                          }}
                          className="orange"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="pos-up">
                  <img src={cardFrame} />
                </div>
              </div>
              <div className="col-md-5 col-12">
                <div className="invest-card">
                  <div className="d-flex justify-content-end align-items-center  p-3">
                    <img src={elips} />
                  </div>
                  <div className="invest-area">
                    <div className="mute-text">
                      My Investments ({data?.length})
                    </div>
                    <div className="pt-3 invest-num">${investAmt}</div>
                    <div className="d-flex pt-3 justify-content-between align-items-center">
                      <div>
                        <img src={rib} />
                      </div>
                      <div style={{ color: "#896AB9", fontWeight: "bold" }}>
                        0
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-12 col-12">
                <div className="mt-3">
                  <img src={chart} className="w-100" />
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-5">
            <div className="invest-market">
              <div className="white-market">
                <div className="d-flex justify-content-between align-items-center h-100">
                  <div className="crypto-black ">Crypto</div>
                  <div className="mutual-dark">Mutual fund</div>
                </div>
              </div>
              <br />
              <div className="row">
                {crypto?.map((dt) => {
                  return (
                    <div className="col-md-6 col-12 mb-3">
                      <div className="card-inv">
                        <img src={BtcBlack} />
                        <div className="pt-3">
                          <div className="d-flex justify-content-between align-items-center">
                            <div style={{ color: "#667085" }}>{dt?.name}</div>
                            <small>{dt?.no_of_days}</small>
                          </div>
                          <h4 className="pt-3">
                            <b>{dt?.percent}%</b>
                          </h4>
                          <div className="d-flex pt-1 justify-content-between align-items-center">
                            <div style={{ fontWeight: 300, fontSize: 14 }}>
                              Minimum
                            </div>
                            <div style={{ color: "#667085" }}>${dt?.min}</div>
                          </div>
                          <div className="d-flex pt-1 justify-content-between align-items-center">
                            <div style={{ fontWeight: 300, fontSize: 14 }}>
                              Maximum
                            </div>
                            <div style={{ color: "#667085" }}>${dt?.max}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              
              
                
               
              </div>
            </div>
          </div>
        </div>
        <br />
        <div className="row">
          <div className="col-md-4 col-12">
            <div className="mute-head pb-3">Payout List</div>
            <div
              className="pt-2 p-payout card"
              style={{ border: "1px solid #EBECEF", borderRadius: "10px" }}
            >
              <div className="py-2 px-2">
                {[1, 2, 3, 4, 5]?.map((dt) => {
                  return (
                    <div className="mute-border-light mb-3">
                      <div className="d-flex  justify-content-between align-items-center ">
                        <div
                          style={{
                            color: "#667085",
                            fontSize: "11px",
                            fontWeight: 400,
                          }}
                        >
                          User ID: ELT-344-00
                        </div>
                        <div
                          style={{
                            color: "#667085",
                            fontSize: "12px",
                            fontWeight: 300,
                          }}
                        >
                          Basic Plan
                        </div>
                      </div>
                      <div className="d-flex justify-content-between align-items-center pt-4">
                        <div
                          style={{
                            color: "#000000",
                            fontSize: "11px",
                            fontWeight: 600,
                          }}
                        >
                          Amount paid: $3520.98
                        </div>
                        <div
                          style={{
                            color: "#667085",
                            fontSize: "11px",
                            fontWeight: 300,
                          }}
                        >
                          20-10-2023
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="col-md-4 col-12">
            <div className="mute-head pb-3">Market Statistics</div>
            <div>
              <Table />
            </div>
          </div>
        </div>
        <FundDrawer open={openDeposit} setOpen={setOpenDeposit} />
      </DashboardContainer>
    </div>
  );
}
