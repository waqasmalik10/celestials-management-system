import menuIcon from "../assets/images/menu.svg";
import navLogo from "../assets/images/navLogo.png";

interface NavbarProps {
  sideBarClosed: () => void;
}

export default function NavBar({ sideBarClosed }: NavbarProps) {
  return (
    <nav className="py-[25px] flex justify-between items-center">
      <div className="flex items-center gap-[17px]">
        <button
          type="button"
          onClick={sideBarClosed}
          className="w-10 h-10 md:w-[60px] md:h-[60px] outline-none bg-transparent"
        >
          <img src={menuIcon} alt="menu" className="w-full h-full" />
        </button>
        <div>
          <img src={navLogo} alt="logo" className="w-full h-auto" />
        </div>
      </div>
      <div className="hidden md:flex gap-[17px] items-center">
        <div className="rounded-[13px] w-fit overflow-hidden">
        <button
          type="button"
          className="blurBackground blurBorder text-base text-white font-medium leading-7 font-inter py-[11.11px] px-[17.78px] rounded-[13px]"
        >
          Buy & Sell
        </button>
        </div>
        <button
          type="button"
          className="bg-[#259DA814] text-base font-medium leading-7 font-inter py-[11.11px] px-[17.78px] rounded-[13px] text-[#FE0639]"
        >
          Connect Wallet
        </button>
      </div>
    </nav>
  );
}
