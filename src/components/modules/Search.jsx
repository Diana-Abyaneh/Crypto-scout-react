/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { coinSearch } from "../../services/cryptoApi";
import { BeatLoader } from "react-spinners";

function Search({ currency, setCurrency }) {
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
        const res = await fetch(coinSearch(text), {
          signal: controller.signal,
        });
        const json = await res.json();
        console.log(json);
        if (json.coins) {
          setCoins(json.coins);
          setIsLoading(false);
        } else {
          alert(json.status.error_message);
        }
      } catch (error) {
        if (error.name != "AbortError") alert(error.message);
      }
    };
    setIsLoading(true);
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
        {isLoading ? (
          <BeatLoader color="#290676a1" />
        ) : (
          <ul>
            {coins.map((coin) => (
              <li key={coin.id}>
                <img src={coin.thumb} alt="coin thumbnail" />
                <p>{coin.name}</p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

export default Search;
