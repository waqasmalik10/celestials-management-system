import { useEffect, useState } from "react";
import { fetchTransactionData, TransactionData, TransactionTableData } from "../api/dashboard";
import btc from "../../../../images/bitcoin.svg";
import eth from "../../../../images/eth.svg";
import uni from "../../../../images/uni.svg";
import xtz from "../../../../images/xtz.svg";
import itemsSelectArrow from "../../../../images/itemsSelectArrow.svg";
import Pagination from "../../../../ui/Pagination";
import Box from "../../../../ui/Box";

const Transaction = () => {
  const imageMap: { [key: string]: string } = {
    firstCoinImg: btc,
    secondCoinImg: eth,
    thirdCoinImg: uni,
    fourthCoinImg: xtz,
  };

  const [allTransactionTableData, setAllTransactionTableData] =
    useState<TransactionData | null>(null);
  const [selectItemsNumber, setSelectItemsNumber] = useState(false);
  const [sheduleSelect, setSheduleSelect] = useState(false);
  const [itemValue, setItemValue] = useState(10);
  const [sheduleItem, setSheduleItem] = useState("Date & Time");
  const itemsPerPageOptions = allTransactionTableData
    ? [10, 20, 30, allTransactionTableData.transactionTableData.length]
    : [10, 20, 30];
  const sheduleOptions = ["Date & Time", "Weekly"];

  useEffect(() => {
    const loadTransactionData = async () => {
      try {
        const data = await fetchTransactionData();
        setAllTransactionTableData(data);
      } catch (error) {
        console.error(error);
      }
    };

    loadTransactionData();
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

  const currentTableData = allTransactionTableData
    ? allTransactionTableData.transactionTableData.slice(
        tableFirstPage,
        tableLastPage
      )
    : [];

  const selectShedule = () => {
    setSheduleSelect(!sheduleSelect);
  };
  const shedulingTheItem = (item: string) => {
    setSheduleItem(item);
    setSheduleSelect(!sheduleSelect);
  };

  return (
    <div className="my-[71px]">
      <div className="flex justify-between items-center gap-4 mb-[29px]">
        <h2 className="text-[30px] font-medium font-inter leading-11 text-white">
          My transactions
        </h2>
        <button
          type="button"
          className="outline-none bg-transparent text-[#259DA8] font-inter font-medium text-xl"
        >
          View All
        </button>
      </div>

      <Box>
        <div className="w-full overflowXAuto">
          <table className="w-full min-w-[1024px]">
            <thead>
              <tr className="border-t border-solid border-[#FFFFFF21]">
                <th className="py-[19px] text-lg font-inter font-medium leading-[30px] text-[#FFFFFF7A] w-[48.08%] text-left pl-[109px]">
                  Name
                </th>
                <th className="py-[19px] text-lg font-inter font-medium leading-[30px] text-[#FFFFFF7A] w-[8.66%] pl-3 pr-10 text-right">
                  Action
                </th>
                <th className="py-[19px] text-lg font-inter font-medium leading-[30px] text-[#FFFFFF7A] w-[13.49%] pl-3 pr-10 text-right relative whitespace-nowrap">
                  <button
                    type="button"
                    onClick={selectShedule}
                    className="w-full flex items-center justify-end"
                  >
                    {sheduleItem}
                    <div className="w-[27px] h-[27px]">
                      <img
                        src={itemsSelectArrow}
                        alt="arrow"
                        className={`${
                          sheduleSelect ? "rotate-[180deg]" : "rotate-0"
                        } transition-all`}
                      />
                    </div>
                  </button>
                  <div
                    className={`bodyBackground absolute -bottom-[100px] right-10 ${
                      sheduleSelect ? "block" : "hidden"
                    }`}
                  >
                    <ul>
                      {sheduleOptions.map((item, index) => (
                        <li
                          key={index}
                          className="border-b border-solid border-[#FFFFFF21] px-4 py-2.5"
                        >
                          <button
                            type="button"
                            onClick={() => shedulingTheItem(item)}
                          >
                            {item}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                </th>
                <th className="py-[19px] text-lg font-inter font-medium leading-[30px] text-[#FFFFFF7A] w-[9.25%] pl-3 pr-10 text-right">
                  Units
                </th>
                <th className="py-[19px] text-lg font-inter font-medium leading-[30px] text-[#FFFFFF7A] w-[11.1%] pl-3 pr-10 text-right">
                  Price
                </th>
                <th className="py-[19px] text-lg font-inter font-medium leading-[30px] text-[#FFFFFF7A] w-[9.56%] pl-3 pr-10 text-right">
                  Total
                </th>
              </tr>
            </thead>
            <tbody>
              {currentTableData &&
                currentTableData.map((data: TransactionTableData, index: number) => (
                  <tr
                    key={index}
                    className="border-t border-solid border-[#FFFFFF21]"
                  >
                    <td className="py-[19px] pl-10 flex items-center w-[48.08%] gap-[29px]">
                      <img src={imageMap[data.coinImg]} alt="coin-img" />
                      <p className="flex items-center gap-2.5 font-inter text-xl leading-[34px] font-medium text-white">
                        {data.title}{" "}
                        <span className="uppercase text-[#FFFFFF7A]">
                          {data.subTitle}
                        </span>
                      </p>
                    </td>
                    <td className={`py-[19px]  pr-10 text-right w-[8.66%]`}>
                      <div
                        className={`rounded-[15px] ml-auto px-[15px] h-[30px] text-[15px] leading-6 font-medium font-inter pt-px flex items-center w-fit ${
                          data.actionStatus === "Sell"
                            ? "text-[#FF8663] bg-[#FF866314]"
                            : "text-[#ADDC7B] bg-[#ADDC7B14]"
                        }`}
                      >
                        {data.actionStatus}
                      </div>
                    </td>
                    <td className="py-[19px] text-right pr-10 text-lg leading-[30px] font-medium font-inter text-white w-[13.49%] whitespace-nowrap">
                      {sheduleItem === "Weekly" ? (
                        data.weekly
                      ) : (
                        <span
                          dangerouslySetInnerHTML={{
                            __html: `${data.date}&nbsp;&nbsp;${data.time}`,
                          }}
                        />
                      )}
                    </td>
                    <td className="py-[19px] text-right pr-10 text-lg leading-[30px] font-medium font-inter text-white w-[9.25%] whitespace-nowrap">
                      {data.units}
                    </td>
                    <td className="py-[19px] text-right pr-10 text-lg leading-[30px] font-medium font-inter text-white w-[11.1%] whitespace-nowrap">
                      ${data.price}
                    </td>
                    <td className="py-[19px] text-right pr-10 text-lg leading-[30px] font-medium font-inter text-white w-[9.56%] whitespace-nowrap">
                      ${data.total}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        {allTransactionTableData && (
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
                  allTransactionTableData.transactionTableData.length
                )}`}{" "}
                of {allTransactionTableData.transactionTableData.length}
              </p>

              <Pagination
                postsPerPage={postsPerPage}
                totalPosts={allTransactionTableData.transactionTableData.length}
                currentPageSet={setCurrentPage}
                currentPage={currentPage}
              />
            </div>
          </div>
        )}
      </Box>
    </div>
  );
};

export default Transaction;
