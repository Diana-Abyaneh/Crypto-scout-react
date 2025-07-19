import { useEffect, useState } from "react";
import { getCoinList } from "../../services/cryptoApi";
import CoinTable from "../modules/CoinTable";
import Pagination from "../modules/Pagination";

function HomePage() {
  const [coins, setCoins] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    setIsLoading(true);
    const getData = async () => {
      try {
        const response = await fetch(getCoinList(page));
        const json = await response.json();
        setCoins(json);
        setIsLoading(false);
      } catch (error) {
        <p>An error occurred!</p>;
        console.error(error);
      }
    };
    getData();
  }, [page]);

  return (
    <div>
      <header>
        <img src="../../../public/icons8-dollar-coin-64.png" alt="coin icon" />
        <h1>Crypto App</h1>
      </header>
      <CoinTable coins={coins} isLoading={isLoading} />
      <Pagination page={page} setPage={setPage} />
      <footer>
        <p>Developed with ❤️ by Diana!</p>
      </footer>
    </div>
  );
}

export default HomePage;
