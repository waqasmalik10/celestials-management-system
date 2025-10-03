import Modal from "../../../ui/Modal";
import closeIcon from "../../../images/closeIcon.svg";
import * as Yup from "yup";
import { useFormik } from "formik";
import { v4 as uuidv4 } from "uuid";
import { useEffect, useRef } from "react";
import ModalsInput from "../../../ui/ModalsInput";
import { addingDepartment } from "./api/department";

const formSchema = Yup.object().shape({
  title: Yup.string().required("Department Name is required"),
  head: Yup.string().required("Head Name is required"),
  email: Yup.string()
    .email("Invalid Email address")
    .required("Email is required"),
});

interface Department {
  uniqueId: string;
  title: string;
  email?: string;
  head?: string;
}

interface DepartmentModal {
  closeButton?: () => void;
  successfullyAdd?: () => void;
  addDepartment: (department: Department) => boolean;
  clearError: () => void;
  isEditing?: boolean;
  updateDepartment?: (department: Department) => void;
  errorId?: string;
  initialDepartment?: Department | null;
  deletingDepartment?: (dep: Department) => void;
  addDeleteModalTitle?: boolean;
  deleteDepartment?: Department | null;
}

const AddDepartmentsModal = ({
  closeButton,
  successfullyAdd,
  addDepartment,
  clearError,
  errorId,
  isEditing,
  updateDepartment,
  initialDepartment,
}: DepartmentModal) => {
  const modalRef = useRef<HTMLDivElement>(null);

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
  }, [addDepartment, closeButton]);

  const handleSubmit = async (values: {
    title: string;
    head: string;
    email: string;
  }) => {
    if (isEditing && updateDepartment && initialDepartment) {
      const updatedDepartment = {
        ...initialDepartment,
        ...values,
      };
      updateDepartment(updatedDepartment);
      formik.resetForm();
      successfullyAdd && successfullyAdd();
    } else {
      const newDepartment = {
        uniqueId: uuidv4(),
        title: values.title,
        head: values.head,
        email: values.email,
      };
      const { ok, data } = await addingDepartment(newDepartment.title);
      console.log(newDepartment);
      if ((ok && data.success) || newDepartment) {
        const added = addDepartment(newDepartment);
        console.log(added);
        if (added) {
          formik.resetForm();
          successfullyAdd && successfullyAdd();
          console.log("Successfully Added", newDepartment);
        }
      }
    }
  };

  const formik = useFormik({
    initialValues: {
      title: initialDepartment?.title || "",
      head: initialDepartment?.head || "",
      email: initialDepartment?.email || "",
    },
    validationSchema: formSchema,
    onSubmit: handleSubmit,
  });

  return (
    <Modal
      ref={modalRef}
      modalMain="absolute w-full left-0 top-0 !bg-[#55589496] backdrop-blur-md"
      modalClassName="w-full h-fit max-h-[80vh] overflow-y-auto max-w-[800px] mx-auto p-5 absolute z-90"
    >
      <form className="relative" noValidate onSubmit={formik.handleSubmit}>
        <button
          type="button"
          className="absolute -top-2.5 right-0 z-10"
          onClick={() => {
            closeButton && closeButton();
          }}
        >
          <img src={closeIcon} alt="close" />
        </button>
        <div className="relative">
          <ModalsInput
            label="Department Name"
            type="text"
            id="title"
            name="title"
            placeholder="Name.."
            onChange={(e) => {
              formik.handleChange(e);
              clearError();
            }}
            value={formik.values.title}
            labelClassName={undefined}
            inputClassName={undefined}
          />
          {formik.errors.title && formik.touched.title && (
            <p className="text-red-500 text-xs mt-1 absolute bottom-0">
              {formik.errors.title}
            </p>
          )}
        </div>
        <div className="relative mt-4">
          <ModalsInput
            label="Department Head Name"
            type="text"
            id="head"
            name="head"
            placeholder="Head Name.."
            onChange={(e) => {
              formik.handleChange(e);
              clearError();
            }}
            value={formik.values.head}
            labelClassName={undefined}
            inputClassName={undefined}
          />
          {formik.errors.head && formik.touched.head && (
            <p className="text-red-500 text-xs mt-1 absolute bottom-0">
              {formik.errors.head}
            </p>
          )}
        </div>
        <div className="relative mt-4">
          <ModalsInput
            label="Department Head Email"
            type="email"
            id="email"
            name="email"
            placeholder="Head Email.."
            onChange={(e) => {
              formik.handleChange(e);
              clearError();
            }}
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
    </Modal>
  );
};

export default AddDepartmentsModal;
