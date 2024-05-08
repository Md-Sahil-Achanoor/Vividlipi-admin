import { Field, Form, Formik, FormikHelpers } from "formik";
import { useEffect, useState } from "react";
import { BsArrowRightShort } from "react-icons/bs";
import { useNavigate, useParams } from "react-router-dom";
import { useAppSelector } from "../../../app/store";
import Loader from "../../../components/atoms/Loader";
import { Card } from "../../../components/base/Card";
import CheckboxGroup from "../../../components/elements/InputComponents/CheckboxGroup";
import CustomInput from "../../../components/elements/InputComponents/CustomInput";
import InfiniteSelect from "../../../components/elements/InputComponents/InfiniteSelect";
import InputSelect from "../../../components/elements/InputComponents/InputSelect";
import InputTagComponent from "../../../components/elements/InputComponents/InputTagComponent";
import QuillComponent from "../../../components/elements/InputComponents/QuillComponent";
import { useGetCategoriesQuery } from "../../../feature/category/categoryQuery";
import {
  useGetProductByIdQuery,
  useManageProductMutation,
} from "../../../feature/product/productQuery";
import PageLayout from "../../../layout/PageLayout";
import { manageProductSchema } from "../../../models/product";
import {
  BreadCrumbItem,
  CategoryQuery,
  CategoryResponse,
  Product,
  ProductPayload,
} from "../../../types";
import { cn } from "../../../utils/twmerge";

const initialValues: Product = {
  book_title: "",
  cat1: null,
  cat2: null,
  thumbnail: "https://example.com/book_cover.jpg",
  description: "",
  author_name: "",
  publisher: "",
  release_date: "",
  digital_product_url: "",
  sale_price: "",
  sale_quantity: "",
  price: "",
  inventory: "",
  commission: "",
  first_year_commission: "",
  second_year_commission: "",
  there_after_commission: "",
  commission_goes_to: "",
  tax: "",
  shipping: "",
  genre: "",
  tags: [],
  book_format: 1,
  translated: "No", //Yes/No
  translator_name: "",
  language: "",
  category: [],
  allow_comments: "No", // Yes/No
};

