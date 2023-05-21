import React, { useEffect, useState, useRef } from "react";
import { DashboardContainer } from "../../../components/DashboardContainer/index";
import "./index.css";
import { Button } from "../../../components/Button/index";
import "./index.css";
import Error from "../../../components/Error/index";
import { Controller, useForm } from "react-hook-form";
import { Input } from "../../../components/Input/index";
import globe from "../../../assets/elite/globe.svg";
import gallery from "../../../assets/elite/hg.svg";
import Camera from "../../../assets/elite/Camera.svg";
import { Uploader } from "uploader"; // Installed by "react-uploader".
import { UploadButton } from "react-uploader";
import config from "../../../config";
import axios from "axios";
import MyComponent from "react-fullpage-custom-loader";
import { success, error } from "../../../components/Alert";

export default function Index(props) {
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
  const [first, setFirst] = useState(true);
  const [second, setSecond] = useState(false);
  const [third, setThird] = useState(false);
  const [userDetails, setUserDetails] = useState({});
  const [load, setLoad] = useState(false);
  const [imgUrl, setImgUrl] = useState(null);
  const address = watch("address");
  const state = watch("state");
  const city = watch("city");
  const country = watch("country");
  const identityType = watch("identityType");
  const identityImage = watch("identityImage");
  const accName = watch("accName");
  const accNum = watch("accNum");
  const accType = watch("accType");
  const bankName = watch("bankName");
  const routing = watch("routing");
  const uploader = Uploader({
    apiKey: "free", // Get production API keys from Upload.io
  });
  const options = { multi: false };

  const getUser = () => {
    setLoad(true);
    axios
      .get(`${config.baseUrl}user/${sessionStorage.getItem("user_id")}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setLoad(false);
        if (res.data.userInfo) {
          setUserDetails(res.data.userInfo);
          setValue("email", res.data.userInfo?.email);
          setValue("name", res.data.userInfo?.name);
          setValue("phone", res.data.userInfo?.phone);
          setValue("address", res.data.userInfo.address);
          setValue("city", res.data.userInfo.city);
          setValue("country", res.data.userInfo.country);
          setValue("state", res.data.userInfo.state);
          setValue("bankName", res.data.userInfo.bankName);
          setValue("accName", res.data.userInfo.name);
          setValue("accNum", res.data.userInfo.accNum);
          setValue("accType", res.data.userInfo.accType);
          setValue("routing", res.data.userInfo.routing);
        }
      })
      .catch((err) => {
        setLoad(false);
      });
  };

  const updateKyc = (e) => {
    e.preventDefault();
    if (imgUrl && identityType) {
      setLoad(true);
      axios
        .put(
          `${config.baseUrl}user/kyc/${sessionStorage.getItem("user_id")}`,
          {
            identityImage: imgUrl,
            identityType,
          },
          {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
          }
        )
        .then((res) => {
          setLoad(false);
          if (res.data.userUpdate) {
            success("Success", "KYC information updated successfully");
            getUser();
          }
        })
        .catch((err) => {
          setLoad(false);
        });
    } else {
      error("Error", "Fields are required");
    }
  };

  const updateAcc = (e) => {
    e.preventDefault();
    if (accNum && routing && accType && bankName) {
      setLoad(true);
      axios
        .put(
          `${config.baseUrl}user/acc/${sessionStorage.getItem("user_id")}`,
          {
            accNum,
            routing,
            accType,
            bankName,
          },
          {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
          }
        )
        .then((res) => {
          setLoad(false);
          if (res.data.userUpdate) {
            success("Success", "Bank Account information updated successfully");
            getUser();
          }
        })
        .catch((err) => {
          setLoad(false);
        });
    } else {
      error("Error", "Fields are all required");
    }
  };

  const updateBasic = (e) => {
    e.preventDefault();
    setLoad(true);
    axios
      .put(
        `${config.baseUrl}user/${sessionStorage.getItem("user_id")}`,
        {
          country,
          address,
          city,
          state,
        },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        setLoad(false);
        if (res.data.userUpdate) {
          success("Success", "User information updated successfully");
          getUser();
        }
      })
      .catch((err) => {
        setLoad(false);
      });
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div>
      {load && (
        <MyComponent
          loaderType="cube-transition"
          height="100%"
          sentences={["Please wait..."]}
          wrapperBackgroundColor="rgba(0,0,0,0.5)"
        />
      )}
      <DashboardContainer
        pageTitle="Profile"
        subTitle="See how your investments are growing"
      >
        <div className="row mt-4">
          <div className="col-12">
            <div className="profile-border">
              <div className="d-flex align-items-center">
                <div
                  className="col-md-3 col-12"
                  style={{ padding: 0, margin: 0 }}
                >
                  <div className="profile-side">
                    <div
                      onClick={() => {
                        setFirst(true);
                        setSecond(false);
                        setThird(false);
                      }}
                      className={`${
                        first ? "active-mennu" : "non-active"
                      } mb-5`}
                    >
                      Personal Details
                    </div>
                    <div
                      onClick={() => {
                        setFirst(false);
                        setSecond(true);
                        setThird(false);
                      }}
                      className={`${
                        second ? "active-mennu" : "non-active"
                      } mb-5`}
                    >
                      Kyc Update
                    </div>
                    <div
                      onClick={() => {
                        setFirst(false);
                        setSecond(false);
                        setThird(true);
                      }}
                      className={`${
                        third ? "active-mennu" : "non-active"
                      } mb-5`}
                    >
                      My bank accounts
                    </div>
                  </div>
                </div>
                <div
                  className="col-md-9 col-12"
                  style={{ padding: 0, margin: 0 }}
                >
                  <div className="content-pro">
                    {first && (
                      <div>
                        <div className="d-flex justify-content-center align-items-end">
                          <div>
                            <div className="d-flex justify-content align-items-bottom">
                              <div className="pic-circle-out">
                                <div className="pic-circle mt-1 ml-1">
                                  <div className="actual-img"></div>
                                </div>
                              </div>
                              <div className="">
                                <img src={Camera} />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div
                          className="px-3 py-0"
                          style={{ fontSize: "13px", color: "#667085" }}
                        >
                          Basic Details
                        </div>
                        <hr />
                        <div className="basic-infos">
                          <div className="d-flex justify-content-center align-items-center py-2 w-100">
                            <form className="form-settings">
                              <div className="mb-3">
                                <Input
                                  label="Email address"
                                  className="w-100"
                                  disabled={true}
                                  style={{ width: "500px" }}
                                  {...register("email", {
                                    required: "Please input email address",
                                  })}
                                />
                                <Error errorName={errors.email} />
                              </div>
                              <div className="mb-3">
                                <Input
                                  label="Full name"
                                  disabled={true}
                                  className="w-100"
                                  {...register("name", {
                                    required: "Please input your full name",
                                  })}
                                />
                                <Error errorName={errors.name} />
                              </div>
                              <div className="mb-3">
                                <Input
                                  label="Phone Number"
                                  className="w-100"
                                  disabled={true}
                                  {...register("phone", {
                                    required: "Please input phone number",
                                  })}
                                />
                                <Error errorName={errors.phone} />
                              </div>
                            </form>
                          </div>
                        </div>
                        <div
                          className="px-3 py-0"
                          style={{ fontSize: "13px", color: "#667085" }}
                        >
                          Contact details
                        </div>
                        <hr />
                        <div className="basic-infos">
                          <div className="d-flex justify-content-center align-items-center py-2 w-100">
                            <form className="form-settings">
                              <div className="mb-3">
                                <Input
                                  label="Address "
                                  placeholder="enter your address"
                                  className="w-100"
                                  disabled={userDetails?.address ? true : false}
                                  style={{ width: "500px" }}
                                  {...register("address", {
                                    required: "Please input valid address",
                                  })}
                                />
                                <Error errorName={errors.address} />
                              </div>
                              <div className="mb-3">
                                <Input
                                  label="City"
                                  placeholder="Select city"
                                  className="w-100"
                                  disabled={userDetails?.city ? true : false}
                                  {...register("city", {
                                    required: "Please input city",
                                  })}
                                />
                                <Error errorName={errors.city} />
                              </div>
                              <div className="mb-3">
                                <Input
                                  label="State"
                                  placeholder="Select state"
                                  className="w-100"
                                  disabled={userDetails?.state ? true : false}
                                  {...register("state", {
                                    required: "Please input state",
                                  })}
                                />
                                <Error errorName={errors.state} />
                              </div>

                              <div className="mb-3">
                                <Input
                                  label="Country "
                                  disabled={userDetails?.country ? true : false}
                                  placeholder="Select country"
                                  className="w-100"
                                  style={{ width: "500px" }}
                                  {...register("country", {
                                    required: "Please input country",
                                  })}
                                />
                                <Error errorName={errors.country} />
                              </div>
                              <br />
                              {!userDetails?.address && (
                                <Button
                                  text="Submit"
                                  onClick={updateBasic}
                                  style={{ borderRadius: "5px" }}
                                  className="dark mt-2 w-100"
                                />
                              )}
                            </form>
                          </div>
                        </div>
                      </div>
                    )}

                    {second && (
                      <div className="d-flex justify-content-center align-items-center">
                        {!userDetails?.identityType && (
                          <div>
                            <div>
                              <img src={globe} />
                            </div>
                            <br />
                            <div>Upload a document</div>
                            <br />
                            <div className="form-group pt-2">
                              <label
                                className="d-block pb-2 text-dark"
                                style={{ color: "#344054", fontWeight: 600 }}
                              >
                                Select identity type
                              </label>
                              <select
                                className="select-card w-100"
                                {...register("identityType", {
                                  required: "Please select the indetity type",
                                })}
                              >
                                <option>Select</option>
                                <option>Driver License</option>
                                <option>SSN</option>
                                <option>International passport</option>
                              </select>
                              <Error errorName={errors.identityType} />
                            </div>
                            <br />
                            <br />
                            {!imgUrl ? (
                              <UploadButton
                                uploader={uploader}
                                options={options}
                                onComplete={(files) =>
                                  setImgUrl(files[0].originalFile.fileUrl)
                                }
                              >
                                {({ onClick }) => (
                                  <div onClick={onClick} className="upload-ch">
                                    <div className="d-flex justify-content-center align-items-center">
                                      <div>
                                        <div className="text-center pt-1">
                                          <img src={gallery} />
                                        </div>
                                        <div>
                                          <span style={{ colo: "#6941C6" }}>
                                            Click to upload{" "}
                                          </span>{" "}
                                          or drag and drop <br /> SVG, PNG, JPG
                                          or GIF (max. 800x400px)
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
                                <img src={imgUrl} className="w-50" />
                                <br />
                              </div>
                            )}
                            <br />
                            <br />
                            {!userDetails?.identityType && (
                              <Button
                                text="Submit for review"
                                style={{ borderRadius: "5px" }}
                                onClick={updateKyc}
                                className="dark w-100"
                              />
                            )}
                          </div>
                        )}
                        {userDetails?.identityType && (
                          <div>
                            <br />
                            <p className="text-danger">
                              Uploaded kyc information currently in review
                            </p>
                          </div>
                        )}
                      </div>
                    )}
                    {third && (
                      <div className="d-flex justify-content-center align-items-between">
                        <form className="form-settings">
                          <div className="mb-3">
                            <Input
                              label="Account Name "
                              placeholder="enter your address"
                              className="w-100"
                              disabled={true}
                              style={{ width: "500px" }}
                              {...register("accName", {
                                required: "Please input account name",
                              })}
                            />
                            <Error errorName={errors.accName} />
                          </div>
                          <div className="mb-3">
                            <Input
                              label="Account Number"
                              className="w-100"
                              disabled={userDetails?.accNum ? true : false}
                              {...register("accNum", {
                                required: "Please input Account Number",
                              })}
                            />
                            <Error errorName={errors.accNum} />
                          </div>
                          <div className="mb-3"></div>

                          <div className="Routing Number">
                            <Input
                              label="Routing Number "
                              disabled={userDetails?.routing ? true : false}
                              className="w-100"
                              style={{ width: "500px" }}
                              {...register("routing", {
                                required: "Please input routing number",
                              })}
                            />
                            <Error errorName={errors.routing} />
                          </div>
                          <br />
                          <div className="Bank Name">
                            <Input
                              label="Bank Name "
                              disabled={userDetails?.bankName ? true : false}
                              className="w-100"
                              style={{ width: "500px" }}
                              {...register("bankName", {
                                required: "Please input bank name",
                              })}
                            />
                            <Error errorName={errors.bankName} />
                          </div>
                          <br />
                          <div className="form-group">
                            <label
                              className="d-block pb-2 text-dark"
                              style={{
                                color: "#344054",
                                fontWeight: 600,
                              }}
                            >
                              Select Account Type
                            </label>
                            <select
                              className="select-card w-100"
                              {...register("accType", {
                                required: "Please select the giftcard type",
                              })}
                            >
                              <option>Select</option>
                              <option>Checkings</option>
                              <option>Savings</option>
                            </select>
                            <Error errorName={errors.accType} />
                          </div>
                          <Button
                            text="Submit"
                            onClick={updateAcc}
                            style={{ borderRadius: "5px" }}
                            className="dark mt-2 w-100"
                          />
                        </form>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DashboardContainer>
    </div>
  );
}
