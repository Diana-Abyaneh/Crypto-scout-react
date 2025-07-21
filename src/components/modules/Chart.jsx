/* eslint-disable react/prop-types */
import { useState } from "react";
import {
  YAxis,
  XAxis,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";
import { convertData } from "../../helpers/convertData";
import styles from "./Chart.module.css";

function Chart({ chart, setChart }) {
  const [type, setType] = useState("prices");

  const typeHandler = (event) => {
    if (event.target.tagName === "BUTTON") {
      const newType = event.target.innerText.toLowerCase().replace(" ", "_");
      setType(newType);
    }
  };

  return (
    <div className={styles.container}>
      <span className={styles.cross} onClick={() => setChart(null)}>
        X
      </span>
      <div className={styles.chart}>
        <div className={styles.name}>
          <img src={chart.coin.image} alt={chart.coin.name} />
          <p>{chart.coin.name}</p>
        </div>
        <div className={styles.graph} style={{ height: "400px" }}>
          <ChartComponent data={convertData(chart, type)} type={type} />
        </div>
        <div className={styles.types} onClick={typeHandler}>
          <button className={type === "prices" ? styles.selected : null}>
            Prices
          </button>
          <button className={type === "market_caps" ? styles.selected : null}>
            Market Caps
          </button>
          <button className={type === "total_volumes" ? styles.selected : null}>
            Total Volumes
          </button>
        </div>
        <div className={styles.details}>
          <div>
            <p>Price:</p>
            <span>${chart.coin.current_price.toLocaleString()}</span>
          </div>
          <div>
            <p>ATH:</p>
            <span>${chart.coin.ath.toLocaleString()}</span>
          </div>
          <div>
            <p>Market Cap:</p>
            <span>${chart.coin.market_cap.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chart;

const ChartComponent = ({ data, type }) => (
  <ResponsiveContainer width="100%" height="100%">
    <LineChart data={data}>
      <CartesianGrid stroke="#333" strokeDasharray="3 3" />
      <XAxis dataKey="date" hide />
      <YAxis
        domain={["auto", "auto"]}
        tick={{ fill: "#fff", fontSize: 12 }}
        tickFormatter={(value) => {
          if (value === undefined || value === null) return "";
          if (value >= 1e9) return (value / 1e9).toFixed(1) + "B";
          if (value >= 1e6) return (value / 1e6).toFixed(1) + "M";
          if (value >= 1e3) return (value / 1e3).toFixed(1) + "K";
          return value.toLocaleString();
        }}
      />
      <Tooltip
        formatter={(value) => {
          if (value === undefined || value === null) return "";
          return `$${value.toLocaleString()}`;
        }}
        labelStyle={{ color: "#fff" }}
        contentStyle={{ background: "#111", border: "none", borderRadius: "8px" }}
      />
      <Legend wrapperStyle={{ color: "#fff" }} />
      <Line
        key={type}
        type="monotone"
        dataKey={type}
        stroke="#0062ffff"
        strokeWidth={2}
        dot={{ r: 3, stroke: "#00b4ff", strokeWidth: 1, fill: "#fff" }}
        activeDot={{ r: 6 }}
        isAnimationActive={true}
        animationDuration={1500}
        animationBegin={0}
        animationEasing="ease-in-out"
      />
    </LineChart>
  </ResponsiveContainer>
);

export { ChartComponent };
