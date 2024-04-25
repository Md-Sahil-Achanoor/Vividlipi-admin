import { useField } from "formik";
import { useRef } from "react";
import toast from "react-hot-toast";
import { useAppSelector } from "../app/store";
import { endpoints } from "../constants/api/endpoints";
import { useUploadMutation } from "../feature/common/commonQuery";

interface Props {
  uploadCallBack: (value: boolean) => void;
  isMultiple?: boolean;
  isSingleArray?: boolean;
  name: string;
  values: any;
  callBack?: (value: any) => void;
}

interface ReturnProps {
  onUploadFile: (file: any) => Promise<void>;
  isLoading?: boolean;
  ref?: React.MutableRefObject<HTMLInputElement | null>;
  progress?: number;
}

const useFileUploader = ({
  uploadCallBack,
  isMultiple = false,
  isSingleArray = false,
  name,
  values,
  callBack,
}: Props): ReturnProps => {
  const { progress } = useAppSelector((state) => state.common);
  const ref = useRef<HTMLInputElement | null>(null);
  const [, , helpers] = useField({ name });
  const [upload, { isLoading, reset }] = useUploadMutation();

  const onUploadFile = async (file: File[]) => {
    // console.log(`\n\n file:`, file);
    try {
      const res: string[] = [];
      uploadCallBack && uploadCallBack(true);
      for (let i = 0; i < file.length; i++) {
        const el = file[i];
        const formData = new FormData();
        formData.append("image", el);
        const image: any = await upload({
          url: endpoints.imageUpload,
          data: formData,
        }).unwrap();
        // console.log(`\n\n image:`, image);
        res.push(image?.path);
      }
      if (isMultiple) {
        helpers.setValue([...values?.[name], ...res]);
      } else {
        // console.log(`\n\n res:`, res);
        helpers.setValue(isSingleArray ? res : res?.[0]);
      }
      callBack && callBack(res);
      // console.log(`\n\n  name:`, name, res);
    } catch (err: unknown) {
      // const error = err as ErrorType;
      toast.error("Upload file failed");
    } finally {
      uploadCallBack && uploadCallBack(false);
      reset();
      // console.log(`\n\n reset:`);
      if (ref?.current) {
        ref.current.value = "";
      }
    }
  };

  return { onUploadFile, isLoading, ref, progress };
};

export default useFileUploader;
