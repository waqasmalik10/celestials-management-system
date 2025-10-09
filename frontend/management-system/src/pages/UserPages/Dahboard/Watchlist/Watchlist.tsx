import { useEffect, useState } from "react";
import eth from "../../../../images/eth.svg";
import ltc from "../../../../images/ltc.svg";
import grt from "../../../../images/gtr.svg";
import comp from "../../../../images/Crypto.svg";
import doge from "../../../../images/doge.svg";
import uni from "../../../../images/uni.svg";
import { fetchWatchlistData, WatchlistData, WatchlistTableData } from "../api/dashboard";
import WatchlistChart from "./WatchlistChart";
import Box from "../../../../ui/Box";

const Watchlist = () => {
  const imageMap: { [key: string]: string } = {
    firstCoinImg: eth,
    secondCoinImg: ltc,
    thirdCoinImg: grt,
    fourthCoinImg: comp,
    fifthCoinImg: doge,
    sixthCoinImg: uni,
  };

  const [allWatchlistTableData, setAllWatchListTableData] = useState<WatchlistData | null>(null);
  useEffect(() => {
    fetch("/dummy_json_data/dashboard_json_data/watchlist_data.json")
      .then((res) => res.json())
      .then((data) => setAllWatchListTableData(data));
  }, []);

  useEffect(() => {
    const loadWatchlistData = async () => {
      try {
        const data = await fetchWatchlistData();
        setAllWatchListTableData(data);
      } catch (error) {
        console.error(error);
      }
    };

    loadWatchlistData();
  }, []);

  return (
    <>
      <div className="flex justify-between items-center gap-4 mb-[29px]">
        <h2 className="text-[30px] font-medium font-inter leading-11 text-white">
          My watchlist
        </h2>
        <button
          type="button"
          className="outline-none bg-transparent text-[#259DA8] font-inter font-medium text-xl"
        >
          View All
        </button>
      </div>

      <Box>
        <div className="w-full grid grid-cols-3">
          {allWatchlistTableData &&
            allWatchlistTableData.watchlistTableData.map(
              (data: WatchlistTableData, index: number) => (
                <div
                  key={index}
                  className="p-10 border-l border-b border-solid border-[#FFFFFF21]"
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <img src={imageMap[data.coinImg]} alt="coin-img" />
                      <h4 className="text-[25px] leading-[39px] font-medium font-inter uppercase text-white">
                        {data.title}
                      </h4>
                    </div>
                    <div className="bg-[#FFFFFF14] px-[15px] pb-[3px] pt-1 rounded-[15px] outline-none font-inter text-[15px] font-medium leading-normal text-white w-fit">
                      24H
                    </div>
                  </div>
                  <div className="flex justify-between mt-2.5 gap-2 items-center">
                    <p className="text-[35px] font-poppins leading-[49px] font-semibold text-white">
                      ${data.value}
                    </p>
                    <p
                      className={`font-inter font-inter text-xl leading-[35px] ${
                        data.percentage_plus_minus === "+"
                          ? "text-[#ADDC7B]"
                          : "text-[#FF8663]"
                      }`}
                    >
                      {data.percentage_plus_minus}
                      {data.percentage_value}
                    </p>
                  </div>
                  <div className="mt-10">
                    <WatchlistChart watchlistdata={data} />
                  </div>
                </div>
              )
            )}
        </div>
      </Box>
    </>
  );
};

export default Watchlist;
