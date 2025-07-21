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
  const data = convertData(chart, type) || [];

  console.log("data:", data);
  console.log("type:", type);

  return (
    <div className={styles.container}>
      <span className={styles.cross} onClick={() => setChart(null)}>
        X
      </span>
      <div className={styles.chart}>
        <div className={styles.graph} style={{ height: "400px" }}>
          <ChartComponent data={convertData(chart, type)} type={type} />
        </div>
      </div>
    </div>
  );
}

export default Chart;

const ChartComponent = ({ data, type }) => (
  <ResponsiveContainer width="100%" height="100%">
    <LineChart data={data}>
      <CartesianGrid stroke="#05053fff" />
      <XAxis dataKey="date" hide />
      <YAxis domain={["auto", "auto"]} />
      <Tooltip />
      <Legend />
      <Line
        type="monotone"
        dataKey={type}
        stroke="#002aff"
        strokeWidth={2}
        dot={{ r: 3, stroke: "#002aff", strokeWidth: 1, fill: "#ffffff" }}
        activeDot={{ r: 6 }}
        isAnimationActive={true}
        animationDuration={600}
        animationBegin={0}
        animationEasing="ease-in-out"
      />
    </LineChart>
  </ResponsiveContainer>
);

export { ChartComponent };
