import FileUpload from "@/components/form/FileUpload";
import { BulkProduct, BulkUploadReturn, FormikSubmitOption } from "@/types";
import { checkProduct, sampleProduct } from "@/utils/modules";
import { Field, Form, Formik, FormikProps } from "formik";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { useAppDispatch, useAppSelector } from "../../../app/store";
import { endpoints } from "../../../constants/endpoints";
import { useBulkUploadMutation } from "../../../feature/common/commonQuery";
import { coreAction } from "../../../feature/core/coreSlice";
import useExcelReader from "../../../hooks/useExcelReader";
import { bulkUploadSchema } from "../../../models/Common";
import { bulkUploadPayload } from "../../../types/common/common";
import { downloadXlsx } from "../../../utils/excel";
import CustomModal from "../../ui/Modal";

interface FileUploadType {
  image: File | null;
  type: string;
}

const initialValues: FileUploadType = {
  image: null,
  type: "",
};

interface Props {
  uploadType: string;
}

const BulkUpload = ({ uploadType }: Props) => {
  const dispatch = useAppDispatch();
  const [erros, setErrors] = useState<string[]>([]);
  const { items, readExcel, setItems } = useExcelReader();
  // const [file, setFile] = useState<File | null>(null);
  const [bulkUpload, { isLoading }] = useBulkUploadMutation();
  console.log(`\n\n items:`, items);
  const formRef = useRef<FormikProps<FileUploadType>>(null);
  // const [values, setValues] = useState<FileUploadType | null>(null);
  const { type } = useAppSelector((state) => state.core);

  const toggleModal = () => {
    dispatch(coreAction.toggleModal({ open: false, type: "" }));
    formRef.current?.resetForm();
  };

  const onSubmit = async (
    _values: FileUploadType,
    { setSubmitting }: FormikSubmitOption
  ) => {
    try {
      setErrors([]);
      if (!items.length) {
        return toast.error("Your file is empty or you have not uploaded yet");
      }
      let check: BulkUploadReturn<BulkProduct> = {
        failed: "",
        isSuccess: false,
        message: "",
        result: [],
        errors: [],
      };
      if (uploadType === "product") {
        check = await checkProduct<BulkProduct>(items);
      }

      if (check?.errors?.length) {
        setErrors(check?.errors);
        return;
      }
      if (check?.failed || check?.message) {
        toast.error(check?.message);
        setSubmitting(false);
        return;
      }
      let body = { ...check?.result } as bulkUploadPayload;

      await bulkUpload({
        data: body,
        query: {
          endpoint: endpoints.import_product,
          type: uploadType,
        },
        options: {
          setSubmitting,
          resetForm: () => {
            setItems([]);
            formRef.current?.resetForm();
          },
        },
      });
    } catch (error: any) {
      toast.error(error?.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <CustomModal
      //   onClose={() => toggleModal()}
      handleModal={() => toggleModal()}
      //   isHeading={true}
      headText="Bulk Upload"
      classes={
        type === "bulk-upload"
          ? {
              top: "visible",
              body: "-translate-y-[0%] !p-7",
            }
          : { top: "invisible", body: "-translate-y-[300%] p-3" }
      }
      outSideClick
      isModalHeader
    >
      <div className="bg-white min-w-[500px] max-w-[500px]">
        <div className="bg-tertiary px-5 py-5 flex justify-center rounded-sm mb-5 mt-3">
          <span className="flex text-content-tertiary items-center gap-1">
            Don’t know the format?
            <button
              onClick={() => {
                if (uploadType === "product") {
                  downloadXlsx<Partial<BulkProduct>>(
                    sampleProduct,
                    "product-sample-template.xlsx"
                  );
                }
              }}
              className="text-content-info underline cursor-pointer"
            >
              Download now
            </button>
          </span>
        </div>
        <Formik
          initialValues={{
            ...initialValues,
            type: uploadType,
          }}
          validationSchema={bulkUploadSchema}
          onSubmit={onSubmit}
          enableReinitialize={true}
          innerRef={formRef}
        >
          {({ isSubmitting, setFieldValue }) => (
            <Form className="mt-2 w-full">
              {/* {console.log("values", values, errors)} */}
              <div>
                <Field
                  name="image"
                  label={"Upload"}
                  type="file"
                  isSuggestion={false}
                  component={FileUpload}
                  dropText="To Upload Drag and Drop"
                  acceptFile={{
                    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
                      [],
                    "application/vnd.ms-excel": [],
                  }}
                  isMultiple={false}
                  isUpload={false}
                  uploadCallBack={(files: File[]) => {
                    // console.log(`\n\n files:`, files);
                    if (files?.length === 0) return;
                    const fileData = files?.[0];
                    readExcel(fileData);
                    setFieldValue("image", fileData);
                  }}
                  supportedString="csv, excel"
                  maxFileSize="10"
                />
              </div>

              <div className="my-3">
                <ul>
                  {erros?.map((item, index) => (
                    <li key={index} className="text-red-500">
                      {index !== 0 ? <span>{index}:</span> : null} {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 pt-8 border-t flex justify-end gap-2">
                <button
                  className="button_primary"
                  disabled={isSubmitting || isLoading}
                  type="submit"
                >
                  <span>
                    {isSubmitting || isLoading ? "Uploading..." : "Upload"}
                  </span>
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </CustomModal>
  );
};

export default BulkUpload;
