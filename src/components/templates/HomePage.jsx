import { useEffect, useState } from "react";
import { getCoinList } from "../../services/cryptoApi";
import CoinTable from "../modules/CoinTable";
import Pagination from "../modules/Pagination";

function HomePage() {
  const [coins, setCoins] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(getCoinList());
        const json = await response.json();
        setCoins(json);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  return (
    <div>
      <header>
        <img src="../../../public/icons8-dollar-coin-64.png" alt="coin icon" />
        <h1>Crypto App</h1>
      </header>
      <CoinTable coins={coins} isLoading={isLoading}/>
      <Pagination />
      <footer><p>Developed with ❤️ by Diana!</p></footer>
    </div>
  );
}

export default HomePage;
