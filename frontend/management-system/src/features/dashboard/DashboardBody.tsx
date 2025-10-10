
import MarketStats from "./MarketStats/MarketStats";
import Portfolio from "./Portfolio/Portfolio";
import Holdings from "./Holdings/Holdings";
import Watchlist from "./Watchlist/Watchlist";

import Transaction from "./Transaction/Transaction";
import Cards from "./Cards/Cards";


const DashboardBody = () => {
  return (
    <>
    <Cards />
    <MarketStats />
    <Portfolio />
    <Holdings />
    <Watchlist />
    <Transaction />
    </>
  );
};

export default DashboardBody;
