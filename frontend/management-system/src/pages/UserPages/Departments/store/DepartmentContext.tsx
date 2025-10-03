import { createContext, useState, useEffect, ReactNode } from "react";

import { getAllDepartments, singlDepartmentDetails } from "../api/department";

interface Department {
  uniqueId: string;
  title: string;
  head?: string;
  email?: string;
}

interface DepartmentContextType {
  department: Department[];
  addDepartment: boolean;
  addDeleteModalTitle: boolean;
  openDepartmentModal: () => void;
  closeDepartmentModal: () => void;
  handleChangeSearch: (event: { target: { value: string; }; }) => void;
  successfulAdded: () => void;
  error: string;
  searchInputText: string;
  addNewDepartment: (department: Department) => boolean;
  handleDelete: (dep: Department) => void;
  clearError: () => void;
  departmentLoader: boolean;
  detailDepartment: Department | null;
  fetchDepartmentDetails: (id: string) => Promise<void>;
  editDepartmentData: (dep: Department) => void;
  deletingDepartment: (dep: Department) => void;
  updateDepartment: (dep: Department) => void;
  editingDepartment: Department | null;
  deleteDepartment: Department | null;
  closeDeleteModal: () => void;
}

export const DepartmentContext = createContext<DepartmentContextType | null>(
  null
);

export const DepartmentContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [department, setDepartment] = useState<Department[]>([]);
  const [detailDepartment, setDetailDepartment] = useState<Department | null>(
    null
  );
  const [addDepartment, setAddDepartment] = useState<boolean>(false);
  const [addDeleteModalTitle, setAddDeleteModalTitle] =
    useState<boolean>(false);
  const [editingDepartment, setEditingDepartment] = useState<Department | null>(
    null
  );
  const [deleteDepartment, setDeleteDepartment] = useState<Department | null>(
    null
  );
  const [departmentLoader, setdepartmentLoader] = useState(false);
  const [error, setError] = useState("");
  const [searchInputText, setSearchInputText] = useState("");

  useEffect(() => {
    const fetchAllDepartments = async () => {
      setdepartmentLoader(true);
      const { ok, data } = await getAllDepartments();
      if (ok && data.success) {
        const departments: Department[] = data.departments.map(
          (department: any) => ({
            uniqueId: department.id.toString(),
            title: department.title.trim(),
          })
        );
        setDepartment(departments);
        setdepartmentLoader(false);
      }
    };
    fetchAllDepartments();
  }, []);

  const openDepartmentModal = () => {
    setAddDepartment(true);
    document.body.style.overflow = "hidden";
    window.scrollTo(0, 0);
  };
  const closeDepartmentModal = () => {
    setAddDepartment(false);
    setEditingDepartment(null);
    document.body.style.overflow = "auto";
    window.scrollTo(0, 0);
  };

  const successfulAdded = () => {
    if (error === "") {
      setAddDepartment(false);
    }
  };

  const isDuplicateId = (name: string) => {
    return department.some((dep) => dep.title === name);
  };

  const deletingDepartment = (department: Department) => {
    setDeleteDepartment(department);
    setAddDeleteModalTitle(true);
    document.body.style.overflow = "hidden";
    window.scrollTo(0, 0);
  };

  const editDepartmentData = (department: Department) => {
    setEditingDepartment(department);
    setAddDepartment(true);
    document.body.style.overflow = "hidden";
    window.scrollTo(0, 0);
  };
  const updateDepartment = (updatedDepartment: Department) => {
    if (
      isDuplicateId(updatedDepartment.title) &&
      updatedDepartment.title !== editingDepartment?.title
    ) {
      setError("Department ID already exists. Please use a Department Title.");
      setAddDepartment(true);
      return;
    }
    setDepartment((prev) =>
      prev.map((dep) =>
        dep.uniqueId === updatedDepartment.uniqueId ? updatedDepartment : dep
      )
    );
    setEditingDepartment(null);
    setAddDepartment(false);
    document.body.style.overflow = "auto";
    window.scrollTo(0, 0);
    setError("");
  };

  const handleDelete = (deleteDepartment: Department) => {
    const updatedItems = department.filter(
      (d) => d.title !== deleteDepartment.title
    );
    setDepartment(updatedItems);
    setEditingDepartment(null);
    setAddDepartment(false);
    document.body.style.overflow = "auto";
    window.scrollTo(0, 0);
  };

  const addNewDepartment = (department: Department): boolean => {
    if (isDuplicateId(department.title)) {
      setError("Department already exists. Please use a unique Department.");
      return false;
    } else {
      setDepartment((prev) => [...prev, department]);
      setError("");
      window.scrollTo(0, 0);
      document.body.style.overflow = "auto";
      return true;
    }
  };

  const clearError = () => setError("");

  const closeDeleteModal = () => {
    setAddDeleteModalTitle(false);
    setDeleteDepartment(null);
    window.scrollTo(0, 0);
    document.body.style.overflow = "auto";
  };

  const fetchDepartmentDetails = async (id: string) => {
    setdepartmentLoader(true);
    const { ok, data } = await singlDepartmentDetails(id);
    if (ok && data.success) {
      const newDetailDepartment = {
        uniqueId: data.department.id,
        title: data.department.title,
        head: data.department.category,
        email: data.department.reviews[0]?.reviewerEmail,
      };
      setDetailDepartment(newDetailDepartment);
      setdepartmentLoader(false);
      console.log(newDetailDepartment);
    }
  };
  const handleChangeSearch = (event: { target: { value: string; }; }) => {
    setSearchInputText(event.target.value)
  }

  return (
    <DepartmentContext.Provider
      value={{
        department,
        successfulAdded,
        addDepartment,
        error,
        handleDelete,
        addNewDepartment,
        clearError,
        openDepartmentModal,
        closeDepartmentModal,
        fetchDepartmentDetails,
        detailDepartment,
        editDepartmentData,
        updateDepartment,
        editingDepartment,
        departmentLoader,
        deletingDepartment,
        addDeleteModalTitle,
        deleteDepartment,
        closeDeleteModal,
        searchInputText,
        handleChangeSearch
      }}
    >
      {children}
    </DepartmentContext.Provider>
  );
};
