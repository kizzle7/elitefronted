import React, { useEffect, useState, useRef } from "react";
import { DashboardContainer } from "../../../components/DashboardContainer/index";
import Btc from "../../../assets/elite/btc.svg";
import "./index.css";
import { Button } from "../../../components/Button/index";
import "./index.css";
import InvestDrawer from "../../../components/Invest/invest";
import BtcBlack from "../../../assets/elite/btc-black.svg";
import axios from "axios";
import config from "../../../config";
import BtcPurple from "../../../assets/elite/btc-purple.svg";
import MyComponent from "react-fullpage-custom-loader";
import mBlack from "../../../assets/elite/mutual-b.svg";
import mGold from "../../../assets/elite/mutual-g.svg";
import mPurple from "../../../assets/elite/mutual-p.svg";

export default function Index(props) {
  const [openInvest, setOpenInvest] = useState(false);
  const [investPlans, setInvestPlans] = useState([]);
  const [crypto, setCrypto] = useState([]);
  const [mutual, setMutual] = useState([]);
  const [load, setLoad] = useState(false);
  const [investType, setInvestType] = useState({});

  const getPlans = () => {
    setLoad(true);
    axios
      .get(`${config.baseUrl}getplans`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setLoad(false);
        if (res.data) {
          setInvestPlans(res.data.plans);
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
      .catch((err) => {
        setLoad(false);
      });
  };

  useEffect(() => {
    getPlans();
  }, []);

  console.log(crypto);
  console.log(mutual);

  const onSelectInvest = (type) => {
    setOpenInvest(true);
    setInvestType(type);
    console.log(type)
  };

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
        pageTitle="Invest"
        subTitle="Choose any plan to invest"
      >
        {/* <div className="">
          <div className="d-flex justify-content-end align-items-center">
            <div
              className="btn-white-gry"
            
            >
              profit calculator
            </div>
          </div>
        </div> */}
        <br />
        <div className="row ">
          {crypto?.map((dt) => {
            return (
              <div className="col-md-4 col-12 mb-5">
                <div className="card-line-border">
                  <img
                  
                    src={
                      {
                        "Gold Plan": Btc,
                        "Diamond Plan": BtcPurple,
                        "Silver Plan": BtcBlack,
                      }[dt?.name]
                    }
                  />
                  <div className="pt-3">
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="inv-lead-">{dt.name}</div>
                      <div>
                        <h4>{dt.percent}% Roi</h4>
                      </div>
                    </div>
                    <h4 className="pt-3">
                      <b>{dt.percent}%</b>
                    </h4>
                    <div className="d-flex pt-1 justify-content-between align-items-center">
                      <div style={{ fontWeight: 300, fontSize: 14 }}>
                        Maturiy days
                      </div>
                      <div style={{ color: "#667085" }}>
                        {dt.no_of_days} Days
                      </div>
                    </div>
                    <div className="d-flex pt-1 justify-content-between align-items-center">
                      <div style={{ fontWeight: 300, fontSize: 14 }}>
                        Minimum Amount
                      </div>
                      <div style={{ color: "#667085" }}>${dt.min}</div>
                    </div>
                    <div className="d-flex pt-1 justify-content-between align-items-center">
                      <div style={{ fontWeight: 300, fontSize: 14 }}>
                        Maximum Amount
                      </div>
                      <div style={{ color: "#667085" }}>${dt.max}</div>
                    </div>
                  </div>
                  <br />
                  <Button
                    text="Invest now
                    "
                    onClick={onSelectInvest.bind(this, dt)}

                    style={{ borderRadius: "5px" }}
                    className="dark w-100"
                  />
                </div>
              </div>
            );
          })}
        </div>

        <div className="row ">
          {mutual?.map((dt) => {
            return (
              <div className="col-md-4 col-12 mb-5">
                <div className="card-line-border">
                  <img
                    src={
                      {
                        "Gold Plan": mGold,
                        "Diamond Plan": mPurple,
                        "Silver Plan": mBlack,
                      }[dt?.name]
                    }
                  />
                  <div className="pt-3">
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="inv-lead-">{dt.name}</div>
                      <div>
                        <h4>{dt.percent}% Roi</h4>
                      </div>
                    </div>
                    <h4 className="pt-3">
                      <b>{dt.percent}%</b>
                    </h4>
                    <div className="d-flex pt-1 justify-content-between align-items-center">
                      <div style={{ fontWeight: 300, fontSize: 14 }}>
                        Maturiy days
                      </div>
                      <div style={{ color: "#667085" }}>
                        {dt.no_of_days} Days
                      </div>
                    </div>
                    <div className="d-flex pt-1 justify-content-between align-items-center">
                      <div style={{ fontWeight: 300, fontSize: 14 }}>
                        Minimum Amount
                      </div>
                      <div style={{ color: "#667085" }}>${dt.min}</div>
                    </div>
                    <div className="d-flex pt-1 justify-content-between align-items-center">
                      <div style={{ fontWeight: 300, fontSize: 14 }}>
                        Maximum Amount
                      </div>
                      <div style={{ color: "#667085" }}>${dt.max}</div>
                    </div>
                  </div>
                  <br />
                  <Button
                    text="Invest now
                    "
                    onClick={onSelectInvest.bind(this, dt)}
                    style={{ borderRadius: "5px" }}
                    className="dark w-100"
                  />
                </div>
              </div>
            );
          })}
        </div>
        <InvestDrawer
          open={openInvest}
          setOpen={setOpenInvest}
          investType={investType}
        />
      </DashboardContainer>
    </div>
  );
}
