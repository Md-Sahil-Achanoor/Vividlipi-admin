import * as Yup from "yup";

export const featureSliderSchema = Yup.object({
  text: Yup.string().required("Name is Required"),
  file: Yup.mixed()
    .nullable()
    .test({
      name: "file",
      message: "Image is required",
      test: function (value) {
        return value !== null;
      },
    }),
  redirectUrl: Yup.string().required("Redirect URL is Required"),
  contentpostionX: Yup.number().required("Position X is Required"),
  contentpostionY: Yup.number().required("Position Y is Required"),
  type: Yup.number(),
  typeid: Yup.number(),
});

export type IHomeFeatureSlider = Yup.InferType<typeof featureSliderSchema>;
