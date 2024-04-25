import * as Yup from "yup";

// const MAX_FILE_SIZE = 102400; //100KB

// const validFileExtensions = ["csv", "xlxs"];

// function isValidFileType(fileName: string) {
//   return (
//     fileName && validFileExtensions.indexOf(fileName?.split(".").pop()) > -1
//   );
// }

interface FileType extends File {}

export const bulkUploadSchema = Yup.object({
  image: Yup.mixed<FileType>().nullable().required("File is required"),
  type: Yup.string().required("Type is required"),
  operatorId: Yup.mixed()
    .nullable()
    .test("operatorId", "Operator Id is required.", (value, context) => {
      const { type } = context.parent;
      if (type === "Pos") {
        return value !== null;
      } else {
        return true;
      }
    }),
});
