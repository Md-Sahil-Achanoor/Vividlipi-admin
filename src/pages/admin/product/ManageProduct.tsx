import { Field, Form, Formik } from "formik";
import { useState } from "react";
import { BsArrowRightShort } from "react-icons/bs";
import { useParams } from "react-router-dom";
import Loader from "../../../components/atoms/Loader";
import { Card } from "../../../components/base/Card";
import CustomInput from "../../../components/elements/InputComponents/CustomInput";
// import {
//   useGetSalesmanByIdQuery,
//   useManageProductMutation,
// } from "../../../feature/salesman/salesmanQuery";
import QuillComponent from "../../../components/elements/InputComponents/QuillComponent";
import PageLayout from "../../../layout/PageLayout";
import { manageProductSchema } from "../../../models/product";
import { BreadCrumbItem } from "../../../types";
import { IProduct } from "../../../types/product";
// import { manageSalesmanSchema } from "../../../models/salesman";
// import { BreadCrumbItem, FormikSubmitOption, any } from "../../../types";

const initialValues: IProduct = {
  bootTitle: "",
  thumbnail: "",
  description: "",
  authorName: "",
  publisher: "",
  releaseDate: "",
  digitalProductURL: "",
  salePrice: "",
  saleQuantity: "",
  price: "",
  inventory: "",
  commission: "",
  firstYearCommission: "",
  secondYearCommission: "",
  thereAfterCommission: "",
  commissionGoesTo: "",
  tax: "",
  shipping: "",
  genre: "",
  tags: [""],
  bookFormat: 1,
  translated: "", //Yes/No
  translatorName: "",
  language: "",
  category: [],
  allowComments: false, // Yes/No
};

