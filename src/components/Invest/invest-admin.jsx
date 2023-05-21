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
import MyComponent from "react-fullpage-custom-loader";
import BtcPurple from "../../assets/elite/btc-purple.svg";
import mBlack from "../../assets/elite/mutual-b.svg";
import mGold from "../../assets/elite/mutual-g.svg";
import mPurple from "../../assets/elite/mutual-p.svg";
import Btc from "../../assets/elite/btc.svg";
import config from "../../config";
import axios from "axios";
import "./index.css";
import { error, success } from "../../components/Alert/index";
import { useEffect } from "react";

const uploader = Uploader({
  apiKey: "free", // Get production API keys from Upload.io
});
const options = { multi: false };

const Fund = ({ open, setLoad, load, setOpen, investType, getPlans }) => {
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

  useEffect(() => {
    if (investType?.invest_type) {
      setValue("type", investType.invest_type);
      setValue("min", investType.min);
      setValue("max", investType.max);
      setValue("percent", investType.percent);
      setValue("days", investType.no_of_days);
      setValue("plan", investType.name);
    } else {
      setValue("type", null);
      setValue("min", null);
      setValue("max", null);
      setValue("percent", null);
      setValue("days", null);
      setValue("plan", null);
    }
  }, [investType]);

  const totalAmt = postAmt + parseInt(amount);

  const onInvest = (data) => {
    setLoad(true);
    axios
      .post(
        `${config.baseUrl}plan`,
        {
          name: data.plan,
          no_of_days: data.days,
          percent: data.percent,
          min: data.min,
          max: data.max,
          invest_type: data.type,
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
          success(
            "Success!",
            "Your new investment plan has created successfully! "
          );
          setValue("type", null);
          setValue("min", null);
          setValue("max", null);
          setValue("percent", null);
          setValue("days", null);
          setValue("plan", null);
          getPlans();
          onClose();
        }
      })
      .catch((err) => {
        setLoad(false);
        if (err) {
          error("Error!", err?.response?.data?.msg);
        }
      });
  };

  const update = (data) => {
    setLoad(true);
    axios
      .put(
        `${config.baseUrl}plan/${investType._id}`,
        {
          name: data.plan,
          no_of_days: data.days,
          percent: data.percent,
          min: data.min,
          max: data.max,
          invest_type: data.type,
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
          success(
            "Success!",
            "Your new investment plan has updated successfully! "
          );
          setValue("type", null);
          setValue("min", null);
          setValue("max", null);
          setValue("percent", null);
          setValue("days", null);
          setValue("plan", null);
          getPlans();
          onClose();
        }
      })
      .catch((err) => {
        setLoad(false);
        if (err) {
          error("Error!", err?.response?.data?.msg);
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
        <p style={{ fontWeight: 600 }}>
          {investType?.name ? "Update" : "Create"} Invest
        </p>

        <form>
          <div className="form-group pt-2">
            <label
              className="d-block pb-2 text-dark"
              style={{ color: "#344054", fontWeight: 600 }}
            >
              Select invest type
            </label>
            <select
              className="select-card w-100"
              {...register("type", {
                required: "Please select the invest type",
              })}
            >
              <option></option>
              <option value={"Crypto"}>Crypto Funds</option>
              <option value={"Mutual"}>Mutual Funds</option>
            </select>
            <Error errorName={errors.type} />
          </div>

          <div className="form-group pt-2">
            <label
              className="d-block pb-2 text-dark"
              style={{ color: "#344054", fontWeight: 600 }}
            >
              Select Plan type
            </label>
            <select
              className="select-card w-100"
              {...register("plan", {
                required: "Please select the plan type",
              })}
            >
              <option></option>
              <option>Gold</option>
              <option>Silver</option>
              <option>Diamond</option>
              <option>Sapphaire</option>
              <option>Emrald</option>
              <option>Pearl</option>
            </select>
            <Error errorName={errors.plan} />
          </div>

          <Input
            label="Plan Percentage ROI(%)"
            placeholder="Enter Percent"
            className="w-100"
            {...register("percent", {
              required: "Please input percentage",
            })}
          />
          <Error errorName={errors.percent} />
          <br />
          <Input
            label="Minimum amount for investment plan"
            placeholder="Enter Amount"
            className="w-100"
            {...register("min", {
              required: "Please input minimum amount you want for investment",
            })}
          />
          <Error errorName={errors.min} />
          <br />
          <Input
            label="Maximum amount for investment plan"
            placeholder="Enter Amount"
            className="w-100"
            {...register("max", {
              required: "Please input maximum amount you want for investment",
            })}
          />
          <Error errorName={errors.max} />
          <br />
          <Input
            label="No of Maturity Days for plan"
            placeholder="Enter No of days"
            className="w-100"
            {...register("days", {
              required: "Please input number of days",
            })}
          />
          <Error errorName={errors.days} />

          <br />
          <br />
          {investType?.invest_type ?
          <Button
            isDisabled={load}
            text="Submit"
            onClick={handleSubmit(update)}
            style={{ borderRadius: "5px" }}
            className="dark w-100"
          /> :
          <Button
            isDisabled={load}
            text="Submit"
            onClick={handleSubmit(onInvest)}
            style={{ borderRadius: "5px" }}
            className="dark w-100"
          />}
        </form>
      </Drawer>
    </>
  );
};

export default Fund;
