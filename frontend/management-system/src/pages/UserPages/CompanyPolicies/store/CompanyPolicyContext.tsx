import { createContext, useState, useEffect, ReactNode } from "react";

interface LeavePolicy {
  uniqueId: string;
  leavePolicy?: string;
  pdfFile?: File;
}

interface LoanPolicy {
  uniqueId: string;
  loanPolicy?: string;
  pdfFile?: File;
}

interface CreateContextType {
  leave?: LeavePolicy;
  addLeave: boolean;
  openLeaveModal: (leave?: LeavePolicy) => void;
  closeLeaveModal: () => void;
  addNewPolicy: (leave: LeavePolicy) => boolean;
  successfulAdded: () => void;
  error: string;
  loan?: LoanPolicy;
  addLoan: boolean;
  openLoanModal: (loan?: LoanPolicy) => void;
  closeLoanModal: () => void;
  addNewLoan: (loan: LoanPolicy) => boolean;
  successfulAddedLoan: () => void;
  errorLoan: string;
}

export const CompanyPolicyContext = createContext<CreateContextType | null>(
  null
);

export const CompanyContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [leave, setLeave] = useState<LeavePolicy>();
  const [loan, setLoan] = useState<LoanPolicy>();
  const [addLeave, setAddLeave] = useState<boolean>(false);
  const [addLoan, setAddLoan] = useState<boolean>(false);
  const [error, setError] = useState("");
  const [errorLoan, setErrorLoan] = useState("");

  useEffect(() => {}, []);

  const addNewPolicy = (leave: LeavePolicy): boolean => {
    if (leave) {
      setLeave(leave);
      setError("");
    } else {
      setError("Please fill in all fields");
    }
    setLeave(leave);
    document.body.style.overflow = "auto";
    window.scrollTo(0, 0);
    return true;
  };

  const addNewLoan = (loan: LoanPolicy): boolean => {
    if (loan) {
      setLoan(loan);
      setErrorLoan("");
    } else {
      setErrorLoan("Please fill in all fields");
    }
    setLoan(loan);
    document.body.style.overflow = "auto";
    window.scrollTo(0, 0);
    return true;
  };

  const openLeaveModal = (leave?: LeavePolicy) => {
    window.scrollTo(0, 0);
    if (leave) {
      setLeave(leave);
    }
    setAddLeave(true);
    document.body.style.overflow = "hidden";
  };

  const openLoanModal = (loan?: LoanPolicy) => {
    window.scrollTo(0, 0);
    if (loan) {
      setLoan(loan);
    }
    setAddLoan(true);
    document.body.style.overflow = "hidden";
  };

  const closeLeaveModal = () => {
    setAddLeave(false);
    document.body.style.overflow = "auto";
    window.scrollTo(0, 0);
  };

  const closeLoanModal = () => {
    setAddLoan(false);
    document.body.style.overflow = "auto";
    window.scrollTo(0, 0);
  };

  const successfulAdded = () => {
    if (error === "") {
      setAddLeave(false);
    }
  };

  const successfulAddedLoan = () => {
    if (errorLoan === "") {
      setAddLoan(false);
    }
  };

  return (
    <CompanyPolicyContext.Provider
      value={{
        leave,
        addLeave,
        openLeaveModal,
        closeLeaveModal,
        addNewPolicy,
        successfulAdded,
        error,
        loan,
        addLoan,
        openLoanModal,
        closeLoanModal,
        addNewLoan,
        successfulAddedLoan,
        errorLoan,
      }}
    >
      {children}
    </CompanyPolicyContext.Provider>
  );
};

export default CompanyPolicyContext;
