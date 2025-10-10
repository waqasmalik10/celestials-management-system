import tableMenus from "../../../assets/images/tableMenus.svg";
import tableIcon from "../../../assets/images/tableIcon.svg";
import cryptoImg from "../../../assets/images/Crypto.svg";
import btc from "../../../assets/images/bitcoin.svg";
import aave from "../../../assets/images/ave.svg";
import doge from "../../../assets/images/doge.svg";
import uni from "../../../assets/images/uni.svg";
import itemsSelectArrow from "../../../assets/images/itemsSelectArrow.svg";
import { useEffect, useRef, useState, useCallback } from "react";
import Pagination from "../../../ui/Pagination";
import { fetchHoldingData, HoldingData, TableData } from "../api/dashboard";
import HoldingChart from "./HoldingsChart";
import Box from "../../../ui/Box";
import Select from "../../../ui/Select";

const Holdings = () => {
  const imageMap: { [key: string]: string } = {
    firstDataImg: cryptoImg,
    secondDataImg: btc,
    thirdDataImg: aave,
    fourthDataImg: doge,
    fifthDataImg: uni,
  };

  const modalRef = useRef<HTMLDivElement>(null);
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

  const selectItemButton = useCallback(() => {
    setSelectItemsNumber(!selectItemsNumber);
  }, [selectItemsNumber])

 

  const selectingTheItem = (item: number) => {
    setItemValue(item);
    setPostsPerPage(item);
    setSelectItemsNumber(!selectItemsNumber);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node) && selectItemsNumber
      ) {
        selectItemButton();
      }
    };

      document.addEventListener("mousedown", handleClickOutside);


    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [selectItemsNumber, selectItemButton]);

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);

  const tableLastPage = currentPage * postsPerPage;
  const tableFirstPage = tableLastPage - postsPerPage;

  const currentTableData = allTableData
    ? allTableData.tableData.slice(tableFirstPage, tableLastPage)
    : [];

  return (
    <>
      <div className="my-8 lg:my-[71px]">
        <h3 className="text-2xl md:text-[29px] font-medium leading-normal md:leading-11 font-inter mb-6 md:mb-[29px] text-white">
          My holdings
        </h3>
        <Box>
          <div className="p-4 md:p-6">
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
                  <th className="py-3 md:py-[19px] text-base md:text-lg font-inter leading-normal md:leading-[30px] font-medium text-[#FFFFFF7A] w-[56.4%] text-left pl-[100px]">
                    Name
                  </th>
                  <th className="py-3 md:py-[19px] text-base md:text-lg font-inter leading-normal md:leading-[30px] font-medium text-[#FFFFFF7A] w-[10.45%] pl-3 pr-[39px] text-right">
                    Value
                  </th>
                  <th className="py-3 md:py-[19px] text-base md:text-lg font-inter leading-normal md:leading-[30px] font-medium text-[#FFFFFF7A] w-[10.05%] pl-3 pr-[39px] text-right">
                    P/L ($)
                  </th>
                  <th className="py-3 md:py-[19px] text-base md:text-lg font-inter leading-normal md:leading-[30px] font-medium text-[#FFFFFF7A] w-[10.48%] pl-3 pr-[39px] text-right">
                    P/L (%)
                  </th>
                  <th className="py-3 md:py-[19px] text-base md:text-lg font-inter leading-normal md:leading-[30px] font-medium text-[#FFFFFF7A] w-[12.5%] pl-3 pr-[39px] text-right whitespace-nowrap">
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
                      <td className="py-3 md:py-[19px] w-[56.4%] text-left pl-[29px] flex gap-[29px] items-center">
                        <img
                          src={imageMap[data.image]}
                          alt={data.image}
                          className="w-10 h-10"
                        />
                        <div className="font-inter font-medium text-lg md:text-xl leading-normal text-white whitespace-nowrap">
                          {data.title} &nbsp;
                          <span className="text-[#FFFFFF7A] uppercase">
                            {data.shortTitle}
                          </span>
                        </div>
                      </td>
                      <td className="py-3 md:py-[19px] text-right pl-3 pr-[39px] w-[10.45%] text-base md:text-lg font-medium font-inter text-white">
                        ${data.value}
                      </td>
                      <td
                        className="py-3 md:py-[19px] text-right pl-3 pr-[39px] w-[10.05%] text-base md:text-lg font-medium font-inter"
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
                        className="py-3 md:py-[19px] text-right pl-3 pr-[39px] w-[10.48%] text-base md:text-lg font-medium font-inter"
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
                      <td className="py-3 md:py-[19px] text-right pl-3 pr-[39px] w-[12.5%] text-base md:text-lg font-medium font-inter text-white">
                        <HoldingChart holdingData={data} />
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          {allTableData && (
            <div className="flex flex-wrap items-center p-4 md:p-6 justify-end border-t border-solid border-[#FFFFFF21] gap-3 md:gap-[79px]">
              <p className="text-xs md:text-lg font-medium font-inter text-[#FFFFFF7A] flex gap-3 md:gap-[39px] items-center">
                Items per Page
                <div className="relative" ref={modalRef}>
              
                  <Select
                    onClick={selectItemButton}
                    children={itemValue}
                    selectArrowClassName={`${
                      selectItemsNumber ? "-rotate-[180deg]" : "rotate-0"
                    } transition-all`}
                    selectArrowPath={itemsSelectArrow}
                  />
                  <div
                    className={`bodyBackground absolute bottom-10 rounded-[15px] overflow-hidden shadow-xl right-0 ${
                      selectItemsNumber ? "block" : "hidden"
                    }`}
                  >
                    <ul>
                      {itemsPerPageOptions.map((item, index) => (
                        <li
                          key={index}
                          className="border-b border-solid border-[#FFFFFF21] px-5 py-2.5"
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
                <p className="text-xs md:text-lg font-medium font-inter text-[#FFFFFF7A]">
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
