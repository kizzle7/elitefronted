import React, { useEffect, useState, useRef } from "react";
import { DashboardContainer } from "../../../components/DashboardContainer/index";
import Frame from "../../../assets/elite/Frame.svg";
import elips from "../../../assets/elite/elips.svg";
import Btc from "../../../assets/elite/btc.svg";
import BtcBlack from "../../../assets/elite/btc-black.svg";
import BtcPurple from "../../../assets/elite/btc-purple.svg";
import BtcGreen from "../../../assets/elite/btc-green.svg";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { AutoScroll } from "@splidejs/splide-extension-auto-scroll";
import "@splidejs/splide/dist/css/splide.min.css";
import chart from "../../../assets/elite/chart.svg";
import cardFrame from "../../../assets/elite/skeleton.svg";
import rib from "../../../assets/elite/rib.svg";
import { Button } from "../../../components/Button/index";
import Table from "../../../components/Table/index";
import FundDrawer from "../../../components/Fund/";
import axios from "axios";
import config from "../../../config";
import { Empty } from "antd";
import { error } from "../../../components/Alert";

import "./index.css";
export default function Index(props) {
  const [openDeposit, setOpenDeposit] = useState(false);
  const [userdetails, setUserDetails] = useState({});
  const [data, setData] = useState([]);
  const [investAmt, setInvestAmt] = useState(0);
  const [portfolioTotal, setTotalPortfolio] = useState([]);
  const [crypto, setCrypto] = useState([]);
  const [mutualInvest, setMutual] = useState([]);
  const [load, setLoad] = useState(false);
  const [markets, setMarket] = useState([]);
  const [type, setType] = useState("crypto");

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

  const gePortfolio = () => {
    setLoad(true);
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
        setLoad(false);
        if (res.data) {
          let portfolioTotal = res.data?.myinvtesments.filter(
            (a) => a.status !== "Redeemed"
          );
          setData(portfolioTotal);

          setTotalPortfolio(
            portfolioTotal.reduce(
              (n, { potentialAmt }) => n + parseInt(potentialAmt),
              0
            )
          );
        }
      })
      .catch((err) => {
        setLoad(false);
      });
  };

  const formatDec = (num, decimals) =>
    num?.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  const getMarkets = () => {
    axios
      .get(`https://api.coincap.io/v2/assets?offset=0&limit=5`)
      .then((res) => {
        if (res.data) {
          setMarket(
            res.data.data.map((d) => ({
              supply: d.supply.toString(),
              marketCapUsd: d.marketCapUsd.toString(),
              priceUsd: d.priceUsd.toString(),
              changePercent24Hr: d.changePercent24Hr.toString(),
            }))
          );
        }
      })
      .catch((err) => {});
  };
  console.log(markets);
  useEffect(() => {
    getPlans();
    gePortfolio();
    getUser();
    getMarkets();
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
          setMutual(mutualInvest);
        }
      })
      .catch((err) => {});
  };

  const withdraw = (e) => {
    console.log("withdraw clicked");
    e.preventDefault();
    if (userdetails?.identityType) {
      error("Pending", "Your kyc submission is still currently in review");
    } else {
      error("Error", "Update your KYC and bank information");
    }
  };

  const changeType = (type) => {
    setType(type);
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
                      ${formatDec(portfolioTotal)}
                      <span></span>
                    </h4>
                    <small className="pt-2">
                      Available Bal: ${formatDec(userdetails?.wallet)}
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
                      <div className="ml-3" onClick={withdraw}>
                        <Button text="Withdraw" className="orange" />
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
                    <div className="pt-3 invest-num">
                      {" "}
                      ${formatDec(portfolioTotal)}
                    </div>
                    <div className="d-flex pt-3 justify-content-between align-items-center">
                      <div>
                        <img src={rib} />
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
                  <div
                    style={{ cursor: "pointer" }}
                    className={`${
                      type === "crypto" ? "crypto-black" : "mutual-dark"
                    }`}
                    onClick={changeType.bind(this, "crypto")}
                  >
                    Crypto
                  </div>
                  <div
                    style={{ cursor: "pointer" }}
                    className={`${
                      type === "mutual" ? "crypto-black" : "mutual-dark"
                    }`}
                    onClick={changeType.bind(this, "mutual")}
                  >
                    Mutual fund
                  </div>
                </div>
              </div>
              <br />
              {type === "crypto" && (
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
              )}

              {type === "mutual" && (
                <div className="row">
                  {mutualInvest?.map((dt) => {
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
              )}
            </div>
          </div>
        </div>
        <br />
        <div className="row">
          <div className="col-md-4 col-12 ">
            <div className="mute-head pb-3">Payout List</div>
            <div
              className="pt-2 p-payout card"
              style={{
                border: "1px solid #EBECEF",
                height: "440px",
                borderRadius: "10px",
              }}
            >
              <Splide
                options={{
                  type: "loop",
                  gap: "10px",
                  drag: "free",
                  direction: "ttb",
                  height: "290px",
                  arrows: false,
                  pagination: false,
                  perPage: 3,
                  autoScroll: {
                    pauseOnHover: false,
                    pauseOnFocus: false,
                    rewind: false,
                    speed: 1,
                  },
                }}
                extensions={{ AutoScroll }}
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 11, 11].map((dt) => {
                  return (
                    <SplideSlide>
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
                    </SplideSlide>
                  );
                })}
              </Splide>
              <div className="py-2 px-2"></div>
            </div>
          </div>
          <div className="col-md-4 col-12">
            <div className="mute-head pb-3">Market Statistics</div>
            {markets?.length > 0 && (
              <div>
                <Table data={markets} />
              </div>
            )}
            {markets?.length === 0 && (
              <div className="mt-5 pt-5">
                <br />
                <br />
                <Empty description="Oops..Cant fetch market stattistics now." />
              </div>
            )}
          </div>
        </div>
        <FundDrawer open={openDeposit} setOpen={setOpenDeposit} />
      </DashboardContainer>
    </div>
  );
}
