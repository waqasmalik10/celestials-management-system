import { createContext, useState, useEffect, ReactNode } from "react";
import { getAllEmployeesData, singlEmployeeDetails } from "../api/employee";

interface Employee {
  uniqueId: string;
  image: string;
  email?: string;
  password?: string | number;
  name: string;
  employeeId: string | number;
  mySelectField?: string;
  date?: string | number | Date;
  employeeInformation?: string;
}

interface EmployeeContextType {
  employee: Employee[];
  employeeLoader: boolean;
  addEmployee: boolean;
  addDeleteModalTitle: boolean;
  openEmployeeModal: () => void;
  closeEmployeeModal: () => void;
  handleChangeSearch: (event: { target: { value: string } }) => void;
  successfulAdded: () => void;
  addNewEmployee: (emp: Employee) => boolean;
  editEmployeeData: (emp: Employee) => void;
  updateEmployee: (emp: Employee) => void;
  deletingEmployee: (emp: Employee) => void;
  handleDelete: (emp: Employee) => void;
  editingEmployee: Employee | null;
  detailEmployee: Employee | null;
  error: string;
  searchInputText: string;
  deleteEmployee: Employee | null;
  clearError: () => void;
  fetchEmployeeDetails: (id: string) => Promise<void>;
  closeDeleteModal: () => void;
}

export const EmployeeContext = createContext<EmployeeContextType | null>(null);

export const EmployeeContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [employee, setEmployee] = useState<Employee[]>([]);
  const [detailEmployee, setDetailEmployee] = useState<Employee | null>(null);
  const [addEmployee, setAddEmployee] = useState<boolean>(false);
  const [addDeleteModalTitle, setAddDeleteModalTitle] =
    useState<boolean>(false);
  const [deleteEmployee, setDeleteEmployee] = useState<Employee | null>(null);
  const [error, setError] = useState("");
  const [searchInputText, setSearchInputText] = useState("");
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  const [employeeLoader, setEmployeeLoader] = useState(false);

  useEffect(() => {
    const fetchEmployees = async () => {
      setEmployeeLoader(true);
      const { ok, data } = await getAllEmployeesData();
      if (ok && data.success) {
        const employees: Employee[] = data.users.map((user: any) => ({
          uniqueId: user.id.toString(),
          image: user.image,
          email: user.email,
          password: user.password,
          name: `${user.firstName} ${user.lastName}`.trim(),
          date: user.birthDate,
          employeeId: user.id,
          mySelectField: user.company?.department || "",
          employeeInformation: user.company?.title || "",
        }));
        setEmployee(employees);
        setEmployeeLoader(false);
      }
    };
    fetchEmployees();
  }, []);

  const openEmployeeModal = () => {
    window.scrollTo(0, 0);
    setAddEmployee(true);
    document.body.style.overflow = "hidden";
  };
  const closeEmployeeModal = () => {
    setAddEmployee(false);
    setEditingEmployee(null);
    document.body.style.overflow = "auto";
    window.scrollTo(0, 0);
  };

  const successfulAdded = () => {
    if (error === "") {
      setAddEmployee(false);
    }
  };

  const isDuplicateId = (id: string | number) => {
    return employee.some((employee) => employee.employeeId === id);
  };

  const addNewEmployee = (employee: Employee): boolean => {
    if (isDuplicateId(employee.employeeId)) {
      setError("Employee ID already exists. Please use a unique ID.");
      return false;
    } else {
      setEmployee((prev) => [...prev, employee]);
      setError("");
      document.body.style.overflow = "auto";
      window.scrollTo(0, 0);
      return true;
    }
  };

  const editEmployeeData = (employee: Employee) => {
    setEditingEmployee(employee);
    setAddEmployee(true);
    document.body.style.overflow = "hidden";
    window.scrollTo(0, 0);
  };

  const updateEmployee = (updatedEmployee: Employee) => {
    if (
      isDuplicateId(updatedEmployee.employeeId) &&
      updatedEmployee.employeeId !== editingEmployee?.employeeId
    ) {
      setError("Employee ID already exists. Please use a unique ID.");
      setAddEmployee(true);
      return;
    }
    setEmployee((prev) =>
      prev.map((emp) =>
        emp.uniqueId === updatedEmployee.uniqueId ? updatedEmployee : emp
      )
    );
    setEditingEmployee(null);
    setAddEmployee(false);
    document.body.style.overflow = "auto";
    window.scrollTo(0, 0);
    setError("");
  };

  const deletingEmployee = (employee: Employee) => {
    setDeleteEmployee(employee);
    setAddDeleteModalTitle(true);
    document.body.style.overflow = "hidden";
    window.scrollTo(0, 0);
  };

  const handleDelete = (deleteEmployee: Employee) => {
    const updatedEmployees = employee.filter(
      (e) => e.uniqueId !== deleteEmployee.uniqueId
    );
    setEmployee(updatedEmployees);
    setEditingEmployee(null);
    setAddEmployee(false);
    document.body.style.overflow = "auto";
    window.scrollTo(0, 0);
  };

  const clearError = () => setError("");

  const closeDeleteModal = () => {
    setAddDeleteModalTitle(false);
    setDeleteEmployee(null);
    window.scrollTo(0, 0);
    document.body.style.overflow = "auto";
  };


  const fetchEmployeeDetails = async (id: string) => {
    setEmployeeLoader(true);
    const { ok, data } = await singlEmployeeDetails(id);
    if (ok && data.success) {
      setDetailEmployee({
        uniqueId: data.user.id,
        image: data.user.image,
        email: data.user.email,
        password: data.user.password,
        name: `${data.user.firstName} ${data.user.lastName}`.trim(),
        employeeId: data.user.id,
        date: data.user.birthDate,
        mySelectField: data.user.company?.department || "",
        employeeInformation: data.user.company?.title || "",
      });
      console.log(detailEmployee);
      setEmployeeLoader(false);
    }
  };

  const handleChangeSearch = (event: { target: { value: string } }) => {
    setSearchInputText(event.target.value);
  };

  return (
    <EmployeeContext.Provider
      value={{
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
        detailEmployee,
        fetchEmployeeDetails,
        searchInputText,
        handleChangeSearch,
        deletingEmployee,
        addDeleteModalTitle,
        deleteEmployee,
        closeDeleteModal
      }}
    >
      {children}
    </EmployeeContext.Provider>
  );
};
