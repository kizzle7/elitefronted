import React, { useEffect, useState, useRef } from "react";
import "./index.css";
import Logo from "../../assets/elite/logo.svg";
import { Input } from "../../components/Input/index";
import { Button } from "../../components/Button/index";
import { Controller, useForm } from "react-hook-form";
import { Link, useHistory } from "react-router-dom";
import { error, success } from "../../components/Alert/index";
import config from "../../config";
import { Modal } from 'antd'
import PhoneInput from 'react-phone-input-2'
import PinInput from "react-pin-input";
import 'react-phone-input-2/lib/style.css'
import Error from "../../components/Error";
import MyComponent from "react-fullpage-custom-loader";
import axios from "axios";
export default function Index(props) {
    const [openDeposit, setOpenDeposit] = useState(false);
    const [load, setLoad] = useState(false);
    const [phone, setPhone] = useState("")
    const history = useHistory()
    const [openModal, setOpenModal] = useState(false)
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

    const otp = watch('otp')

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
                    if (res.data.user.status) {
                        if (res.data.user.phone_status) {
                            success("Success!", "Login Successful!");
                            sessionStorage.setItem("token", res.data.user?.token);
                            sessionStorage.setItem('user_id', res.data.user?.id)
                            sessionStorage.setItem('is_Admin', res.data.user?.isAdmin)
                            // setTimeout(() => {
                            //   window.location.href = "/dashboard";
                            // }, 1000);
                        }
                        else {
                            window.location.href = "/verify-phone";

                        }
                    }
                    else {
                        error("Error!", "Email not verified yet");

                    }
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

    const verifyPhone = (e) => {
        e?.preventDefault()
        setLoad(true);
        axios
            .post(`${config.baseUrl}verify-phone/${sessionStorage?.getItem('user_id')}`, {
                phone: phone,
                ccode: 1,
            })
            .then((res) => {
                setLoad(false);
                if (res.status === 200) {
                    success("Success!", "OTP sent successfully to " + phone);
                    setOpenModal(true)

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
    }

    const submitOtp = () => {
        setLoad(true);
        axios
            .post(`${config.baseUrl}verify-otp/${sessionStorage?.getItem('user_id')}`, {
                otp: otp,
            })
            .then((res) => {
                setLoad(false);
                if (res.status === 200) {
                    success("Success!", "OTP Verified Successfully");
                    setOpenModal(true)
                    setTimeout(() => {
                        window.location.href = "/dashboard"
                    })

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
    }
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
                            Verify Phone Number
                        </p>
                        <form class="mt-4 main-card-body">
                            <label
                                className="d-block label-name
                       `text-dark`"
                            >
                                Phone Number
                            </label>
                            <PhoneInput
                                country={'us'}
                                inputClass="w-100"
                                value={phone}
                                onChange={phone => setPhone(phone)}
                            />
                            <br />
                            <Modal title="Verify Code" maskClosable={false} open={openModal} footer={false} onCancel={() => {
                                setOpenModal(false)
                                setValue('otp', '')
                            }}>
                                <div className="mt-5 d-flex flex-row justify-content-center align-items-center">

                                    <div>
                                        <Controller
                                            control={control}
                                            name="otp"
                                            rules={{
                                                required: "Otp sent to phone number is required",
                                            }}
                                            render={({ field: { onChange, onBlur } }) => (
                                                <PinInput
                                                    onChange={onChange}
                                                    onBlur={onBlur}
                                                    length={4}
                                                    initialValue=""
                                                    type="numeric"
                                                    inputMode="number"
                                                    inputStyle={inputStyle}
                                                    inputFocusStyle={{ borderColor: "blue" }}
                                                />
                                            )}
                                        />
                                        {errors.otp && (
                                            <p className="validate-error">{errors.otp.message}</p>
                                        )}
                                    </div>

                                </div>
                                <br />
                                <Button
                                    text={"Submit"}
                                    style={{ borderRadius: "5px" }}
                                    className="dark w-100"
                                    onClick={handleSubmit(submitOtp)}
                                />
                            </Modal>


                            <br />
                            <Button
                                text={"Submit"}
                                style={{ borderRadius: "5px" }}
                                className="dark w-100"
                                onClick={verifyPhone}
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
const inputStyle = {
    border: "1px solid #E1E1E3",
    marginRight: "26px",
    fontSize: "40px",
};

