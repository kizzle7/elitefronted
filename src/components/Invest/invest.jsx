import React, { useState } from "react";
import { Drawer } from "antd";
import { Input } from "../Input/index";
import fundBag from "../../assets/elite/fund-bag.svg";
import { Button } from "../../components/Button/index";
import { Controller, useForm } from "react-hook-form";
import Error from "../../components/Error/index";
import btcDark from "../../assets/elite/btc-dark.svg";
import barcode from "../../assets/elite/qr.svg";
import clock from "../../assets/elite/clock.svg";
import warn from "../../assets/elite/warn.svg";
import { Uploader } from "uploader"; // Installed by "react-uploader".
import { UploadButton } from "react-uploader";
import Close from "../../assets/elite/close.svg";
import BtcBlack from "../../assets/elite/btc-black.svg";
import BtcPurple from "../../assets/elite/btc-purple.svg";
import mBlack from "../../assets/elite/mutual-b.svg";
import mGold from "../../assets/elite/mutual-g.svg";
import mPurple from "../../assets/elite/mutual-p.svg";
import Btc from "../../assets/elite/btc.svg";
import config from "../../config";
import axios from "axios";
import "./index.css";
import { error, success } from "../../components/Alert/index";

const uploader = Uploader({
  apiKey: "free", // Get production API keys from Upload.io
});
const options = { multi: false };

const Fund = ({ open, setOpen, investType }) => {
  const {
    register,
    handleSubmit,
    getValues,
    watch,
    control,
    reset,
    setValue,
    formState: { errors },
  } = useForm({ mode: "onBlur" });

  const [postAmt, setPostAmt] = useState(0);

  const moveStep2 = () => {
    setStep2(true);
    setStep1(false);
  };
  const amount = watch("amount");
  const cardType = watch("cardType");
  const cardNumber = watch("cardNumber");
  const [fundType, setFundtype] = useState("");

  const [step1, setStep1] = useState(true);
  const [step2, setStep2] = useState(false);
  const [step3, setStep3] = useState(false);
  const [step4, setStep4] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const [load, setLoad] = useState(false);

  const onClose = () => {
    setOpen(false);
    setFundtype("");
    setValue("amount", null);
    setStep3(false);
    setStep2(false);
    setStep1(true);
    setValue("cardNumber", null);
    setValue("cardType", null);
  };

  const selectFundtype = (type) => {
    setFundtype(type);
  };

  const moveStep3 = () => {
    if (fundType) {
      setStep2(false);
      setStep3(true);
    }
  };

  const formatDec = (num, decimals) =>
    num.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  const getConversion = (e) => {
    const amt = (e.target.value * investType?.percent) / 100;
    setPostAmt(amt);
  };

  const totalAmt = postAmt + parseInt(amount);

  const onInvest = () => {
    setLoad(true);
    axios
      .post(
        `${config.baseUrl}makeinvestment`,
        {
          invest_id: investType?._id,
          invest_name: investType?.name,
          amount: amount,
          invest_type: investType?.invest_type,
          percent:investType?.percent,
          potentialAmt: amount,
          invest_days: Number(investType?.no_of_days),
          profit: postAmt,
          id: sessionStorage.getItem("user_id"),
        },
        {
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        setLoad(false);
        if (res.data) {
          success("Success!", "Your investment has been submited! ");
          onClose();
        }
      })
      .catch((err) => {
        setLoad(false);

        if (err) {
          // error("Error!", err?.response?.data?.msg);
        }
      });
  };

  return (
    <>
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
        <p style={{ fontWeight: 600 }}>Invest</p>
        <div className="text-center">
          {investType?.invest_type === "Crypto" ? (
            <img
              src={
                {
                  "Gold Plan": Btc,
                  "Diamond Plan": BtcPurple,
                  "Silver Plan": BtcBlack,
                }[investType?.name]
              }
            />
          ) : (
            <img
              src={
                {
                  "Gold Plan": mGold,
                  "Diamond Plan": mPurple,
                  "Silver Plan": mBlack,
                }[investType?.name]
              }
            />
          )}
        </div>
        <div className="text-center pt-3">{investType?.name}</div>
        <br />
        <div className="warn-border pt-2">
          <div className="d-flex justify-content-center align-items-center">
            <div className="d-flex pt-2 justify-content align-items-center">
              <div>
                {" "}
                <img src={warn} />
              </div>
              <div className="pl-3">minimum investment is $200.00</div>
            </div>
          </div>
        </div>
        <br />
        <br />

        <form>
          <Input
            label="How much would you like to invest?"
            placeholder="Enter Amount"
            className="w-100"
            {...register("amount", {
              required: "Please input amount you want to fund",
              onChange: getConversion,
              min: {
                value: investType?.min,
                message: `Amount cannot be lower than ${investType?.min}`,
              },
              max: {
                value: investType?.max,
                message: `Ammount cannot be higher than ${investType?.max}`,
              },
            })}
          />
          <Error errorName={errors.amount} />
          <br />
          {Object.keys(errors).length === 0 && (
            <div className="summary-border pt-2">
              <div>profit calculator</div>
              <br />
              <div className="d-flex justify-content-between align-items-center">
                <div>Amount:</div>
                <div>{amount}</div>
              </div>
              <br />
              <div className="d-flex justify-content-between align-items-center">
                <div>Potential returns:</div>
                <div> ${postAmt ? postAmt : 0}</div>
              </div>
              <br />
              <div className="d-flex justify-content-between align-items-center">
                <div>Potential profit:</div>
                <div>
                  ${amount} - ${totalAmt ? totalAmt : 0}
                </div>
              </div>
            </div>
          )}

          <br />
          <br />
          <Button
            text="Invest now"
            onClick={handleSubmit(onInvest)}
            style={{ borderRadius: "5px" }}
            className="dark w-100"
          />
        </form>
      </Drawer>
    </>
  );
};

export default Fund;
