import React, { useEffect, useState, useRef } from "react";
import "./index.css";
import Logo from "../../assets/elite/logo.svg";
import { Input } from "../../components/Input/index";
import { Button } from "../../components/Button/index";
import { Controller, useForm } from "react-hook-form";
import axios from "axios";
import { error, success } from "../../components/Alert/index";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { useHistory } from "react-router-dom";
import Geocode from "react-geocode";
import { geocodeByAddress, getLatLng } from "react-google-places-autocomplete";

import config from "../../config";
import { Link } from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import MyComponent from "react-fullpage-custom-loader";
import Error from "../../components/Error";
export default function Index(props) {
  const [openDeposit, setOpenDeposit] = useState(false);
  const [load, setLoad] = useState(false);
  const [latt, setLat] = useState(null);
  const [lngg, setLong] = useState(null);
  const [value, setValue] = useState(null);
  const [city, setCity] = useState(null);
  const [state, setState] = useState(null);
  const history = useHistory();
  const [postalcodee, setPostalCode] = useState(null);

  Geocode.setApiKey("AIzaSyARhWcvd5RCPL2IOekI2NCLGIuA5AflZNo");

  Geocode.setLanguage("en");
  Geocode.setRegion("es");
  Geocode.setLocationType("ROOFTOP");
  const {
    register,
    handleSubmit,
    getValues,
    watch,
    control,
    reset,
    formState: { errors },
  } = useForm({ mode: "onBlur" });

  const onRegister = (data) => {
    setLoad(true);
    axios
      .post(`${config.baseUrl}register`, {
        name: data?.fname + " " + data?.lname,
        email: data?.email,
        city: null,
        state: null,
        address: null,
        phone: data.phone,
        password: data.password,
        isAdmin: false
      })
      .then((res) => {
        setLoad(false);
        if (res.data?.token) {
          // sessionStorage.setItem("token", res.data?.token);
          sessionStorage.setItem('user_id', res.data.newUser?._id)
          success("Success!", "Registration Successful!. An invite registration link has been sent to " + data.email + " ,Activate your account by clicking on the link in the mail body",);
          setTimeout(() => {
            history.push("/login");
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

  useEffect(() => {
    if (value?.label) {
      getLatAndLong(value?.label);
    }
  }, [value]);

  const getLatAndLong = (address) => {
    geocodeByAddress(address)
      .then((results) => getLatLng(results[0]))
      .then(({ lat, lng }) => {
        setLat(lat);
        setLong(lng);
        Geocode.fromLatLng(lat, lng).then(
          (response) => {
            const address = response.results[0].formatted_address;
            let city, state, postalcode, country;
            for (
              let i = 0;
              i < response.results[0].address_components.length;
              i++
            ) {
              for (
                let j = 0;
                j < response.results[0].address_components[i].types.length;
                j++
              ) {
                switch (response.results[0].address_components[i].types[j]) {
                  case "locality":
                    city = response.results[0].address_components[i].long_name;
                    break;
                  case "administrative_area_level_1":
                    state = response.results[0].address_components[i].long_name;
                    break;
                  case "country":
                    country =
                      response.results[0].address_components[i].long_name;
                    break;
                  case "postal_code":
                    postalcode =
                      response.results[0].address_components[i].long_name;
                    break;
                }
              }
            }
            console.log(city, state, country);
            setState(state);
            setCity(city);
            setPostalCode(postalcode);
            console.log(postalcode);
          },
          (error) => {
            console.error(error);
          }
        );
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
          <div class="register-card">
            <div class="text-center">
              <img alt="Remis Logo" src={Logo} />
            </div>

            <form class="mt-4 main-card-body">
              <div className="">
                <Input
                  label="First Name"
                  placeholder="Input First Name"
                  className="w-100"
                  {...register("fname", {
                    required: "First name is required",
                  })}
                />
                <Error errorName={errors.fname} />
              </div>
              <br />
              <div className="">
                <Input
                  label="Last Name"
                  placeholder="Input Last Name"
                  className="w-100"
                  {...register("lname", {
                    required: "Last name is required",
                  })}
                />
                <Error errorName={errors.lname} />
              </div>
              <br />
              <div className="">
                <Input
                  label="Email Address"
                  placeholder="Input Email"
                  className="w-100"
                  {...register("email", {
                    required: "Email is required",
                  })}
                />
                <Error errorName={errors.email} />
              </div>
              <br />
              <div className="">
                <Input
                  label="Phone Number"
                  placeholder="Input Phone Number"
                  className="w-100"
                  {...register("phone", {
                    required: "Phone number is required",
                  })}
                />
                <Error errorName={errors.phone} />
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

              <br />
                  <div class="form-check">
  <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" checked={true} />
  <label class="form-check-label" for="flexCheckDefault">
    You agree to recieve automated Transactional messages. Terms and Privacy policy can be found at <a href="#">https://https://elitestrustinvestment.com/terms</a>. You made recieve up to 5 msgs/mo. Txt and data rates may apply.
  Reply STOP to stop or HELP for help.
  </label>
</div>
              {/* <label>Address </label>
              <Controller
                name="address"
                control={control}
                {...register("address", {
                  required: "Office Address is required!",
                  onChange: (e) => setValue(e.target.value),
                  value: value,
                })}
                render={({ field }) => (
                  <GooglePlacesAutocomplete
                    selectProps={{
                      isDisabled: false,
                      field,
                      onChange: field.onChange,
                    }}
                    apiKey="AIzaSyARhWcvd5RCPL2IOekI2NCLGIuA5AflZNo"
                  />
                )}
              />
              <Error errorName={errors.address} /> */}

              <br />
              <Button
                text={"Register"}
                style={{ borderRadius: "5px" }}
                className="dark w-100"
                onClick={handleSubmit(onRegister)}
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
                  to="/login"
                  style={{
                    color: "#2a2a2a",
                    fontweight: 500,
                  }}
                >
                  <u> Already have an account? Sign In</u>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
