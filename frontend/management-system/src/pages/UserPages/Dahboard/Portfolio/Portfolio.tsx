import { useEffect, useState } from "react";
import PortfolioChart from "./PortfolioChart";

const Portfolio = () => {
  const [portfolioData, setPortfolioData] = useState<any>(null);
  const [activeTime, setActiveTime] = useState<string>("24H");

  useEffect(() => {
    fetch("/dummy_json_data/dashboard_json_data/portfolio_data.json")
      .then((res) => res.json())
      .then((data) => setPortfolioData(data));
  }, []);

  return (
    <>
      <div className="w-full h-auto rounded-[15px] overflow-hidden mt-[72px]">
        <div className="w-full h-full border-transparent rounded-[15px] blurBackground cardsBorder backdrop-blur-[41px] pb-10">
          <div className="p-10 flex justify-between items-start gap-2.5 flex-wrap">
            <div>
              <h3 className="text-[25px] leading-10 font-medium font-inter text-white">
                Portfolio
              </h3>
              <p className="mt-2.5 text-white text-[35px] font-poppins leading-[50px] font-semibold">
                {portfolioData
                  ? `$${
                      portfolioData.minutes.find(
                        (item: any) => item.timeValue === activeTime
                      )?.value
                    }`
                  : "$0.00"}{" "}
                &nbsp;
                <span className="font-inter text-xl font-medium text-[#ADDC7B]">
                  {portfolioData
                    ? `${
                        portfolioData.minutes.find(
                          (item: any) => item.timeValue === activeTime
                        )?.value_progress_percentage
                      }%`
                    : "+0.00%"}
                </span>
              </p>
            </div>
            <div className="flex items-center gap-2.5">
              {portfolioData &&
                portfolioData.minutes.map((values: any, index: number) => {
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
        </div>
      </div>
    </>
  );
};

export default Portfolio;
