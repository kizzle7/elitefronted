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
          <th>Action</th>
          <th>Type</th>
          <th>Amount</th>
          <th>Status</th>
        </tr>

        {data.map((data) => {
          return (
            <tr>
              <td>
                <img
                  src={
                    data.txn_type === "Credit" 
                      ? inflow
                      : ouflow
                  }
                />
              </td>
              <td>{data.trans_ref}</td>
              <td>{moment(data.date).format("MMMM Do YYYY")}</td>
              <td>{data.trans_type}</td>
              <td
                className={
                  data.txn_type === "Credit" ? "text-success" : "text-danger"
                }
              >
                {data.txn_type}
              </td>
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
            </tr>
          );
        })}
      </table>
    </div>
  );
};
export default TableHeader;
