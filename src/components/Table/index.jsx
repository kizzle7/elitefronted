import { useEffect, useState, useRef } from "react";
import "./index.css";
import Btc from "../../assets/elite/btc.svg";
import star from "../../assets/elite/start.svg";

export const TableHeader = ({ data }) => {
  const formatDec = (num, decimals) =>
    num?.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  return (
    <div>
      <table>
        <tr>
          <th>Name</th>
          <th>Price</th>
          <th>Supply</th>
          <th>Market Cap</th>
          <th>Watch</th>
        </tr>

        {data?.map((t) => {
          return (
            <tr>
              <td>
                <div className="d-flex align-items-center">
                  <div>
                    <img src={Btc} />
                  </div>
                  <div className="pl-2">
                    <div className="td-tile">Bitcoin</div>
                    <div style={{ fontWeight: 200, color: "#7A899A" }}>BTC</div>
                  </div>
                </div>
              </td>
              <td>${formatDec(t?.priceUsd?.substring(0, 6))}</td>
              <td style={{ color: "#4BA582" }}>
                ${parseInt(t?.supply.substring(0, 6))}
              </td>
              <td>{formatDec(t?.marketCapUsd.substring(0, 6))}</td>
              <td>{formatDec(t?.changePercent24Hr.substring(0, 6))}</td>
            </tr>
          );
        })}
      </table>
    </div>
  );
};
export default TableHeader;
