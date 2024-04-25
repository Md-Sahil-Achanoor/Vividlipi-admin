import { ErrorMessage } from "formik";
import React from "react";
import { InputSelect as InputSelectType, OptionValue } from "../../../types";
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
  ...props
}: InputSelectType<T>) => {
  // const isCustom = isPassword || isTel;
  const isValid =
    touched[rest.name] && errors[rest.name] && !props.disabled ? true : false;
  return (
    <React.Fragment>
      <div className={"w-full mb-4"}>
        {label ? (
          <label className="text-gray-600 text-[14px]" htmlFor={id}>
            {label}
            {isRequired ? (
              <span className="text-red-600 ml-[1px]">{" *"}</span>
            ) : null}
          </label>
        ) : null}
        <div
          className={`border border-gray-300 flex flex-1 items-center px-3 py-1 my-2 rounded-lg focus-within:bg-white focus-within:border-gray-300 border-b-2
          ${isValid ? "border-error_color" : "border-form_border"}`}
        >
          <select
            id={id}
            className={`w-full h-full py-2.5 outline-none text-gray-600 text-sm placeholder:text-gray-500`}
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
    </React.Fragment>
  );
};

export default InputSelect;
