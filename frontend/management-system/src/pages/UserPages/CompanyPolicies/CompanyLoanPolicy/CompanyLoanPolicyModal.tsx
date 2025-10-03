import * as Yup from "yup";
import { v4 as uuidv4 } from "uuid";
import { useRef, useEffect, useState } from "react";
import { useFormik } from "formik";
import Modal from "../../../../ui/Modal";
import closeIcon from "../../../../images/closeIcon.svg";

interface LoanPolicy {
  uniqueId: string;
  loanPolicy?: string;
  pdfFile?: File;
}

interface CompanyLoanPolicyModalProps {
  addLoan?: (loan: LoanPolicy) => boolean;
  closeButton?: () => void;
  successfullyAdd?: () => void;
  errorId?: string;
  prevLoan?: string;
}
const formSchema = Yup.object().shape({
  loanPolicy: Yup.string().required("Information is required"),
  pdfFile: Yup.mixed().required("File is required"),
});

const CompanyLoanPolicyModal = ({
  closeButton,
  successfullyAdd,
  addLoan,
  errorId,
  prevLoan,
}: CompanyLoanPolicyModalProps) => {
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
  }, [addLoan, closeButton]);

  const handleSubmit = async (values: {
    loanPolicy?: string;
    pdfFile?: File;
  }) => {
    const newLoanPolicy = {
      uniqueId: uuidv4(),
      ...values,
    };
    console.log(newLoanPolicy);
    if (newLoanPolicy) {
      const added = addLoan?.(newLoanPolicy);
      if (added) {
        formik.resetForm();
        successfullyAdd && successfullyAdd();
      }
    }
  };

  const formik = useFormik({
    initialValues: {
      loanPolicy: prevLoan,
      pdfFile: undefined,
    },
    validationSchema: formSchema,
    onSubmit: handleSubmit,
  });

  const [file, setFile] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      formik.setFieldValue("pdfFile", selectedFile);
      setFile(selectedFile.name);
    }
  };
  return (
    <>
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
            <label
              className={`font-semibold text-white text-[21px] font-urbanist leading-[180%]`}
            >
              Loan Policy
            </label>
            <div className="mt-3 mb-1 flex bg-[#a0a1a8] w-fit">
              <button
                type="button"
                onClick={handleClick}
                className="w-full px-6 py-4"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="m18.375 12.739-7.693 7.693a4.5 4.5 0 0 1-6.364-6.364l10.94-10.94A3 3 0 1 1 19.5 7.372L8.552 18.32m.009-.01-.01.01m5.699-9.941-7.81 7.81a1.5 1.5 0 0 0 2.112 2.13"
                  />
                </svg>
              </button>
            </div>
            <div className="bg-[#a0a1a8] h-20 px-6 py-4 text-[#747681]">
              <input
                type="text"
                className="w-full outline-none w-full bg-transparent text-[#747681] placeholder-[#747681] font-urbanist text-lg font-medium"
                id="loanPolicy"
                name="loanPolicy"
                placeholder="Enter Loan Policy..."
                onChange={formik.handleChange}
                value={formik.values.loanPolicy}
              />
              {file && (
                <p>
                  {" "}
                  Your File <a>{file}</a>
                </p>
              )}

              <input
                type="file"
                accept="pdf/*"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
              {formik.errors.loanPolicy && formik.touched.loanPolicy && (
                <p className="text-red-500 text-xs mt-1 absolute bottom-0">
                  {formik.errors.loanPolicy}
                </p>
              )}
              {formik.errors.pdfFile && formik.touched.pdfFile && (
                <p className="text-red-500 text-xs mt-1 absolute bottom-0">
                  {formik.errors.pdfFile}
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
            {formik.isSubmitting ? "Adding" : "Add"}{" "}
          </button>
        </form>
      </Modal>
    </>
  );
};
export default CompanyLoanPolicyModal;
