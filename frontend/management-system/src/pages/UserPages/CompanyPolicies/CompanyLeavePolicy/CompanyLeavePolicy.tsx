import { useContext } from "react";
import { CompanyPolicyContext } from "../store/CompanyPolicyContext";
import CompanyLeavePolicyModal from "./CompanyLeavePolicyModal";
import { Link } from "react-router-dom";

interface CompanyLeavePolicyProps {
  admin?: boolean;
  name?: String;
  pageTitle?: String;
}

const CompanyLeavePolicy = ({ admin, name }: CompanyLeavePolicyProps) => {
  const companyLeaveContext = useContext(CompanyPolicyContext);
  if (!companyLeaveContext) {
    throw new Error("Error");
  }
  const {
    leave,
    addLeave,
    openLeaveModal,
    closeLeaveModal,
    addNewPolicy,
    successfulAdded,
    error,
  } = companyLeaveContext;
  if (addLeave) {
    console.log(leave?.leavePolicy);
  }
  return (
    <>
      {admin && (
        <>
          <div className="flex flex-col gap-5">
            <div className="text-white mb-3">
              <p className="w-full p-7 bg-[#1E2C6D] dark:bg-[#383838]  text-3xl">
                Leave Policy:
              </p>
              <div className="flex flex-col mt-4">
                <button
                  onClick={() => openLeaveModal(leave)}
                  className="buttonColor px-5 py-3 text-white rounded-[10px] w-full max-w-[300px] text-2xl font-poppins font-semibold outline-none"
                >
                  Add Leave Policy
                </button>
                <p className="text-2xl mt-4 px-7">{leave?.leavePolicy}</p>
                <p className="text-2xl mt-4 px-7">{leave?.pdfFile?.name}</p>
              </div>
            </div>
          </div>
          {addLeave && (
            <CompanyLeavePolicyModal
              addLeave={addNewPolicy}
              closeButton={closeLeaveModal}
              successfullyAdd={successfulAdded}
              errorId={error}
              prevLeave={leave?.leavePolicy}
            />
          )}
        </>
      )}
      {!admin && (
        <>
          <div className="flex flex-col gap-5">
            <div className="text-white mb-3">
              <p className="w-full p-7 bg-[#1E2C6D] dark:bg-[#383838]  text-3xl">
                Leave Policy:
              </p>
              <div className="flex gap-5 items-center">
                <button className="buttonColor px-5 py-3 text-white rounded-[10px] w-full max-w-fit mt-4 text-2xl font-poppins font-semibold outline-none">
                  Download Policy
                </button>
                <button className="buttonColor px-5 py-3 text-white rounded-[10px] w-full max-w-fit mt-4 text-2xl font-poppins font-semibold outline-none">
                  Apply for Leave
                </button>
                <Link to={"/leaves"}>
                  <button className="buttonColor px-5 py-3 text-white rounded-[10px] w-full max-w-fit mt-4 text-2xl font-poppins font-semibold outline-none">
                    Details
                  </button>
                </Link>
              </div>
            </div>
            
          </div>
        </>
      )}
    </>
  );
};

export default CompanyLeavePolicy;
