import * as Yup from "yup";

export const manageProductSchema = Yup.object({
  book_title: Yup.string().required("Book title is required"),
  cat1: Yup.mixed()
    .nullable()
    .test({
      name: "cat1",
      message: "Category 1 is Required.",
      test: function (value) {
        return value !== null;
      },
    }),
  cat2: Yup.mixed()
    .nullable()
    .test({
      name: "cat2",
      message: "Category 2 is Required.",
      test: function (value) {
        return value !== null;
      },
    }),
  thumbnail: Yup.string().required("Thumbnail is required"),
  description: Yup.string().required("Description is required"),
  author_name: Yup.string().required("Author name is required"),
  publisher: Yup.string().required("Publisher is required"),
  release_date: Yup.string().required("Release date is required"),
  digital_product_url: Yup.string().required("Digital product URL is required"),
  sale_price: Yup.number()
    .min(0, "Negative value is not allowed")
    .required("Sale price is required"),
  sale_quantity: Yup.number()
    .min(0, "Negative value is not allowed")
    .required("Sale quantity is required"),
  price: Yup.number()
    .min(0, "Negative value is not allowed")
    .required("Price is required"),
  inventory: Yup.number()
    .min(0, "Negative value is not allowed")
    .required("Inventory is required"),
  commission: Yup.number()
    .min(0, "Negative value is not allowed")
    .max(100, "Commission should be less than 100")
    .required("Commission is required"),
  first_year_commission: Yup.number()
    .min(0, "Negative value is not allowed")
    .max(100, "Commission should be less than 100")
    .required("First year commission is required"),
  second_year_commission: Yup.number()
    .min(0, "Negative value is not allowed")
    .max(100, "Commission should be less than 100")
    .required("Second year commission is required"),
  there_after_commission: Yup.number()
    .min(0, "Negative value is not allowed")
    .max(100, "Commission should be less than 100")
    .required("There after commission is required"),
  commission_goes_to: Yup.string().required("Commission goes to is required"),
  tax: Yup.number()
    .min(0, "Negative value is not allowed")
    .required("Tax is required"),
  shipping: Yup.number()
    .min(0, "Negative value is not allowed")
    .required("Shipping is required"),
  genre: Yup.string().required("Genre is required"),
  tags: Yup.array().of(Yup.string()).required("Tags is required"),
  book_format: Yup.number().required("Book format is required"),
  translated: Yup.string().required("Translate is required"), //Yes/No
  translator_name: Yup.string().test({
    name: "translator_name",
    message: "Translator name is required",
    test: function (value) {
      if (this.parent.translated === "Yes") {
        return value ? true : false;
      }
      return true;
    },
  }),
  language: Yup.string().required("Language is required"),
  // category: Yup.array<CategoryResponse[]>().test({
  //   name: "category",
  //   message: "category is Required.",
  //   test: (value) => {
  //     return value?.filter((i) => i?.id).length !== 0 ? true : false;
  //   },
  // }),
  allow_comments: Yup.string().required("Allow comment is required"), // Yes/No
});

export type IManageProduct = Yup.InferType<typeof manageProductSchema>;
