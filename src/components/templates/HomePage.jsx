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
      <CoinTable coins={coins} isLoading={isLoading}/>
    </div>
  );
}

export default HomePage;
