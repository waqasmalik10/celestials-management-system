import { useEffect, useState } from "react";
import { useFormik, FormikProvider } from "formik";
import selectArrow from "../../../images/selectBoxArrow.svg";
import SelectField from "../../../ui/SelectField";
import LineChart from "./Chart";

const MarketStats = () => {
  const [tokensData, setTokenData] = useState<any>(null);
  const [selectOpen, setSelectOpen] = useState(false);

  useEffect(() => {
    fetch("/dummy_json_data/dashboard_json_data/MarketStats.json")
      .then((res) => res.json())
      .then((data) => setTokenData(data));
  }, []);

  console.log(tokensData);

  const formik = useFormik({
    initialValues: { Tokens: "" },
    onSubmit: () => {},
  });



  return (
    <>
      <div className="mt-8">
        <div className="w-[74.3%] h-auto rounded-[15px] overflow-hidden">
          <div className="w-full h-full border-transparent rounded-[15px] blurBackground cardsBorder backdrop-blur-[41px] p-8">
            <div className="flex justify-between items-center flex-wrap gap-3">
              <div>
                <h3 className="font-poppins font-medium text-[21px] leading-normal text-white">
                  Market Overview
                </h3>
                <p className="font-poppins font-normal text-[13px] leading-normal text-white mt-[7px]">
                  Lorem ipsum dolor sit amet, consectetur
                </p>
              </div>
              <div className="flex gap-[29px] items-center">
                {tokensData &&
                  tokensData.tokens.map((token: any, index: number) => (
                    <div key={index}>
                      <label className="containerCheckMarkMarket font-poppins text-[17px] text-white font-medium leading-normal">
                        {token.tokenName}
                        <input type="checkbox" />
                        <span className="checkmarkMarket"></span>
                      </label>
                    </div>
                  ))}
              </div>
              <div className="flex gap-4">
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
                        tokensData
                          ? tokensData.tokens.map((token: any) => ({
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
                        tokensData
                          ? tokensData.tokens.map((token: any) => ({
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
          </div>
        </div>
      </div>
    </>
  );
};

export default MarketStats;
