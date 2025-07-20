/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { coinSearch } from "../../services/cryptoApi";

function Search({ currency, setCurrency }) {
  const [text, setText] = useState("");
  const [coins, setCoins] = useState([]);

  useEffect(() => {
    const controller = new AbortController();

    if (!text) return;

    const search = async () => {
      try {
        const res = await fetch(coinSearch(text), {
          signal: controller.signal,
        });
        const json = await res.json();
        console.log(json);
        if (json.coins) setCoins(json.coins);
        else alert(json.status.error_message);
      } catch (error) {
        if (error.name != "AbortError") alert(error.message);
      }
    };
    search();

    return () => controller.abort();
  }, [text]);

  return (
    <div>
      <input
        type="text"
        placeholder="Search here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <select
        name=""
        id=""
        value={currency}
        onChange={(e) => setCurrency(e.target.value)}
      >
        <option value="usd">USD</option>
        <option value="eur">EUR</option>
        <option value="jpy">JPY</option>
      </select>
      <section>
        <ul>
          {coins.map(coin=>(
            <li key={coin.id}>
              <img src={coin.thumb} alt="coin thumbnail" />
              <p>{coin.name}</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default Search;
