import tableMenus from "../../../../images/tableMenus.svg";
import tableIcon from "../../../../images/tableIcon.svg";
import cryptoImg from "../../../../images/Crypto.svg";
import btc from "../../../../images/bitcoin.svg";
import aave from "../../../../images/ave.svg";
import doge from "../../../../images/doge.svg";
import uni from "../../../../images/uni.svg";
import itemsSelectArrow from "../../../../images/itemsSelectArrow.svg";
import { useEffect, useState } from "react";
import Pagination from "../../../../ui/Pagination";
import { fetchHoldingData, HoldingData, TableData } from "../api/dashboard";
import HoldingChart from "./HoldingsChart";
import Box from "../../../../ui/Box";

const Holdings = () => {
  const imageMap: { [key: string]: string } = {
    firstDataImg: cryptoImg,
    secondDataImg: btc,
    thirdDataImg: aave,
    fourthDataImg: doge,
    fifthDataImg: uni,
  };

  const [allTableData, setAllTableData] = useState<HoldingData | null>(null);
  const [selectItemsNumber, setSelectItemsNumber] = useState(false);
  const [itemValue, setItemValue] = useState(10);
  const itemsPerPageOptions = allTableData
    ? [10, 20, 30, allTableData.tableData.length]
    : [10, 20, 30];

  useEffect(() => {
    const loadHoldingData = async () => {
      try {
        const data = await fetchHoldingData();
        setAllTableData(data);
      } catch (error) {
        console.error(error);
      }
    };

    loadHoldingData();
  }, []);

  const selectItemButton = () => {
    setSelectItemsNumber(!selectItemsNumber);
  };

  const selectingTheItem = (item: number) => {
    setItemValue(item);
    setPostsPerPage(item);
    setSelectItemsNumber(!selectItemsNumber);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);

  const tableLastPage = currentPage * postsPerPage;
  const tableFirstPage = tableLastPage - postsPerPage;

  const currentTableData = allTableData
    ? allTableData.tableData.slice(tableFirstPage, tableLastPage)
    : [];

  return (
    <>
      <div className="my-[71px]">
        <h3 className="text-[29px] font-medium leading-11 font-inter mb-[29px] text-white">
          My holdings
        </h3>
        <Box>
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
          <div className="w-full overflowXAuto">
            <table className="w-full min-w-[1024px]">
              <thead>
                <tr className="border-t border-solid border-[#FFFFFF21]">
                  <th className="py-[19px] text-lg font-inter leading-[30px] font-medium text-[#FFFFFF7A] w-[56.4%] text-left pl-[109px]">
                    Name
                  </th>
                  <th className="py-[19px] text-lg font-inter leading-[30px] font-medium text-[#FFFFFF7A] w-[10.45%] pl-3 pr-[39px] text-right">
                    Value
                  </th>
                  <th className="py-[19px] text-lg font-inter leading-[30px] font-medium text-[#FFFFFF7A] w-[10.05%] pl-3 pr-[39px] text-right">
                    P/L ($)
                  </th>
                  <th className="py-[19px] text-lg font-inter leading-[30px] font-medium text-[#FFFFFF7A] w-[10.48%] pl-3 pr-[39px] text-right">
                    P/L (%)
                  </th>
                  <th className="py-[19px] text-lg font-inter leading-[30px] font-medium text-[#FFFFFF7A] w-[12.5%] pl-3 pr-[39px] text-right whitespace-nowrap">
                    24H Chart
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentTableData &&
                  currentTableData.map((data: TableData, index: number) => (
                    <tr
                      key={index}
                      className="border-t border-solid border-[#FFFFFF21]"
                    >
                      <td className="py-[19px] w-[56.4%] text-left pl-[29px] flex gap-[29px] items-center">
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
                      <td className="py-[19px] text-right pl-3 pr-[39px] w-[10.45%] text-lg font-medium font-inter text-white">
                        ${data.value}
                      </td>
                      <td
                        className="py-[19px] text-right pl-3 pr-[39px] w-[10.05%] text-lg font-medium font-inter"
                        style={{
                          color:
                            data.profit_loss_value > "$50.00"
                              ? "#FF8663"
                              : "#ADDC7B",
                        }}
                      >
                        {data.profit_loss_value}
                      </td>
                      <td
                        className="py-[19px] text-right pl-3 pr-[39px] w-[10.48%] text-lg font-medium font-inter"
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
                      <td className="py-[19px] text-right pl-3 pr-[39px] w-[12.5%] text-lg font-medium font-inter text-white">
                        <HoldingChart holdingData={data} />
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          {allTableData && (
            <div className="flex items-center p-6 justify-end border-t border-solid border-[#FFFFFF21] gap-[79px]">
              <p className="text-lg font-medium font-inter text-[#FFFFFF7A] flex gap-[39px] items-center">
                Items per Page
                <div className="relative">
                  <button
                    onClick={selectItemButton}
                    type="button"
                    className="flex items-center"
                  >
                    {itemValue}
                    <img
                      src={itemsSelectArrow}
                      alt="arrow"
                      className={`${
                        selectItemsNumber ? "-rotate-[180deg]" : "rotate-0"
                      } transition-all`}
                    />
                  </button>
                  <div
                    className={`bodyBackground absolute bottom-10 ${
                      selectItemsNumber ? "block" : "hidden"
                    }`}
                  >
                    <ul>
                      {itemsPerPageOptions.map((item, index) => (
                        <li
                          key={index}
                          className="border-b border-solid border-[#FFFFFF21] px-4 py-2.5"
                        >
                          <button
                            type="button"
                            onClick={() => selectingTheItem(item)}
                          >
                            {item}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </p>
              <div className="flex items-center gap-5">
                <p className="text-lg font-medium font-inter text-[#FFFFFF7A]">
                  {`${tableFirstPage + 1}-${Math.min(
                    tableLastPage,
                    allTableData.tableData.length
                  )}`}{" "}
                  of {allTableData.tableData.length}
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
        </Box>
      </div>
    </>
  );
};

export default Holdings;
