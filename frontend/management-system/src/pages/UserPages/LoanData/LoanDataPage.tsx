import LoanDataBody from "./LoanDataBody";

const LoanDataPage = () => {
  return (
    <>
      <div className="mt-[50px]">
        <h1 className="font-popins text-left text-4xl font-semibold text-white mb-[53px]">
          Your Loan Information
        </h1>
        <LoanDataBody />
      </div>
    </>
  );
};

export default LoanDataPage;