const ManageProduct = () => {
  const { id } = useParams();
  const router = useNavigate();
  // const [values] = useState<Product | null>(null);
  const { selectedProduct } = useAppSelector((state) => state.product);
  const [category2, setCategory2] = useState<CategoryResponse | null>(null);
  const breadcrumbItem: BreadCrumbItem[] = [
    {
      name: "Product List",
      link: "/admin/products/product-list",
    },
    {
      name: id ? "Edit Product" : "Create Product",
      link: "#",
    },
  ];

  const { isLoading: loading, refetch } = useGetProductByIdQuery(
    { query: { id } },
    { skip: !id }
  );

  const [manageProduct, { isLoading }] = useManageProductMutation();

  const onSubmit = (
    values: Product,
    { setSubmitting, resetForm }: FormikHelpers<Product>
  ) => {
    // console.log(values);
    // setSubmitting(false);
    let body: ProductPayload = {
      ...values,
      cat1: values.cat1?.id as number,
      cat2: values.cat2?.id as number,
      translator_name:
        values?.translated === "Yes" ? values?.translator_name : null,
      category: [],
    };
    let query: Partial<CategoryQuery> = {};
    if (!id) {
      query = {
        id,
      };
    }
    manageProduct({
      data: body,
      options: { router, setSubmitting, resetForm },
      query,
      id,
    });
  };

  const {
    isLoading: categoryLoading,
    refetch: categoryRefetch,
    data: categoryList,
    isError: categoryIsError,
    error: categoryErrorMessage,
  } = useGetCategoriesQuery({
    conditions: {
      type: "category1",
    },
  });

  const getQuery = () => {
    let query: Partial<CategoryQuery> = {};
    if (category2) {
      query = {
        cat1: category2?.id,
      };
    }
    return query;
  };

  const {
    isLoading: category2Loading,
    refetch: category2Refetch,
    data: category2List,
    isError: category2IsError,
    error: category2ErrorMessage,
  } = useGetCategoriesQuery(
    {
      query: getQuery(),
      conditions: {
        type: "category2",
      },
    },
    {
      skip: category2 === null,
    }
  );

  useEffect(() => {
    if (category2) {
      category2Refetch();
    }
    categoryRefetch();
  }, [category2]);

  useEffect(() => {
    if (id) {
      refetch();
    }
  }, [id]);

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
                initialValues={selectedProduct || initialValues}
                validationSchema={manageProductSchema}
                onSubmit={onSubmit}
                enableReinitialize
              >
                {({ isSubmitting, values, setFieldValue }) => (
                  <Form>
                    {/* {console.log(values)} */}
                    <div className="mt-5">
                      <Field
                        name="book_title"
                        label={"Book title"}
                        horizontal
                        type="text"
                        component={CustomInput}
                        tooltip="Book title"
                        placeholder="Type your products name"
                        isRequired
                      />
                      <div>
                        <Field
                          label={"Category"}
                          name="cat1"
                          isRequired
                          renderData={categoryList?.data}
                          isLoading={categoryLoading}
                          isError={categoryIsError}
                          errorMessage={categoryErrorMessage}
                          // reload={()}
                          // listRef={batchListRef}
                          horizontal
                          tooltip="Category"
                          renderItem={(item: CategoryResponse) => (
                            <span className="uppercase">{item?.title}</span>
                          )}
                          isActive={(item: CategoryResponse) =>
                            values?.cat1?.id === item?.id
                          }
                          renderName={() => {
                            return (
                              <span
                                className={cn(
                                  "text-sm text-gray-700 truncate",
                                  values?.cat1?.title && "uppercase"
                                )}
                              >
                                {values?.cat1?.title || "Select Category"}
                              </span>
                            );
                          }}
                          onChangeCallback={(item: CategoryResponse) => {
                            setFieldValue(`cat1`, item);
                            setCategory2(item);
                          }}
                          clearData={() => {
                            setFieldValue(`cat1`, null);
                            setFieldValue(`cat2`, null);
                            setCategory2(null);
                          }}
                          isSelected={values?.cat1 !== null}
                          component={InfiniteSelect}
                          isAuth
                        />
                      </div>

                      {values?.cat1 && (
                        <div>
                          <Field
                            label={"Sub Category"}
                            name="cat2"
                            isRequired
                            renderData={category2List?.data}
                            isLoading={category2Loading}
                            isError={category2IsError}
                            errorMessage={category2ErrorMessage}
                            // reload={()}
                            // listRef={batchListRef}
                            horizontal
                            tooltip="Category"
                            renderItem={(item: CategoryResponse) => (
                              <span className="uppercase">{item?.title}</span>
                            )}
                            isActive={(item: CategoryResponse) =>
                              values?.cat2?.id === item?.id
                            }
                            renderName={() => {
                              return (
                                <span
                                  className={cn(
                                    "text-sm text-gray-700 truncate",
                                    values?.cat2?.title && "uppercase"
                                  )}
                                >
                                  {values?.cat2?.title || "Select Category"}
                                </span>
                              );
                            }}
                            onChangeCallback={(item: CategoryResponse) => {
                              setFieldValue(`cat2`, item);
                            }}
                            clearData={() => {
                              setFieldValue(`cat2`, null);
                            }}
                            isSelected={values?.cat2 !== null}
                            component={InfiniteSelect}
                            isAuth
                          />
                        </div>
                      )}
                      {/* <Field
                        name="thumbnail"
                        label={"Thumbnail"}
                        horizontal
                        type="file"
                        component={CustomInput}
                        tooltip="Thumbnail"
                        placeholder="Upload thumbnail"
                        isRequired
                      /> */}
                      <Field
                        name="description"
                        label={"Description"}
                        horizontal
                        type="text"
                        component={QuillComponent}
                        tooltip="Description"
                        placeholder="Type your product description"
                        customClass={""}
                        classes="border rounded-xl border-black min-h-[150px]"
                        isRequired
                      />
                      <Field
                        name="author_name"
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
                        name="release_date"
                        label={"Release Date"}
                        horizontal
                        type="date"
                        component={CustomInput}
                        tooltip="Release Date"
                        placeholder="Type your products release date"
                        isRequired
                      />
                      <Field
                        name="digital_product_url"
                        label={"Digital Product URL"}
                        horizontal
                        type="text"
                        component={CustomInput}
                        tooltip="Digital Product URL"
                        placeholder="Type your products digital product URL"
                        isRequired
                      />
                      <Field
                        name="sale_price"
                        label={"Sale Price"}
                        horizontal
                        type="number"
                        component={CustomInput}
                        tooltip="Sale Price"
                        placeholder="Type your products sale price"
                        isRequired
                      />
                      <Field
                        name="sale_quantity"
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
                        name="first_year_commission"
                        label={"First Year Commission"}
                        horizontal
                        type="number"
                        component={CustomInput}
                        tooltip="First Year Commission"
                        placeholder="Type your products first year commission"
                        isRequired
                      />
                      <Field
                        name="second_year_commission"
                        label={"Second Year Commission"}
                        horizontal
                        type="number"
                        component={CustomInput}
                        tooltip="Second Year Commission"
                        placeholder="Type your products second year commission"
                        isRequired
                      />
                      <Field
                        name="there_after_commission"
                        label={"There After Commission"}
                        horizontal
                        type="number"
                        component={CustomInput}
                        tooltip="There After Commission"
                        placeholder="Type your products there after commission"
                        isRequired
                      />
                      <Field
                        name="commission_goes_to"
                        label={"Commission Goes To"}
                        horizontal
                        component={InputSelect}
                        items={[
                          { value: 1, name: "Author" },
                          { value: 2, name: "Publisher" },
                        ]}
                        tooltip="Commission Goes To"
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
                        component={InputTagComponent}
                        tooltip="Tags"
                        placeholder="Type your products tags"
                        isRequired
                      />
                      <Field
                        name="book_format"
                        label={"Book Format"}
                        horizontal
                        component={InputSelect}
                        items={[
                          { value: 1, name: "Physical" },
                          { value: 2, name: "E-book" },
                        ]}
                        tooltip="Book Format"
                        isRequired
                      />
                      <Field
                        name="translated"
                        label={"Translated"}
                        horizontal
                        component={InputSelect}
                        items={[
                          { value: "Yes", name: "Yes" },
                          { value: "No", name: "No" },
                        ]}
                        tooltip="Translated"
                        isRequired
                      />
                      {values?.translated === "Yes" && (
                        <Field
                          name="translator_name"
                          label={"Translator Name"}
                          horizontal
                          type="text"
                          component={CustomInput}
                          tooltip="Translator Name"
                          placeholder="Type your products translator name"
                          isRequired
                        />
                      )}
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

                      {/* <Field
                        name="category"
                        label={"Category"}
                        horizontal
                        type="text"
                        component={CustomInput}
                        tooltip="Category"
                        placeholder="Type your products category"
                        isRequired
                      /> */}

                      {/* <div>
                        <Field
                          label={"Category"}
                          name="category"
                          isRequired
                          renderData={categoryData}
                          isLoading={false}
                          isError={false}
                          errorMessage={""}
                          // reload={()}
                          // listRef={batchListRef}
                          horizontal
                          tooltip="Category"
                          renderItem={(item: CategoryResponse) => (
                            <>{item?.name}</>
                          )}
                          isActive={(item: CategoryResponse) =>
                            values?.category?.find(
                              (category) => category?.id === item?.id
                            )
                          }
                          renderName={() => (
                            <MultiSelectItem<CategoryResponse>
                              data={values?.category}
                              defaultName="Select Category"
                              displayName="name"
                              onClick={(item) => {
                                setFieldValue(
                                  "category",
                                  values?.category?.filter(
                                    (category) => category?.id !== item?.id
                                  )
                                );
                              }}
                            />
                          )}
                          onChangeCallback={(item: CategoryResponse) => {
                            // check unique item in array
                            let isUnique = values?.category?.find(
                              (category) => category?.id === item?.id
                            );
                            if (!isUnique) {
                              setFieldValue("category", [
                                ...values?.category,
                                item,
                              ]);
                            } else {
                              return;
                            }
                          }}
                          clearData={(item: CategoryResponse) => {
                            // find data and clear
                            let data = values?.category?.filter(
                              (category) => category?.id !== item?.id
                            );
                            setFieldValue("category", data);
                          }}
                          isSelected={false}
                          component={InfiniteSelect}
                          isAuth
                        />
                      </div> */}

                      <CheckboxGroup
                        name="allow_comments"
                        label="Allow Comments"
                        isMulti={false}
                        horizontal
                        tooltip="Allow Comments"
                        options={[
                          { key: "Yes", value: "Yes" },
                          { key: "No", value: "No" },
                        ]}
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
