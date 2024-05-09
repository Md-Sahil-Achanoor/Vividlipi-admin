import { ButtonType, ModalProps } from "@/types";
import CustomModal from "../common/CustomModal";

interface Props extends ModalProps {
  heading: string;
  details: string;
  buttonProps: ButtonType;
  type?: string;
  buttonText: string;
  cancelText?: string;
}

const ManageModule = ({
  heading,
  details,
  buttonProps,
  type,
  buttonText,
  cancelText,
  ...props
}: Props) => {
  return (
    <CustomModal {...props}>
      <div className="">
        <h3 className="text-lg sm:text-xl font-bold">{heading}</h3>
        <p className="font-normal text-sm mt-2">{details}</p>
        <div className="mt-3 flex gap-1 justify-between items-center">
          <button
            className="button_primary_outline flex-1"
            onClick={() => props.handleModal("cancelled")}
          >
            {cancelText || "Cancel"}
          </button>
          <button
            {...buttonProps}
            className={`${
              type === "delete" ? "button_danger " : "button_success"
            } flex-1`}
          >
            {buttonText}
          </button>
        </div>
      </div>
    </CustomModal>
  );
};

export default ManageModule;
