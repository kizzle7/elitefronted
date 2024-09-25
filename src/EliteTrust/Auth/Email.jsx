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
import EmailIcon from "../../assets/elite/email-icon.svg";
import MyComponent from "react-fullpage-custom-loader";
import axios from "axios";
export default function Index(props) {
    console.log(props)
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

    const verifyMail = () => {
        setLoad(true);
        axios
            .post(`${config.baseUrl}verify-email`, {
                id: props.match.params.id
            })
            .then((res) => {
                setLoad(false);
                if (res.status === 200) {
                    success("Success!", "Email Verified Successfully!");
                    setTimeout(() => {
                        window.location.href = "/login";
                    }, 1000);
                } else {
                    error("Error!", "Something went wrong, Try Again Later.");
                }
            })
            .catch((err) => {
                setLoad(false);

                if (err) {
                    error("Error!", err?.response?.data?.message);
                }
            });
    };

    useEffect(() => {
        verifyMail()
    }, [])
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
                            Email Verification
                        </p>
                        <form class="mt-4 main-card-body">

                            <div className="d-flex justify-content-center align-items-center h-100 py-4">
                                <img src={EmailIcon} />
                            </div>
                            <br />
                            <Button
                                text={"Login"}
                                style={{ borderRadius: "5px" }}
                                className="dark w-100"
                                onClick={() => {
                                    window.location.href = '/login'
                                }}
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