const ManageProduct = () => {
  const { id } = useParams();
  const [values] = useState<any | null>(null);
  const breadcrumbItem: BreadCrumbItem[] = [
    {
      name: "Product List",
      link: "/admin/products",
    },
    {
      name: id ? "Edit Product" : "Create Product",
      link: "#",
    },
  ];

  // const router = useNavigate();
  const loading = false;
  //   const {
  //     isLoading: loading,
  //     data,
  //     refetch,
  //   } = useGetSalesmanByIdQuery({ query: { id } }, { skip: !id });

  //   const [manageSalesman, { isLoading }] = useManageProductMutation();
  const isLoading = false;

  const onSubmit = () =>
    // values: any
    // { setSubmitting, resetForm }: FormikSubmitOption
    {
      // let { passwordConfirm, Password, ...data } = values;
      // let query = {};
      // let body: any = { ...data };
      // if (!id) {
      //   body.Password = Password;
      // }
      // if (id) {
      //   query = { id };
      // }
      // manageSalesman({
      //   data: body,
      //   options: { router, setSubmitting, resetForm },
      //   query,
      //   id,
      // });
    };

  return (
    <PageLayout
      title={id ? "Edit Product" : "Create Product"}
      breadcrumbItem={breadcrumbItem}
    >
      <Card className="border rounded-md">
        <div className="max-w-screen-lg mx-auto">
          {/* <h3 className="text-center text-2xl font-semibold text-pink-500">
            Create Product
          </h3> */}
          {id && loading ? (
            <Loader />
          ) : (
            <div>
              <Formik
                initialValues={values || initialValues}
                validationSchema={manageProductSchema}
                onSubmit={onSubmit}
                enableReinitialize
              >
                {({ isSubmitting }) => (
                  <Form>
                    <div className="mt-5">
                      <Field
                        name="bookTitle"
                        label={"Book title"}
                        horizontal
                        type="text"
                        component={CustomInput}
                        tooltip="Book title"
                        placeholder="Type your products name"
                        isRequired
                      />

                      <Field
                        name="thumbnail"
                        label={"Thumbnail"}
                        horizontal
                        type="file"
                        component={CustomInput}
                        tooltip="Thumbnail"
                        placeholder="Upload thumbnail"
                        isRequired
                      />

                      <Field
                        name="description"
                        label={"Description"}
                        horizontal
                        type="text"
                        component={QuillComponent}
                        tooltip="Description"
                        placeholder="Type your product description"
                        customClass={""}
                        classes="border rounded-xl shadow-sm border-gray-200 min-h-[150px]"
                        isRequired
                      />

                      <Field
                        name="authorName"
                        label={"Author Name"}
                        horizontal
                        type="text"
                        component={CustomInput}
                        tooltip="Author Name"
                        placeholder="Type your products author name"
                        isRequired
                      />

                      <Field
                        name="publisher"
                        label={"Publisher"}
                        horizontal
                        type="text"
                        component={CustomInput}
                        tooltip="Publisher"
                        placeholder="Type your products publisher"
                        isRequired
                      />

                      <Field
                        name="releaseDate"
                        label={"Release Date"}
                        horizontal
                        type="date"
                        component={CustomInput}
                        tooltip="Release Date"
                        placeholder="Type your products release date"
                        isRequired
                      />

                      <Field
                        name="digitalProductURL"
                        label={"Digital Product URL"}
                        horizontal
                        type="text"
                        component={CustomInput}
                        tooltip="Digital Product URL"
                        placeholder="Type your products digital product URL"
                        isRequired
                      />

                      <Field
                        name="salePrice"
                        label={"Sale Price"}
                        horizontal
                        type="number"
                        component={CustomInput}
                        tooltip="Sale Price"
                        placeholder="Type your products sale price"
                        isRequired
                      />

                      <Field
                        name="saleQuantity"
                        label={"Sale Quantity"}
                        horizontal
                        type="number"
                        component={CustomInput}
                        tooltip="Sale Quantity"
                        placeholder="Type your products sale quantity"
                        isRequired
                      />

                      <Field
                        name="price"
                        label={"Price"}
                        horizontal
                        type="number"
                        component={CustomInput}
                        tooltip="Price"
                        placeholder="Type your products price"
                        isRequired
                      />

                      <Field
                        name="inventory"
                        label={"Inventory"}
                        horizontal
                        type="number"
                        component={CustomInput}
                        tooltip="Inventory"
                        placeholder="Type your products inventory"
                        isRequired
                      />

                      <Field
                        name="commission"
                        label={"Commission"}
                        horizontal
                        type="number"
                        component={CustomInput}
                        tooltip="Commission"
                        placeholder="Type your products commission"
                        isRequired
                      />

                      <Field
                        name="firstYearCommission"
                        label={"First Year Commission"}
                        horizontal
                        type="number"
                        component={CustomInput}
                        tooltip="First Year Commission"
                        placeholder="Type your products first year commission"
                        isRequired
                      />

                      <Field
                        name="secondYearCommission"
                        label={"Second Year Commission"}
                        horizontal
                        type="number"
                        component={CustomInput}
                        tooltip="Second Year Commission"
                        placeholder="Type your products second year commission"
                        isRequired
                      />

                      <Field
                        name="thereAfterCommission"
                        label={"There After Commission"}
                        horizontal
                        type="number"
                        component={CustomInput}
                        tooltip="There After Commission"
                        placeholder="Type your products there after commission"
                        isRequired
                      />

                      <Field
                        name="commissionGoesTo"
                        label={"Commission Goes To"}
                        horizontal
                        type="text"
                        component={CustomInput}
                        tooltip="Commission Goes To"
                        placeholder="Type your products commission goes to"
                        isRequired
                      />

                      <Field
                        name="tax"
                        label={"Tax"}
                        horizontal
                        type="number"
                        component={CustomInput}
                        tooltip="Tax"
                        placeholder="Type your products tax"
                        isRequired
                      />

                      <Field
                        name="shipping"
                        label={"Shipping"}
                        horizontal
                        type="number"
                        component={CustomInput}
                        tooltip="Shipping"
                        placeholder="Type your products shipping"
                        isRequired
                      />

                      <Field
                        name="genre"
                        label={"Genre"}
                        horizontal
                        type="text"
                        component={CustomInput}
                        tooltip="Genre"
                        placeholder="Type your products genre"
                        isRequired
                      />

                      <Field
                        name="tags"
                        label={"Tags"}
                        horizontal
                        type="text"
                        component={CustomInput}
                        tooltip="Tags"
                        placeholder="Type your products tags"
                        isRequired
                      />

                      <Field
                        name="bookFormat"
                        label={"Book Format"}
                        horizontal
                        type="number"
                        component={CustomInput}
                        tooltip="Book Format"
                        placeholder="Type your products book format"
                        isRequired
                      />

                      <Field
                        name="translated"
                        label={"Translated"}
                        horizontal
                        type="text"
                        component={CustomInput}
                        tooltip="Translated"
                        placeholder="Type your products translated"
                        isRequired
                      />

                      <Field
                        name="translatorName"
                        label={"Translator Name"}
                        horizontal
                        type="text"
                        component={CustomInput}
                        tooltip="Translator Name"
                        placeholder="Type your products translator name"
                        isRequired
                      />

                      <Field
                        name="language"
                        label={"Language"}
                        horizontal
                        type="text"
                        component={CustomInput}
                        tooltip="Language"
                        placeholder="Type your products language"
                        isRequired
                      />

                      <Field
                        name="category"
                        label={"Category"}
                        horizontal
                        type="text"
                        component={CustomInput}
                        tooltip="Category"
                        placeholder="Type your products category"
                        isRequired
                      />

                      <Field
                        name="allowComments"
                        label={"Allow Comments"}
                        horizontal
                        type="text"
                        component={CustomInput}
                        tooltip="Allow Comments"
                        placeholder="Type your products allow comments"
                        isRequired
                      />
                    </div>
                    <div className="flex justify-end">
                      <button
                        type="submit"
                        className="button_primary"
                        disabled={isSubmitting || isLoading}
                      >
                        {isLoading || isSubmitting ? (
                          <>
                            <span className="w-5 h-5 border-2 animate-spin rounded-full border-transparent border-t-white mr-2"></span>
                            <span className="font-medium">Processing</span>
                          </>
                        ) : (
                          <>
                            <span className="font-medium">
                              {id ? "Update" : "Create"}
                            </span>
                            <span className="text-2xl ml-1">
                              <BsArrowRightShort />
                            </span>
                          </>
                        )}
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          )}
        </div>
      </Card>
    </PageLayout>
  );
};

export default ManageProduct;
