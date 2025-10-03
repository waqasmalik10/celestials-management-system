import { useContext } from "react";
import { DepartmentContext } from "../Departments/store/DepartmentContext";
import { EmployeeContext } from "../Employee/store/employeeContext";
import { Link } from "react-router-dom";

const DashboardAdminData = () => {
  const departmentContext = useContext(DepartmentContext);

  const employeeContext = useContext(EmployeeContext);
  if (!employeeContext) {
    return <div>Loading employee data...</div>;
  }
  if (!departmentContext) {
    return <div>Loading department data...</div>;
  }
  const { employee } = employeeContext;
  const { department } = departmentContext;

  return (
    <>
      <div className="mt-10">
        <div className="text-white mb-6">
          <p className="w-full p-7 bg-[#1E2C6D] dark:bg-[#383838]  text-3xl">
            Employees:
          </p>
          <div className="flex flex-wrap gap-2 items-center justify-between mt-4">
            <h1 className="text-2xl px-7 capitalize">
              Total Employees is <b>{employee.length}.</b>
            </h1>
            <Link to={"/employees"}>
              <button className="buttonColor px-5 py-4 pb-5 rounded-[10px] text-white text-xl font-inter font-medium leading-[17px] text-center">
                See All...
              </button>
            </Link>
          </div>
        </div>
        <div className="text-white mb-6">
          <p className="w-full p-7 bg-[#1E2C6D] dark:bg-[#383838]  text-3xl">
            Departments:
          </p>
          <div className="flex flex-wrap gap-2 items-center justify-between mt-4">
            <h1 className="text-2xl px-7 capitalize">
              Total Department is <b>{department.length}.</b>
            </h1>
            <Link to={"/departments"}>
              <button className="buttonColor px-5 py-4 pb-5 rounded-[10px] text-white text-xl font-inter font-medium leading-[17px] text-center">
                See All...
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardAdminData;
