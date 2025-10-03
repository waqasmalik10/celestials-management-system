import { Link, useParams } from "react-router-dom";
import { useContext, useEffect } from "react";
import { DepartmentContext } from "../store/DepartmentContext";
import { EmployeeContext } from "../../Employee/store/employeeContext";
import Back from "../../../../images/back.svg";
import AddDepartmentsModal from "../AddDepartmentsModal";
import { useNavigate } from "react-router-dom";
import profileImg from "../../../../images/profileimg.jpg";
import AddEmployeesModal from "../../Employee/AddEmployeesModal";
import searchImg from "../../../../images/search.svg";
import DepartmentDeleteModal from "../DepartmentDeleteModal";

const DepartmentDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const context = useContext(DepartmentContext);
  const employeeContext = useContext(EmployeeContext);
  if (!context) {
    throw new Error("Error");
  }
  if (!employeeContext) {
    throw new Error("error");
  }
  const {
    fetchDepartmentDetails,
    detailDepartment,
    successfulAdded,
    addDepartment,
    closeDepartmentModal,
    error,
    clearError,
    addNewDepartment,
    editDepartmentData,
    editingDepartment,
    updateDepartment,
    departmentLoader,
  } = context;

  const {
    employee,
    employeeLoader,
    addEmployee,
    openEmployeeModal,
    closeEmployeeModal,
    successfulAdded: successfulAddedEmployee,
    addNewEmployee,
    editEmployeeData,
    handleDelete,
    updateEmployee,
    editingEmployee,
    error: errorEmployee,
    clearError: clearErrorEmployee,
    searchInputText,
    handleChangeSearch,
    deletingEmployee,
    addDeleteModalTitle,
    deleteEmployee,
    closeDeleteModal
  } = employeeContext;

  useEffect(() => {
    if (id) {
      fetchDepartmentDetails(id);
    }
  }, [id]);

  const back = () => {
    navigate(-1);
  };
  const handleContact = () => {
    const recipient = detailDepartment?.email || "";
    const subject = "Contact Department Head";
    const body = "Hello,";
    const mailtoLink = `mailto:${recipient}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink;
  };

  const currentDepartmentEmployees = employee.filter(
    (emp) =>
      emp.mySelectField === detailDepartment?.title ||
      emp.mySelectField === "Human Resources"
  );

  const search = () => {
    return currentDepartmentEmployees.filter((emp) =>
      emp?.name?.toLowerCase().includes(searchInputText.toLowerCase())
    );
  };

  const displayDepartmentEmploees = searchInputText
    ? search()
    : currentDepartmentEmployees;

  return (
    <>
      <div className="mt-[50px] mb-[53px]">
        <button onClick={back}>
          <img src={Back} alt="back" />
        </button>
        <div className="flex justify-between items-center my-5">
          <h2 className="text-white font-popins text-left text-4xl font-semibold">
            Department Details
          </h2>
          <button
            className="buttonColor px-7 py-4 rounded-[10px] text-white text-lg font-inter font-medium leading-[17px] text-center"
            onClick={() =>
              detailDepartment && editDepartmentData(detailDepartment)
            }
          >
            Edit
          </button>
        </div>
        {addDepartment && (
          <AddDepartmentsModal
            closeButton={closeDepartmentModal}
            successfullyAdd={successfulAdded}
            addDepartment={addNewDepartment}
            errorId={error}
            clearError={clearError}
            initialDepartment={editingDepartment}
            isEditing={editingDepartment !== null}
            updateDepartment={updateDepartment}
          />
        )}
        {departmentLoader ? (
          <>
            <div className="flex flex-col w-full gap-5">
              <div className="loader w-full !h-30"></div>
              <div className="loader w-full !h-30"></div>
              <div className="loader w-full !h-30"></div>
              <div className="loader w-full !h-30"></div>
              <div className="loader w-full !h-30"></div>
              <div className="loader w-full !h-30"></div>
              <div className="loader w-full !h-30"></div>
              <div className="loader w-full !h-30"></div>
              <div className="loader w-full !h-30"></div>
              <div className="loader w-full !h-30"></div>
            </div>
          </>
        ) : (
          detailDepartment && (
            <>
              <div className="flex flex-col gap-5">
                <div className="text-white mb-3">
                  <p className="w-full p-7 bg-[#1E2C6D] dark:bg-[#383838]  text-3xl">
                    Department Name:
                  </p>
                  <h1 className="text-2xl mt-4 px-7 capitalize">
                    {detailDepartment.title}
                  </h1>
                </div>
                <div className="text-white mb-3">
                  <p className="w-full p-7 bg-[#1E2C6D] dark:bg-[#383838]  text-3xl">
                    Department Head:
                  </p>
                  <h1 className="text-2xl mt-4 px-7 capitalize">
                    {detailDepartment.head}
                  </h1>
                </div>
                <div className="text-white mb-3">
                  <p className="w-full p-7 bg-[#1E2C6D] dark:bg-[#383838]  text-3xl">
                    Head Email:
                  </p>
                  <div className="flex mt-4 items-center justify-between">
                    <h1 className="text-2xl mt-4 px-7">
                      {detailDepartment.email}
                    </h1>
                    <button
                      onClick={handleContact}
                      className="px-3 py-2.5 w-[200px] h-12 bg-[#283573] dark:bg-[#242424] rounded-[10px] text-lg pt-3.5 font-inter font-medium leading-[17px] text-white"
                    >
                      Contact
                    </button>
                  </div>
                </div>
              </div>
              {addEmployee && (
                <AddEmployeesModal
                  closeButton={closeEmployeeModal}
                  successfullyAdd={successfulAddedEmployee}
                  addEmployee={addNewEmployee}
                  updateEmployee={updateEmployee}
                  initialEmployee={editingEmployee}
                  isEditing={editingEmployee !== null}
                  errorId={errorEmployee}
                  clearError={clearErrorEmployee}
                  departmentValue="Human Resources"
                  disable={true}
                />
              )}

              <div>
                <div className="flex justify-between items-center mt-10">
                  <h2 className="text-white font-popins text-left text-4xl font-semibold">
                    Department Employees
                  </h2>
                  <div className="flex gap-5 items-center">
                    <div className="bg-[#283573] w-full max-w-[460px] h-14 rounded-[6px] p-2 flex items-center ml-auto">
                      <button
                        onClick={() => search()}
                        className="w-10 h-10 bg-transparent outline-none border-none"
                      >
                        <img
                          src={searchImg}
                          alt="search"
                          className="w-full h-full"
                        />
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
                    <button
                      onClick={openEmployeeModal}
                      className="px-3 py-2.5 w-[200px] h-12 bg-[#283573] dark:bg-[#242424] rounded-[10px] text-lg pt-3.5 font-inter font-medium leading-[17px] text-white"
                    >
                      Add
                    </button>
                  </div>
                </div>
                <div className="overflow-x-auto border border-solid border-transparent overflow-y-hidden rounded-[15px] mt-5">
                  <table className="w-full border-collapse min-w-[656px] employeeTable bg-[#1E2C6D] dark:bg-[#383838] ">
                    <thead className="buttonColor h-[76px] text-xl font-medium text-white font-poppins">
                      <tr>
                        <th className="w-[10%] px-3"></th>
                        <th className="w-[22.5%] px-3 text-left">
                          Employee Name
                        </th>
                        <th className="w-[22.5%] px-3 text-left">
                          Employee Id
                        </th>
                        <th className="w-[22.5%] px-3 text-center">Action</th>
                        <th className="w-[22.5%] px-3 text-center">
                          Details Page
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {employeeLoader ? (
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
                      ) : (
                        displayDepartmentEmploees.map((emp, index: number) => (
                          <tr
                            key={emp.uniqueId}
                            className="bg-[#1E2C6D] dark:bg-[#383838]  border-t-[13px] border-[#464980] dark:border-black h-[97px]"
                          >
                            <td className="px-3 py-3.5 w-[10%]">
                              <div className="linerGradientBackgroundModal w-[50px] h-[50px] text-center flex pt-2.5 justify-center items-center rounded-[15px] p-2 font-poppins text-lg font-semibold text-white">
                                #{index + 1}
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
                                      handlingDelete={() =>
                                        handleDelete(deleteEmployee)
                                      }
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
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )
        )}
      </div>
    </>
  );
};

export default DepartmentDetailsPage;
