import { ErrorMessage } from "formik";
import React from "react";
import { FaRegQuestionCircle } from "react-icons/fa";
import { cn } from "../../../utils/twmerge";
import Quill from "../editor/Quill";
import TextError from "./TextError";

const QuillComponent = ({
  label,
  id,
  field: { name, onChange, onBlur, ...rest },
  form: { setFieldTouched, ...form },
  isRequired,
  ...props
}: any) => {
  // console.log(`\n\n ~ file: QuillComponent.tsx:14 ~ rest:`, name, rest, form);
  const isValid =
    form.touched[rest.name] && form.errors[rest.name] && !props.disabled
      ? true
      : false;
  return (
    <React.Fragment>
      <div
        className={cn(
          "w-full mb-4",
          props.horizontal && "flex justify-center items-center gap-4 mb-3"
        )}
      >
        <div
          className={cn(
            "w-initial",
            props.horizontal &&
              "w-full lg:w-4/12 p-0 INPUT_DIV flex items-center justify-end "
          )}
        >
          {label ? (
            <label
              className={cn(
                "text-black text-[14px]",
                isRequired &&
                  props?.horizontal &&
                  "flex items-center gap-1 font-medium"
              )}
              htmlFor={id}
            >
              {isRequired && props?.horizontal ? (
                <span className="text-red-600 ml-[1px]">{"*"}</span>
              ) : null}
              {label}
              {isRequired && !props?.horizontal ? (
                <span className="text-red-600 ml-[1px]">{"*"}</span>
              ) : null}
            </label>
          ) : null}
          {props.horizontal && props.tooltip && (
            <FaRegQuestionCircle className="text-2xl ml-2" />
          )}
        </div>
        <div className={cn(props?.horizontal ? "w-full lg:w-8/12" : "w-full")}>
          <div
            className={cn(
              "w-full",
              isValid ? "!border-red-600" : "",
              props?.classes
            )}
          >
            <Quill
              id={id}
              onChange={(e) => onChange({ target: { value: e, name } })}
              onBlur={() => setFieldTouched(name, true)}
              {...props}
              {...rest}
            />
          </div>
          <ErrorMessage name={name}>
            {(msg) => <TextError text={msg} />}
          </ErrorMessage>
        </div>
      </div>
    </React.Fragment>
  );
};

export default QuillComponent;
