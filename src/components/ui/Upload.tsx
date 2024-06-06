import { FileUploadProps } from "@/types";
import {
  acceptStyle,
  activeStyle,
  baseStyle,
  formatBytes,
  rejectStyle,
} from "@/utils/dropzone";
import React, { useCallback, useMemo } from "react";
import { DropzoneOptions, FileRejection, useDropzone } from "react-dropzone";
import toast from "react-hot-toast";

const singleFile = 1048576;
const UploadFile = ({
  onDropCallBack,
  dropZoneClass = "",
  acceptFile = {
    "image/jpg": [],
    "image/png": [],
    "image/jpeg": [],
  },
  isDisabled = false,
  isMultiple = false,
  dropText = "",
  reRender = false,
  isBrowse = true,
  imageDefault = false,
  maxFileSize = 5, // MB
}: FileUploadProps) => {
  const fileSizeLimit = maxFileSize * singleFile;

  const onDrop = useCallback(
    (acceptedFiles: File[], fileRejections: FileRejection[]) => {
      acceptedFiles.map((file: File) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
          formattedSize: formatBytes(file.size),
        })
      );
      let totalSize = 0;
      if (isMultiple) {
        totalSize = acceptedFiles.reduce((acc: number, file: File) => {
          return acc + file.size;
        }, 0);
      }
      if (totalSize > fileSizeLimit) {
        toast.error(`File size should not exceed ${maxFileSize}MB`);
        return;
      }
      onDropCallBack && onDropCallBack(acceptedFiles, fileRejections);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [reRender]
  );

  const options: DropzoneOptions = {
    accept: acceptFile,
    noClick: true,
    noKeyboard: true,
    // onDropAccepted,
    onDrop,
    minSize: 0,
    multiple: isMultiple,
    disabled: isDisabled,
    // maxSize: maxFileSize * 1000000,
  };

  if (maxFileSize) {
    options.maxSize = fileSizeLimit;
  }
  // console.log(`\n\n options:`, options);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
    open,
  } = useDropzone(options);

  const style: any = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isDragActive, isDragReject, isDragAccept]
  );

  return (
    <React.Fragment>
      <div
        className={dropZoneClass}
        style={{ cursor: isDisabled ? "not-allowed" : "pointer" }}
      >
        <div
          className="bg-bgClr-accentLight text-black"
          {...getRootProps({ style })}
        >
          <input {...getInputProps()} />
          <div
            className="flex items-center gap-1 justify-center p-5"
            style={{ flexDirection: imageDefault ? "column" : "row" }}
            onClick={open}
          >
            <div className="pointer_event" style={{ cursor: "pointer" }}>
              <svg
                width="25"
                height="24"
                viewBox="0 0 25 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M22.25 11C22.25 13.727 20.3139 16.097 17.6479 16.635C17.5979 16.645 17.548 16.65 17.499 16.65C17.149 16.65 16.8369 16.404 16.7649 16.048C16.6829 15.642 16.9461 15.246 17.3521 15.165C19.3221 14.768 20.75 13.016 20.75 11C20.75 8.656 18.844 6.75 16.5 6.75C16.217 6.75 15.9449 6.77503 15.6689 6.82703C15.3639 6.88503 15.0551 6.74801 14.8931 6.48401C14.6011 6.01301 14.2301 5.57298 13.7891 5.17798C12.7511 4.25798 11.404 3.75 10 3.75C6.829 3.75 4.25 6.329 4.25 9.5C4.25 11.828 5.63906 13.911 7.78906 14.808C8.17106 14.967 8.35089 15.407 8.19189 15.789C8.03189 16.172 7.59094 16.351 7.21094 16.192C4.50094 15.062 2.75 12.435 2.75 9.5C2.75 5.502 6.002 2.25 10 2.25C11.771 2.25 13.4721 2.89202 14.7871 4.05902C15.2071 4.43502 15.5761 4.84401 15.8911 5.28101C16.0921 5.26001 16.294 5.25 16.5 5.25C19.671 5.25 22.25 7.829 22.25 11ZM13.031 10.47C12.962 10.401 12.8791 10.346 12.7871 10.308C12.6041 10.232 12.3971 10.232 12.2141 10.308C12.1221 10.346 12.039 10.401 11.97 10.47L9.96997 12.47C9.67697 12.763 9.67697 13.238 9.96997 13.531C10.263 13.824 10.738 13.824 11.031 13.531L11.751 12.811V21C11.751 21.414 12.087 21.75 12.501 21.75C12.915 21.75 13.251 21.414 13.251 21V12.811L13.9709 13.531C14.1169 13.677 14.309 13.751 14.501 13.751C14.693 13.751 14.885 13.678 15.031 13.531C15.324 13.238 15.324 12.763 15.031 12.47L13.031 10.47Z"
                  fill="#525252"
                />
              </svg>
            </div>
            <h6 className="text-black">{dropText || "Drop files here"}</h6>
            {isBrowse && (
              <>
                <span className="text-muted">or </span>
                <span style={{ color: "#4458b8" }}>Choose File</span>
              </>
            )}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default UploadFile;
