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
export const TableHeader = ({ data, setLoad }) => {
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
    setLoad(true);
    axios
      .get(`${config.baseUrl}getpayments/${id}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setLoad(false);
        if (res.data) {
          setOpen(true);
          setDetails(res.data.payment_details);
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
          <th>Ref</th>
          <th>Date</th>
          <th>Amount</th>
          <th>Status</th>
          <th>Action</th>
        </tr>

        {data.map((data) => {
          return (
            <tr>
              <td>{data.trans_ref}</td>
              <td>{moment(data.date).format("MMMM Do YYYY, h:mm:ss a")}</td>
              <td>
                ${data.amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")}
              </td>
              <td>
                {
                  {
                    Pending: <div style={{ color: "#faa004" }}>Pending</div>,
                    inactive: <div>inactive</div>,
                    Completed: (
                      <div style={{ color: "#089430" }}>Completed</div>
                    ),
                    Rejected: <div style={{ color: "#d72f2f" }}>Rejected</div>,
                  }[data.trans_status]
                }
              </td>
              <td>
                <Button
                  text="View Transaction Detail"
                  className="dark"
                  onClick={() => {
                    getDetails(data.payment_ref);
                    setPayId(data.payment_ref);
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
        <div>
          <div className="d-flex justify-content-between align-items-center">
            <div>User Email</div>
            <div>abimbola@gmail.com</div>
          </div>
          <br />
          <div className="d-flex justify-content-between align-items-center">
            <div>Amount</div>
            <div>${formatDec(details.amount)}</div>
          </div>
          <br />

          <div className="d-flex justify-content-between align-items-center">
            <div>Sending Platform</div>
            <div>{details?.payment_type}</div>
          </div>
          <br />
          {details?.payment_type === "BTC Deposit" && (
            <div>
              <div className="d-flex justify-content-between align-items-center">
                <div>User BTC Address</div>
                <div>${details?.btc_address}</div>
              </div>
              <br />
              <div className="d-flex justify-content-between align-items-center">
                <div>User BTC Value</div>
                <div>${details?.btc_rate_value}</div>
              </div>
            </div>
          )}
             {details?.payment_type === "GiftCard Deposit" && (
            <div>
              <div className="d-flex justify-content-between align-items-center">
                <div>GiftCard Type</div>
                <div>{details?.gitcard_type}</div>
              </div>
              <br />
              <div className="d-flex justify-content-between align-items-center">
                <div>Giftcard Number</div>
                <div>{details?.btc_rate_value}</div>
              </div>
              <br />
              <div className="d-flex justify-content-between align-items-center">
                <div>Giftcard Image</div>
                <div></div>
              </div>
              <div>
                <img className="w-100 pt-3 pb-2" src={details?.gitcard_img} />
              </div>
            </div>
          )}

          <br />
          <br />
          <div className="d-flex justify-content-between align-items-center">
            <Button
              text="Confirm Payment"
              onClick={confirmPay}
              className="dark w-100"
            />
          </div>
        </div>
      </Drawer>
    </div>
  );
};
export default TableHeader;
