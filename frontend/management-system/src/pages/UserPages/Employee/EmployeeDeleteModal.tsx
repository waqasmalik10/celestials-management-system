import DeleteModal from "../../../ui/DeleteModal";
import { useEffect, useRef } from "react";
import closeIcon from "../../../images/closeIcon.svg";

interface EmployeeDeleteModalProps {
  handlingDelete: (id: string) => void;
  closeButton?: () => void;
  employeeName?: string;
}

const EmployeeDeleteModal = ({
  handlingDelete,
  closeButton,
  employeeName,
}: EmployeeDeleteModalProps) => {
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
  }, [handlingDelete, closeButton]);
  return (
    <DeleteModal
      ref={modalRef}
      modalMain="absolute w-full left-0 top-0 !bg-[#55589400] backdrop-blur-md"
      modalClassName="w-full h-fit max-h-[80vh] overflow-y-auto max-w-[800px] mx-auto p-5 absolute z-90"
    >
      <div className="flex flex-col gap-5 relative">
        <button
          type="button"
          className="absolute -top-5 -right-[19px] z-10"
          onClick={() => {
            closeButton && closeButton();
          }}
        >
          <img src={closeIcon} alt="close" />
        </button>
        <h2 className="text-white text-xl leading-normal font-poppins">
          Are you sure you want to delete{" "}
          <span className="font-bold">{employeeName} Employee</span>
          data
        </h2>
        <button
          onClick={() => {
            handlingDelete(employeeName || "");
            closeButton && closeButton();
          }}
          className="buttonColor px-5 py-3.5 font-urbanist text-xl font-bold leading-[150%] text-white flex items-center justify-center mt-6 w-full max-w-[271px] mx-auto h-[59px]"
        >
          Delete
        </button>
      </div>
    </DeleteModal>
  );
};

export default EmployeeDeleteModal;
