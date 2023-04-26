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
import config from "../../../config"
import axios from 'axios'
import MyComponent from "react-fullpage-custom-loader";

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
          setValue('email', res.data.userInfo?.email)
          setValue('name', res.data.userInfo?.name)
          setValue('phone', res.data.userInfo?.phone)

        }
      })
      .catch((err) => {
        setLoad(false);
      });
  };

  useEffect(() => {
    getUser()
  },[])

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
                                  style={{ width: "500px" }}
                                  {...register("address", {
                                    required: "Please input valid address",
                                  })}
                                />
                                <Error errorName={errors.address} />
                              </div>
                              <div className="mb-3 d-flex justify-content-between align-items-center">
                                <div>
                                  <Input
                                    label="City"
                                    placeholder="Select city"
                                    className="w-100"
                                    {...register("city", {
                                      required: "Please input city",
                                    })}
                                  />
                                  <Error errorName={errors.city} />
                                </div>
                                <div>
                                  <Input
                                    label="State"
                                    placeholder="Select state"
                                    className="w-100"
                                    {...register("state", {
                                      required: "Please input phone number",
                                    })}
                                  />
                                  <Error errorName={errors.state} />
                                </div>
                              </div>

                              <div className="mb-3">
                                <Input
                                  label="Country "
                                  placeholder="Select country"
                                  className="w-100"
                                  style={{ width: "500px" }}
                                  {...register("country", {
                                    required: "Please input country",
                                  })}
                                />
                                <Error errorName={errors.country} />
                                <br />
                                <Button
                                  text="Submit"
                                  style={{ borderRadius: "5px" }}
                                  className="dark w-100"
                                />
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                    )}

                    {second && (
                      <div className="d-flex justify-content-center align-items-center">
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
                              {...register("cardType", {
                                required: "Please select the indetity type",
                              })}
                            >
                              <option>Select</option>
                              <option>Driver License</option>
                              <option>NIN</option>
                              <option>International passport</option>
                            </select>
                          </div>
                          <br />
                          <br />
                          <UploadButton
                            uploader={uploader}
                            options={options}
                            onComplete={(files) =>
                              alert(files.map((x) => x.fileUrl).join("\n"))
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
                                      or drag and drop <br /> SVG, PNG, JPG or
                                      GIF (max. 800x400px)
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}
                          </UploadButton>
                          <br />
                          <br />
                          <Button
                            text="Submit for review"
                            style={{ borderRadius: "5px" }}
                            className="dark w-100"
                          />
                        </div>
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
