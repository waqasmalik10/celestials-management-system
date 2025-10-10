import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="mt-40">
      <h1 className="text-4xl font-bold text-white font-popins text-center">404 - Page Not Found</h1>
      <p className="text-2xl text-white font-normal font-poppins text-center mt-4">The page you are looking for does not exist.</p>
      <Link to="/"className="buttonColor px-7 py-4 rounded-[10px] text-white text-lg font-inter font-medium leading-[17px] text-center mx-auto mt-4 flex max-w-fit ">Go to Homepage</Link>
    </div>
  );
};

export default NotFoundPage;
