import { productBulkUploadSchema } from "@/models/product";
import moment from "moment";
import { BulkProduct, BulkUploadReturn } from "../../types";
import { ExcelDateToJSDate, formatDate } from "../time";
import validateSchema from "../validateSchema";

export const sampleProduct: Omit<BulkProduct, "url_slug">[] = [
  {
    book_title: "",
    category1: "",
    category2: "",
    thumbnail: "https://example.com/book_cover.jpg",
    description: "",
    author_name: "",
    publisher: "",
    release_date: "",
    digital_product_url: "",
    sale_price: 0,
    sale_quantity: 0,
    price: 0,
    inventory: 0,
    commission: 0,
    first_year_commission: 0,
    second_year_commission: 0,
    there_after_commission: 0,
    commission_goes_to: "1",
    tax: 0,
    shipping: 0,
    genre: "",
    tags: "",
    book_format: 1,
    translated: "No", //Yes/No
    translator_name: "",
    language: "",
    allow_comments: "No", // Yes/No
  },
];

const checkProduct = async <T extends BulkProduct>(
  products: T[]
): Promise<BulkUploadReturn<BulkProduct>> => {
  let failed = "";
  let message = "";
  let isSuccess = false;
  let result: T[] = [];
  let errors: string[] = [];
  for (let i = 0; i < products.length; i++) {
    const product = products[i];
    // console.log(`\n\n ~ product:`, product);
    let obj: Partial<T> = { ...product };

    let isDate = true;
    let isMomentValidate =
      typeof product?.release_date === "string"
        ? moment(product?.release_date).isValid()
        : false;
    if (
      (Number(product?.release_date) < 1 &&
        typeof product?.release_date !== "number") ||
      (!isMomentValidate && typeof product?.release_date === "string")
    ) {
      message = `invalid release date in ${
        i + 2
      }. format should be YYYY/MM/DD or YYYY-MM-DD`;
      isDate = false;
      break;
    }

    obj.release_date = isMomentValidate
      ? formatDate(String(product?.release_date)?.trim(), "YYYY-MM-DD")
      : isDate
      ? formatDate(
          ExcelDateToJSDate(Number(product?.release_date)),
          "YYYY-MM-DD"
        )
      : "";

    const validate = await validateSchema(productBulkUploadSchema, product);

    let tags = [];
    const tagsValue = product?.tags as string;
    // console.log(`\n\n dob:`, obj.dob);
    if (typeof tagsValue !== "string") {
      message = `Tags name invalid in row ${i + 2}`;
      break;
    }

    const validJSONString = String(tagsValue)?.replace(/'/g, '"');
    try {
      // console.log(`\n\n validJSONString:`, validJSONString);
      tags = validJSONString?.split(",")?.map((item) => item?.trim());
    } catch (error) {
      message = `Tags name invalid in row ${i + 2}`;
      break;
    }
    // console.log(`\n\n tags:`, tags);
    if (!tags?.length) {
      message = `Tags name invalid in row ${i + 2}`;
      break;
    }

    if (validate?.errors?.length) {
      errors = [`Error in row ${i + 2}`, ...validate?.errors];
      // if (message) errors = [...errors, message];
      break;
    }
    // obj.status = product?.status;
    delete obj.category1;
    delete obj.category2;
    let slug = product?.book_title
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, "");
    obj.url_slug = slug;
    obj.tags = tags as any;
    obj.category = [];
    obj.cat1 = product?.category1;
    obj.cat2 = product?.category2;

    result.push(obj as T);
  }
  return { failed, result, message, isSuccess, errors };
};

export { checkProduct };
