import InfiniteFilter from "@/components/elements/filters/InfiniteFilter";
import { InfiniteSelect as InfiniteSelectType } from "@/types";
import { cn } from "@/utils/twmerge";
import { ErrorMessage } from "formik";
import React from "react";
import { FaRegQuestionCircle } from "react-icons/fa";
import TextError from "./TextError";

const InfiniteSelect = <T extends object>({
  field: { ...rest },
  form: { touched, errors },
  label,
  id,
  onChangeCallback,
  isRequired,
  isActive,
  renderItem,
  renderName,
  isLoading,
  isError,
  errorMessage,
  renderData,
  reload,
  listRef,
  clearData,
  isSelected,
  loadMore,
  onCloseCallback,
  tooltip,
  horizontal,
  ...props
}: InfiniteSelectType<T>) => {
  const isValid =
    touched[rest.name] && errors[rest.name] && !props.disabled ? true : false;

  const handleSelect = (option: T) => {
    onChangeCallback(option);
  };

  return (
    <React.Fragment>
      <div
        className={cn(
          "w-full mb-4",
          horizontal && "flex justify-center items-center gap-4 mb-3"
        )}
      >
        <div
          className={cn(
            "w-initial",
            horizontal &&
              "w-full lg:w-4/12 p-0 INPUT_DIV flex items-center justify-end "
          )}
        >
          {label ? (
            <label
              className={cn(
                "text-black text-[14px]",
                isRequired &&
                  horizontal &&
                  "flex items-center gap-1 font-medium"
              )}
              htmlFor={id}
            >
              {isRequired && horizontal ? (
                <span className="text-red-600 ml-[1px]">{"*"}</span>
              ) : null}
              {label}
              {isRequired && !horizontal ? (
                <span className="text-red-600 ml-[1px]">{"*"}</span>
              ) : null}
            </label>
          ) : null}
          {horizontal && tooltip && (
            <FaRegQuestionCircle className="text-2xl ml-2" />
          )}
        </div>
        <div className={cn(horizontal ? "w-full lg:w-8/12" : "w-full")}>
          <div
            className={cn(
              `border border-black flex flex-1 items-center my-2 rounded-lg shadow-sm`,
              isValid ? "border-red-600" : " ",
              props?.disabled
                ? "disabled:border-disabled disabled:text-disabled"
                : ""
            )}
          >
            <InfiniteFilter
              name={() => renderName(renderData)}
              handleSelectedOption={handleSelect}
              isOpen={!props.disabled}
              isActive={isActive}
              renderItem={renderItem}
              loadMore={loadMore}
              listRef={listRef}
              items={renderData}
              isLoading={isLoading}
              isError={isError}
              errorMessage={errorMessage}
              reCall={reload}
              clearData={clearData}
              isSelected={isSelected}
              buttonClass="p-3"
              isInsideSearch={props.isInsideSearch}
              searchProps={props.searchProps}
              onCloseCallback={onCloseCallback}
            />
          </div>
          <ErrorMessage name={rest.name}>
            {(msg) => <TextError text={msg} />}
          </ErrorMessage>
        </div>
      </div>
    </React.Fragment>
  );
};

export default InfiniteSelect;
