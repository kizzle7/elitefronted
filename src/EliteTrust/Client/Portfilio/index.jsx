import React, { useEffect, useState, useRef } from "react";
import { DashboardContainer } from "../../../components/DashboardContainer/index";
import Btc from "../../../assets/elite/btc.svg";
import "./index.css";
import { Button } from "../../../components/Button/index";
import "./index.css";
import FundDrawer from "../../../components/Fund/";
import moment from "moment";
import rib from "../../../assets/elite/rib.svg";
import inflow from "../../../assets/elite/inflow.svg";
import outflow from "../../../assets/elite/outflow.svg";
import WalletTable from "../../../components/Table/wallet";
import cardFrame from "../../../assets/elite/skeleton.svg";
import { Empty } from "antd";
import axios from "axios";
import config from "../../../config";
import MyComponent from "react-fullpage-custom-loader";
import { success } from "../../../components/Alert";
import { useHistory } from "react-router-dom";

export default function Index(props) {
  const [data, setData] = useState(false);
  const [load, setLoad] = useState(false);
  const [totalPortfolio, setTotalPortfolio] = useState(0);
  const [cryptoPortfolio, setCryptoPortfolio] = useState(0);
  const history = useHistory();
  const [mutualPortfolio, setMutualPortfolio] = useState(0);

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
        setLoad(false);
        if (res.data) {
          let active = res.data?.myinvtesments.filter(
            (a) => a.status !== "Redeemed"
          );
          setData(active);

          let crytpo = res.data?.myinvtesments.filter(
            (a) => a.invest_type === "Crypto"
          );
          let portfolioTotal = res.data?.myinvtesments.filter(
            (a) => a.status !== "Redeemed"
          );

          let mutual = res.data?.myinvtesments.filter(
            (a) => a.invest_type === "Mutual"
          );
          setTotalPortfolio(
            portfolioTotal.reduce(
              (n, { potentialAmt }) => n + parseInt(potentialAmt),
              0
            )
          );
          setCryptoPortfolio(
            crytpo.reduce(
              (n, { potentialAmt }) => n + parseInt(potentialAmt),
              0
            )
          );
          setMutualPortfolio(
            mutual.reduce(
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

  const moveToWallet = (id) => {
    setLoad(true);
    axios
      .post(
        `${config.baseUrl}movetoWallet`,
        {
          id: id,
          user_id: sessionStorage.getItem("user_id"),
        },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        setLoad(false);
        if (res.status === 200) {
          success("Success", "Funds has been moved to wallet successfully");
          getInvestment();
          history.push("/wallet");
        }
      })
      .catch((err) => {
        setLoad(false);
      });
  };

  useEffect(() => {
    getInvestment();
  }, []);
  return (
    <div>
      <DashboardContainer
        pageTitle="My portfolio"
        subTitle="See your information"
      >
        {load && (
          <MyComponent
            loaderType="cube-transition"
            height="100%"
            sentences={["Please wait..."]}
            wrapperBackgroundColor="rgba(0,0,0,0.5)"
          />
        )}
        <div className="row mt-4">
          <div className="col-12 mt-4">
            <div className="invest-cardB">
              <div className="drk-card d-flex justify-content-center align-items-center">
                <div className="pt-2">
                  <small>Portfolio balance</small>
                  <div className="d-flex pt-2 justify-content-center align-items-center">
                    <h4 className="pt-1">
                      ${formatDec(totalPortfolio)}
                      <span>
                        <sup>00</sup>
                      </span>
                    </h4>
                    <small style={{ color: "#4BA582" }}>+ ({formatDec(totalPortfolio/1000)}) </small>
                  </div>

                  <div className="d-flex mt-2 justify-content align-items-center">
                    <div>
                      <small>Crypto</small>
                      <div className="info-border"></div>
                      <small>${formatDec(cryptoPortfolio)} ({formatDec(cryptoPortfolio/1000)})</small>
                    </div>
                    <div className="ml-3">
                      <small>Mutual fund</small>
                      <div className="warning-border"></div>
                      <small>${formatDec(mutualPortfolio)} ({formatDec(mutualPortfolio)/1000})</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="pos-port">
              <img src={cardFrame} />
            </div>
          </div>
        </div>
        <br />
        <div className="row">
          <div className="col-12">
            <div className="mute-head pb-3">My assets ({data?.length})</div>
            {data?.length > 0 && (
              <div className="row">
                {data?.map((dt) => {
                  return (
                    <div className="col-md-4 col-12 mb-4">
                      <div className="invest-card-port pt-3">
                        <div className="invest-area">
                          <div className="d-flex align-items-center justify-content-between">
                            <div>
                              <div>date created: </div>
                              <div>{dt?.investmentdatecreated}</div>
                            </div>
                            <div>
                              <div>Maturity days: </div>
                              <div>
                                {moment(dt.maturityTime).format("DD/MM/YYYY")}{" "}
                              </div>
                            </div>
                          </div>
                          <div className="d-flex justify-content-between align-items-center">
                            <div className="mute-text">{dt?.invest_type}</div>
                            <div className="pt-3">
                              <img src={inflow} />
                            </div>
                          </div>
                          <div className="pt-2 invest-num">
                            ${formatDec(dt?.potentialAmt)}
                          </div>
                          <div className="d-flex pt-4 justify-content-between align-items-center">
                            <div>${formatDec(dt?.amount)}</div>
                            <div
                              style={{ color: "#896AB9", fontWeight: "bold" }}
                            >
                              +{formatDec(dt?.potentialAmt / 1000)}
                            </div>
                          </div>
                          <div className="pt-4 d-flex align-items-center">
                            <div> Status :</div>
                            <div className="pl-2">
                              {
                                {
                                  Growing: (
                                    <div style={{ color: "#faa004" }}>
                                      Growing
                                    </div>
                                  ),
                                  Matured: (
                                    <div style={{ color: "#089430" }}>
                                      Matured
                                    </div>
                                  ),
                                  Redeemed: (
                                    <div style={{ color: "red" }}>Redeemed</div>
                                  ),
                                }[dt.status]
                              }
                            </div>
                          </div>
                          {dt?.status !== "Redeemed" && (
                            <div className="mt-3 mb-3">
                              <Button
                                onClick={moveToWallet.bind(this, dt?._id)}
                                isDisabled={
                                  dt?.status === "Growing" ? true : false
                                }
                                text="Move to wallet"
                                className={
                                  dt?.status === "Growing" ? "" : "w-100 dark"
                                }
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {data?.length === 0 && !load && (
              <div>
                <br />
                <br />
                <Empty description="Oops..You don't have investment record yet." />
              </div>
            )}
          </div>
        </div>
      </DashboardContainer>
    </div>
  );
}
