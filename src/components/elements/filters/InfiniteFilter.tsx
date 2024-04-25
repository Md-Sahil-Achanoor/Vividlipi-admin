import { useCallback, useRef, useState } from "react";
import { BiChevronDown, BiSearch } from "react-icons/bi";
import { BsX } from "react-icons/bs";
import { twMerge } from "tailwind-merge";
import useOnClickOutside from "../../../hooks/useOnClickOutside";
import { InputType } from "../../../types";
import Loader from "../../atoms/Loader";

interface InfiniteFilter<T> {
  items: T[];
  name: () => React.ReactNode;
  handleSelectedOption: (i: T) => void;
  isOpen?: boolean;
  extraClass?: string;
  buttonClass?: string;
  listClass?: string;
  listRef?: any;
  renderItem: (i: T) => React.ReactNode;
  isActive?: (I: T) => boolean;
  isLoading?: boolean;
  isError?: boolean;
  errorMessage?: string;
  reCall?: () => void;
  clearData?: () => void;
  isSelected?: boolean;
  loadMore?: () => void;
  isInsideSearch?: boolean;
  searchProps?: InputType;
  listItemClass?: string;
  wrapperClass?: string;
  listLiClass?: string;
  isIcon?: boolean;
  container?: string;
  onCloseCallback?: () => void;
}

const InfiniteFilter = <T extends object>({
  items,
  name,
  handleSelectedOption,
  isOpen = true,
  extraClass = "",
  buttonClass = "",
  listClass = "",
  renderItem,
  isActive,
  isLoading,
  isError,
  errorMessage,
  reCall,
  clearData = () => {},
  isSelected,
  loadMore,
  listRef: listRefProps,
  isInsideSearch,
  searchProps,
  listItemClass = "",
  wrapperClass = "",
  listLiClass = "",
  isIcon = true,
  container = "",
  onCloseCallback,
}: InfiniteFilter<T>) => {
  const [open, setOpen] = useState<boolean>(false);
  // console.log(`open:`, open, isOpen);
  const ref = useRef(null);

  const handleClickOutside = () => {
    setOpen(false);
    onCloseCallback && onCloseCallback();
  };

  const handleClickInside = () => setOpen((prev) => !prev);

  //  hook for handling outside click
  useOnClickOutside(ref, handleClickOutside);

  let observer = useRef<IntersectionObserver | null>(null);
  let listRef = useCallback(
    (node: HTMLLIElement) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          loadMore && loadMore();
        }
      });
      if (node) observer.current.observe(node);
    },
    [isLoading, loadMore]
  );

  // tailwind text overflow ellipsis

  return (
    <div className={twMerge("relative w-full", container)} ref={ref}>
      <button
        onClick={handleClickInside}
        type="button"
        className={twMerge(
          "rounded-lg flex justify-between items-center w-full",
          buttonClass
        )}
      >
        <div
          className={twMerge("flex justify-between items-center flex-1", "")}
        >
          {name()}
          {isSelected ? (
            <BsX
              className="text-red-600 text-lg cursor-pointer"
              onClick={(e: any) => {
                e.stopPropagation();
                clearData();
              }}
            />
          ) : null}
        </div>
        {isIcon && <BiChevronDown className="text-xl" />}
      </button>
      {open && isOpen && (
        <div
          className={twMerge(
            `z-10 absolute top-[110%] bg-white divide-y divide-gray-100 rounded-lg shadow`,
            extraClass || "w-full"
          )}
        >
          <div className={wrapperClass || " p-2"}>
            {isInsideSearch && (
              <div
                className={twMerge(
                  "flex items-center px-2 py-1 mb-2 border-b border-borderClr-gray",
                  searchProps?.className || ""
                )}
              >
                <BiSearch className="text-xl text-textClr-muted" />
                <input
                  className={
                    "flex-1 text-textClr-muted outline-none focus:border-gray-300 p-1 rounded-md focus-within:border-gray-300 "
                  }
                  {...searchProps}
                />
              </div>
            )}
            <ul
              className={twMerge(
                `text-sm text-gray-700 primary-scrollbar`,
                listClass || "max-h-[200px]"
              )}
            >
              {isLoading && items?.length === 0 ? (
                <Loader />
              ) : items?.length ? (
                items?.map((item, index) => (
                  <li
                    key={index}
                    onClick={() => {
                      handleClickInside();
                      handleSelectedOption(item);
                    }}
                    className={twMerge(
                      `rounded-lg mb-2 group/item`,
                      listLiClass
                    )}
                    ref={
                      items.length === index + 1
                        ? listRefProps
                          ? listRefProps
                          : listRef
                        : null
                    }
                  >
                    <span
                      className={twMerge(
                        `rounded-lg block px-4 py-2  cursor-pointer ${
                          isActive && isActive(item)
                            ? "bg-gray-100 dark:bg-dark_nav"
                            : ""
                        }`,
                        listItemClass || "hover:bg-gray-100"
                      )}
                    >
                      {renderItem(item)}
                    </span>
                  </li>
                ))
              ) : (
                !isLoading &&
                !isError && (
                  <li className="rounded-lg mb-2">
                    <span
                      className={`rounded-lg block px-4 py-2 cursor-pointer`}
                    >
                      No Data available
                    </span>
                  </li>
                )
              )}
              {isLoading && items?.length > 0 ? (
                <div className={"py-4 text-center"}>Loading...</div>
              ) : null}
              {isError ? (
                <div className={"py-1 text-center"}>
                  {errorMessage || "Load to failed data"} <br />
                  {items?.length === 0 ? (
                    <span
                      title="Click to refetch data"
                      className="text-blue-600 cursor-pointer"
                      onClick={reCall}
                    >
                      Refetch data
                    </span>
                  ) : null}
                </div>
              ) : null}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default InfiniteFilter;
