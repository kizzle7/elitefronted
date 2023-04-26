import React, { useEffect, useState, useRef } from "react";
import { DashboardContainer } from "../../../components/DashboardContainer/index";
import Btc from "../../../assets/elite/btc.svg";
import "./index.css";
import { Button } from "../../../components/Button/index";
import "./index.css";
import FundDrawer from "../../../components/Fund/";
import rib from "../../../assets/elite/rib.svg";
import inflow from "../../../assets/elite/inflow.svg";
import outflow from "../../../assets/elite/outflow.svg";
import axios from "axios";
import config from "../../../config";
import WalletTable from "../../../components/Table/wallet";
import MyComponent from "react-fullpage-custom-loader";
import { Empty } from "antd";

export default function Index(props) {
  const [openDeposit, setOpenDeposit] = useState(false);
  const [userPayments, setUserPayments] = useState([]);
  const [inflows, setInflows] = useState(0);
  const [outflows, setOutflows] = useState(0);
  const [loadTrans, setLoadTrans] = useState(false);
  const [userDetails, setUserDetails] = useState({});
  const [load, setLoad] = useState(false);

  const getUser = () => {
    setLoad(true);
    axios
      .get(`${config.baseUrl}user/${sessionStorage.getItem("user_id")}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setLoad(false);
        if (res.data.userInfo) {
          setUserDetails(res.data.userInfo);
        }
      })
      .catch((err) => {
        setLoad(false);
      });
  };

  const getPayments = () => {
    setLoad(true);
    axios
      .get(`${config.baseUrl}getpayment/${sessionStorage.getItem("user_id")}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setLoad(false);
        if (res.data.result) {
          setUserPayments(res.data.result);
          let inflows = res.data?.result.filter(
            (a) =>
              a.payment_type === "BTC Deposit" ||
              a.payment_type === "GiftCard Deposit"
          );
          let outflows = res.data?.result.filter(
            (a) => a.payment_type === "Withdrawal"
          );
          console.log(inflows);
          setInflows(inflows.reduce((n, { amount }) => n + amount, 0));
          setOutflows(outflows.reduce((n, { amount }) => n + amount, 0));
        }
      })
      .catch((err) => {
        setLoad(false);
      });
  };
  console.log(inflows);

  useEffect(() => {
    getPayments();
    getUser();
    if (loadTrans) {
      getPayments();
      getUser();
    }
  }, [loadTrans]);
  return (
    <div>
      {load && (
        <MyComponent
          loaderType="cube-transition"
          height="100%"
          sentences={["Please wait..."]}
          wrapperBackgroundColor="rgba(0,0,0,0.5)"
        />
      )}
      <DashboardContainer
        pageTitle="Wallet balance"
        subTitle="see your inflow and outflow overview"
      >
        <div className="row mt-4">
          <div className="col-12 col-md-4 mt-4">
            <div className="invest-cardB">
              <div className="drk-card">
                <small>Your Activity</small>
                <h4 className="pt-1">
                  ${userDetails?.portfolio}
                  <span>
                    <sup>0</sup>
                  </span>
                </h4>
                <small className="pt-2">
                  Available Bal: ${userDetails?.wallet}
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
          </div>
          <br />
          <div className="col-md-4 col-12 mt-4">
            <div className="invest-card pt-4">
              <div className="invest-area">
                <div className="mute-text">Inflow</div>
                <div className="pt-4 invest-num">
                  ${inflows?.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")}
                </div>
                <div className="d-flex pt-4 justify-content-between align-items-center">
                  <div>
                    <img src={inflow} />
                  </div>
                  <div style={{ color: "#896AB9", fontWeight: "bold" }}>
                    0
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4 col-12 mt-4">
            <div className="invest-card pt-4">
              <div className="invest-area">
                <div className="mute-text">Outflow</div>
                <div className="pt-4 invest-num">
                  {" "}
                  ${outflows?.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")}
                </div>
                <div className="d-flex pt-4 justify-content-between align-items-center">
                  <div>
                    <img src={outflow} />
                  </div>
                  <div style={{ color: "#896AB9", fontWeight: "bold" }}>
                    0
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <br />
        <div className="row">
          <div className="col-md-12 col-12">
            <div className="mute-head pb-3">Payout List</div>
            {userPayments?.length > 0 && !load && (
              <WalletTable data={userPayments} />
            )}
            {userPayments?.length === 0 && !load && (
              <div className="mt-5 pt-5">
                <br />
                <br />
                <Empty description="Oops..You don't have transactions record yet."	 />
                
              </div>
            )}
          </div>
        </div>

        <FundDrawer
          open={openDeposit}
          setOpen={setOpenDeposit}
          setLoadTrans={setLoadTrans}
        />
      </DashboardContainer>
    </div>
  );
}
