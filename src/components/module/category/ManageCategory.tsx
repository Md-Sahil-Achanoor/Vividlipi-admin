import { Field, Form, Formik, FormikHelpers } from "formik";
import { BsArrowRightShort } from "react-icons/bs";
import { useAppDispatch, useAppSelector } from "../../../app/store";
import { useManageCategoryMutation } from "../../../feature/category/categoryQuery";
import { categoryAction } from "../../../feature/category/categorySlice";
import { coreAction } from "../../../feature/core/coreSlice";
import { categorySchema } from "../../../models/category";
import { ICategory } from "../../../types";
import CustomInput from "../../elements/InputComponents/CustomInput";
import CustomModal from "../../elements/common/CustomModal";

const initialValues: ICategory = {
  title: "",
};

const ManageCategory = () => {
  const { type, open } = useAppSelector((state) => state.core);
  const { singleCategory, selectedCategory } = useAppSelector(
    (state) => state.category
  );
  const [manageCategory, { isLoading }] = useManageCategoryMutation();
  const dispatch = useAppDispatch();
  const handleModal = (type: string) => {
    if (type === "cancelled") {
      // do nothing
      dispatch(coreAction.toggleModal({ open: false, type: "" }));
      dispatch(categoryAction.setSelectedCategory(null));
    }
  };
  console.log(
    `\n\n ~ ManageCategory ~ singleCategory:`,
    singleCategory,
    selectedCategory
  );

  const onSubmit = async (
    values: ICategory,
    { setSubmitting, resetForm }: FormikHelpers<ICategory>
  ) => {
    // console.log("values", values);
    await manageCategory({
      id: selectedCategory?.id as number,
      data: values,
      options: {
        setSubmitting,
        resetForm,
      },
    });
  };
  return (
    <CustomModal
      classes={
        type === "manage-category" && open
          ? {
              top: "visible",
              body: `-translate-y-[0%] max-w-[400px] p-3 min-w-[400px]`,
            }
          : {
              top: "invisible",
              body: "-translate-y-[300%] max-w-[400px] p-3 min-w-[400px]",
            }
      }
      handleModal={handleModal}
      wrapperClass="h-full"
      headText={selectedCategory?.id ? "Update Category" : "Create Category"}
      isModalHeader
      outSideClick
    >
      <div className="w-full h-full">
        <Formik
          initialValues={singleCategory || initialValues}
          validationSchema={categorySchema}
          onSubmit={onSubmit}
          enableReinitialize
        >
          {({ isSubmitting }) => (
            <Form noValidate>
              <div className="mt-2">
                <Field
                  name="title"
                  label={"Category Name"}
                  type="text"
                  component={CustomInput}
                  placeholder="Type here..."
                  isRequired
                />
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
                      {selectedCategory?.id ? "Update" : "Create"}
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
    </CustomModal>
  );
};

export default ManageCategory;
