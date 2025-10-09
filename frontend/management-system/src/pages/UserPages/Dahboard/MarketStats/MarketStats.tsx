import { useEffect, useState } from "react";
import { useFormik, FormikProvider } from "formik";
import selectArrow from "../../../../images/selectBoxArrow.svg";
import SelectField from "../../../../ui/SelectField";
import LineChart from "./MarketStatsChart";
import { fetchMarketStatsData, MarketStatsData, Token, BasisStatistic } from "../api/dashboard";
import Box from "../../../../ui/Box";

const MarketStats = () => {
  const [allStatsData, setAllStatsData] = useState<MarketStatsData | null>(null);
  const [selectOpen, setSelectOpen] = useState(false);

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

  const formik = useFormik({
    initialValues: { Tokens: "" },
    onSubmit: () => {},
  });

  return (
    <>
      <div className="mt-8 flex gap-11 justify-between">
        <Box boxMainDivClasses="!w-[74.3%]" boxClass="!p-8">
          <div className="flex justify-between items-center flex-wrap gap-3 mb-20">
            <div>
              <h3 className="font-poppins font-medium text-[21px] leading-normal text-white">
                Market Overview
              </h3>
              <p className="font-poppins font-normal text-[13px] leading-normal text-white mt-[7px]">
                Lorem ipsum dolor sit amet, consectetur
              </p>
            </div>
            <div className="flex gap-[29px] items-center">
              {allStatsData &&
                allStatsData.tokens.map((token: Token, index: number) => (
                  <div key={index}>
                    <label className="containerCheckMarkMarket font-poppins text-[17px] text-white font-medium leading-normal">
                      {token.tokenName}
                      <input type="checkbox" />
                      <span className="checkmarkMarket"></span>
                    </label>
                  </div>
                ))}
            </div>
            <div className="flex gap-4 flex-wrap">
              <FormikProvider value={formik}>
                <form onSubmit={formik.handleSubmit} className="relative">
                  <div className="absolute right-[18px] top-[15px]">
                    <img
                      src={selectArrow}
                      alt="selectArrow"
                      className={`transition-all ${
                        selectOpen ? "-rotate-180" : ""
                      }`}
                    />
                  </div>
                  <SelectField
                    onFocus={() => setSelectOpen(true)}
                    onBlur={() => setSelectOpen(false)}
                    name="Tokens"
                    label=""
                    selectOption="More token"
                    inputClassName="relative z-90 !w-[186px] !h-[52px] !py-0 !px-[18px] !pt-[12px] !cursor-pointer !pb-[13px] !bg-transparent !border !border-solid !border-white !text-white !text-[15px] !font-medium !font-poppins !rounded-[15px]"
                    options={
                      allStatsData
                        ? allStatsData.tokens.map((token: Token) => ({
                            value: token.tokenName,
                            label: token.tokenName,
                          }))
                        : []
                    }
                  />
                </form>
                <form onSubmit={formik.handleSubmit} className="relative">
                  <div className="absolute right-[18px] top-[15px]">
                    <img
                      src={selectArrow}
                      alt="selectArrow"
                      // className={`transition-all ${
                      //   selectOpen ? "-rotate-180" : ""
                      // }`}
                    />
                  </div>
                  <SelectField
                    // onClick={handleSelectField}
                    name="Dates"
                    label=""
                    selectOption="Weekly (2020)"
                    inputClassName="relative z-90 !w-[186px] !h-[52px] !py-0 !px-[18px] !pt-[12px] !cursor-pointer !pb-[13px] !bg-transparent !border !border-solid !border-white !text-white !text-[15px] !font-medium !font-poppins !rounded-[15px]"
                    options={
                      allStatsData
                        ? allStatsData.tokens.map((token: Token) => ({
                            value: token.tokenName,
                            label: token.tokenName,
                          }))
                        : []
                    }
                  />
                </form>
              </FormikProvider>
            </div>
          </div>
          <LineChart />
        </Box>

        <Box boxMainDivClasses="!w-[23%] !min-w-[367px]" boxClass="p-8">
          <h3 className="font-poppins font-medium text-[21px] leading-normal text-white">
            Basic Statistics
          </h3>
          <div className="mt-[70px] flex justify-center">
            <div className="progress-wrapper">
              {allStatsData &&
                allStatsData.basisStatistics.map((stat: any, index: number) => (
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
                ))}
            </div>
          </div>
          <div className="mt-[58px]">
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
                        <h4 className="font-poppins font-normal leading-normal line-clamp-1 text-[15px] text-white">
                          {basicStats.title}
                        </h4>
                      </div>
                      <p className="font-poppins font-semibold text-[17px] text-white leading-normal">
                        {basicStats.value}
                      </p>
                    </div>
                  </>
                )
              )}
          </div>
        </Box>
      </div>
    </>
  );
};

export default MarketStats;
