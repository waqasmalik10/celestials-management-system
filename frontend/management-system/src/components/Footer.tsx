import footerLogo from "../images/footerLogo.png";
import twitterLogo from "../images/twitter.svg";
import facebookLogo from "../images/faceBook.svg";
import linkindinLogo from "../images/linkindin.svg";
import instagramLogo from "../images/instagram.svg";
import discordLogo from "../images/discord.svg";
import telegramLogo from "../images/telegram.svg";
import footerCoinIcon from "../images/footerCoinIcon.svg"
import footerButtonArrow from "../images/footerButtonArrow.svg"

const Footer = () => {
  return (
    <>
      <div className="py-20 2xl;py-[120px] relative w-full bottom-0">
        <div className="flex justify-between flex-wrap gap-5">
          <div className="flex flex-col">
            <div>
              <img src={footerLogo} alt="footer-logo" />
            </div>
            <div className="mt-5 flex items-center flex-wrap">
              <button type="button" className="p-[17px]">
                <img src={twitterLogo} alt="twitter" />
              </button>
              <button type="button" className="p-[17px]">
                <img src={facebookLogo} alt="facebook" />
              </button>
              <button type="button" className="p-[17px]">
                <img src={linkindinLogo} alt="linkindin" />
              </button>
              <button type="button" className="p-[17px]">
                <img src={instagramLogo} alt="instagram" />
              </button>
              <button type="button" className="p-[17px]">
                <img src={discordLogo} alt="discord" />
              </button>
              <button type="button" className="p-[17px]">
                <img src={telegramLogo} alt="telegram" />
              </button>
            </div>
          </div>
          <div className="flex w-full max-w-[400px] justify-between">
            <div className="flex flex-col gap-2.5">
              <h5 className="text-[#FFFFFF7A] text-xl font-inter font-medium leading-[35px] mb-2.5">
                Company
              </h5>
              <a className="text-xl font-inter font-medium leading-[35px] text-white">
                About us
              </a>
              <a className="text-xl font-inter font-medium leading-[35px] text-white">
                Blog
              </a>
              <a className="text-xl font-inter font-medium leading-[35px] text-white">
                Press
              </a>
              <a className="text-xl font-inter font-medium leading-[35px] text-white">
                Carrers
              </a>
            </div>
            <div className="flex flex-col gap-2.5">
              <h5 className="text-[#FFFFFF7A] text-xl font-inter font-medium leading-[35px] mb-2.5">
                Legal
              </h5>
              <a className="text-xl font-inter font-medium leading-[35px] text-white">
                Privacy Policy
              </a>
              <a className="text-xl font-inter font-medium leading-[35px] text-white">
                Terms & Conditions
              </a>
              <a className="text-xl font-inter font-medium leading-[35px] text-white">
                Cookies
              </a>
            
            </div>
          </div>
        </div>
        <div className="mt-[60px] border-t border-solid border-[#FFFFFF99] pt-5 flex justify-between gap-5 flex-wrap">
            <div className="flex flex-col gap-5">
                <h5 className="text-[17px] font-inter font-medium text-[#FFFFFF7A] leading-[30px]">
                    © Lumanagi
                </h5>
                <p className="text-[17px] font-inter font-medium text-white leading-[30px]">
                    <span className="text-[#FFFFFF7A]">
                        HU
                    </span>&nbsp;
                    EN
                </p>
            </div>
            <div className="flex items-center flex-wrap gap-2.5 w-full max-w-[320px]">
                <div>
                    <img src={footerCoinIcon} alt="footerIcon" />
                </div>
                <p className="text-[17px] text-white font-medium font-inter">
                    0.002 ETH
                </p>
                <button type="button" className="outline-none bg-[#FF073A] w-full max-w-[158px] h-[42px] py-[5px] px-[17px] flex gap-[5px] rounded-[13px]">
                    <p className="font-inter text-[17px] font-medium text-white pt-1.5">
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
