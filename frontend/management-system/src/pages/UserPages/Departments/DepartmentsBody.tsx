import { useContext } from "react";
import { DepartmentContext } from "./store/DepartmentContext";
import DepartmentImage from "../../../images/departmentImg.svg";
import { EmployeeContext } from "../Employee/store/employeeContext";
import AddDepartmentsModal from "./AddDepartmentsModal";
import { Link } from "react-router-dom";
import DepartmentDeleteModal from "./DepartmentDeleteModal";
import searchImg from "../../../images/search.svg";

interface Department {
  uniqueId: string;
  title: string;
  head?: string;
  email?: string;
}

interface DepartmentsBodyProps {
  pageTitle?: string;
}

export default function DepartmentsBody(props: DepartmentsBodyProps) {
  const departmentContext = useContext(DepartmentContext);
  const employeeContext = useContext(EmployeeContext);
  if (!departmentContext) {
    throw new Error(
      "DepartmentContext must be used within a DepartmentContextProvider"
    );
  }
  if (!employeeContext) {
    throw new Error("error");
  }
  const {
    department,
    successfulAdded,
    addDepartment,
    openDepartmentModal,
    closeDepartmentModal,
    error,
    clearError,
    handleDelete,
    addNewDepartment,
    editDepartmentData,
    editingDepartment,
    updateDepartment,
    departmentLoader,
    deletingDepartment,
    addDeleteModalTitle,
    deleteDepartment,
    closeDeleteModal,
    searchInputText,
    handleChangeSearch,
  } = departmentContext;
  const { employee } = employeeContext;

  const allDepartments = [...department].reverse();

  const currentDepartments = allDepartments.slice(0, 10);

  const search = () => {
    return allDepartments.filter((dep) =>
      dep?.title?.toLowerCase().includes(searchInputText.toLowerCase())
    );
  };

  const displaycCurrentDepartments = searchInputText
    ? search()
    : currentDepartments;

  return (
    <div className="mt-[50px] pb-10">
      <div className="flex items-center justify-between mb-[53px]">
        <h1 className="font-popins text-left text-4xl font-semibold text-white">
          {props.pageTitle}
        </h1>
        <button
          className="buttonColor px-7 py-4 rounded-[10px] text-white text-lg font-inter font-medium leading-[17px] text-center"
          onClick={openDepartmentModal}
        >
          Add Department
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
      <div className="bg-[#283573] dark:bg-[#414141] w-full max-w-[460px] h-14 rounded-[6px] p-2 flex items-center mb-10 ml-auto">
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
      <div className="flex flex-wrap lg:gap-5 gap-4">
        {departmentLoader ? (
          <>
            <div className="departmentLoader w-full max-w-full sm:max-w-[268px] 2xl:max-w-[350px] relative min-h-[372px] max-h-[372px] p-4">
              <div className="w-full h-[200px] rounded-[10px] object-cover departmentLoaderChildren"></div>
              <div className="departmentLoaderChildren2 mt-6"></div>
              <div className="departmentLoaderChildren2 mt-6"></div>
            </div>
            <div className="departmentLoader w-full max-w-full sm:max-w-[268px] 2xl:max-w-[350px] relative min-h-[372px] max-h-[372px] p-4">
              <div className="w-full h-[200px] rounded-[10px] object-cover departmentLoaderChildren"></div>
              <div className="departmentLoaderChildren2 mt-6"></div>
              <div className="departmentLoaderChildren2 mt-6"></div>
            </div>
            <div className="departmentLoader w-full max-w-full sm:max-w-[268px] 2xl:max-w-[350px] relative min-h-[372px] max-h-[372px] p-4">
              <div className="w-full h-[200px] rounded-[10px] object-cover departmentLoaderChildren"></div>
              <div className="departmentLoaderChildren2 mt-6"></div>
              <div className="departmentLoaderChildren2 mt-6"></div>
            </div>
            <div className="departmentLoader w-full max-w-full sm:max-w-[268px] 2xl:max-w-[350px] relative min-h-[372px] max-h-[372px] p-4">
              <div className="w-full h-[200px] rounded-[10px] object-cover departmentLoaderChildren"></div>
              <div className="departmentLoaderChildren2 mt-6"></div>
              <div className="departmentLoaderChildren2 mt-6"></div>
            </div>
            <div className="departmentLoader w-full max-w-full sm:max-w-[268px] 2xl:max-w-[350px] relative min-h-[372px] max-h-[372px] p-4">
              <div className="w-full h-[200px] rounded-[10px] object-cover departmentLoaderChildren"></div>
              <div className="departmentLoaderChildren2 mt-6"></div>
              <div className="departmentLoaderChildren2 mt-6"></div>
            </div>
            <div className="departmentLoader w-full max-w-full sm:max-w-[268px] 2xl:max-w-[350px] relative min-h-[372px] max-h-[372px] p-4">
              <div className="w-full h-[200px] rounded-[10px] object-cover departmentLoaderChildren"></div>
              <div className="departmentLoaderChildren2 mt-6"></div>
              <div className="departmentLoaderChildren2 mt-6"></div>
            </div>
            <div className="departmentLoader w-full max-w-full sm:max-w-[268px] 2xl:max-w-[350px] relative min-h-[372px] max-h-[372px] p-4">
              <div className="w-full h-[200px] rounded-[10px] object-cover departmentLoaderChildren"></div>
              <div className="departmentLoaderChildren2 mt-6"></div>
              <div className="departmentLoaderChildren2 mt-6"></div>
            </div>
          </>
        ) : (
          displaycCurrentDepartments.map((dep: Department, index: number) => {
            const employeeImages =
              dep.title === "Kiwi"
                ? employee
                    .filter((emp) => emp.mySelectField === "Human Resources")
                    .slice(0, 3)
                    .map((emp, index: number) => (
                      <img
                        key={index}
                        src={emp.image}
                        alt={emp.name}
                        className="w-10 h-10 rounded-full"
                      />
                    ))
                : null;

            console.log(employeeImages?.length);

            const hasMoreThanThree =
              employeeImages && employeeImages.length > 3;
            return (
              <>
                <div
                  key={dep.uniqueId}
                  className="w-full max-w-full sm:max-w-[268px] 2xl:max-w-[350px] relative min-h-[372px] max-h-[372px]"
                >
                  <div className="p-4 bg-[#525593] dark:!bg-[#2e2e2e] w-full rounded-[10px] h-full">
                    <div className="relative">
                      <img
                        src={DepartmentImage}
                        alt="Department"
                        className="w-full h-[200px] rounded-[10px] object-cover"
                      />
                      <div className="flex absolute -bottom-[15px]">
                        {employeeImages}
                        {hasMoreThanThree && (
                          <div className="w-10 h-10 bg-[#525593] text-white flex items-center justify-center px-1 py-1 rounded-full">
                            ...
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="linerGradientBackgroundModal absolute -top-[21px] -left-1.5 -rotate-[20deg] w-[50px] h-[50px] text-center flex pt-2.5 justify-center items-center rounded-[15px] p-2 font-poppins text-lg font-semibold text-white">
                      #{index + 1}
                    </div>
                    <div className="mt-6 flex gap-2 items-center justify-between">
                      <h3 className="text-white text-2xl line-clamp-2 w-[60%]">
                        {dep.title}
                      </h3>
                      <button
                        onClick={() => editDepartmentData(dep)}
                        className="linerGradientBackgroundModal w-[50px] h-[50px] text-center flex pt-2.5 justify-center items-center rounded-[15px] p-2 font-poppins text-lg font-semibold text-white"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          className="w-7 h-7"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                          />
                        </svg>
                      </button>
                    </div>
                    <Link to={`/departments/details/${dep.uniqueId}`}>
                      <button className="w-[calc(100%-32px)] linerGradientBackgroundModal px-2 py-3 text-white text-lg mt-2 rounded-[10px] absolute bottom-4 left-4">
                        Details
                      </button>
                    </Link>
                  </div>
                  <button
                    onClick={() => deletingDepartment(dep)}
                    className="linerGradientBackgroundModal absolute -top-[21px] -right-1.5  w-[50px] h-[50px] text-center flex pt-2.5 justify-center items-center rounded-[15px] p-2 font-poppins text-lg font-semibold text-white"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      className=""
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                      />
                    </svg>
                  </button>
                </div>
                {addDeleteModalTitle &&
                  deleteDepartment?.uniqueId === dep.uniqueId && (
                    <DepartmentDeleteModal
                      handlingDelete={() => handleDelete(deleteDepartment)}
                      closeButton={closeDeleteModal}
                      departmentTitle={deleteDepartment.title}
                    />
                  )}
              </>
            );
          })
        )}
      </div>
    </div>
  );
}
