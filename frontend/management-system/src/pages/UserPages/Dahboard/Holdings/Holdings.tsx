import tableMenus from "../../../../images/tableMenus.svg";
import tableIcon from "../../../../images/tableIcon.svg";
import cryptoImg from "../../../../images/Crypto.svg";
import btc from "../../../../images/bitcoin.svg";
import { useEffect, useState } from "react";
import Pagination from "../../../../ui/Pagination";

const Holdings = () => {
  const imageMap: { [key: string]: string } = {
    firstDataImg: cryptoImg,
    secondDataImg: btc,
  };

  const [allTableData, setAllTableData] = useState<any>(null);

  useEffect(() => {
    fetch("/dummy_json_data/dashboard_json_data/holding_data.json")
      .then((res) => res.json())
      .then((data) => setAllTableData(data));
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);

  const tableLastPage = currentPage * postsPerPage;
  const tableFirstPage = tableLastPage - postsPerPage;

  const currentTableData = allTableData
    ? allTableData.tableData.slice(tableFirstPage, tableLastPage)
    : [];

  return (
    <>
      <div className="mt-[71px]">
        <h3 className="text-[29px] font-medium leading-11 font-inter mb-[29px] text-white">
          My holdings
        </h3>
        <div className="w-full h-auto rounded-[15px] overflow-hidden">
          <div className="w-full h-full border-transparent rounded-[15px] blurBackground cardsBorder backdrop-blur-[41px]">
            <div className="p-6">
              <div className="flex gap-[19px] justify-end">
                <button type="button">
                  <img src={tableMenus} alt="table" />
                </button>
                <button type="button">
                  <img src={tableIcon} alt="table" />
                </button>
              </div>
            </div>
            <table className="w-full">
              <thead>
                <tr className="border-t border-solid border-[#FFFFFF21]">
                  <th className="py-[19px] text-lg font-inter font-medium text-[#FFFFFF7A] w-[40%] text-left pl-[109px]">
                    Name
                  </th>
                  <th className="py-[19px] text-lg font-inter font-medium text-[#FFFFFF7A] w-[15%] pl-3 pr-[39px] text-right">
                    Value
                  </th>
                  <th className="py-[19px] text-lg font-inter font-medium text-[#FFFFFF7A] w-[15%] pl-3 pr-[39px] text-right">
                    P/L ($)
                  </th>
                  <th className="py-[19px] text-lg font-inter font-medium text-[#FFFFFF7A] w-[15%] pl-3 pr-[39px] text-right">
                    P/L (%)
                  </th>
                  <th className="py-[19px] text-lg font-inter font-medium text-[#FFFFFF7A] w-[15%] pl-3 pr-[39px] text-right">
                    24H Chart
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentTableData &&
                  currentTableData.map((data: any, index: number) => (
                    <tr
                      key={index}
                      className="border-t border-solid border-[#FFFFFF21]"
                    >
                      <td className="py-[19px] w-[55%] text-left pl-[29px] flex gap-[29px] items-center">
                        <img
                          src={imageMap[data.image]}
                          alt={data.image}
                          className="w-10 h-10"
                        />
                        <div className="font-inter font-medium text-xl leading-normal text-white">
                          {data.title} &nbsp;
                          <span className="text-[#FFFFFF7A] uppercase">
                            {data.shortTitle}
                          </span>
                        </div>
                      </td>
                      <td className="py-[19px] w-[15%] text-right pl-3 pr-[39px] w-[15%] text-lg font-medium font-inter text-white">
                        ${data.value}
                      </td>
                      <td
                        className="py-[19px] w-[15%] text-right pl-3 pr-[39px] w-[15%] text-lg font-medium font-inter"
                        style={{
                          color:
                            data.profit_loss_value > "$60.00"
                              ? "#FF8663"
                              : "#ADDC7B",
                        }}
                      >
                        {data.profit_loss_value}
                      </td>
                      <td
                        className="py-[19px] w-[15%] text-right pl-3 pr-[39px] w-[15%] text-lg font-medium font-inter"
                        style={{
                          color:
                            data.profit_loss_percentage > "30.00%"
                              ? "#ADDC7B"
                              : "#FF8663",
                        }}
                      >
                        {data.profit_loss_percentage > "30.00%" ? "+" : "-"}
                        {data.profit_loss_percentage}
                      </td>
                      <td className="py-[19px] w-[15%] text-right pl-3 pr-[39px] w-[15%] text-lg font-medium font-inter text-white"></td>
                    </tr>
                  ))}
              </tbody>
            </table>
            {allTableData && (
              <div className="flex mt-5 items-center p-6 justify-end border-t border-solid border-[#FFFFFF21] gap-[79px]">
                <p className="text-lg font-medium font-inter text-[#FFFFFF7A] flex gap-[39px] items-center">
                  Items per Page
                  <p>{allTableData.tableData.length}</p>
                </p>
                <div className="flex items-center gap-5">
                  <p className="text-lg font-medium font-inter text-[#FFFFFF7A]">
                    {`${tableFirstPage + 1}-${currentTableData.length} `} of{" "}
                    {allTableData.tableData.length}
                  </p>

                  <Pagination
                    postsPerPage={postsPerPage}
                    totalPosts={allTableData.tableData.length}
                    currentPageSet={setCurrentPage}
                    currentPage={currentPage}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Holdings;
