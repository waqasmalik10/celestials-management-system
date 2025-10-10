import CompanyLeavePolicy from "./CompanyLeavePolicy/CompanyLeavePolicy";
import CompanyLoanPolicy from "./CompanyLoanPolicy/CompanyLoanPolicy";
import { useContext } from "react";
import { VerifyContext } from "../../app/VerifyContext";

const CompanyPolicyPage = () => {
  const { user, admin } = useContext(VerifyContext);
  return (
    <>
      <div className="mt-[50px]">
        <h1 className="font-popins text-left text-4xl font-semibold text-white mb-[53px]">
          Company Policies
        </h1>
        <CompanyLeavePolicy pageTitle="Company Policies" name={user?.name} admin={admin} />
        <CompanyLoanPolicy name={user?.name || ""} admin={admin}/>
      </div>
    </>
  );
};

export default CompanyPolicyPage;
