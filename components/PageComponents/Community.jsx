import bell from "../../assets/images/Toa.png";
import {Button} from "../Button/index"
import {Input} from "../Input/index"
export default function Community({dark}) {
  return (
    <div className="pb-5 pt-5">
      <div className={dark ? "prime-community-dark" :"prime-community"}>
        <div className="text-center mb-4">
          <div className="hero-medium-text text-center pt-4">
            The prime Community
          </div>{" "}
          <br />
          <div className="medium-text-dark text-center ">
            We are creating a community for high net-worth individuals. This
            community will bring
          </div>
          <div className="medium-text-dark text-center">
            {" "}
            in networking, connections, business, e.t.c.
          </div>
        </div>
        <br />
        <br />
        <div className="d-flex d-flex justify-content-center align-items-center">
          <Input
            placeholder="Enter your email address"
            className="communnity-input"
          />
        </div>
        <div className="d-flex justify-content-end align-items-center">
          <img src={bell} className="bell-community" />
        </div>
        

        <div className="community-btn ">
          <Button
            text="Join the waiting list"
            style={{ background: dark ? "white": "#030389", color: dark ? "#030389" : "white" }}
          />{" "}
        </div>
      </div>
    </div>
  );
}
