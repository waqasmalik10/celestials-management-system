import { useEffect, useState } from "react";
import PortfolioChart from "./PortfolioChart";
import { fetchPortfolioData, PortfolioData, Minute } from "../api/dashboard";
import Box from "../../../../ui/Box";

const Portfolio = () => {
  const [portfolioData, setPortfolioData] = useState<PortfolioData | null>(null);
  const [activeTime, setActiveTime] = useState<string>("24H");

  useEffect(() => {
    const loadPortfolioData = async () => {
      try {
        const data = await fetchPortfolioData();
        setPortfolioData(data);
      } catch (error) {
        console.error(error);
      }
    };

    loadPortfolioData();
  }, []);

  return (
    <>
      <Box boxMainDivClasses="!mt-[72px]" boxClass="!pb-10">
        <div className="p-10 flex justify-between items-start gap-2.5 flex-wrap">
          <div>
            <h3 className="text-[25px] leading-10 font-medium font-inter text-white">
              Portfolio
            </h3>
            <p className="mt-2.5 text-white text-[35px] font-poppins leading-[50px] font-semibold">
              {portfolioData
                ? `$${
                    portfolioData.minutes.find(
                      (item: Minute) => item.timeValue === activeTime
                    )?.value
                  }`
                : "$0.00"}{" "}
              &nbsp;
              <span className="font-inter text-xl font-medium text-[#ADDC7B]">
                {portfolioData
                  ? `${
                      portfolioData.minutes.find(
                        (item: Minute) => item.timeValue === activeTime
                      )?.value_progress_percentage
                    }%`
                  : "+0.00%"}
              </span>
            </p>
          </div>
          <div className="flex items-center gap-2.5">
            {portfolioData &&
              portfolioData.minutes.map((values: Minute, index: number) => {
                const isActive = activeTime === values.timeValue;
                return (
                  <div key={index}>
                    <button
                      type="button"
                      onClick={() => setActiveTime(values.timeValue)}
                      className={`px-[15px] flex items-center justify-center py-1 text-[15px] font-inter font-medium leading-normal h-[30px] pt-[5px] rounded-[15px] ${
                        isActive
                          ? "bg-white text-[#292D3F]"
                          : "bg-[#FFFFFF14] text-white"
                      }`}
                    >
                      {values.timeValue}
                    </button>
                  </div>
                );
              })}
          </div>
        </div>
        <PortfolioChart activeTime={activeTime} />
      </Box>
    </>
  );
};

export default Portfolio;
