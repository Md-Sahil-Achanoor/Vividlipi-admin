import * as Yup from "yup";

export const manageProductSchema = Yup.object({
  bookTitle: Yup.string().required("Book title is required"),
  thumbnail: Yup.string().required("Thumbnail is required"),
  description: Yup.string().required("Description is required"),
  authorName: Yup.string().required("Author name is required"),
  publisher: Yup.string().required("Publisher is required"),
  releaseDate: Yup.string().required("Release date is required"),
  digitalProductURL: Yup.string().required("Digital product URL is required"),
  salePrice: Yup.number()
    .min(0, "Negative value is not allowed")
    .required("Sale price is required"),
  saleQuantity: Yup.number()
    .min(0, "Negative value is not allowed")
    .required("Sale quantity is required"),
  price: Yup.number()
    .min(0, "Negative value is not allowed")
    .required("Price is required"),
  inventory: Yup.number()
    .min(0, "Negative value is not allowed")
    .required("Inventory is required"),
  commission: Yup.string().required("Commission is required"),
  firstYearCommission: Yup.number()
    .min(0, "Negative value is not allowed")
    .max(100, "Commission should be less than 100")
    .required("First year commission is required"),
  secondYearCommission: Yup.number()
    .min(0, "Negative value is not allowed")
    .max(100, "Commission should be less than 100")
    .required("Second year commission is required"),
  thereAfterCommission: Yup.number()
    .min(0, "Negative value is not allowed")
    .max(100, "Commission should be less than 100")
    .required("There after commission is required"),
  commissionGoesTo: Yup.string().required("Commission goes to is required"),
  tax: Yup.number()
    .min(0, "Negative value is not allowed")
    .required("Tax is required"),
  shipping: Yup.number()
    .min(0, "Negative value is not allowed")
    .required("Shipping is required"),
  genre: Yup.string().required("Genre is required"),
  tags: Yup.array().of(Yup.string()).required("Tags is required"),
  bookFormat: Yup.number().required("Book format is required"),
  translated: Yup.string().required("Translate is required"), //Yes/No
  translatorName: Yup.string().test({
    name: "translatorName",
    message: "Translator name is required",
    test: function (value) {
      if (this.parent.translated === "Yes") {
        return value !== "";
      }
      return true;
    },
  }),
  language: Yup.string().required("Language is required"),
  category: Yup.array().of(Yup.string()).required("Category is required"),
  allowComments: Yup.boolean().required("Allow comment is required"), // Yes/No
});
