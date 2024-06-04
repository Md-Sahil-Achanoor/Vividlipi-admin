import { useAppDispatch, useAppSelector } from "@/app/store";
import CustomInput from "@/components/form/CustomInput";
import FileUpload from "@/components/form/FileUpload";
import Modal from "@/components/ui/Modal";
import { coreAction } from "@/feature/core/coreSlice";
import { useManageFeatureSlideMutation } from "@/feature/home/homeQuery";
import { IHomeFeatureSlider, featureSliderSchema } from "@/models/home";
import { File } from "buffer";
import { Field, Form, Formik, FormikHelpers } from "formik";
import { BsArrowRightShort } from "react-icons/bs";

const initialValues: IHomeFeatureSlider = {
  text: "",
  file: null,
  redirectUrl: "",
  contentpostionX: 0,
  contentpostionY: 0,
  type: 1,
  typeid: 1,
};

const ManageFeatureSlider = () => {
  const { type, open } = useAppSelector((state) => state.core);
  const [manageFeatureSlide, { isLoading }] = useManageFeatureSlideMutation();
  const dispatch = useAppDispatch();
  const handleModal = (type: string) => {
    if (type === "cancelled") {
      // do nothing
      dispatch(coreAction.toggleModal({ open: false, type: "" }));
    }
  };

  const onSubmit = async (
    values: IHomeFeatureSlider,
    { setSubmitting, resetForm }: FormikHelpers<IHomeFeatureSlider>
  ) => {
    console.log("values", values);
    setSubmitting(false);
    const fd = new FormData();
    for (const key in values) {
      fd.append(key, (values as any)[key] as string | Blob);
    }
    for (var pair of fd.entries()) {
      console.log(pair);
    }
    await manageFeatureSlide({
      id: "",
      data: fd,
      options: {
        setSubmitting,
        resetForm,
      },
    });
  };
  return (
    <Modal
      classes={
        type === "manage-feature-slider" && open
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
      headText={false ? "Update Feature Slide" : "Create Feature Slide"}
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
          {({ isSubmitting, setFieldValue }) => (
            <Form noValidate>
              <div className="mt-2">
                <div className="grid grid-cols-2 gap-2">
                  <div className="col-span-2">
                    <Field
                      name="text"
                      label="Text"
                      component={CustomInput}
                      placeholder="Text"
                    />
                  </div>
                  <div className="col-span-2">
                    <Field
                      name="redirectUrl"
                      label="Redirect Url"
                      component={CustomInput}
                      placeholder="Enter Url"
                    />
                  </div>
                  <div className="col-span-2">
                    <Field
                      name="file"
                      label="Image"
                      maxFileSize={2}
                      isUpload={false}
                      component={FileUpload}
                      uploadCallBack={(files: File[]) => {
                        const file = files?.[0];
                        // console.log("file", file);
                        if (file) {
                          setFieldValue("file", file);
                        }
                      }}
                      placeholder="Image"
                    />
                  </div>
                  <Field
                    name="contentpostionX"
                    label="Content Position X"
                    component={CustomInput}
                    placeholder="Enter position"
                  />
                  <Field
                    name="contentpostionY"
                    label="Content position Y"
                    component={CustomInput}
                    placeholder="Enter position"
                  />
                  {/* <Field
                    name="type"
                    label="Type"
                    component={CustomInput}
                    placeholder="Type"
                  />
                  <Field
                    name="typeid"
                    label="Typeid"
                    component={CustomInput}
                    placeholder="Typeid"
                  /> */}
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

export default ManageFeatureSlider;
