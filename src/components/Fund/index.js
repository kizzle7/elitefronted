import React, { useState, useEffect } from "react";
import { Drawer } from "antd";
import { Input } from "../Input/index";
import fundBag from "../../assets/elite/fund-bag.svg";
import { Button } from "../../components/Button/index";
import { Controller, useForm } from "react-hook-form";
import Error from "../../components/Error/index";
import Btc from "../../assets/elite/btc.svg";
import { useHistory } from "react-router-dom";
import barcode from "../../assets/elite/qr.jpeg";
import clock from "../../assets/elite/clock.svg";
import gallery from "../../assets/elite/gallery.svg";
import { Uploader } from "uploader"; // Installed by "react-uploader".
import { UploadButton } from "react-uploader";
import Close from "../../assets/elite/close.svg";
import MyComponent from "react-fullpage-custom-loader";
import { error, success } from "../../components/Alert/index";
import axios from "axios";
import config from "../../config";

import "./index.css";
const uploader = Uploader({
  apiKey: "free", // Get production API keys from Upload.io
});
const options = { multi: false };

const Fund = ({ open, setOpen, setLoadTrans }) => {
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

  const moveStep2 = () => {
    setStep2(true);
    setStep1(false);
  };
  const history = useHistory();
  const amount = watch("amount");
  const cardType = watch("cardType");
  const cardNumber = watch("cardNumber");
  const address = watch("address");
  const [fundType, setFundtype] = useState("");
  const [copySuccess, setCopySuccess] = useState("");
  const [step1, setStep1] = useState(true);
  const [step2, setStep2] = useState(false);
  const [file, setFile] = useState(null);
  const [imgUrl, setImgUrl] = useState("");
  const [step3, setStep3] = useState(false);
  const [load, setLoad] = useState(false);
  const [step4, setStep4] = useState(false);
  const [rate, setRate] = useState("");

  const showDrawer = () => {
    setOpen(true);
  };

  const [type, setType] = useState("");
  const copyText = (text, copyType) => {
    navigator.clipboard.writeText(text);
    setType(copyType);
    setCopySuccess("Copied!");
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

  const makePayment = () => {
    if (fundType !== "btc") {
      if (!imgUrl) {
        error("Error", "Image upload is required");
        return;
      }
    }

    setLoad(true);
    axios
      .post(
        `${config.baseUrl}makepayment`,
        {
          amount: amount,
          type: fundType === "btc" ? "BTC" : "GIFTCARD",
          gitcardType: cardType,
          gitcardNumber: cardNumber,
          cardImage: imgUrl,
          valueRate: fundType === "btc" ? rate : cardNumber,
          btcAddress: address,
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
        setImgUrl(null);
        if (res.data) {
          success(
            "Success!",
            "Your payment has been submitted successfully with the reference! " +
              res.data.payment.payment_ref
          );
          setLoadTrans(true);
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

  const onFund = (e) => {
    axios
      .post(
        `${config.baseUrl}btcPrice`,
        {
          amount: e.target.value,
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
          setRate(res.data.rate);
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
      {load && (
        <MyComponent
          loaderType="cube-transition"
          height="100%"
          sentences={["Please wait..."]}
          wrapperBackgroundColor="rgba(0,0,0,0.5)"
        />
      )}
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
        <p style={{ fontWeight: 600 }}>Fund wallet</p>
        <div className="text-center">
          <img src={fundBag} />{" "}
        </div>
        <br />
        {step1 && (
          <form onSubmit={handleSubmit(moveStep2)}>
            <Input
              label="How much would you like to fund?"
              placeholder="Enter Amount"
              className="w-100"
              {...register("amount", {
                required: "Please input amount you want to fund",
                onBlur: onFund,
              })}
            />
            <Error errorName={errors.amount} />

            <br />
            <br />
            <Button
              text="Next"
              style={{ borderRadius: "5px" }}
              className="dark w-100"
            />
          </form>
        )}

        {step2 && (
          <form onSubmit={handleSubmit(moveStep2)}>
            <div className="d-flex justify-content-between align-items-center">
              <div>You want to fund ${amount}</div>
              <div
                className="text-info font-weight-old"
                onClick={() => {
                  console.log("clicked");
                  setStep1(true);
                  setStep2(false);
                  setStep3(false);
                  setValue("amount", null);
                }}
              >
                Edit Amount
              </div>
            </div>
            <p className="pt-3" style={{ fontWeight: 300 }}>
              Choose payment mode to continue
            </p>
            <div
              className={
                fundType === "btc" ? "choose-border-active" : "choose-border"
              }
              onClick={selectFundtype.bind(this, "btc")}
            >
              <div className="d-flex align-items-center">
                <div>
                  <img src={Btc} />
                </div>
                <div className="pl-3">
                  <div className="td-tile">Bitcoin</div>
                  <div style={{ fontWeight: 300, color: "#7A899A" }}>
                    fund your wallet with bitocin
                  </div>
                </div>
              </div>
            </div>
            <br />
            <div className="text-center">or</div>
            <br />
            <div
              className={
                fundType === "giftcard"
                  ? "choose-border-active"
                  : "choose-border"
              }
              onClick={selectFundtype.bind(this, "giftcard")}
            >
              <div className="d-flex align-items-center">
                <div>
                  <img src={Btc} />
                </div>
                <div className="pl-3">
                  <div className="td-tile">Giftcard</div>
                  <div style={{ fontWeight: 300, color: "#7A899A" }}>
                    apple, google or amazon
                  </div>
                </div>
              </div>
            </div>

            <br />
            <br />
            <br />
            <Button
              onClick={handleSubmit(moveStep3)}
              text="Next"
              style={{ borderRadius: "5px" }}
              className="dark w-100"
            />
          </form>
        )}

        {step3 && (
          <div>
            <form onSubmit={handleSubmit(moveStep2)}>
              <div className="d-flex justify-content-between align-items-center">
                <div>You want to fund ${amount}</div>
                <div
                  className="text-info"
                  onClick={() => {
                    console.log("clicked");
                    setStep1(true);
                    setStep2(false);
                    setStep3(false);
                    setValue("amount", null);
                  }}
                >
                  Edit Amount
                </div>
              </div>
              <br />
              {fundType === "btc" && (
                <div>
                  <Input
                    label="Input your source BTC wallet Address"
                    placeholder="Enter Source BTC Wallet Address"
                    className="w-100"
                    {...register("address", {
                      required:
                        "Please input your btc wallet address you will be sending from",
                    })}
                  />
                  <Error errorName={errors.address} />
                </div>
              )}
              {fundType === "btc" ? (
                <div>
                  <p className="pt-3" style={{ fontWeight: 300 }}>
                    to confirm Your wallet top up, please send the exact amount
                    of BTC to the given address
                  </p>
                  <br />
                  <p className="font-weight-bold">{rate} BTC</p>
                  <hr />
                  <p className="font-weight-bold">${amount}</p>
                  <br />
                  <div className="choose-border px-5">
                    <div className="d-flex container justify-content-center align-items-center">
                      <div>
                        <div>3ErM9EnyEmwvE7dwfFUvr7dLQu4GNk6LbS</div>
                        <div className="d-flex justify-content-center align-items-center">
                          <div
                            className="copy-wallet mt-3 "
                            style={{ cursor: "pointer" }}
                            onClick={() =>
                              copyText(
                                "3ErM9EnyEmwvE7dwfFUvr7dLQu4GNk6LbS",
                                "account"
                              )
                            }
                          >
                            Copy
                            <small className="ml-3">
                              {type === "account" && copySuccess}
                            </small>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="text-center">
                    <img src={barcode} className="w-50" />
                  </div>

                  <br />
                  <div className="text-center">
                    <div className="d-flex justify-content align-items-center">
                      <div className="pr-2">
                        <img src={clock} />
                      </div>
                      <small>
                        <span style={{ color: "#FCB45D", fontWeight: 600 }}>
                          12:00
                        </span>{" "}
                        mins left to complete your payment
                      </small>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="">
                  <div className="form-group">
                    <label
                      className="d-block pb-2 text-dark"
                      style={{ color: "#344054", fontWeight: 600 }}
                    >
                      Select a giftcard
                    </label>
                    <select
                      className="select-card w-100"
                      {...register("cardType", {
                        required: "Please select the giftcard type",
                      })}
                    >
                      <option>Select</option>
                      <option>Google Play</option>
                      <option>Vcard</option>
                      <option>Master Card</option>
                    </select>
                    <Error errorName={errors.cardType} />
                  </div>
                  <div className="">
                    <Input
                      label="Gift card Number"
                      placeholder="Input number"
                      className="w-100"
                      {...register("cardNumber", {
                        required: "Please input the giftcard number",
                      })}
                    />
                    <Error errorName={errors.cardNumber} />
                  </div>
                  <br />
                  {!imgUrl ? (
                    <UploadButton
                      uploader={uploader}
                      options={options}
                      onComplete={(files) => {
                        setImgUrl(files[0].originalFile.fileUrl);
                        setFile(files[0].originalFile.file);
                      }}
                    >
                      {({ onClick }) => (
                        <div onClick={onClick} className="upload-ch">
                          <div className="d-flex justify-content-center align-items-center">
                            <div>
                              <div>upload giftcard image</div>
                              <div className="text-center pt-1">
                                <img src={gallery} />
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </UploadButton>
                  ) : (
                    <div>
                      <div
                        className="text-right text-danger font-weigh"
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          setImgUrl(null);
                        }}
                      >
                        Change Image
                      </div>
                      <img src={imgUrl} className="w-100" />
                      <br />
                    </div>
                  )}
                </div>
              )}
              <br />
              <Button
                loading={load}
                onClick={handleSubmit(makePayment)}
                text={fundType === "btc" ? "I've Paid" : "Pay with giftcard"}
                style={{ borderRadius: "5px" }}
                className="dark w-100"
              />
            </form>
          </div>
        )}
      </Drawer>
    </>
  );
};

export default Fund;
