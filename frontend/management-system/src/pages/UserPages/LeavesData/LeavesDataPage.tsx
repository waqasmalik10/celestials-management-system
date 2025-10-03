import LeavesDataBody from "./LeavesDataBody";

const LeavesDataPage = () => {
  return (
    <>
      <div className="mt-[50px]">
        <h1 className="font-popins text-left text-4xl font-semibold text-white mb-[53px]">
          Your Leaves Information
        </h1>
        <LeavesDataBody />
      </div>
    </>
  );
};

export default LeavesDataPage;