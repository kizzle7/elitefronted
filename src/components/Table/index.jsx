import { useEffect, useState, useRef } from "react";
import "./index.css";
import Btc from "../../assets/elite/btc.svg";
import star from "../../assets/elite/start.svg";

export const TableHeader = () => {
  return (
    <div >
      <table>
        <tr>
          <th>Name</th>
          <th>Price</th>
          <th>Channel</th>
          <th>Market Cap</th>
          <th>Watch</th>
        </tr>
        
          {[1, 2, 3, 4, 5,6].map((t) => {
            return (
              <tr>
                <td>
                  <div className="d-flex align-items-center">
                    <div>
                      <img src={Btc} />
                    </div>
                    <div className="pl-2">
                      <div className="td-tile">Bitcoin</div>
                      <div style={{fontWeight: 200,color:'#7A899A'}}>BTC</div>
                    </div>
                  </div>
                </td>
                <td>$2.42</td>
                <td>+13.38</td>
                <td style={{color: '#4BA582'}}>$399.9M</td>
                <td>
                  <img src={star} />
                </td>
              </tr>
            );
          })}
        
      </table>
    </div>
  );
};
export default TableHeader;
