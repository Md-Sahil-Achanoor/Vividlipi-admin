import { useAppDispatch, useAppSelector } from "@/app/store";
import CustomInput from "@/components/form/CustomInput";
import InfiniteSelect from "@/components/form/InfiniteSelect";
import Modal from "@/components/ui/Modal";
import { coreAction } from "@/feature/core/coreSlice";
import { useManageFeatureProductMutation } from "@/feature/home/homeQuery";
import { useGetProductsQuery } from "@/feature/product/productQuery";
import { IHomeFeatureProduct, featureSliderSchema } from "@/models/home";
import { ProductResponse } from "@/types";
import { cn } from "@/utils/twmerge";
import { Field, Form, Formik, FormikHelpers } from "formik";
import { useEffect } from "react";
import { BsArrowRightShort } from "react-icons/bs";

const initialValues: IHomeFeatureProduct = {
  productId: null,
  main: 0,
};

const ManageFeatureProduct = () => {
  const { type, open } = useAppSelector((state) => state.core);
  const { selectedFeatureProduct } = useAppSelector((state) => state.home);
  const [manageFeatureProduct, { isLoading }] =
    useManageFeatureProductMutation();

  const {
    isLoading: productLoading,
    refetch: productRefetch,
    data: productList,
    isError: productIsError,
    error: productErrorMessage,
  } = useGetProductsQuery({});
  console.log(
    `\n\n ~ ManageFeatureProduct ~ productList:`,
    productList,
    productErrorMessage
  );

  useEffect(() => {
    if (open && type === "manage-feature-product") {
      productRefetch();
    }
  }, [type]);

  const dispatch = useAppDispatch();
  const handleModal = (type: string) => {
    if (type === "cancelled") {
      // do nothing
      dispatch(coreAction.toggleModal({ open: false, type: "" }));
    }
  };

  const onSubmit = async (
    values: IHomeFeatureProduct,
    { setSubmitting, resetForm }: FormikHelpers<IHomeFeatureProduct>
  ) => {
    console.log("values", values);
    await manageFeatureProduct({
      id: selectedFeatureProduct?.id || "",
      data: {
        productId: values.productId?.id as number,
        main: values.main,
      },
      options: {
        setSubmitting,
        resetForm,
      },
    });
  };
  return (
    <Modal
      classes={
        type === "manage-feature-product" && open
          ? {
              top: "visible",
              body: `-translate-y-[0%] max-w-[500px] p-3 min-w-[500px]`,
            }
          : {
              top: "invisible",
              body: "-translate-y-[300%] max-w-[500px] p-3 min-w-[500px]",
            }
      }
      handleModal={handleModal}
      wrapperClass="h-full"
      headText={
        selectedFeatureProduct?.id
          ? "Update Feature Product"
          : "Create Feature Product"
      }
      isModalHeader
      outSideClick
    >
      <div className="w-full h-full">
        <Formik
          initialValues={null || initialValues}
          validationSchema={featureSliderSchema}
          onSubmit={onSubmit}
          enableReinitialize
        >
          {({ isSubmitting, setFieldValue, values }) => (
            <Form noValidate>
              <div className="mt-2">
                <div className="grid grid-cols-2 gap-2">
                  <div className="col-span-2">
                    <Field
                      label={"Product"}
                      name="productId"
                      isRequired
                      renderData={productList?.data || []}
                      isLoading={productLoading}
                      isError={productIsError}
                      errorMessage={"Failed to fetch products"}
                      renderItem={(item: ProductResponse) => (
                        <span className="uppercase">{item?.book_title}</span>
                      )}
                      isActive={(item: ProductResponse) =>
                        values?.productId?.id === item?.id
                      }
                      renderName={() => {
                        return (
                          <span
                            className={cn(
                              "text-sm text-gray-700 truncate",
                              values?.productId?.id && "uppercase"
                            )}
                          >
                            {values?.productId?.id || "Select Category"}
                          </span>
                        );
                      }}
                      onChangeCallback={(item: ProductResponse) => {
                        setFieldValue(`productId`, item);
                      }}
                      clearData={() => {
                        setFieldValue(`productId`, null);
                      }}
                      isSelected={values?.productId !== null}
                      component={InfiniteSelect}
                      isAuth
                    />
                  </div>
                  <div className="col-span-2">
                    <Field
                      name="main"
                      label="Main"
                      type="number"
                      component={CustomInput}
                      placeholder="Main"
                    />
                  </div>
                </div>
              </div>
              {/* <div className="flex"> */}
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
                      {false ? "Update" : "Create"}
                    </span>
                    <span className="text-2xl ml-1">
                      <BsArrowRightShort />
                    </span>
                  </>
                )}
              </button>
              {/* </div> */}
            </Form>
          )}
        </Formik>
      </div>
    </Modal>
  );
};

export default ManageFeatureProduct;
