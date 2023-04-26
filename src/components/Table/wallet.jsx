import { useEffect, useState, useRef } from "react";
import "./index.css";
import Btc from "../../assets/elite/btc.svg";
import inflow from "../../assets/elite/inflow.svg";
import ouflow from "../../assets/elite/outflow.svg";
import moment from "moment";
import { Empty } from "antd";

export const TableHeader = ({ data }) => {
  const getHumanDate = (date) => {
    return moment(date).format("MMM Do YY, hh:mm A");
  };
  return (
    <div>
      <table>
        <tr>
          <th></th>
          <th>Ref</th>
          <th>Date</th>
          <th>Action taken</th>
          <th>Value in USD</th>
          <th>Value in BTC</th>
          <th>Status</th>
        </tr>

        {data.map((data) => {
          return (
            <tr>
              <td>
                <img
                  src={
                    data.payment_type === "BTC Deposit" ||
                    data.payment_type === "GiftCard Deposit"
                      ? inflow
                      : ouflow
                  }
                />
              </td>
              <td>{data.payment_ref}</td>
              <td>{moment(data.date).format("MMMM Do YYYY, h:mm:ss a")}</td>
              <td>{data.payment_type}</td>
              <td>
                ${data.amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")}
              </td>
              <td>{data.btc_rate_value}</td>
              <td>
                {
                  {
                    Pending: <div style={{ color: "#faa004" }}>Pending</div>,
                    inactive: <div>inactive</div>,
                    Completed: (
                      <div style={{ color: "#089430" }}>Completed</div>
                    ),
                    Rejected: <div style={{ color: "#d72f2f" }}>Rejected</div>,
                  }[data.payment_status]
                }
              </td>
            </tr>
          );
        })}
      </table>
    </div>
  );
};
export default TableHeader;
