import DashboardBody from "./DashboardBody";
import dateFilterIcon from "../../../images/dateFilterIcon.svg";

export default function DashboardPage() {
  return (
    <>
      <div className="mt-[46px]">
        <div className="flex items-center justify-between">
          <h1 className="text-4xl font-semibold text-white font-poppins leading-normal">
            Dashboard
          </h1>
          <button
            type="button"
            className="bodyBackground rounded-[15px] py-[26px] px-2 flex justify-center items-center font-poppins font-semibold text-[17px] leading-normal min-w-[224px] gap-[18px] h-[73px] text-white"
          >
            <div className="w-[21px] h-[21px]">
              <img src={dateFilterIcon} alt="date" className="w-full h-full" />
            </div>
            Filter Periode
          </button>
        </div>
        <DashboardBody />
      </div>
    </>
  );
}
