import * as Yup from "yup";

export const categorySchema = Yup.object({
  title: Yup.string().required("Title is required"),
});

export type IManageCategory = Yup.InferType<typeof categorySchema>;

export const subCategorySchema = Yup.object({
  title: Yup.string().required("Title is required"),
  category: Yup.mixed()
    .nullable()
    .test({
      name: "category",
      message: "Category is Required.",
      test: function (value) {
        return value !== null;
      },
    }),
});

export type IManageSubCategory = Yup.InferType<typeof subCategorySchema>;
