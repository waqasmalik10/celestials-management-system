import ModalsInput from "../../ui/ModalsInput";
import Modal from "../../ui/Modal";
import * as Yup from "yup";
import { useFormik, FormikProvider } from "formik";
import { addingEmployee } from "./api/employee";
import closeIcon from "../../assets/images/closeIcon.svg";
import { useContext } from "react";
import { DepartmentContext } from "../../features/departments/store/DepartmentContext";
import { v4 as uuidv4 } from "uuid";
import { useEffect, useRef, useState } from "react";
import SelectField from "../../ui/SelectField";

interface Department {
  uniqueId: string;
  title: string;
}

interface Employee {
  uniqueId: string;
  image: string;
  name: string;
  employeeId: string | number;
  employeeInformation?: string;
  mySelectField?: string;
  email?: string;
  password?: string | number;
  date?: string | number | Date;
}

interface EmployeeModal {
  closeButton?: () => void;
  successfullyAdd?: () => void;
  addEmployee: (employee: Employee) => boolean;
  updateEmployee?: (employee: Employee) => void;
  initialEmployee?: Employee | null;
  isEditing?: boolean;
  errorId?: string;
  clearError: () => void;
  disable?: boolean;
  departmentValue?: string;
}

const formSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .email("Invalid Email address")
    .required("Email is required"),
  employeeId: Yup.number().required("ID is required"),
  mySelectField: Yup.string().required("Please select an option"),
  employeeInformation: Yup.string().required("Information is required"),
  password: Yup.string()
    .min(2, "Password must be 2 characters at minimum")
    .required("Password is required"),
  date: Yup.string().required("Date is required"),
});

