import React from "react";
import ReactDOM from "react-dom";

interface DeleteModalProps {
  modalClassName?: string;
  children: React.ReactNode;
  modalMain?: string;
  onClick?: () => void;
}

const DeleteModal = React.forwardRef<HTMLDivElement, DeleteModalProps>(
  ({ modalClassName, modalMain, children, onClick, ...props }, ref) => {
    const modalRoot = document.getElementById("modal-root");
    if (!modalRoot) {
      return null;
    }
    return ReactDOM.createPortal(
      <>
        <div
          onClick={onClick}
          className={`${modalMain} h-full flex justify-center items-center flex bg-[#555894] px-4 bg-cover z-[999999]`}
          {...props}
        >
          <div
            ref={ref}
            className={`${modalClassName} rounded-[20px] linerGradientBackgroundModal h-[calc(100%-10%)] modalBoxShadow overflowYAuto border-[1.26px] border-solid border-light-black rounded-xl w-full`}
          >
            {children}
          </div>
        </div>
      </>,
      modalRoot
    );
  }
);

export default DeleteModal;
