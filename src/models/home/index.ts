import * as Yup from 'yup'

export const featureSliderSchema = Yup.object({
  text: Yup.string().required('Name is Required'),
  file: Yup.mixed()
    .nullable()
    .test({
      name: 'file',
      message: 'Image is required',
      test(value) {
        return value !== null
      },
    }),
  redirectUrl: Yup.string().required('Redirect URL is Required'),
  contentpostionX: Yup.number().required('Position X is Required'),
  contentpositionY: Yup.number().required('Position Y is Required'),
  MobileBannnerURL: Yup.string(),
  type: Yup.number(),
  typeid: Yup.number(),
})

export type IHomeFeatureSlider = Yup.InferType<typeof featureSliderSchema>

export const featureSubSliderSchema = Yup.object({
  file: Yup.mixed()
    .nullable()
    .test({
      name: 'file',
      message: 'Image is required',
      test(value) {
        return value !== null
      },
    }),
})

export type IHomeFeatureSubSlider = Yup.InferType<typeof featureSubSliderSchema>

export const IProduct = Yup.object({
  productId: Yup.object()
    .shape({
      id: Yup.number(),
      book_title: Yup.string(),
    })
    .nullable()
    .test({
      name: 'productId',
      message: 'Product is required',
      test(value) {
        return value !== null
      },
    }),
})

export const featureProductsSchema = IProduct.concat(
  Yup.object({
    main: Yup.number().oneOf([0, 1], 'Main must be 0 or 1'),
  }),
)

export type IHomeFeatureProduct = Yup.InferType<typeof featureProductsSchema>

export const featureNewProductSchema = IProduct.concat(
  Yup.object({
    position: Yup.number()
      .min(1, 'Minimum number is one')
      .max(15, 'Maximum number is 15')
      .required('Position is Required'),
  }),
)

export type IHomeFeatureNewProduct = Yup.InferType<
  typeof featureNewProductSchema
>

export const topTenBookSchema = Yup.object().shape({
  BookId: Yup.object()
    .shape({
      id: Yup.number(),
      book_title: Yup.string(),
      thumbnail: Yup.string(),
    })
    .nullable()
    .test({
      name: 'BookId',
      message: 'Book is required',
      test(value) {
        return value !== null
      },
    }),
  Type: Yup.object({
    id: Yup.number(),
    title: Yup.string(),
  })
    .nullable()
    .test({
      name: 'Type',
      message: 'Type is Required.',
      test(value) {
        return value !== null
      },
    }),
})

export type ITopTenBooks = Yup.InferType<typeof topTenBookSchema>
