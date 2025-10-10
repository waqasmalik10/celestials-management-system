import FormButton from "../../ui/FormButton";
import FormInput from "../../ui/FormInputs";
import Modal from "../../ui/Modal";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import google from "../../assets/images/googleIcon.svg";
import appleIcon from "../../assets/images/appleIcon.svg";
import facebookIcon from "../../assets/images/facebook.svg";
import twitterIcon from "../../assets/images/twitter.svg";
import { signup } from "../api/auth";
import { useFormik } from "formik";
import * as Yup from "yup";

const formSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .email("Invalid Email address")
    .required("Email is required"),
  password: Yup.string()
    .min(2, "Password must be 2 characters at minimum")
    .required("Password is required"),
});

export default function SignUp() {
  const navigate = useNavigate();
  const [signUpError, setSignUpError] = useState("");
  const [isChecked, setIsChecked] = useState(false);


  const googleButtonsClasses =
  "bg-white px-5 py-2 rounded-[10px] w-full h-10 text-black-600 font-inter text-sm leading-6 justify-center flex items-center justify-center outline-none border-none gap-3.5";


  const handleSubmit = async (
    values: {
      name: string;
      email: string;
      password: string;
    },
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    setSignUpError("");
    const { ok, data } = await signup(
      values.name,
      values.email,
      values.password,
    );
    if (ok && data.success && isChecked === true) {
      localStorage.setItem("token", data.token);
      navigate("/");
    } else {
      setSignUpError(
        data.message || "Signup failed. Please check your credentials."
      );
    }
    setSubmitting(false);
  };

  const handleChange = () => {
    setIsChecked(!isChecked);
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      name: "",
    },
    validationSchema: formSchema,
    onSubmit: handleSubmit,
  });

  return (
    <Modal modalClassName="max-w-lg mx-auto p-7 w-full max-h-fit">
      {/* <div>
        <img src={logo} alt="logo" className="mx-auto mb-4 md:my-4" />
      </div> */}
        <h1 className="font-poppins text-2xl text-left leading-[33.33px] font-semibold text-white m-0">
        Create Your Account
      </h1>
      <p className="mt-2.5 font-inter font-medium text-sm text-white-600 text-left leading-5">
        Already registerd?{" "}
        <Link to="/" className="text-[#259DA8]">
          Sign in here
        </Link>
      </p>
      <div className="flex flex-col mt-[26px] gap-3.5 w-full">
        <button className={googleButtonsClasses}>
          <img src={google} alt="google" className="w-4 h-4" />
          Continue with Google
        </button>
        <button className={googleButtonsClasses}>
          <img src={appleIcon} alt="Apple" className="w-4 h-4" />
          Continue with Apple
        </button>
        <button className={`${googleButtonsClasses} !bg-blue-800 !text-white`}>
          <img src={facebookIcon} alt="FaceBook" className="w-4 h-4" />
          Continue with Facebook
        </button>
        <button className={`${googleButtonsClasses} !bg-[#1DA1F2] !text-white`}>
          <img src={twitterIcon} alt="Twitter" className="w-4 h-4" />
          Continue with Facebook
        </button>
      </div>
      <div className="my-[26px] flex justify-center py-[9px] gap-[13px] items-center w-full">
        <div className="border-t border-solid border-[#2d2e39] w-full"></div>
        <p className="m-0 text-[#5b5c64] font-inter text-[11px] font-medium">
          or
        </p>
        <div className="border-t border-solid border-[#2d2e39] w-full"></div>
      </div>
      <form
        onSubmit={formik.handleSubmit}
        className="flex flex-col font-inter"
      >
        <div className="flex flex-col gap-[13px]">
          <div className="relative">
          
            <FormInput
              label=""
              type="text"
              id="name"
              name="name"
              placeholder="Full Name"
              onChange={formik.handleChange}
              value={formik.values.name}
              labelClassName={undefined}
              inputClassName="font-inter"
            />
            {formik.errors.name && formik.touched.name && (
              <p className="text-red-500 text-[8px] mt-1 absolute -bottom-[15px]">
                {formik.errors.name}
              </p>
            )}

          
          </div>
          <div className="relative">
            <FormInput
              label=""
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              onChange={formik.handleChange}
              value={formik.values.email}
              labelClassName={undefined}
              inputClassName="font-inter"
            />
            {formik.errors.email && formik.touched.email && (
              <p className="text-red-500 text-[8px] mt-1 absolute -bottom-[15px]">
                {formik.errors.email}
              </p>
            )}
          </div>
          <div className="relative">
            <FormInput
              label=""
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              onChange={formik.handleChange}
              value={formik.values.password}
              labelClassName={undefined}
              inputClassName="font-inter"
            />
            {formik.errors.password && formik.touched.password && (
              <p className="text-red-500 text-[8px] mt-1 absolute -bottom-[15px]">
                {formik.errors.password}
              </p>
            )}
          </div>
        </div>

        <label className="container font-inter mt-[26px]">
            I agree to CryptoHunt’s Terms and Privacy Policy
          <input type="checkbox" checked={isChecked} onChange={handleChange} />
          <span className="checkmark"></span>
        </label>

        {signUpError && (
          <p className="text-red-500 text-[8px] text-center mt-2">{signUpError}</p>
        )}
          <div className="flex flex-col mt-[26px] gap-[13px]">
        <FormButton
          type="submit"
          children={formik.isSubmitting ? "Signing..." : "Continue"}
          disabled={formik.isSubmitting}
          buttonClasses={undefined}
        />
         <FormButton
            type="submit"
            children={"Terms"}
            buttonClasses="!bg-transparent !text-primary-900 hover:!bg-primary-900 hover:!text-white"
          />
          <FormButton
            type="submit"
            children={"Privacy Policy"}
            buttonClasses="!bg-transparent !text-primary-900 hover:!bg-primary-900 hover:!text-white"
          />
        </div>
      </form>
    </Modal>
  );
}
