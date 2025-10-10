import { useEffect, useRef, useState } from "react";
import selectArrow from "../../../assets/images/selectBoxArrow.svg";
import LineChart from "./MarketStatsChart";
import {
  fetchMarketStatsData,
  MarketStatsData,
  Token,
} from "../api/dashboard";
import Box from "../../../ui/Box";
import Select from "../../../ui/Select";

const MarketStats = () => {
  const [allStatsData, setAllStatsData] = useState<MarketStatsData | null>(
    null
  );

  const [selectTokensOpen, setSelectTokensOpen] = useState(false);
  const [selectDays, setSelectDays] = useState(false);

  const itemsPerPageOptions = ["AAVE", "UNI", "DOGE", "XTZ"];
  const daysOptions = ["Weekly (2020)", "Yearly"];

  const modalRef = useRef<HTMLDivElement>(null);

  const openTokensDropdown = () => {
    setSelectTokensOpen(!selectTokensOpen);
  };

  const openDaysDropdown = () => {
    setSelectDays(!selectDays);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setSelectTokensOpen(false);
        setSelectDays(false);
      }
    };

      document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const loadMarketStatsData = async () => {
      try {
        const data = await fetchMarketStatsData();
        setAllStatsData(data);
      } catch (error) {
        console.error(error);
      }
    };

    loadMarketStatsData();
  }, []);

  console.log(allStatsData);


  return (
    <>
      <div className="mt-8 flex flex-col lg:flex-row gap-8 justify-between">
        <Box boxMainDivClasses="!w-full lg:!w-[74.3%]" boxClass="p-5 md:!p-8">
          <div className="flex justify-between items-center flex-wrap gap-3 mb-20">
            <div>
              <h3 className="font-poppins font-medium text-lg md:text-[21px] leading-normal text-white">
                Market Overview
              </h3>
              <p className="font-poppins font-normal text-[10px] md:text-[13px] leading-normal text-white mt-1 md:mt-[7px]">
                Lorem ipsum dolor sit amet, consectetur
              </p>
            </div>
            <div className="flex flex-wrap gap-5 md:flex-nowrap md:gap-[29px] items-center">
              {allStatsData &&
                allStatsData.tokens.map((token: Token, index: number) => (
                  <div key={index}>
                    <label className="containerCheckMarkMarket font-poppins text-xs md:text-[17px] text-white font-medium leading-normal">
                      {token.tokenName}
                      <input type="checkbox" />
                      <span className="checkmarkMarket"></span>
                    </label>
                  </div>
                ))}
            </div>
            <div className="flex gap-4 flex-wrap">
              <div className="relative" ref={modalRef}>
                <Select
                  onClick={openTokensDropdown}
                  selectClassName="flex items-center justify-between !w-[186px] !h-12 md:!h-[52px] !p-2.5 !py-0 md:!px-[18px] md:!pt-[17px] !cursor-pointer md:!pb-[13px] !bg-transparent !border !border-solid !border-white !text-white text-xs md:!text-[15px] !font-medium !font-poppins !rounded-[15px]"
                  children="More tokens"
                  selectArrowClassName={`${
                    selectTokensOpen ? "-rotate-[180deg]" : "rotate-0"
                  } transition-all`}
                  selectArrowPath={selectArrow}
                />
                {selectTokensOpen && (
                  <div className="bodyBackground absolute top-[65px] rounded-[15px] overflow-hidden shadow-xl right-0 w-full">
                    <ul>
                      {itemsPerPageOptions.map((item, index) => (
                        <li key={index} className="w-full">
                          <button
                            type="button"
                            className="border-b border-solid border-[#FFFFFF21] px-5 py-2.5 text-white text-sm w-full text-left hover:opacity-[0.4] transition-all"
                          >
                            {item}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              <div className="relative" ref={modalRef}>
                <Select
                  onClick={openDaysDropdown}
                  selectClassName="flex items-center justify-between !w-[186px] !h-12 md:!h-[52px] !p-2.5 !py-0 md:!px-[18px] md:!pt-[17px] !cursor-pointer md:!pb-[13px] !bg-transparent !border !border-solid !border-white !text-white text-xs md:!text-[15px] !font-medium !font-poppins !rounded-[15px]"
                  children="Weekly (2020)"
                  selectArrowClassName={`${
                    selectDays ? "-rotate-[180deg]" : "rotate-0"
                  } transition-all`}
                  selectArrowPath={selectArrow}
                />
                {selectDays && (
                  <div className="bodyBackground absolute top-[65px] rounded-[15px] overflow-hidden shadow-xl right-0 w-full">
                    <ul>
                      {daysOptions.map((item, index) => (
                        <li key={index} className="w-full">
                          <button
                            type="button"
                            className="border-b border-solid border-[#FFFFFF21] px-5 py-2.5 text-white text-sm w-full text-left hover:opacity-[0.4] transition-all"
                          >
                            {item}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
          <LineChart />
        </Box>

        <Box
          boxMainDivClasses="w-full lg:!w-[23%] !min-w-full lg:!min-w-[367px]"
          boxClass="p-5 md:!p-8"
        >
          <h3 className="font-poppins font-medium text-lg md:text-[21px] leading-normal text-white">
            Basic Statistics
          </h3>
          <div className="flex flex-wrap lg:block items-center justify-center md:justify-between gap-5 mt-[70px] lg:mt-0">
            <div className="lg:mt-[70px] flex justify-center">
              <div className="progress-wrapper">
                {allStatsData &&
                  allStatsData.basisStatistics.map(
                    (stat: any, index: number) => (
                      <div key={index} className="half-ring">
                        <svg viewBox="0 0 300 150">
                          <path
                            className="bg"
                            d={`M${stat.startX},150 A${stat.radius},${stat.radius} 0 0,1 ${stat.endX},150`}
                          />
                          <path
                            className="fg"
                            d={`M${stat.startX},150 A${stat.radius},${stat.radius} 0 0,1 ${stat.endX},150`}
                            stroke={stat.color}
                            strokeWidth="14"
                            strokeDasharray={stat.dashArray}
                            strokeDashoffset={
                              stat.dashArray -
                              (stat.dashArray * stat.progress) / 100
                            }
                          />
                        </svg>
                      </div>
                    )
                  )}
              </div>
            </div>
            <div className="mt-0 lg:mt-[58px] md:w-auto w-full">
              {allStatsData &&
                allStatsData.basisStatistics.map(
                  (basicStats: any, index: number) => (
                    <>
                      <div
                        key={index}
                        className="flex justify-between items-center gap-2 mb-3.5"
                      >
                        <div className="flex gap-[11px] items-center">
                          <div
                            className="w-4 h-4 rounded-full"
                            style={{ backgroundColor: basicStats.color }}
                          ></div>
                          <h4 className="font-poppins font-normal leading-normal line-clamp-1 text-xs md:text-[15px] text-white">
                            {basicStats.title}
                          </h4>
                        </div>
                        <p className="font-poppins font-semibold text-xs md:text-[17px] text-white leading-normal">
                          {basicStats.value}
                        </p>
                      </div>
                    </>
                  )
                )}
            </div>
          </div>
        </Box>
      </div>
    </>
  );
};

export default MarketStats;
