import profileImg from "../assets/images/profileIcon.svg";
import employeesIcon from "../assets/images/employeesIcon.svg";
import dashBoardIcon from "../assets/images/dashboardIcon.svg";
import departmentsIcon from "../assets/images/departments.svg";
import swapIcon from "../assets/images/swapIcon.svg";
import liquidityIcon from "../assets/images/liquidity.svg";
import companyPolicy from "../assets/images/companyPolicyIcon.svg";
import settingsIcon from "../assets/images/settingsIcon.svg";
import settingIcon from "../assets/images/settingIcon.svg";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Button from "../ui/Button";
import { useLocation } from "react-router-dom";

interface SideBarProps {
  pathTitle?: string | undefined;
  admin?: boolean;
  name?: string;
  sidebarEmail?: string;
  sideBarLogout?: () => void;
}

export default function SideBar(props: SideBarProps) {
  const [activeDashboard, setActiveDashboard] = useState(false);
  const [activeEmpoyees, setActiveEmployees] = useState(false);
  const [activeSettings, setActiveSettings] = useState(false);
  const [activeDepartments, setActiveDepartments] = useState(false);
  const [activePolicy, setActivePolicy] = useState(false);
  // const [leaves, setLeaves] = useState(false);
  // const [loan, setLoan] = useState(false);

  const location = useLocation();

  const navigate = useNavigate();

  const activeClass = "selectedSideBarOption !font-semibold";

  useEffect(() => {
    if (location.pathname === "/dashboard") {
      setActiveDashboard(true);
      setActiveSettings(false);
      setActiveEmployees(false);
      setActiveDepartments(false);
      setActivePolicy(false);
      // setLeaves(false);
      // setLoan(false);
    } else if (location.pathname === "/settings") {
      setActiveDashboard(false);
      setActiveEmployees(false);
      setActiveSettings(true);
      setActiveDepartments(false);
      setActivePolicy(false);
      // setLeaves(false);
      // setLoan(false);
    } else if (
      location.pathname === "/employees" ||
      location.pathname.startsWith("/employee")
    ) {
      setActiveDashboard(false);
      setActiveSettings(false);
      setActiveEmployees(true);
      setActiveDepartments(false);
      setActivePolicy(false);
      // setLeaves(false);
      // setLoan(false);
    } else if (
      location.pathname === "/departments" ||
      location.pathname.startsWith("/departments")
    ) {
      setActiveDashboard(false);
      setActiveSettings(false);
      setActiveEmployees(false);
      setActiveDepartments(true);
      setActivePolicy(false);
      // setLeaves(false);
      // setLoan(false);
    } else if (location.pathname === "/policy") {
      setActiveDashboard(false);
      setActiveSettings(false);
      setActiveEmployees(false);
      setActiveDepartments(false);
      setActivePolicy(true);
      // setLeaves(false);
      // setLoan(false);
    } else if (location.pathname === "/leaves") {
      setActiveDashboard(false);
      setActiveSettings(false);
      setActiveEmployees(false);
      setActiveDepartments(false);
      setActivePolicy(false);
      // setLeaves(true);
      // setLoan(false);
    } else if (location.pathname === "/loan") {
      setActiveDashboard(false);
      setActiveSettings(false);
      setActiveEmployees(false);
      setActiveDepartments(false);
      setActivePolicy(false);
      // setLeaves(false);
      // setLoan(true);
    } else {
      setActiveDashboard(false);
      setActiveSettings(false);
      setActiveEmployees(false);
      setActiveDepartments(false);
      setActivePolicy(false);
      // setLeaves(false);
      // setLoan(false);
    }
  }, [location.pathname]);

  const navigateDashboard = () => {
    navigate("/dashboard");
  };
  function navigateSetting() {
    navigate("/settings");
  }
  const navigateEmployees = () => {
    navigate("/employees");
  };
  const navigateDepartments = () => {
    navigate("/departments");
  };

  const navigatePolicy = () => {
    navigate("/policy");
  };

  // const navigateLeaves = () => {
  //   navigate("/leaves");
  // };

  // const navigateLoan = () => {
  //   navigate("/loan");
  // };

  return (
    <>
      <div className="flex items-center gap-[21px] pl-7 md:pl-[50px] w-full">
        <div className="bg-[#C4C4C4] w-[50px] h-[50px] md:w-[60px] md:h-[60px] rounded-[14px] p-0.5">
          <div className="relative w-full h-full rounded-[14px] bg-[#28357399] flex items-center justify-center">
            <img src={profileImg} alt="profileImg" className="w-auto h-auto" />
            <button
              onClick={navigateSetting}
              className="absolute  -top-2 -right-2"
            >
              <img src={settingIcon} alt="setting" />
            </button>
          </div>
        </div>
        <div>
          <h1 className="text-base md:text-xl font-poppins font-normal text-white">
            Hello, <span className="font-semibold">{props.name}</span>
          </h1>
          <p className="text-xs md:text-sm font-normal text-[#9B94C1] dark:text-white ">
            {props.sidebarEmail}
          </p>
        </div>
      </div>

      <div className=" mt-[13px] h-[calc(100%-30%)] overflowXAuto">
        <div className="flex flex-col">
        <Button
          onClick={navigateDashboard}
          buttonClasses={`w-full pl-7 md:pl-[50px] pr-2.5 h-[67px] font-poppins text-white text-sm sm:text-base !text-left relative flex w-full items-center gap-[22px] ${
            activeDashboard ? activeClass : "bg-transparent !font-medium"
          }`}
        >
          {activeDashboard && (
            <div className="w-2.5 h-full rounded-tr-lg rounded-br-lg absolute left-0 bg-[#FD073A] top-0"></div>
          )}
          <div className="w-8 h-8">
            <img
              src={dashBoardIcon}
              alt="dashboard"
              className="w-full h-full"
            />
          </div>
          Dashboard
        </Button>
        <Button buttonClasses="w-full pl-7 md:pl-[50px] pr-2.5 h-[67px] font-poppins !font-medium text-white text-sm sm:text-base !text-left relative flex w-full items-center gap-[22px]">
          <div className="w-8 h-8">
            <img src={swapIcon} alt="Swap" className="w-full h-full" />
          </div>
          Swap
        </Button>
        {props.admin && (
          <>
            <Button
              onClick={navigateEmployees}
              buttonClasses={`w-full pl-7 md:pl-[50px] pr-2.5 h-[67px] font-poppins text-white text-sm sm:text-base !text-left relative flex w-full items-center gap-[22px] ${
                activeEmpoyees ? activeClass : "bg-transparent !font-medium"
              }`}
            >
              {activeEmpoyees && (
                <div className="w-2.5 h-full rounded-tr-lg rounded-br-lg absolute left-0 bg-[#FD073A] top-0"></div>
              )}
              <div className="w-8 h-8">
                <img
                  src={employeesIcon}
                  alt="employees"
                  className="w-full h-full"
                />
              </div>
              Employees
            </Button>
            <Button
              onClick={navigateDepartments}
              buttonClasses={`w-full pl-7 md:pl-[50px] pr-2.5 h-[67px] font-poppins text-white text-sm sm:text-base !text-left relative flex w-full items-center gap-[22px] ${
                activeDepartments ? activeClass : "bg-transparent !font-medium"
              }`}
            >
              {activeDepartments && (
                <div className="w-2.5 h-full rounded-tr-lg rounded-br-lg absolute left-0 bg-[#FD073A] top-0"></div>
              )}
              <div className="w-8 h-8">
                <img
                  src={departmentsIcon}
                  alt="departments"
                  className="w-full h-full"
                />
              </div>
              Departments
            </Button>
          </>
        )}
        <Button buttonClasses="w-full pl-7 md:pl-[50px] pr-2.5 h-[67px] font-poppins !font-medium text-white text-sm sm:text-base !text-left relative flex w-full items-center gap-[22px]">
          <div className="w-8 h-8">
            <img
              src={liquidityIcon}
              alt="Liquidity"
              className="w-full h-full"
            />
          </div>
          Liquidity
        </Button>
        <Button
          onClick={navigatePolicy}
          buttonClasses={`w-full pl-7 md:pl-[50px] pr-2.5 h-[67px] font-poppins text-white text-sm sm:text-base !text-left relative flex w-full items-center gap-[22px] ${
            activePolicy ? activeClass : "bg-transparent !font-medium"
          }`}
        >
          {activePolicy && (
            <div className="w-2.5 h-full rounded-tr-lg rounded-br-lg absolute left-0 bg-[#FD073A] top-0"></div>
          )}
          <div className="w-8 h-8">
            <img src={companyPolicy} alt="company" className="w-full h-full" />
          </div>
          Company Policies
        </Button>
        {!props.admin && (
          <>
            {/* <Button
              onClick={navigateLeaves}
              buttonClasses={`w-full pl-[50px] pr-2.5 h-[67px] font-poppins text-white text-base !text-left relative flex w-full items-center gap-[22px] ${
                leaves ? activeClass : "bg-transparent !font-medium"
              }`}
            >
              Leaves
            </Button>
            <Button
              onClick={navigateLoan}
              buttonClasses={`w-full pl-[50px] pr-2.5 h-[67px] font-poppins text-white text-base !text-left relative flex w-full items-center gap-[22px] ${
                loan ? activeClass : "bg-transparent !font-medium"
              }`}
            >
              Loan
            </Button> */}
          </>
        )}

        <Button
          onClick={navigateSetting}
          buttonClasses={`w-full pl-7 md:pl-[50px] pr-2.5 h-[67px] font-poppins text-white text-sm sm:text-base !text-left !font-medium relative flex w-full items-center gap-[22px] ${
            activeSettings ? activeClass : "bg-transparent"
          }`}
        >
          {activeSettings && (
            <div className="w-2.5 h-full rounded-tr-lg rounded-br-lg absolute left-0 bg-[#FD073A] top-0"></div>
          )}
          <div className="w-8 h-8">
            <img src={settingsIcon} alt="setting" className="w-full h-full" />
          </div>
          Settings
        </Button>
        </div>
      </div>

      <div className="absolute bottom-10 w-[calc(100%-40px)] left-5">
        <button
          onClick={props.sideBarLogout}
          className="bg-[#FD073A] h-12 w-full p-2.5 rounded-[16px] font-poppins text-base text-center leading-7 font-inter text-white font-medium uppercase border-2 border-solid border-[#283573]"
        >
          Logout
        </button>
      </div>
    </>
  );
}
