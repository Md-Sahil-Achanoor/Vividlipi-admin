import React from "react";
import { IoCloseSharp } from "react-icons/io5";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { twMerge } from "tailwind-merge";

interface DropDown extends React.PropsWithChildren {
  title: string;
  icon?: React.ReactNode;
  options?: React.ReactNode | React.ReactNode[];
  dropIcon?: boolean;
  hasValue?: boolean;
  removeValue?: () => void;
  toggle?: () => void;
  isActive?: boolean;
  className?: string;
}

const DropDown = ({
  title,
  icon,
  options,
  dropIcon = false,
  hasValue = false,
  removeValue,
  toggle,
  isActive = false,
  className,
}: DropDown) => {
  return (
    <div
      onClick={toggle}
      className="flex justify-center items-center w-full border bg-white px-4 py-2 rounded-lg relative cursor-pointer group duration-700 max-w-fit min-w-full"
    >
      {icon && <span className="text-lg mr-2">{icon}</span>}
      <div className="flex items-center gap-1">
        <h1>{title}</h1>
        {hasValue && (
          <span
            className="text-base text-red-700"
            onClick={(e) => {
              e.stopPropagation();
              removeValue && removeValue();
            }}
          >
            <IoCloseSharp />
          </span>
        )}
      </div>
      {isActive && options && (
        <div
          className={twMerge(
            "absolute top-full border bg-white px-4 py-1 w-full rounded-lg mt-0.5 duration-700",
            className
          )}
        >
          {options}
        </div>
      )}
      {dropIcon && (
        <span>
          <MdOutlineKeyboardArrowDown className="text-lg ml-1" />
        </span>
      )}
    </div>
  );
};

export default DropDown;
