/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, useRef } from "react";
import SideBar from "./Sidebar";
import "./index.css";
import { useHistory } from "react-router-dom";
export const DashboardContainer = ({ children, pageTitle }) => {
  return (
    <div className="container-fluid dashboard">
      <div className="row   flex-column flex-md-row ">
        <div className="col-2 col-pd-2">
          <SideBar />
        </div>

        <div className="col-12 col-lg-10 col-pd">
          <div className="top-main">
            <div className="top-main-sub pt-4">
              <p className="title">Dashboard</p>
            </div>
          </div>
          <div className="top-2">{children}</div>
        </div>
      </div>
    </div>
  );
};
