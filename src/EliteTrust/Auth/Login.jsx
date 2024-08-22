import React, { useEffect, useState, useRef } from "react";
import "./index.css";
import Logo from "../../assets/elite/logo.svg";
import { Input } from "../../components/Input/index";
import { Button } from "../../components/Button/index";
import { Controller, useForm } from "react-hook-form";
import { Link, useHistory } from "react-router-dom";
import { error, success } from "../../components/Alert/index";
import config from "../../config";
import Error from "../../components/Error";
import MyComponent from "react-fullpage-custom-loader";
import axios from "axios";
export default function Index(props) {
  const [openDeposit, setOpenDeposit] = useState(false);
  const [load, setLoad] = useState(false);
  const history = useHistory()
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

  const onLogin = (data) => {
    setLoad(true);
    axios
      .post(`${config.baseUrl}login`, {
        email: data?.email,
        password: data?.password,
      })
      .then((res) => {
        setLoad(false);
        if (res.data.user?.token) {
          success("Success!", "Login Successful!");
          sessionStorage.setItem("token", res.data.user?.token);
          sessionStorage.setItem('user_id', res.data.user?.id)
          sessionStorage.setItem('is_Admin', res.data.user?.isAdmin)
          setTimeout(() => {
            window.location.href = "/dashboard";
          }, 1000);
        } else {
          error("Error!", "Something went wrong");
        }
      })
      .catch((err) => {
        setLoad(false);

        if (err) {
          error("Error!", err?.response?.data?.message);
        }
      });
  };
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
      <div class="login-bg">
        <div class="d-flex justify-content-center align-items-center h-100 login-mobile">
          <div class="login-card">
            <div class="text-center">
              <img alt="Remis Logo" src={Logo} />
            </div>

            <p
              class="text-center pb-2 pt-4 margin-logo-web"
              style={{ color: "#2a2a2a", fontweight: 600, fontsize: "20px" }}
            >
              Login to your dashboard
            </p>
            <form class="mt-4 main-card-body">
              <div className="">
                <Input
                  label="Email Address"
                  placeholder="Input Email"
                  className="w-100"
                  {...register("email", {
                    required: "Please input your email address",
                  })}
                />
                <Error errorName={errors.email} />
              </div>
              <br />

              <div className="">
                <Input
                  label="Password"
                  type="password"
                  placeholder="Input Password"
                  className="w-100"
                  {...register("password", {
                    required: "Password is required",
                  })}
                />
                <Error errorName={errors.password} />
              </div>
              <div class="mt-4 flex-auth">
                <div class="form-check">
                  &nbsp;
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault"
                  />
                  <label
                    class="form-check-label"
                    for="flexCheckDefault"
                    style={{
                      color: "#2a2a2a",
                      fontweight: 500,
                      fontsize: "20px",
                    }}
                  >
                    Keep me logged in
                  </label>
                </div>
                <div
                  class="mt-0"
                  style={{
                    color: "#2a2a2a",
                    fontweight: 500,
                    fontsize: "20px",
                  }}
                >
                  <u> Forgot password?</u>
                </div>
              </div>
              <br />
              <Button
                text={"Login"}
                style={{ borderRadius: "5px" }}
                className="dark w-100"
                onClick={handleSubmit(onLogin)}
              />
              <br />
              <div
                class="mt-4"
                style={{
                  color: "#2a2a2a",
                  fontweight: 500,
                }}
              >
                <Link
                  to="/register"
                  style={{
                    color: "#2a2a2a",
                    fontweight: 500,
                  }}
                >
                  <u> Dont have an account? Sign Up</u>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
