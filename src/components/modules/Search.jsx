/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { coinSearch, getChart, getCoin } from "../../services/cryptoApi";
import { BeatLoader } from "react-spinners";
import styles from "./Search.module.css";

function Search({ currency, setCurrency, setChart }) {
  const [text, setText] = useState("");
  const [coins, setCoins] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    setCoins([]);

    if (!text) {
      setIsLoading(false);
      return;
    }

    const search = async () => {
      try {
        const res = await fetch(coinSearch(text), { signal: controller.signal });
        const json = await res.json();
        if (json.coins) {
          setCoins(json.coins);
          setIsLoading(false);
        } else {
          alert(json.status.error_message);
          setIsLoading(false);
        }
      } catch (error) {
        if (error.name !== "AbortError") alert(error.message);
        setIsLoading(false);
      }
    };

    setIsLoading(true);
    search();

    return () => controller.abort();
  }, [text]);

  const handleCoinClick = async (id) => {
    try {
      const [chartRes, coinRes] = await Promise.all([
        fetch(getChart(id, currency)),
        fetch(getCoin(id))
      ]);
      const chartData = await chartRes.json();
      const coinData = await coinRes.json();

      const coin = {
        id: coinData.id,
        name: coinData.name,
        image: coinData.image.large,
        current_price: coinData.market_data.current_price[currency],
        ath: coinData.market_data.ath[currency],
        market_cap: coinData.market_data.market_cap[currency],
      };

      setChart({ ...chartData, coin });
      setText("");
      setCoins([]);
    } catch (error) {
      alert("Failed to fetch coin details.");
      console.error(error);
    }
  };

  return (
    <div className={styles.searchBox}>
      <input
        type="text"
        placeholder="Search here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <select
        value={currency}
        onChange={(e) => setCurrency(e.target.value)}
      >
        <option value="usd">USD</option>
        <option value="eur">EUR</option>
        <option value="jpy">JPY</option>
      </select>
      {(!!coins.length || isLoading) && (
        <section className={styles.searchResults}>
          {isLoading ? (
            <BeatLoader color="#3d09ada1" />
          ) : (
            <ul>
              {coins.map((coin) => (
                <li key={coin.id} onClick={() => handleCoinClick(coin.id)}>
                  <img src={coin.thumb} alt={coin.name} />
                  <p>{coin.name}</p>
                </li>
              ))}
            </ul>
          )}
        </section>
      )}
    </div>
  );
}

export default Search;
