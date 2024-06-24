import * as Yup from 'yup'

// title only

export const productBaseSchema = Yup.object({
  book_title: Yup.string()
    // .matches(alphanumericOnly, "Must be alphanumeric only")
    .required('Book title is required'),
  url_slug: Yup.string().required('URL slug is required'),
  thumbnail: Yup.string().required('Thumbnail is required'),
  description: Yup.string().required('Description is required'),
  author_name: Yup.string().required('Author name is required'),
  // publisher: Yup.string().required("Publisher is required"),
  release_date: Yup.string().required('Release date is required'),
  digital_product_url: Yup.string().required('Digital product URL is required'),
  // sale_price: Yup.number()
  //   .min(0, "Negative value is not allowed")
  //   .required("Sale price is required"),
  // sale_quantity: Yup.number()
  //   .min(0, "Negative value is not allowed")
  //   .required("Sale quantity is required"),
  // price: Yup.number()
  //   .min(0, "Negative value is not allowed")
  //   .required("Price is required"),
  // inventory: Yup.number()
  //   .min(0, "Negative value is not allowed")
  //   .required("Inventory is required"),
  commission: Yup.number()
    .min(0, 'Negative value is not allowed')
    .max(100, 'Commission should be less than 100')
    .required('Commission is required'),
  first_year_commission: Yup.number()
    .min(0, 'Negative value is not allowed')
    .max(100, 'Commission should be less than 100')
    .required('First year commission is required'),
  second_year_commission: Yup.number()
    .min(0, 'Negative value is not allowed')
    .max(100, 'Commission should be less than 100')
    .required('Second year commission is required'),
  there_after_commission: Yup.number()
    .min(0, 'Negative value is not allowed')
    .max(100, 'Commission should be less than 100')
    .required('There after commission is required'),
  commission_goes_to: Yup.string().required('Commission goes to is required'),
  tax: Yup.number()
    .min(0, 'Negative value is not allowed')
    .required('Tax is required'),
  shipping: Yup.number()
    .min(0, 'Negative value is not allowed')
    .required('Shipping is required'),
  genre: Yup.string().required('Genre is required'),
  translated: Yup.string().required('Translate is required'), // Yes/No
  translator_name: Yup.string().test({
    name: 'translator_name',
    message: 'Translator name is required',
    test(value) {
      if (this.parent.translated === 'Yes') {
        return !!value
      }
      return true
    },
  }),
  language: Yup.string().required('Language is required'),
  allow_comments: Yup.string().required('Allow comment is required'), // Yes/No
})

export const manageProductSchema = productBaseSchema.concat(
  Yup.object({
    tags: Yup.array().of(Yup.string()).required('Tags is required'),
    cat1: Yup.mixed()
      .nullable()
      .test({
        name: 'cat1',
        message: 'Category 1 is Required.',
        test(value) {
          return value !== null
        },
      }),
    cat2: Yup.mixed()
      .nullable()
      .test({
        name: 'cat2',
        message: 'Category 2 is Required.',
        test(value) {
          return value !== null
        },
      }),
    publisher: Yup.mixed()
      .nullable()
      .test({
        name: 'publisher',
        message: 'Publisher is Required.',
        test(value) {
          return value !== null
        },
      }),
    book_format: Yup.array()
      .of(
        Yup.number()
          .oneOf([1, 2, 3], 'Invalid book format')
          .required('Required'),
      )
      .test({
        name: 'book_format',
        message: 'Book format is required',
        test(value) {
          return value && value.length > 0
        },
      }),
    HardCopyPrice: Yup.number()
      .min(0, 'Negative value is not allowed')
      .test({
        name: 'HardCopyPrice',
        message: 'Hard copy price is required',
        test(value) {
          if (this.parent.book_format?.includes(1)) {
            return !!value
          }
          return true
        },
      }),
    Stock: Yup.number()
      .min(0, 'Negative value is not allowed')
      .test({
        name: 'EbookPrice',
        message: 'Ebook price is required',
        test(value) {
          if (this.parent.book_format?.includes(1)) {
            return !!value
          }
          return true
        },
      }),

    EbookPrice: Yup.number()
      .min(0, 'Negative value is not allowed')
      .test({
        name: 'EbookPrice',
        message: 'Ebook price is required',
        test(value) {
          if (this.parent.book_format?.includes(2)) {
            return !!value
          }
          return true
        },
      }),
    File_URL: Yup.string().test({
      name: 'File_URL',
      message: 'File URL is required',
      test(value) {
        if (this.parent.book_format?.includes(2)) {
          return !!value
        }
        return true
      },
    }),
    AudioPrice: Yup.number()
      .min(0, 'Negative value is not allowed')
      .test({
        name: 'AudioPrice',
        message: 'Audio price is required',
        test(value) {
          if (this.parent.book_format?.includes(3)) {
            return !!value
          }
          return true
        },
      }),
    Audio_URL: Yup.string().test({
      name: 'Audio_URL',
      message: 'Audio URL is required',
      test(value) {
        if (this.parent.book_format?.includes(3)) {
          return !!value
        }
        return true
      },
    }),
  }),
)

export const productBulkUploadSchema = productBaseSchema.concat(
  Yup.object({
    book_format: Yup.number().required('Book format is required'),
    category1: Yup.string().required('Category 1 is required'),
    category2: Yup.string().required('Category 2 is required'),
    publisher: Yup.string().required('Publisher is required'),
    tags: Yup.string().required('Tags is required'),
  }),
)

export type IBulkProduct = Yup.InferType<typeof productBulkUploadSchema>

export type IManageProduct = Yup.InferType<typeof manageProductSchema>

export type ManageProduct<C1, C2 = C1> = Omit<
  IManageProduct,
  'cat1' | 'cat2'
> & {
  cat1: C1 | null
  cat2: C2 | null
}
