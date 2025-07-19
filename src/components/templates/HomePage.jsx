import { useEffect, useState } from "react";
import { getCoinList } from "../../services/cryptoApi";
import CoinTable from "../modules/CoinTable";

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
        <h1>Crypto App</h1>
      </header>
      <CoinTable coins={coins} isLoading={isLoading}/>
      <footer><p>Made by ME!🫶</p></footer>
    </div>
  );
}

export default HomePage;
