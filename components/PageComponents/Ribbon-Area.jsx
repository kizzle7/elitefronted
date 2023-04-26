import bell from "../../assets/images/Toa.png";
import {Button} from "../Button/index"
import giftCard from "../../assets/images/Giftbox.png";
import coins from "../../assets/images/Coin.png";
import {Input} from "../Input/index"
import "./index.css"
export default function RibbonArea() {
  return (
    <div>
     <div>
        <div className="ribbon-area">
          <div className="d-flex justify-content-end align-items-center">
            <img src={giftCard} />
          </div>
          <h3 className="tetiary-text text-center">
            <div>
              We have created multiple solutions that
              <br /> will make the luxury life more luxury
            </div>
          </h3>
          <br /> 
          <br />

          <div className="coin-ribbon">
            <img src={coins} className="coin-img" />
          </div>
        </div>
      </div>
    </div>
  );
}