export default function AddEmployeesModal({
  closeButton,
  successfullyAdd,
  addEmployee,
  updateEmployee,
  initialEmployee,
  isEditing,
  errorId,
  clearError,
  disable,
  departmentValue,
}: EmployeeModal) {
  const modalRef = useRef<HTMLDivElement>(null);
  const [file, setFile] = useState<string | null>(null);
  const departmentContext = useContext(DepartmentContext);

  const { department } = departmentContext || { department: [] };
  const allDepartments = [...department].reverse();

  function handleProfileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      const fileUrl = URL.createObjectURL(selectedFile);
      setFile(fileUrl);
      formik.setFieldValue("image", fileUrl);
    }
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        closeButton && closeButton();
      }
    };
    if (closeButton) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [addEmployee, closeButton]);

  const handleSubmit = async (values: {
    name: string;
    email: string;
    password: string | number;
    image: string;
    employeeId: number;
    mySelectField?: string;
    date: string | number | Date;
    employeeInformation?: string;
  }) => {
    if (isEditing && updateEmployee && initialEmployee) {
      const updatedEmployee = {
        ...initialEmployee,
        ...values,
      };
      updateEmployee(updatedEmployee);
      formik.resetForm();
      successfullyAdd && successfullyAdd();
    } else {
      const newEmployee = {
        uniqueId: uuidv4(),
        ...values,
      };
      const { ok, data } = await addingEmployee(
        newEmployee.name,
        newEmployee.image,
        newEmployee.email,
        newEmployee.password,
        newEmployee.date,
        newEmployee.employeeId,
        newEmployee.mySelectField,
        newEmployee.employeeInformation
      );
      console.log(newEmployee);
      if ((ok && data.success) || newEmployee) {
        const added = addEmployee(newEmployee);
        console.log(added);
        if (added) {
          formik.resetForm();
          setFile(null);
          successfullyAdd && successfullyAdd();
          console.log("Successfully Added", newEmployee);
        }
      }
    }
  };

  const formik = useFormik({
    initialValues: {
      name: initialEmployee?.name || "",
      email: initialEmployee?.email || "",
      password: initialEmployee?.password || "",
      date: initialEmployee?.date || "",
      image: initialEmployee?.image || "",
      employeeId: Number(initialEmployee?.employeeId),
      mySelectField: initialEmployee?.mySelectField || "",
      employeeInformation: initialEmployee?.employeeInformation || "",
    },
    validationSchema: formSchema,
    onSubmit: handleSubmit,
  });

  useEffect(() => {
    if (disable) {
      formik.setFieldValue("Department", departmentValue);
    }
  }, [disable, departmentValue]);

  const options = allDepartments.map((dep: Department) => ({
    value: dep.title,
    label: dep.title,
  }));

  const newOption = [
    { value: departmentValue || "", label: departmentValue || "" },
  ];

  return (
    <>
      <Modal
        ref={modalRef}
        modalMain="absolute w-full left-0 top-0 !bg-[#55589496] backdrop-blur-md"
        modalClassName="w-full h-fit max-h-[80vh] overflow-y-auto max-w-[800px] mx-auto p-5 absolute z-90"
      >
        <FormikProvider value={formik}>
          <form onSubmit={formik.handleSubmit} className="relative" noValidate>
            <button
              type="button"
              className="absolute -top-2.5 right-0 z-10"
              onClick={() => {
                closeButton && closeButton();
              }}
            >
              <img src={closeIcon} alt="close" />
            </button>
            <div className="flex flex-col gap-2.5">
              <ModalsInput
                label="Employee Image"
                type="file"
                id="file"
                name="file"
                placeholder=""
                onChange={handleProfileChange}
                labelClassName={undefined}
                inputClassName="font-inter"
              />
              {file && (
                <img
                  src={file}
                  alt="Uploaded preview"
                  className="mt-2 w-24 h-24 object-cover rounded-full"
                />
              )}
              <div className="relative">
                <ModalsInput
                  label="Employee Name"
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Name"
                  onChange={formik.handleChange}
                  value={formik.values.name}
                  labelClassName={undefined}
                  inputClassName={undefined}
                />
                {formik.errors.name && formik.touched.name && (
                  <p className="text-red-500 text-xs mt-1 absolute bottom-0">
                    {formik.errors.name}
                  </p>
                )}
              </div>

              <div className="relative">
                <ModalsInput
                  label="Employee Id"
                  type="number"
                  id="employeeId"
                  name="employeeId"
                  placeholder="Employee ID"
                  onChange={(e) => {
                    formik.handleChange(e);
                    clearError();
                  }}
                  value={formik.values.employeeId}
                  labelClassName={undefined}
                  inputClassName={undefined}
                />
                {formik.errors.employeeId && formik.touched.employeeId && (
                  <p className="text-red-500 text-xs mt-1 absolute bottom-0">
                    {formik.errors.employeeId}
                  </p>
                )}
              </div>
              <div className="relative">
                <ModalsInput
                  label="Employee Email"
                  type="text"
                  id="email"
                  name="email"
                  placeholder="Email"
                  onChange={formik.handleChange}
                  value={formik.values.email}
                  labelClassName={undefined}
                  inputClassName={undefined}
                />
                {formik.errors.email && formik.touched.email && (
                  <p className="text-red-500 text-xs mt-1 absolute bottom-0">
                    {formik.errors.email}
                  </p>
                )}
              </div>
              <div className="relative">
                <ModalsInput
                  label="Employee Password"
                  type="text"
                  id="password"
                  name="password"
                  placeholder="Password"
                  onChange={formik.handleChange}
                  value={formik.values.password}
                  labelClassName={undefined}
                  inputClassName={undefined}
                />
                {formik.errors.password && formik.touched.password && (
                  <p className="text-red-500 text-xs mt-1 absolute bottom-0">
                    {formik.errors.password}
                  </p>
                )}
              </div>

              <div className="relative">
                <SelectField
                  disabled={disable}
                  name="Department"
                  label="Employee Department"
                  options={disable ? newOption : options}
                />
                {formik.errors.mySelectField &&
                  formik.touched.mySelectField && (
                    <p className="text-red-500 text-xs mt-1 absolute bottom-0">
                      {formik.errors.mySelectField}
                    </p>
                  )}
              </div>
              <div className="relative">
                <ModalsInput
                  label="Employee Join Date"
                  type="date"
                  id="date"
                  name="date"
                  placeholder="Date"
                  onChange={formik.handleChange}
                  value={
                    formik.values.date
                      ? typeof formik.values.date === "string"
                        ? formik.values.date
                        : formik.values.date instanceof Date
                        ? formik.values.date.toISOString().split("T")[0]
                        : new Date(formik.values.date)
                            .toISOString()
                            .split("T")[0]
                      : ""
                  }
                  labelClassName={undefined}
                  inputClassName={undefined}
                />
                {formik.errors.date && formik.touched.date && (
                  <p className="text-red-500 text-xs mt-1 absolute bottom-0">
                    {formik.errors.date}
                  </p>
                )}
              </div>

              <div className="relative">
                <label
                  className={`font-semibold text-white text-[21px] font-urbanist leading-[180%]`}
                >
                  Employee Information
                </label>
                <textarea
                  className="w-full h-[100px] w-full px-6 py-4 h-[65px] bg-[#a0a1a8] outline-none text-[#747681] placeholder-[#747681] font-urbanist text-lg font-medium"
                  id="employeeInformation"
                  name="employeeInformation"
                  placeholder="Enter about Employee..."
                  onChange={formik.handleChange}
                  value={formik.values.employeeInformation}
                />
                {formik.errors.employeeInformation &&
                  formik.touched.employeeInformation && (
                    <p className="text-red-500 text-xs mt-1 absolute bottom-0">
                      {formik.errors.employeeInformation}
                    </p>
                  )}
              </div>
            </div>

            {errorId !== "" && (
              <p className="text-red-500 text-xs mt-1">{errorId}</p>
            )}

            <button
              type="submit"
              disabled={formik.isSubmitting && errorId !== ""}
              className="buttonColor px-5 py-3.5 font-urbanist text-xl font-bold leading-[150%] text-white flex items-center justify-center mt-6 w-full max-w-[271px] mx-auto h-[59px]"
            >
              {" "}
              {formik.isSubmitting
                ? isEditing
                  ? "Updating"
                  : "Adding"
                : isEditing
                ? "Update"
                : "Add"}{" "}
            </button>
          </form>
        </FormikProvider>
      </Modal>
    </>
  );
}
