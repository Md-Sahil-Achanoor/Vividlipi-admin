import { InputSelect as InputSelectType, OptionValue } from "@/types";
import { cn } from "@/utils/twmerge";
import { ErrorMessage } from "formik";
import React from "react";
import { FaRegQuestionCircle } from "react-icons/fa";
import TextError from "./TextError";

const InputSelect = <T extends OptionValue>({
  field: { onChange, ...rest },
  form: { touched, errors },
  label,
  id,
  onChangeCallback,
  isRequired,
  items,
  className,
  horizontal,
  tooltip,
  ...props
}: InputSelectType<T>) => {
  // const isCustom = isPassword || isTel;
  const isValid =
    touched[rest.name] && errors[rest.name] && !props.disabled ? true : false;
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
              `border border-black flex flex-1 items-center px-3 py-1 my-2 rounded-lg focus-within:border-black `,
              isValid ? "border-red-600" : ""
            )}
          >
            <select
              id={id}
              className={`w-full h-full py-2 outline-none text-sm`}
              onChange={(e) => {
                const data = e;
                onChangeCallback && onChangeCallback(data);
                onChange && onChange(e);
              }}
              {...rest}
              {...props}
            >
              <option value="">Select...</option>
              {items?.map((el, idx) => (
                <option value={el?.value} key={idx}>
                  {el?.name}
                </option>
              ))}
            </select>
          </div>
          <ErrorMessage name={rest.name}>
            {(msg) => <TextError text={msg} />}
          </ErrorMessage>
        </div>
      </div>
    </React.Fragment>
  );
};

export default InputSelect;
