import CompanyLoanPolicyModal from "./CompanyLoanPolicyModal";
import { useContext } from "react";
import { CompanyPolicyContext } from "../store/CompanyPolicyContext";
import { Link } from "react-router-dom";

interface CompanyLoanPolicyProps {
  admin: boolean;
  name: string;
}

const CompanyLoanPolicy = ({ admin, name }: CompanyLoanPolicyProps) => {
  const companyLoanContext = useContext(CompanyPolicyContext);
  if (!companyLoanContext) {
    throw new Error("Error");
  }
  const {
    loan,
    addLoan,
    openLoanModal,
    closeLoanModal,
    addNewLoan,
    successfulAddedLoan,
    errorLoan,
  } = companyLoanContext;
  if (addLoan) {
    console.log(loan?.loanPolicy);
  }
  return (
    <>
      {admin && (
        <div className="flex flex-col gap-5">
          <div className="text-white mb-3">
            <p className="w-full p-7 bg-[#1E2C6D] dark:bg-[#383838]  text-3xl">
              Loan Policy:
            </p>
            <div className="flex flex-col mt-4">
              <button
                onClick={() => openLoanModal()}
                className="buttonColor px-5 py-3 text-white rounded-[10px] w-full max-w-[300px] text-2xl font-poppins font-semibold outline-none"
              >
                Add Loan Policy
              </button>
              <p className="text-2xl mt-4 px-7">{loan?.loanPolicy}</p>
              <p className="text-2xl mt-4 px-7">{loan?.pdfFile?.name}</p>
            </div>
          </div>
          {addLoan && (
            <CompanyLoanPolicyModal
              addLoan={addNewLoan}
              closeButton={closeLoanModal}
              successfullyAdd={successfulAddedLoan}
              errorId={errorLoan}
              prevLoan={loan?.loanPolicy}
            />
          )}
        </div>
      )}
      {!admin && (
        <>
          <div className="text-white mb-3">
            <p className="w-full p-7 bg-[#1E2C6D] dark:bg-[#383838]  text-3xl">
              Loan Policy:
            </p>
            <div className="flex gap-5 items-center">
              <button className="buttonColor px-5 py-3 text-white rounded-[10px] w-full max-w-fit mt-4 text-2xl font-poppins font-semibold outline-none">
                Download Policy
              </button>
              <button className="buttonColor px-5 py-3 text-white rounded-[10px] w-full max-w-fit mt-4 text-2xl font-poppins font-semibold outline-none">
                Apply for Leave
              </button>
              <Link to={"/loan"}>
                <button className="buttonColor px-5 py-3 text-white rounded-[10px] w-full max-w-fit mt-4 text-2xl font-poppins font-semibold outline-none">
                  Details
                </button>
              </Link>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default CompanyLoanPolicy;
