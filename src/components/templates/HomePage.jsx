import { useEffect, useState } from "react";
import { getCoinList, getChart } from "../../services/cryptoApi";
import CoinTable from "../modules/CoinTable";
import Pagination from "../modules/Pagination";
import Search from "../modules/Search";
import Chart from "../modules/Chart";

function HomePage() {

  const [coins, setCoins] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [currency, setCurrency] = useState("usd");
  const [chart, setChart] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    const getData = async () => {
      try {
        const response = await fetch(getCoinList(page, currency));
        const json = await response.json();
        setCoins(json);
        setIsLoading(false);
      } catch (error) {
        <p>An error occurred!</p>;
        console.error(error);
      }
    };
    getData();
  }, [page, currency]);

  useEffect(() => {
  const fetchChartOnCurrencyChange = async () => {
    if (!chart) return;

    try {
      const res = await fetch(getChart(chart.coin.id, currency));
      const json = await res.json();
      setChart({ ...json, coin: chart.coin });
    } catch (error) {
      console.error("Error fetching chart data on currency change", error);
      setChart(null);
    }
  };

  fetchChartOnCurrencyChange();
}, [currency]);


  return (
    <div>
      <header>
        <img src="../../../icons8-dollar-coin-64.png" alt="coin icon" />
        <h1>Crypto App</h1>
      </header>
      <main>
      <Search currency={currency} setCurrency={setCurrency} setChart={setChart}/>
      <CoinTable coins={coins} isLoading={isLoading} currency={currency} setChart={setChart}/>
      {!!chart && <Chart chart={chart} setChart={setChart} currency={currency}/>}
      <Pagination page={page} setPage={setPage} />
      </main>
      <footer>
        <p>Developed with ❤️ by Diana Abyaneh!</p>
      </footer>
    </div>
  );
}

export default HomePage;
