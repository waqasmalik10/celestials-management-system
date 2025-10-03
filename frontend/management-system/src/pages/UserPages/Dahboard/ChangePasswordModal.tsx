import Modal from "../../../ui/Modal";
import closeIcon from "../../../images/closeIcon.svg";
import { useEffect, useRef } from "react";

interface ChangePasswordModalProps {
  closeButton?: () => void;
}

const ChangePasswordModal = ({ closeButton }: ChangePasswordModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        closeButton && closeButton();
      }
    };
    if (closeButton) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ closeButton]);
  return (
    <>
      <Modal
        ref={modalRef}
        modalMain="absolute w-full left-0 top-0 !bg-[#55589496] backdrop-blur-md"
        modalClassName="w-full h-fit max-h-[80vh] overflow-y-auto max-w-[800px] mx-auto p-5 absolute z-90"
      >
        {" "}
        <form className="relative">
          <button
            type="button"
            className="absolute -top-2.5 right-0 z-10"
            onClick={() => {
              closeButton && closeButton();
            }}
          >
            <img src={closeIcon} alt="close" />
          </button>

          

          <button type="submit">Change</button>
        </form>
      </Modal>
    </>
  );
};
export default ChangePasswordModal;
