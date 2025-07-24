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

function Chart({ chart, setChart, currency }) {
  const [type, setType] = useState("prices");
  const data = convertData(chart, type);

  const currencyIcons = {
    usd: "$",
    eur: "€",
    jpy: "¥",
  };
  const dynCurrency = currencyIcons[currency];

  const formatCurrency = (value) => {
    if (value >= 1e9) return `${(value / 1e9).toFixed(1)}B`;
    if (value >= 1e6) return `${(value / 1e6).toFixed(1)}M`;
    if (value >= 1e3) return `${(value / 1e3).toFixed(1)}K`;
    return value.toLocaleString();
  };

  return (
    <div className={styles.container}>
      <span className={styles.cross} onClick={() => setChart(null)}>
        X
      </span>
      <div className={styles.chart}>
        <div className={styles.name}>
          <img src={chart.coin.image} alt={chart.coin.name} />
          <p>
            {chart.coin.name} <span>(Last 7 Days Chart)</span>
          </p>
        </div>
          <div className={styles.graph}>
            <ChartComponent
              data={data}
              type={type}
              dynCurrency={dynCurrency}
              formatCurrency={formatCurrency}
            />
          </div>

        <div className={styles.types}>
          {["Prices", "Market Caps", "Total Volumes"].map((btnType) => {
            const lowerType = btnType.toLowerCase().replace(" ", "_");
            return (
              <button
                key={btnType}
                onClick={() => setType(lowerType)}
                className={type === lowerType ? styles.selected : null}
              >
                {btnType}
              </button>
            );
          })}
        </div>
        <div className={styles.details}>
          <div>
            <p>Prices:</p>
            <span>
              {dynCurrency}
              {chart.coin.current_price.toLocaleString()}
            </span>
          </div>
          <div>
            <p>ATH:</p>
            <span>
              {dynCurrency}
              {chart.coin.ath.toLocaleString()}
            </span>
          </div>
          <div>
            <p>Market Cap:</p>
            <span>
              {dynCurrency}
              {chart.coin.market_cap.toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chart;

const ChartComponent = ({ data, type, dynCurrency, formatCurrency }) => (
  <ResponsiveContainer width="100%" height="100%">
    <LineChart data={data}>
      <CartesianGrid stroke="#05053fff" />
      <XAxis dataKey="date" hide />
      <YAxis
        tick={{ fontSize: 12 }}
        tickFormatter={(tick) => `${dynCurrency}${formatCurrency(tick)}`}
        domain={["auto", "auto"]}
      />

      <Tooltip
        formatter={(value) => `${dynCurrency}${formatCurrency(value)}`}
      />
      <Legend />
      <Line
        type="monotone"
        dataKey={type}
        stroke="#002aff"
        strokeWidth={2}
        dot={false}
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
