/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { BeatLoader } from "react-spinners";
import chartUp from "../../assets/chart-up.svg";
import chartDown from "../../assets/chart-down.svg";
import { getChart } from "../../services/cryptoApi";
import styles from "./CoinTable.module.css";

function CoinTable({ coins, isLoading, currency, setChart }) {
  return (
    <div className={styles.container}>
      {isLoading ? (
        <BeatLoader color="#290676a1" />
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Coin</th>
              <th>Name</th>
              <th>Price</th>
              <th>24h change</th>
              <th>Total volume</th>
              <th>Graph</th>
            </tr>
          </thead>
          <tbody>
            {coins.map((coin) => (
              <TableRow
                coin={coin}
                key={coin.id}
                currency={currency}
                setChart={setChart}
              />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default CoinTable;

const TableRow = ({ coin, currency, setChart }) => {
  const {
    id,
    image,
    name,
    symbol,
    current_price,
    total_volume,
    price_change_percentage_24h: price_change,
  } = coin;
  const currencyIcons = {
    usd: "$",
    eur: "€",
    jpy: "¥",
  };

  const dynCurrency = currencyIcons[currency];

  const showHandler = async () => {
    try {
      const res = await fetch(getChart(id, currency));
      const json = await res.json();
      setChart({ ...json, coin });
    } catch (error) {
      setChart(null);
    }
  };

  return (
    <tr>
      <td>
        <div className={styles.symbol} onClick={showHandler}>
          <img src={image} alt={name} />
          <span>{symbol.toUpperCase()}</span>
        </div>
      </td>
      <td>{name}</td>
      <td>
        {dynCurrency} {current_price.toLocaleString()}
      </td>
      <td className={price_change > 0 ? styles.ascending : styles.descending}>
        {price_change.toFixed(2)}%
      </td>
      <td>{total_volume.toLocaleString()}</td>
      <td>
        <img src={price_change > 0 ? chartUp : chartDown} alt="chart up/down" />
      </td>
    </tr>
  );
};
