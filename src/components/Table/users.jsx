import { useEffect, useState, useRef } from "react";
import "./index.css";
import Btc from "../../assets/elite/btc.svg";
import inflow from "../../assets/elite/inflow.svg";
import ouflow from "../../assets/elite/outflow.svg";
import moment from "moment";
import { Empty } from "antd";
import { error, success } from "../../components/Alert/index";
import { Button } from "../../components/Button/index";
import Close from "../../assets/elite/close.svg";
import { Drawer } from "antd";
import axios from "axios";
import config from "../../config";
export const TableHeader = ({ data, setLoad, load }) => {
  const [open, setOpen] = useState(false);
  const [payId, setPayId] = useState("");
  const [details, setDetails] = useState({});
  const onClose = () => {
    setOpen(false);
  };

  const formatDec = (num, decimals) =>
    num?.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  const confirmPay = () => {
    setLoad(true);
    axios
      .get(`${config.baseUrl}confirmUserPay/${payId}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setLoad(false);
        if (res.status === 200) {
          setOpen(false);
          success(
            "Success!",
            "Payment Confirmed, User has been credited " +
              details?.amount +
              " successfuly!"
          );
        }
      })
      .catch((err) => {
        setLoad(false);
      });
  };

  const getDetails = (id) => {
    axios
      .get(`${config.baseUrl}user/${id._id}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setLoad(false);
        setOpen(true);
        if (res.data) {
          setDetails(res.data.userInfo);
        }
      })
      .catch((err) => {
        setLoad(false);
      });
  };
  return (
    <div>
      <table>
        <tr>
          <th>S/N</th>
          <th>Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Action</th>
        </tr>

        {data.map((data, index) => {
          return (
            <tr>
              <td>{index + 1}</td>
              <td>{data.name}</td>
              <td>{data.email}</td>
              <td>{data.phone}</td>

              <td>
                <Button
                  text="View Info"
                  className="dark"
                  isDisabled={load}
                  onClick={() => {
                    console.log("clicked this");
                    getDetails(data);
                  }}
                />
              </td>
            </tr>
          );
        })}
      </table>

      <Drawer
        title={false}
        placement="right"
        onClose={onClose}
        open={open}
        closable={false}
      >
        <div className="text-right pb-3" onClick={onClose}>
          <img src={Close} width="20" />
        </div>
        <br />
        <div>
          <div>User information</div>
          
          <div className="d-flex justify-content-between align-items-center">
            <div>Password</div>
            <div>{details.password}</div>
          </div>
          <br />

          <div className="d-flex justify-content-between align-items-center">
            <div>Address</div>
            <div>{details?.address}</div>
          </div>
          <br />
          <div className="d-flex justify-content-between align-items-center">
            <div>State</div>
            <div>{details?.state}</div>
          </div>
          <br />
          <div className="d-flex justify-content-between align-items-center">
            <div>Country</div>
            <div>{details?.country}</div>
          </div>
          <br />
          <div className="d-flex justify-content-between align-items-center">
            <div>Wallet Balance</div>
            <div>${formatDec(details.wallet)}</div>
          </div>

          <br />
          <br />
          <div className="d-flex justify-content-between align-items-center">
            <Button
              text="Block"
              className="cancel w-50"
            />
          
          </div>
        </div>
        <hr />
        <div>
          <div>KYC information</div>
          <div className="d-flex justify-content-between align-items-center">
            <div>Identitificaton Type</div>
            <div>{details.identityType}</div>
          </div>
          <br />
          <div className="d-flex justify-content-between align-items-center">
            <div>KYC Uploaded Image</div>
          </div>
          <div>
            <img className="w-100 pt-3 pb-2" src={details?.identityImage} />
          </div>
        </div>
        <hr />
        <div>
          <div>Bank Account</div>
          <div className="d-flex justify-content-between align-items-center">
            <div>Account Number</div>
            <div>{details.accNum}</div>
          </div>
          <br />
          <div className="d-flex justify-content-between align-items-center">
            <div>Account Type</div>
            <div>{details.accType}</div>
          </div>
          <br />
          <div className="d-flex justify-content-between align-items-center">
            <div>Routing Number</div>
            <div>{details.routing}</div>
          </div>
          <br />
          <div className="d-flex justify-content-between align-items-center">
            <div>Bank </div>
            <div>{details.bankName}</div>
          </div>
        </div>
      </Drawer>
    </div>
  );
};
export default TableHeader;
