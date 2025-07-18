import { useEffect, useState } from "react";
import { getCoinList } from "../../services/cryptoApi";
import CoinTable from "../modules/CoinTable";

function HomePage() {
  const [coins, setCoins] = useState([]);

  useEffect(() => {
  (async () => {
    try {
      const response = await fetch(getCoinList());
      const json = await response.json();
      setCoins(json);
    } catch (error) {
      console.error(error);
    }
  })();
}, []);


  return (
    <div>
      <CoinTable coins={coins} />
    </div>
  );
}

export default HomePage;
