import { useRef, useState } from "react";
import useOnClickOutside from "../../../hooks/useOnClickOutside";
import { cn } from "../../../utils/twmerge";

// type ObjectKey = keyof typeof ;

const Dropdown = ({
  name,
  isOpen = true,
  extraClass = "",
  buttonClass = "",
  children,
  clearData,
  isSelected,
  renderProps,
}: any) => {
  const [open, setOpen] = useState(false);
  // console.log(`open:`, open, isOpen);
  const ref = useRef(null);

  const handleClickOutside = () => setOpen(false);

  const handleClickInside = () => setOpen((prev) => !prev);

  //  hook for handling outside click
  useOnClickOutside(ref, handleClickOutside);
  // on click outside of dropdown close the dropdown menu
  // useEffect(() => {

  // });

  // tailwind text overflow ellipsis

  return (
    <div className="relative w-full" ref={ref}>
      <button
        onClick={handleClickInside}
        type="button"
        className={cn(
          "rounded-lg p-3 flex justify-between items-center w-full",
          buttonClass
        )}
      >
        <div className="flex justify-between items-center flex-1">
          {/*tailwind text overflow ellipsis */}
          {renderProps ? (
            renderProps()
          ) : (
            <span className="text-sm text-gray-700 dark:text-gray-200 truncate">
              {name}
            </span>
          )}
          {isSelected ? (
            <i
              className=" bx bx-x text-xl text-red-600 cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                clearData();
              }}
            ></i>
          ) : null}
        </div>
        <i className="bx bx-chevron-down text-xl"></i>
      </button>
      {open && isOpen && (
        <div
          className={cn(
            `z-10 absolute top-[110%] w-full bg-white divide-y divide-gray-100 rounded-lg shadow`,
            extraClass
          )}
        >
          <div className="p-2">{children}</div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
