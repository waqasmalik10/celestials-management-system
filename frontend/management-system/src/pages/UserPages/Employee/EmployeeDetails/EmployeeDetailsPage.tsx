import { useContext, useEffect} from "react";
import { useParams } from "react-router-dom";
import { EmployeeContext } from "../store/employeeContext";
import Back from "../../../../images/back.svg"
import AddEmployeesModal from "../AddEmployeesModal";
import { useNavigate } from "react-router-dom";


export default function EmployeeDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate()

  const context = useContext(EmployeeContext);
  if (!context) {
    throw new Error("Error");
  }
  const {
    detailEmployee,
    fetchEmployeeDetails,
    employeeLoader,
    addEmployee,
    closeEmployeeModal,
    successfulAdded,
    addNewEmployee,
    editEmployeeData,
    updateEmployee,
    editingEmployee,
    error,
    clearError,
  } = context;

  useEffect(() => {
    if (id) {
      fetchEmployeeDetails(id);
    }
  }, [id]);

  const back = () => {
    navigate(-1)
  }

  return (
    <>
    <div className="mt-[50px] mb-[53px]">
     <button onClick={back}>
        <img src={Back} alt="back" />
      </button>
      <div className="flex justify-between items-center my-5">
        <h2 className="text-white font-popins text-left text-4xl font-semibold">
          Employee Details
        </h2>
        <button
          className="buttonColor px-7 py-4 rounded-[10px] text-white text-lg font-inter font-medium leading-[17px] text-center"
          onClick={() => detailEmployee && editEmployeeData(detailEmployee)}
        >
          Edit
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
      {employeeLoader ? (
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
      ) : (
        detailEmployee && (
          <div className="text-white flex flex-col gap-5">
            <div className="w-[200px] h-[200px]">
              <img
                src={detailEmployee.image}
                alt={detailEmployee.name}
                className="object-cover w-full h-full"
              />
            </div>
            <div className="text-white mb-3">
              <p className="w-full p-7 bg-[#1E2C6D] dark:bg-[#383838]  text-3xl">Name:</p>
              <h1 className="text-2xl mt-4 px-7">{detailEmployee.name}</h1>
            </div>
            <div className="text-white mb-3">
              <p className="w-full p-7 bg-[#1E2C6D] dark:bg-[#383838]  text-3xl">Employee Email:</p>
              <p className="text-2xl mt-4 px-7">{detailEmployee.email}</p>
            </div>
            <div className="text-white mb-3">
              <p className="w-full p-7 bg-[#1E2C6D] dark:bg-[#383838]  text-3xl">Employee Password:</p>
              <p className="text-2xl mt-4 px-7">{detailEmployee.password}</p>
            </div>
            <div className="text-white mb-3">
              <p className="w-full p-7 bg-[#1E2C6D] dark:bg-[#383838]  text-3xl">Employee ID:</p>
              <p className="text-2xl mt-4 px-7">{detailEmployee.employeeId}</p>
            </div>
            <div className="text-white mb-3">
              <p className="w-full p-7 bg-[#1E2C6D] dark:bg-[#383838]  text-3xl">
                Employee Department:
              </p>
              <p className="text-2xl mt-4 px-7">{detailEmployee.mySelectField}</p>
            </div>
            <div className="text-white mb-3">
              <p className="w-full p-7 bg-[#1E2C6D] dark:bg-[#383838]  text-3xl">
                Employee Experience:
              </p>
              <p className="text-2xl mt-4 px-7">{detailEmployee.date ? `${new Date(detailEmployee.date).getFullYear()} - ${new Date().getFullYear()}` : null}</p>
            </div>
            <div className="text-white mb-3">
              <p className="w-full p-7 bg-[#1E2C6D] dark:bg-[#383838]  text-3xl">
                About Employee:
              </p>
              <p className="text-2xl mt-4 px-7">
                {detailEmployee.employeeInformation}
              </p>
            </div>
          </div>
        )
      )}
      </div>
    </>
  );
}
