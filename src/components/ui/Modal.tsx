import { ModalProps } from "@/types";
import { BiX } from "react-icons/bi";

const Modal = ({
  classes,
  handleModal,
  outSideClick,
  isModalHeader,
  headText,
  children,
  wrapperClass = "",
}: ModalProps) => {
  return (
    <div
      className={`${classes?.top} fixed top-0 left-0 bg-bg-transparent w-full overflow-x-hidden overflow-y-auto primary-scrollbar py-10 h-screen z-[100000000000000] duration-500`}
    >
      <div
        className={
          "relative flex justify-center items-center w-full " + wrapperClass
        }
      >
        <div
          className="w-full h-screen absolute top-0 left-0 z-10 cursor-pointer"
          onClick={() => outSideClick && handleModal("cancelled")}
        ></div>
        <div
          className={`${classes.body} bg-white dark:bg-dark_primary p-5 rounded-lg shadow duration-500 z-20 border-2 border-custom-primary-main`}
        >
          {isModalHeader && (
            <div className="flex justify-between items-center">
              <span className="text-xl font-semibold">{headText}</span>
              <div
                className="p-3 rounded-full bg-bg-gray flex items-center justify-center cursor-pointer"
                onClick={() => handleModal("cancelled")}
              >
                <BiX />
              </div>
            </div>
          )}
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
