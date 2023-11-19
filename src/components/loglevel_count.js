import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/App.css";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

function LogLevelCount() {
  const [data, setData] = useState([]);
  const [viewType, setViewType] = useState("day");
  const [aggregates, setAggregates] = useState({
    sum: 0,
    average: 0,
    min: 0,
    max: 0,
  });
  const [activeButton, setActiveButton] = useState("day"); // To track the active button
  const getBarColor = () => {
    if (activeButton === "day") return "#8884d8"; // default color for "day" view
    if (activeButton === "hour") return "#82ca9d"; // example color for "hour" view
    if (activeButton === "hour&logLevel=INFO") return "#3498DB"; // Blue for INFO
    if (activeButton === "hour&logLevel=ERROR") return "#ff0000"; // Red for ERROR
    if (activeButton === "hour&logLevel=WARN") return "#FFA500"; // Orange for WARN
    if (activeButton === "hour&logLevel=DEBUG") return "#2ECC71"; // Green for DEBUG
    return "#8884d8"; // default color if none of the above
  };

  useEffect(() => {
    // Fetch data from the API based on selected options
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://18.219.252.117:10300/data-service/api/v1/logviz/getLogAggregates?granularity=${viewType}`
        );

        setData(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [viewType]);

  useEffect(() => {
    // Calculate the sum, average, min, and max when data is updated
    const sum = data.reduce((total, item) => total + item.count, 0);
    const average = (sum / data.length).toFixed(4);

    const min = Math.min(...data.map((item) => item.count));
    const max = Math.max(...data.map((item) => item.count));
    setAggregates([sum, average, min, max]);
  }, [data]);

  function changeViewType(viewType) {
    setViewType(viewType);
    setActiveButton(viewType); // Set the active button
  }

  return (
    <div>
      <div className="graphContainer">
        <h1>Log level vs Count</h1>
        <BarChart width={600} height={300} data={data}>
          <XAxis dataKey="logLevel" />
          <YAxis
            label={{ value: "Count", angle: -90, position: "insideLeft" }}
          />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" fill={getBarColor()} name="Count" />
        </BarChart>
      </div>
      <div className="testMain">

        <div className="aggregates-container">
          <div className="aggregate-item">
            <div className="aggregate-value">{aggregates[0]}</div>
            <div className="aggregate-label">Sum: {aggregates.sum}</div>
          </div>
          <div className="aggregate-item">
            <div className="aggregate-value">{aggregates[1]}</div>
            <div className="aggregate-label">Average: {aggregates.average}</div>
          </div>
          <div className="aggregate-item">
            <div className="aggregate-value">{aggregates[2]}</div>
            <div className="aggregate-label">Minimum: {aggregates.min}</div>
          </div>
          <div className="aggregate-item">
            <div className="aggregate-value">{aggregates[3]}</div>
            <div className="aggregate-label">Maximum: {aggregates.max}</div>
          </div>
        </div>
      </div>
      <div className="toggles">
        <div>
          <button
            className={`toggle-button b-daily ${
              activeButton === "day" ? "active" : ""
            }`}
            onClick={() => changeViewType("day")}
          >
            Daily
          </button>
          <button
            className={`toggle-button b-daily ${
              activeButton === "hour" ? "active" : ""
            }`}
            onClick={() => changeViewType("hour")}
          >
            Hourly
          </button>
        </div>
        <div>
          <button
            className={`toggle-button b-info ${
              activeButton === "hour&logLevel=INFO" ? "active" : ""
            }`}
            onClick={() => changeViewType("hour&logLevel=INFO")}
          >
            INFO
          </button>
          <button
            className={`toggle-button b-error ${
              activeButton === "hour&logLevel=ERROR" ? "active" : ""
            }`}
            onClick={() => changeViewType("hour&logLevel=ERROR")}
          >
            ERROR
          </button>
          <button
          className={`toggle-button b-warn ${
            activeButton === "hour&logLevel=WARN" ? "active" : ""
          }`}
          onClick={() => changeViewType("hour&logLevel=WARN")}
        >
          WARN
        </button>
        <button
          className={`toggle-button b-debug ${
            activeButton === "hour&logLevel=DEBUG" ? "active" : ""
          }`}
          onClick={() => changeViewType("hour&logLevel=DEBUG")}
        >
          DEBUG
        </button>
        </div>
      </div>
    </div>
  );
}

export default LogLevelCount;
