/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { BeatLoader } from "react-spinners";
import chartUp from "../../assets/chart-up.svg";
import chartDown from "../../assets/chart-down.svg";
import styles from "./CoinTable.module.css";

function CoinTable({ coins, isLoading, currency }) {
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
              <TableRow coin={coin} key={coin.id} currency={currency}/>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default CoinTable;

const TableRow = ({
  coin: {
    image,
    name,
    symbol,
    current_price,
    total_volume,
    price_change_percentage_24h: price_change,
  },
  currency
}) => {
  const currencyIcons = {
    usd: "$",
    eur: "€",
    jpy: "¥",
  };

  return (
    <tr>
      <td>
        <div className={styles.symbol}>
          <img src={image} alt={name} />
          <span>{symbol.toUpperCase()}</span>
        </div>
      </td>
      <td>{name}</td>
      <td>
        {currencyIcons[currency] || "💰"} {current_price.toLocaleString()}
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
