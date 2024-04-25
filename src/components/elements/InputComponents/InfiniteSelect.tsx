import { ErrorMessage } from "formik";
import React from "react";
import { InfiniteSelect as InfiniteSelectType } from "../../../types";
import InfiniteFilter from "../filters/InfiniteFilter";
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
  ...props
}: InfiniteSelectType<T>) => {
  const isValid =
    touched[rest.name] && errors[rest.name] && !props.disabled ? true : false;

  const handleSelect = (option: T) => {
    onChangeCallback(option);
  };

  return (
    <React.Fragment>
      <div className={"w-full mb-4"}>
        {label ? (
          <label className="text-gray-600 text-[14px]" htmlFor={id}>
            {label}
            {isRequired ? (
              <span className="text-red-600 ml-[1px]">{"*"}</span>
            ) : null}
          </label>
        ) : null}
        <div
          className={`${"border border-gray-300 flex flex-1 items-center my-2 rounded-lg shadow-sm"} ${
            isValid ? "border-red-600" : " "
          } ${
            props?.disabled
              ? "disabled:border-disabled disabled:text-disabled"
              : ""
          } `}
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
    </React.Fragment>
  );
};

export default InfiniteSelect;
