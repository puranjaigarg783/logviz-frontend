import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import CountDate from "./components/count_date";
import CountHour from "./components/count_hour";
import LogLevel from "./components/loglevel_msglen";
import LogLevelCount from "./components/loglevel_count";
import DateMsgLength from "./components/date_avgmsglen";

const Dashboard = () => {
  return (
    <>
      <div className="mainDiv">
        <CountDate />
        <CountHour />
      </div>
      <div className="mainDiv">
        <LogLevel />
      </div>
      <div className="mainDiv">
        <LogLevelCount />
        <DateMsgLength/>
      </div>
    </>
  );
};

export default Dashboard;
