import { useEffect, useState } from "react";

import footerLogo from "../assets/images/footerLogo.png";
import twitterLogo from "../assets/images/twitter.svg";
import facebookLogo from "../assets/images/facebook.svg";
import linkindinLogo from "../assets/images/linkindin.svg";
import instagramLogo from "../assets/images/instagram.svg";
import discordLogo from "../assets/images/discord.svg";
import telegramLogo from "../assets/images/telegram.svg";
import footerCoinIcon from "../assets/images/footerCoinIcon.svg";
import footerButtonArrow from "../assets/images/footerButtonArrow.svg";
import useIntersectionObserver from "../ui/UseIntersectionObserver";
import { Link } from "react-router-dom";

const Footer = () => {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1 }) as [
    React.RefObject<HTMLDivElement>,
    boolean
  ];
  const [animationStep, setAnimationStep] = useState<number>(0);

  useEffect(() => {
    if (isVisible && animationStep === 0) {
      // Start sequential animations
      const delays = [0, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1100, 1200, 1300, 1400, 1500, 1600, 1700];

      delays.forEach((delay, index) => {
        setTimeout(() => {
          setAnimationStep(prev => Math.max(prev, index + 1));
        }, delay);
      });
    }
  }, [isVisible, animationStep]);
  return (
    <>
      <div ref={ref} className="py-20 2xl;py-[120px] relative w-full bottom-0">
        <div className="flex justify-center sm:justify-between flex-wrap sm:flex-nowrap gap-5">
          <div className="flex flex-col">
            <div
              className={` transition-all duration-500 ${
                animationStep >= 1
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
            >
              <img src={footerLogo} alt="footer-logo" />
            </div>
            <div className="mt-5 flex items-center flex-wrap">
              <button
                type="button"
                className={`p-2.5 md:p-[17px]  transition-all duration-500 delay-200 ${
                  animationStep >= 2
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                }`}
              >
                <img src={twitterLogo} alt="twitter" />
              </button>
              <button
                type="button"
                className={`p-2.5 md:p-[17px]  transition-all duration-500 delay-300 ${
                  animationStep >= 3
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                }`}
              >
                <img src={facebookLogo} alt="facebook" />
              </button>
              <button
                type="button"
                className={`p-2.5 md:p-[17px]  transition-all duration-500 delay-400 ${
                  animationStep >= 4
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                }`}
              >
                <img src={linkindinLogo} alt="linkindin" />
              </button>
              <button
                type="button"
                className={`p-2.5 md:p-[17px]  transition-all duration-500 delay-500 ${
                  animationStep >= 4
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                }`}
              >
                <img src={instagramLogo} alt="instagram" />
              </button>
              <button
                type="button"
                className={`p-2.5 md:p-[17px]  transition-all duration-500 delay-600 ${
                  animationStep >= 5
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                }`}
              >
                <img src={discordLogo} alt="discord" />
              </button>
              <button
                type="button"
                className={`p-2.5 md:p-[17px]  transition-all duration-500 delay-700 ${
                  animationStep >= 6
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                }`}
              >
                <img src={telegramLogo} alt="telegram" />
              </button>
            </div>
          </div>
          <div className="flex w-full max-w-[400px] mx-auto sm:mx-0 gap-10 sm:max-w-fit md:max-w-[400px] sm:gap-7 justify-center md:justify-between sm:justify-end">
            <div className="flex flex-col gap-2.5 items-center sm:items-start">
              <h5
                className={`text-[#FFFFFF7A] text-base md:text-xl font-inter font-medium leading-normal md:leading-[35px] mb-2.5 transition-all duration-500 delay-800 ${
                  animationStep >= 7
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                }`}
              >
                Company
              </h5>
              <Link
                to={""}
                className={`text-base md:text-xl font-inter font-medium leading-normal md:leading-[35px] text-white transition-all duration-500 delay-900 ${
                  animationStep >= 8
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                }`}
              >
                About us
              </Link>
              <Link
                to={""}
                className={`text-base md:text-xl font-inter font-medium leading-normal md:leading-[35px] text-white transition-all duration-500  ${
                  animationStep >= 9
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                }`}
              >
                Blog
              </Link>
              <Link
                to={""}
                className={`text-base md:text-xl font-inter font-medium leading-normal md:leading-[35px] text-white transition-all duration-500 delay-1100 ${
                  animationStep >= 10
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                }`}
              >
                Press
              </Link>
              <Link
                to={""}
                className={`text-base md:text-xl font-inter font-medium leading-normal md:leading-[35px] text-white transition-all duration-500 delay-1200 ${
                  animationStep >= 11
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                }`}
              >
                Carrers
              </Link>
            </div>
            <div className="flex flex-col gap-2.5 items-center sm:items-start">
              <h5
                className={`text-[#FFFFFF7A] text-base md:text-xl font-inter font-medium leading-normal md:leading-[35px] mb-2.5 transition-all duration-500 delay-1300 ${
                  animationStep >= 12
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                }`}
              >
                Legal
              </h5>
              <Link
                to={""}
                className={`text-base md:text-xl font-inter font-medium leading-normal md:leading-[35px] text-white transition-all duration-500 delay-1400 ${
                  animationStep >= 13
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                }`}
              >
                Privacy Policy
              </Link>
              <Link
                to={""}
                className={`text-base md:text-xl font-inter font-medium leading-normal md:leading-[35px] text-white transition-all duration-500 delay-1500 ${
                  animationStep >= 14
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                }`}
              >
                Terms & Conditions
              </Link>
              <Link
                to={""}
                className={`text-base md:text-xl font-inter font-medium leading-normal md:leading-[35px] text-white transition-all duration-500 delay-1600 ${
                  animationStep >= 15
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                }`}
              >
                Cookies
              </Link>
            </div>
          </div>
        </div>
        <div
          className={`mt-[60px] border-t border-solid border-[#FFFFFF99] pt-5 flex justify-between gap-5 flex-wrap transition-all duration-500 delay-1700 ${
            animationStep >= 16
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4"
          }`}
        >
          <div className="flex flex-col gap-5">
            <h5 className="text-sm md:text-[17px] font-inter font-medium text-[#FFFFFF7A] leading-[30px]">
              © Lumanagi
            </h5>
            <p className="text-sm md:text-[17px] font-inter font-medium text-white leading-[30px]">
              <span className="text-[#FFFFFF7A]">HU</span>&nbsp; EN
            </p>
          </div>
          <div className="flex items-center flex-wrap gap-2.5 w-full max-w-[320px]">
            <div>
              <img src={footerCoinIcon} alt="footerIcon" />
            </div>
            <p className="text-sm md:text-[17px] text-white font-medium font-inter">
              0.002 ETH
            </p>
            <button
              type="button"
              className="outline-none bg-[#FF073A] w-full max-w-[158px] h-[42px] py-[5px] px-[17px] flex gap-[5px] rounded-[13px] justify-center items-center"
            >
              <p className="font-inter text-sm md:text-[17px]  font-medium text-white ">
                BUY LMNG
              </p>
              <button type="submit">
                <img src={footerButtonArrow} alt="arrow" />
              </button>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
