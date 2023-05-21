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
import Table from "../../../components/Table/admin-trans";
export default function Index(props) {
  const [data, setData] = useState(false);
  const [load, setLoad] = useState(false);
  const [trans, setTrans] = useState([]);
  const [giftcard, setGiftCard] = useState(0);
  const [userList, setUserList] = useState([]);
  const [btc, setBTC] = useState(0);

  const formatDec = (num, decimals) =>
    num?.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  const getTrans = (id) => {
    axios
      .get(`${config.baseUrl}admin/transactions`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setLoad(false);
        if (res.status === 200) {
          let data = res.data.transactions?.filter(
            (transaction) => transaction.trans_status === "Pending"
          );
          setTrans(data);
          let btc = res.data?.transactions.filter(
            (a) => a.trans_type_mode === "BTC Deposit"
          );
          let giftcard = res.data?.transactions.filter(
            (a) => a.trans_type_mode === "GiftCard Deposit"
          );
          setBTC(btc.reduce((n, { amount }) => n + amount, 0));
          setGiftCard(giftcard.reduce((n, { amount }) => n + amount, 0));
        }
      })
      .catch((err) => {
        setLoad(false);
      });
  };

  const getUsers = () => {
    setLoad(true);
    axios
      .get(`${config.baseUrl}get-all-users`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setLoad(false);
        if (res.data.users) {
          setUserList(res.data.users);
        }
      })
      .catch((err) => {
        setLoad(false);
      });
  };

  useEffect(() => {
    getTrans();
    getUsers();
  }, []);
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
        pageTitle="Administrator Dashboard"
        subTitle="See your information"
      >
        <div className="row mt-4">
          <div className="col-md-4 col-12 mt-4">
            <div className="invest-card pt-4">
              <div className="invest-area">
                <div className="mute-text">BTC Deposit</div>
                <div className="pt-4 invest-num">${formatDec(btc)}</div>
                <div className="d-flex pt-4 justify-content-between align-items-center">
                  <div>
                    <img src={inflow} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <br />
          <div className="col-md-4 col-12 mt-4">
            <div className="invest-card pt-4">
              <div className="invest-area">
                <div className="mute-text">Gift Card Deposit</div>
                <div className="pt-4 invest-num">${formatDec(giftcard)}</div>
                <div className="d-flex pt-4 justify-content-between align-items-center">
                  <div>
                    <img src={inflow} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4 col-12 mt-4">
            <div className="invest-card pt-4">
              <div className="invest-area">
                <div className="mute-text">Total Users</div>
                <div className="pt-4 invest-num"> {userList?.length}</div>
                <div className="d-flex pt-4 justify-content-between align-items-center">
                  <div>
                    <img src={outflow} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <br />
        <div className="row">
          <div className="col-12">
            <div className="mute-head pb-3">Transactions ({trans?.length})</div>
            {trans?.length > 0 && <Table data={trans} setLoad={setLoad} />}

            {trans?.length === 0 && !load && (
              <div>
                <br />
                <br />
                <Empty description="Oops..There are no tranactions record yet." />
              </div>
            )}
          </div>
        </div>
      </DashboardContainer>
    </div>
  );
}
