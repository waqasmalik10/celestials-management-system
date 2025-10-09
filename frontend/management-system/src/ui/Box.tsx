import { ReactNode } from "react";

interface BoxProps {
  children: ReactNode;
  boxMainDivClasses?: string;
  boxClass?: string;
}

const Box = ({ children, boxMainDivClasses, boxClass }: BoxProps) => {
  return (
    <>
      <div
        className={`w-full h-auto rounded-[15px] overflow-hidden ${boxMainDivClasses}`}
      >
        <div
          className={`w-full h-full border-transparent rounded-[15px] blurBackground cardsBorder backdrop-blur-[41px] ${boxClass}`}
        >
          {children}
        </div>
      </div>
    </>
  );
};

export default Box;
