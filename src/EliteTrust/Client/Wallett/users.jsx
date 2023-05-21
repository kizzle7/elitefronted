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
import Table from "../../../components/Table/users";
import MyComponent from "react-fullpage-custom-loader";
import { Empty } from "antd";

export default function Index(props) {
  const [openDeposit, setOpenDeposit] = useState(false);
  const [userList, setUserList] = useState([]);

  const [inflows, setInflows] = useState(0);
  const [portfolio, setPortfolio] = useState(0)
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

          setPortfolio(
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
  
  const formatDec = (num, decimals) =>
    num?.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  useEffect(() => {
    getUsers()
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
        pageTitle="Users Lists"
        subTitle="see all your users"
      >
        
        <br />
        <div className="row">
          <div className="col-md-12 col-12">
            <div className="mute-head pb-3">All Users List</div>
            {userList?.length > 0 && !load && (
              <Table data={userList} setLoad={setLoad}  load={load}/>
            )}
            {userList?.length === 0 && !load && (
              <div className="mt-5 pt-5">
                <br />
                <br />
                <Empty description="Oops..You don't have users record yet."	 />
                
              </div>
            )}
          </div>
        </div>


      </DashboardContainer>
    </div>
  );
}
