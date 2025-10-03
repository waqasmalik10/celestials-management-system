import Pagination from "../../../ui/Pagination";
import AddEmployeesModal from "./AddEmployeesModal";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { EmployeeContext } from "./store/employeeContext";
import profileImg from "../../../images/profileimg.jpg";
import searchImg from "../../../images/search.svg";
import DepartmentDeleteModal from "../Departments/DepartmentDeleteModal";

interface EmployeeBodyProps {
  pageTitle?: string;
}

interface Employee {
  uniqueId: string;
  image: string;
  name: string;
  employeeId: string | number;
  mySelectField?: string;
  email?: string,
  password?: string | number;
  date?: string | number | Date;
  employeeInformation?: string;
}

export default function EmployeeBody(props: EmployeeBodyProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);

  const context = useContext(EmployeeContext);
  if (!context) {
    throw new Error("Error");
  }
  const {
    employee,
    employeeLoader,
    addEmployee,
    openEmployeeModal,
    closeEmployeeModal,
    successfulAdded,
    addNewEmployee,
    editEmployeeData,
    updateEmployee,
    handleDelete,
    editingEmployee,
    error,
    clearError,
    searchInputText,
    handleChangeSearch,
    deletingEmployee,
    addDeleteModalTitle,
    deleteEmployee,
    closeDeleteModal
  } = context;

  const employeeLastPage = currentPage * postsPerPage;
  const employeeFirstPage = employeeLastPage - postsPerPage;
  const search = () => {
    return employee.filter((emp) =>
      emp?.name?.toLowerCase().includes(searchInputText.toLowerCase())
    );
  };
  const currentEmployees = employee.slice(employeeFirstPage, employeeLastPage);

  const displayEmployees = searchInputText ? search() : currentEmployees;

  console.log("AllEmployee", employee);

  return (
    <>
      <div className="mt-[50px] pb-10">
        <div className="flex items-center justify-between mb-[53px]">
          <h1 className="font-popins text-left text-4xl font-semibold text-white">
            {props.pageTitle}
          </h1>
          <button
            onClick={openEmployeeModal}
            className="px-3 py-2.5 w-[100px] h-[38px] bg-[#283573] dark:bg-[#242424] rounded-[10px] text-sm font-inter font-medium leading-[17px] text-white"
          >
            Add
          </button>
        </div>
        {addEmployee && (
          <AddEmployeesModal
            closeButton={closeEmployeeModal}
            successfullyAdd={successfulAdded}
            addEmployee={addNewEmployee}
            updateEmployee={updateEmployee}
            initialEmployee={editingEmployee}
            isEditing={editingEmployee !== null}
            errorId={error}
            clearError={clearError}
          />
        )}
        <div className="bg-[#283573] dark:bg-[#414141] w-full max-w-[460px] h-14 rounded-[6px] p-2 flex items-center mb-6 ml-auto">
          <button
            onClick={() => search()}
            className="w-10 h-10 bg-transparent outline-none border-none"
          >
            <img src={searchImg} alt="search" className="w-full h-full" />
          </button>
          <input
            type="text"
            value={searchInputText}
            onChange={handleChangeSearch}
            placeholder="Search here..."
            className="w-full h-full border-none bg-transparent text-white text-sm font-roboto ml-2.5 focus:outline-none"
          />
          <button
            onClick={() => search()}
            className="buttonColor px-5 py-2.5 rounded-[10px] text-white text-sm font-inter font-medium leading-[17px] text-center"
          >
            Search
          </button>
        </div>
        <div className="overflow-x-auto border border-solid border-transparent overflow-y-hidden rounded-[15px]">
          <table className="w-full border-collapse min-w-[656px] employeeTable bg-[#1E2C6D] dark:bg-[#383838] ">
            <thead className="buttonColor h-[76px] text-xl font-medium text-white font-poppins">
              <tr>
                <th className="w-[10%] px-3"></th>
                <th className="w-[22.5%] px-3 text-left">Employee Name</th>
                <th className="w-[22.5%] px-3 text-left">Employee Id</th>
                <th className="w-[22.5%] px-3 text-center">Action</th>
                <th className="w-[22.5%] px-3 text-center">Details Page</th>
              </tr>
            </thead>
            <tbody>
              {displayEmployees.map((emp: Employee, index: number) => (
                <tr
                  key={emp.uniqueId}
                  className="bg-[#1E2C6D] dark:bg-[#383838]  border-t-[13px] border-[#464980] dark:border-black h-[97px]"
                >
                  <td className="px-3 py-3.5 w-[10%]">
                    <div className="linerGradientBackgroundModal w-[50px] h-[50px] text-center flex pt-2.5 justify-center items-center rounded-[15px] p-2 font-poppins text-lg font-semibold text-white">
                      #{(currentPage - 1) * postsPerPage + index + 1}
                    </div>
                  </td>
                  <td className="text-lg px-3 text-white font-medium font-poppins capitalize w-[22.5%] text-left ">
                    <div className="flex w-full gap-1 items-center">
                      <img
                        src={emp.image ? emp.image : profileImg}
                        alt={emp.name}
                        className="w-10 h-10 rounded mr-2 inline-block"
                      />
                      {emp.name}
                    </div>
                  </td>
                  <td className="text-lg px-3 text-white font-medium font-poppins capitalize w-[22.5%] text-left">
                    {emp.employeeId}
                  </td>
                  <td className="w-[22.5%]">
                    <div className="flex px-3 gap-2 w-full justify-center items-center flex-wrap gap-2 w-full h-full py-2">
                      <button
                        className="buttonColor px-5 py-2.5 rounded-[10px] text-white text-sm font-inter font-medium leading-[17px] text-center"
                        onClick={() => editEmployeeData(emp)}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deletingEmployee(emp)}
                        className="px-3 py-2.5 w-[100px] h-[38px] bg-[#283573] dark:bg-[#242424] rounded-[10px] text-sm font-inter font-medium leading-[17px] text-white"
                      >
                        Delete
                      </button>
                      {addDeleteModalTitle &&
                        deleteEmployee?.uniqueId === emp.uniqueId && (
                          <DepartmentDeleteModal
                            handlingDelete={() => handleDelete(deleteEmployee)}
                            closeButton={closeDeleteModal}
                            departmentTitle={deleteEmployee.name}
                          />
                        )}
                    </div>
                  </td>
                  <td className="w-[22.5%]">
                    <Link to={`/employee/details/${emp.employeeId}`}>
                      <button className="buttonColor px-5 py-2.5 rounded-[10px] text-white text-sm font-inter font-medium leading-[17px] text-center flex mx-auto">
                        Details
                      </button>
                    </Link>
                  </td>
                </tr>
              ))}
              {employeeLoader && (
                <>
                  <tr className="employeeLoader border-t-[13px] border-[#464980]">
                    <td className="td-1">
                      <span></span>
                    </td>
                    <td className="td-2">
                      <span></span>
                    </td>
                    <td className="td-3">
                      <span></span>
                    </td>
                    <td className="td-4">
                      <span></span>
                    </td>
                    <td className="td-5">
                      <span></span>
                    </td>
                  </tr>
                  <tr className="employeeLoader border-t-[13px] border-[#464980]">
                    <td className="td-1">
                      <span></span>
                    </td>
                    <td className="td-2">
                      <span></span>
                    </td>
                    <td className="td-3">
                      <span></span>
                    </td>
                    <td className="td-4">
                      <span></span>
                    </td>
                    <td className="td-5">
                      <span></span>
                    </td>
                  </tr>
                  <tr className="employeeLoader border-t-[13px] border-[#464980]">
                    <td className="td-1">
                      <span></span>
                    </td>
                    <td className="td-2">
                      <span></span>
                    </td>
                    <td className="td-3">
                      <span></span>
                    </td>
                    <td className="td-4">
                      <span></span>
                    </td>
                    <td className="td-5">
                      <span></span>
                    </td>
                  </tr>
                  <tr className="employeeLoader border-t-[13px] border-[#464980]">
                    <td className="td-1">
                      <span></span>
                    </td>
                    <td className="td-2">
                      <span></span>
                    </td>
                    <td className="td-3">
                      <span></span>
                    </td>
                    <td className="td-4">
                      <span></span>
                    </td>
                    <td className="td-5">
                      <span></span>
                    </td>
                  </tr>
                  <tr className="employeeLoader border-t-[13px] border-[#464980]">
                    <td className="td-1">
                      <span></span>
                    </td>
                    <td className="td-2">
                      <span></span>
                    </td>
                    <td className="td-3">
                      <span></span>
                    </td>
                    <td className="td-4">
                      <span></span>
                    </td>
                    <td className="td-5">
                      <span></span>
                    </td>
                  </tr>
                </>
              )}
            </tbody>
          </table>
        </div>
        {searchInputText === "" && (
          <div className="flex justify-between mt-5 items-center">
            <p className="text-lg font-medium font-poppins text-white">
              Showing {`${employeeFirstPage + 1} to ${employeeLastPage} `} from{" "}
              {employee.length}
            </p>
            {employee.length > 10 && (
              <Pagination
                postsPerPage={postsPerPage}
                totalPosts={employee.length}
                currentPageSet={setCurrentPage}
                currentPage={currentPage}
              />
            )}
          </div>
        )}
      </div>
    </>
  );
}
