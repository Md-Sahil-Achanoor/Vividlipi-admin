import { ErrorMessage } from "formik";
import React, { FC } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { CustomInputCom } from "../../../types";
import TextError from "./TextError";

const CustomInput: FC<CustomInputCom> = ({
  field: { onChange, onBlur, ...rest },
  form,
  label,
  id,
  desc,
  isPassword,
  handleViewPassword,
  onChangeCallback,
  isRequired,
  onBlurCallback,
  leftIcon,
  rightIcon,
  className,
  ...props
}) => {
  const Input = () => {
    if (props.type === "textarea") {
      return (
        <textarea
          className={`input_filed`}
          autoComplete="false"
          onChange={(e) => {
            const data = e;
            onChangeCallback && onChangeCallback(data);
            onChange && onChange(e);
          }}
          onBlur={(e) => {
            const data = e;
            onBlurCallback && onBlurCallback(data);
            onBlur(e);
          }}
          {...rest}
          {...props}
        />
      );
    } else {
      return (
        <input
          id={id}
          className={`input_filed ${className ? className : ""}`}
          autoComplete="false"
          onWheel={(e) => e?.currentTarget?.blur()}
          onKeyDown={(evt) =>
            props?.type === "number"
              ? ["e", "E", "+", "ArrowDown", "ArrowUp"].includes(evt.key) &&
                evt.preventDefault()
              : {}
          }
          onChange={(e) => {
            const data = e;
            onChangeCallback && onChangeCallback(data);
            onChange && onChange(e);
          }}
          onBlur={(e) => {
            const data = e;
            onBlurCallback && onBlurCallback(data);
            onBlur(e);
          }}
          {...rest}
          {...props}
        />
      );
    }
  };
  const isValid =
    form.touched[rest.name] && form.errors[rest.name] && !props.disabled
      ? true
      : false;
  return (
    <React.Fragment>
      <div className={"w-full mb-4"}>
        {label ? (
          <label className="text-gray-600 text-[14px]" htmlFor={id}>
            {label}
            {isRequired ? (
              <span className="text-red-600 ml-[1px]">{"*"}</span>
            ) : null}
            {desc ? (
              <span style={{ color: "#9CA3AF", fontSize: "10px" }}>
                {" " + desc}
              </span>
            ) : null}
          </label>
        ) : null}
        <div
          className={`border border-gray-300 flex flex-1 items-center px-3 py-1 my-2 rounded-lg shadow-sm ${
            isValid ? "border-red-600" : ""
          }`}
        >
          {leftIcon && leftIcon()}
          {Input()}
          {rightIcon && rightIcon()}
          {isPassword ? (
            <span
              className="mx-1 cursor-pointer text-lg text-gray-500"
              style={{
                border: isPassword ? "none" : "",
              }}
              onClick={handleViewPassword}
            >
              {props.type === "text" ? <AiFillEye /> : <AiFillEyeInvisible />}
            </span>
          ) : null}
        </div>
        <ErrorMessage name={rest.name}>
          {(msg) => <TextError text={msg} />}
        </ErrorMessage>
      </div>
    </React.Fragment>
  );
};

export default CustomInput;
