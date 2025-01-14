import { useAppSelector } from '@/app/store'
import Loader from '@/components/atoms/Loader'
import MultiSelectItem from '@/components/atoms/MultiSelectItem'
import CheckboxGroup from '@/components/form/CheckboxGroup'
import CustomInput from '@/components/form/CustomInput'
import FileUpload from '@/components/form/FileUpload'
import InfiniteSelect from '@/components/form/InfiniteSelect'
import InputSelect from '@/components/form/InputSelect'
import InputTagComponent from '@/components/form/InputTagComponent'
import QuillComponent from '@/components/form/QuillComponent'
import { Card } from '@/components/ui/Card'
import {
  book_format,
  commission_goes_to,
  language_select,
} from '@/constants/filter-list'
import { useGetAuthorsQuery } from '@/feature/author/authorQuery'
import { useGetCategoriesQuery } from '@/feature/category/categoryQuery'
import {
  useGetProductByIdQuery,
  useManageProductMutation,
} from '@/feature/product/productQuery'
import { useGetPublishersQuery } from '@/feature/publisher/publisherQuery'
import useDebounce from '@/hooks/useDebounce'
import PageLayout from '@/layout/PageLayout'
import { manageProductSchema } from '@/models'
import {
  AuthorResponse,
  BreadCrumbItem,
  CategoryQuery,
  CategoryResponse,
  PartialBy,
  Product,
  ProductPayload,
  PublisherQuery,
  PublisherResponse,
  SelectItem,
} from '@/types'
import { cn } from '@/utils/twmerge'
import { Field, Form, Formik, FormikHelpers } from 'formik'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { BsArrowRightShort } from 'react-icons/bs'
import { useNavigate, useParams } from 'react-router-dom'

const initialValues: Product = {
  book_title: '',
  url_slug: '',
  cat1: null,
  cat2: null,
  ISBN: '',
  thumbnail: '',
  IndexImage: '',
  WriterNoteImage: '',
  ForewordImage: '',
  AboutBookImage: '',
  description: '',
  author_name: '',
  author: null,
  AuthorId: '',
  publisher: null,
  release_date: '',
  digital_product_url: '0',
  // sale_price: "",
  // sale_quantity: "",
  // price: "",
  // inventory: "",
  HardCopyPrice: '',
  AudioPrice: '',
  EbookPrice: '',
  Stock: '',
  Audio_URL: '',
  File_URL: '',
  // commission: '',
  first_year_commission: '',
  second_year_commission: '',
  there_after_commission: '',
  commission_goes_to: '',
  Authorcommission: '',
  Publishercommission: '',
  tax: '',
  shipping: 0,
  genre: '0',
  tags: [],
  book_format: [],
  translated: 'No', // Yes/No
  translator_name: '',
  language: '',
  category: [],
  allow_comments: 'No', // Yes/No
  ebookPrice: [],
  hardCopyPrice: [],
  audioBookPrice: [],
  ebook_SalePrice: '0',
  ebook_ForeignCPrice: '0',
  Hardcopy_SalePrice: '0',
  Hardcopy_Sale_ForeignCPrice: '0',
  Audibook_SalePrice: '0',
  Audibook_ForeignCPrice: '0',
}

const ManageProduct = () => {
  const { id } = useParams()
  const router = useNavigate()
  // const [values] = useState<Product | null>(null);
  const [search, setSearch] = useState<string>('')
  const { value, onChange } = useDebounce(() => setSearch(value), 1000)
  const { value: value1, onChange: onChange1 } = useDebounce(
    () => setSearch(value1),
    1000,
  )
  const { selectedProduct } = useAppSelector((state) => state.product)
  const [category2, setCategory2] = useState<CategoryResponse | null>(null)
  const breadcrumbItem: BreadCrumbItem[] = [
    {
      name: 'Product List',
      link: '/admin/products/product-list',
    },
    {
      name: id ? 'Edit Product' : 'Create Product',
      link: '#',
    },
  ]

  const { isLoading: loading, refetch } = useGetProductByIdQuery(
    { query: { id } },
    { skip: !id },
  )

  const [manageProduct, { isLoading }] = useManageProductMutation()

  const onSubmit = (
    values: Product,
    { setSubmitting, resetForm }: FormikHelpers<Product>,
  ) => {
    // console.log(values);
    // setSubmitting(false);
    const data: PartialBy<
      Product,
      'author' | 'audioBookPrice' | 'hardCopyPrice' | 'ebookPrice'
    > = { ...values }
    if (data?.author) {
      delete data['author']
    }
    delete data['ebookPrice']
    delete data['hardCopyPrice']
    delete data['audioBookPrice']
    const body: ProductPayload = {
      ...data,
      cat1: values.cat1?.id as number,
      cat2: values.cat2?.id as number,
      publisher: values?.publisher?.id as number,
      translator_name:
        values?.translated === 'Yes' ? values?.translator_name : null,
      category: [],
    }
    let query: Partial<CategoryQuery> = {}
    if (!id) {
      query = {
        id,
      }
    }
    manageProduct({
      data: body,
      options: { router, setSubmitting, resetForm },
      query,
      id,
    })
  }

  const {
    isLoading: categoryLoading,
    refetch: categoryRefetch,
    data: categoryList,
    isError: categoryIsError,
    // error: categoryErrorMessage,
  } = useGetCategoriesQuery({
    conditions: {
      type: 'category1',
    },
  })

  const getUserQuery = () => {
    const query: Partial<PublisherQuery> = {}
    if (search) {
      query.search = search
    }
    return query
  }

  const {
    isLoading: publisherLoading,
    refetch: publisherRefetch,
    data: publisherList,
    isError: publisherIsError,
    // error: publisherErrorMessage,
  } = useGetPublishersQuery({
    query: getUserQuery(),
  })

  const {
    isLoading: authorLoading,
    refetch: authorRefetch,
    data: authorList,
    isError: authorIsError,
    // error: publisherErrorMessage,
  } = useGetAuthorsQuery({
    query: getUserQuery(),
  })

  const getQuery = () => {
    let query: Partial<CategoryQuery> = {}
    if (category2) {
      query = {
        cat1: category2?.id,
      }
    }
    return query
  }

  const {
    isLoading: category2Loading,
    refetch: category2Refetch,
    data: category2List,
    isError: category2IsError,
    // error: category2ErrorMessage,
  } = useGetCategoriesQuery(
    {
      query: getQuery(),
      conditions: {
        type: 'category2',
      },
    },
    {
      skip: category2 === null,
    },
  )

  useEffect(() => {
    if (category2) {
      category2Refetch()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category2])

  useEffect(() => {
    categoryRefetch()
    publisherRefetch()
    authorRefetch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (id) {
      refetch()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  return (
    <PageLayout
      title={id ? 'Edit Product' : 'Create Product'}
      breadcrumbItem={breadcrumbItem}
    >
      <Card className='border rounded-md'>
        <div className='max-w-screen-lg mx-auto'>
          {/* <h3 className="text-center text-2xl font-semibold text-pink-500">
            Create Product
          </h3> */}
          {id && loading ? (
            <Loader />
          ) : (
            <div>
              <Formik
                initialValues={(selectedProduct as any) || initialValues}
                validationSchema={manageProductSchema}
                onSubmit={onSubmit}
                enableReinitialize
              >
                {({ isSubmitting, values, setFieldValue }) => (
                  <Form>
                    {/* {console.log(values, errors)} */}
                    <div className='mt-5'>
                      <Field
                        name='book_title'
                        label='Book title'
                        horizontal
                        type='text'
                        component={CustomInput}
                        tooltip='Book title'
                        // onBlurCallback={(e: ChangeEventType) => {
                        //   let slug = e.target.value
                        //     .toLowerCase()
                        //     .replace(/ /g, "-")
                        //     .replace(/[^\w-]+/g, "");
                        //   setFieldValue("url_slug", slug);
                        // }}
                        placeholder='Type your products name'
                        isRequired
                      />
                      <Field
                        name='url_slug'
                        label='URL Slug'
                        horizontal
                        type='text'
                        component={CustomInput}
                        // disabled
                        tooltip='URL Slug'
                        placeholder='Type your products name'
                        isRequired
                      />
                      <Field
                        name='ISBN'
                        label='ISBN'
                        horizontal
                        type='text'
                        component={CustomInput}
                        tooltip='ISBN'
                        placeholder='Type your products ISBN'
                        isRequired
                      />
                      <div>
                        <Field
                          label='Category'
                          name='cat1'
                          isRequired
                          renderData={categoryList?.data}
                          isLoading={categoryLoading}
                          isError={categoryIsError}
                          // errorMessage={categoryErrorMessage}
                          errorMessage='Failed to fetch categories'
                          // reload={()}
                          // listRef={batchListRef}
                          horizontal
                          tooltip='Category'
                          renderItem={(item: CategoryResponse) => (
                            <span className='uppercase'>{item?.title}</span>
                          )}
                          isActive={(item: CategoryResponse) =>
                            values?.cat1?.id === item?.id
                          }
                          renderName={() => {
                            return (
                              <span
                                className={cn(
                                  'text-sm text-gray-700 truncate',
                                  values?.cat1?.title && 'uppercase',
                                )}
                              >
                                {values?.cat1?.title || 'Select Category'}
                              </span>
                            )
                          }}
                          onChangeCallback={(item: CategoryResponse) => {
                            setFieldValue(`cat1`, item)
                            setCategory2(item)
                            if (item?.Slug === 'ebooks') {
                              setFieldValue('book_format', [2])
                            }
                            if (item?.Slug === 'audio-books') {
                              setFieldValue('book_format', [3])
                            }
                            if (item?.Slug === 'print-books') {
                              setFieldValue('book_format', [1])
                            }
                          }}
                          clearData={() => {
                            setFieldValue(`cat1`, null)
                            setFieldValue(`cat2`, null)
                            setCategory2(null)
                          }}
                          isSelected={values?.cat1 !== null}
                          component={InfiniteSelect}
                          isAuth
                        />
                      </div>

                      {values?.cat1 && (
                        <div>
                          <Field
                            label='Sub Category'
                            name='cat2'
                            isRequired
                            renderData={category2List?.data}
                            isLoading={category2Loading}
                            isError={category2IsError}
                            // errorMessage={category2ErrorMessage}
                            errorMessage='Failed to fetch sub categories'
                            // reload={()}
                            // listRef={batchListRef}
                            horizontal
                            tooltip='Category'
                            renderItem={(item: CategoryResponse) => (
                              <span className='uppercase'>{item?.title}</span>
                            )}
                            isActive={(item: CategoryResponse) =>
                              values?.cat2?.id === item?.id
                            }
                            renderName={() => {
                              return (
                                <span
                                  className={cn(
                                    'text-sm text-gray-700 truncate',
                                    values?.cat2?.title && 'uppercase',
                                  )}
                                >
                                  {values?.cat2?.title || 'Select Category'}
                                </span>
                              )
                            }}
                            onChangeCallback={(item: CategoryResponse) => {
                              setFieldValue(`cat2`, item)
                            }}
                            clearData={() => {
                              setFieldValue(`cat2`, null)
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
                        name='thumbnail'
                        label='Thumbnail'
                        horizontal
                        component={FileUpload}
                        maxFileSize={10}
                        supportedString='jpg, jpeg, png'
                        tooltip='File URL'
                        isRequired
                      />

                      <Field
                        name='IndexImage'
                        label='Index Image'
                        horizontal
                        component={FileUpload}
                        maxFileSize={10}
                        supportedString='jpg, jpeg, png'
                        tooltip='Index Image'
                        isRequired={false}
                      />

                      <Field
                        name='WriterNoteImage'
                        label='Writer Note Image'
                        horizontal
                        component={FileUpload}
                        maxFileSize={10}
                        supportedString='jpg, jpeg, png'
                        tooltip='Writer Note Image'
                        isRequired={false}
                      />

                      <Field
                        name='ForewordImage'
                        label='Foreword Image'
                        horizontal
                        component={FileUpload}
                        maxFileSize={10}
                        supportedString='jpg, jpeg, png'
                        tooltip='Foreword Image'
                        isRequired={false}
                      />

                      <Field
                        name='AboutBookImage'
                        label='About Book Image'
                        horizontal
                        component={FileUpload}
                        maxFileSize={10}
                        supportedString='jpg, jpeg, png'
                        tooltip='About Book Image'
                        isRequired={false}
                      />

                      <Field
                        name='description'
                        label='Description'
                        horizontal
                        type='text'
                        component={QuillComponent}
                        tooltip='Description'
                        placeholder='Type your product description'
                        customClass=''
                        classes='border rounded-xl border-black min-h-[150px]'
                        isRequired
                      />

                      <div>
                        <Field
                          label='Author'
                          name='author'
                          isRequired
                          renderData={authorList?.data}
                          isLoading={authorLoading}
                          isError={authorIsError}
                          // errorMessage={authorErrorMessage}
                          errorMessage='Failed to fetch authors'
                          // reload={()}
                          // listRef={batchListRef}
                          horizontal
                          tooltip='Author'
                          renderItem={(item: AuthorResponse) => (
                            <span className=''>{item?.Name}</span>
                          )}
                          isActive={(item: AuthorResponse) =>
                            values?.author?.id === item?.id
                          }
                          renderName={() => {
                            return (
                              <span
                                className={cn('text-sm text-gray-700 truncate')}
                              >
                                {values?.author?.Name || 'Select Author'}
                              </span>
                            )
                          }}
                          onChangeCallback={(item: AuthorResponse) => {
                            setFieldValue(`author`, item)
                            setFieldValue(`AuthorId`, item?.id)
                            setFieldValue(`author_name`, item?.Name)
                          }}
                          clearData={() => {
                            setFieldValue(`author`, null)
                            setFieldValue(`AuthorId`, '')
                            setFieldValue(`author_name`, '')
                          }}
                          isSelected={values?.author !== null}
                          component={InfiniteSelect}
                          isInsideSearch
                          searchProps={{
                            value: value1,
                            onChange: onChange1,
                            placeholder: 'Search Author',
                          }}
                          onCloseCallback={() => {
                            setSearch('')
                          }}
                          isAuth
                        />
                      </div>
                      {/* <Field
                        name='author_name'
                        label='Author Name'
                        horizontal
                        type='text'
                        component={CustomInput}
                        tooltip='Author Name'
                        placeholder='Type your products author name'
                        isRequired
                      /> */}
                      {/* <Field
                        name="publisher"
                        label={"Publisher"}
                        horizontal
                        type="text"
                        component={CustomInput}
                        tooltip="Publisher"
                        placeholder="Type your products publisher"
                        isRequired
                      /> */}
                      <div>
                        <Field
                          label='Publisher'
                          name='publisher'
                          isRequired
                          renderData={publisherList?.data}
                          isLoading={publisherLoading}
                          isError={publisherIsError}
                          // errorMessage={publisherErrorMessage}
                          errorMessage='Failed to fetch publishers'
                          // reload={()}
                          // listRef={batchListRef}
                          horizontal
                          tooltip='Publisher'
                          renderItem={(item: PublisherResponse) => (
                            <span className=''>{item?.Name}</span>
                          )}
                          isActive={(item: PublisherResponse) =>
                            values?.publisher?.id === item?.id
                          }
                          renderName={() => {
                            return (
                              <span
                                className={cn('text-sm text-gray-700 truncate')}
                              >
                                {values?.publisher?.Name || 'Select Publisher'}
                              </span>
                            )
                          }}
                          onCloseCallback={() => {
                            setSearch('')
                          }}
                          onChangeCallback={(item: PublisherResponse) => {
                            setFieldValue(`publisher`, item)
                          }}
                          clearData={() => {
                            setFieldValue(`publisher`, null)
                          }}
                          isSelected={values?.publisher !== null}
                          isInsideSearch
                          searchProps={{
                            value,
                            onChange,
                            placeholder: 'Search Publisher',
                          }}
                          component={InfiniteSelect}
                          isAuth
                        />
                      </div>

                      <Field
                        name='release_date'
                        label='Release Date'
                        horizontal
                        type='date'
                        component={CustomInput}
                        tooltip='Release Date'
                        placeholder='Type your products release date'
                        isRequired
                      />
                      {/* <Field
                        name='digital_product_url'
                        label='Digital Product URL'
                        horizontal
                        type='text'
                        component={CustomInput}
                        tooltip='Digital Product URL'
                        placeholder='Type your products digital product URL'
                        isRequired
                      /> */}
                      {/* <Field
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
                      /> */}
                      {/* <Field
                        name='commission'
                        label='Commission'
                        horizontal
                        type='number'
                        component={CustomInput}
                        tooltip='Commission'
                        placeholder='Type your products commission'
                        isRequired
                      /> */}
                      <Field
                        name='first_year_commission'
                        label='First Year Commission'
                        horizontal
                        type='number'
                        component={CustomInput}
                        tooltip='First Year Commission'
                        placeholder='Type your products first year commission'
                        isRequired
                      />
                      <Field
                        name='second_year_commission'
                        label='Second Year Commission'
                        horizontal
                        type='number'
                        component={CustomInput}
                        tooltip='Second Year Commission'
                        placeholder='Type your products second year commission'
                        isRequired
                      />
                      <Field
                        name='there_after_commission'
                        label='There After Commission'
                        horizontal
                        type='number'
                        component={CustomInput}
                        tooltip='There After Commission'
                        placeholder='Type your products there after commission'
                        isRequired
                      />
                      <Field
                        name='commission_goes_to'
                        label='Commission Goes To'
                        horizontal
                        component={InputSelect}
                        items={commission_goes_to}
                        tooltip='Commission Goes To'
                        isRequired
                      />

                      {values?.commission_goes_to === '1' ||
                      values?.commission_goes_to === '3' ? (
                        <Field
                          name='Authorcommission'
                          label='Author Commission'
                          horizontal
                          type='number'
                          component={CustomInput}
                          tooltip='Author Commission'
                          placeholder='Type your products author commission'
                          isRequired
                        />
                      ) : null}

                      {values?.commission_goes_to === '2' ||
                      values?.commission_goes_to === '3' ? (
                        <Field
                          name='Publishercommission'
                          label='Publisher Commission'
                          horizontal
                          type='number'
                          component={CustomInput}
                          tooltip='Publisher Commission'
                          placeholder='Type your products publisher commission'
                          isRequired
                        />
                      ) : null}

                      <Field
                        name='tax'
                        label='Tax'
                        horizontal
                        type='number'
                        component={CustomInput}
                        tooltip='Tax'
                        placeholder='Type your products tax'
                        isRequired
                      />
                      {/* <Field
                        name='shipping'
                        label='Shipping'
                        horizontal
                        type='number'
                        component={CustomInput}
                        tooltip='Shipping'
                        placeholder='Type your products shipping'
                        isRequired
                      /> */}
                      {/* <Field
                        name='genre'
                        label='Genre'
                        horizontal
                        type='text'
                        component={CustomInput}
                        tooltip='Genre'
                        placeholder='Type your products genre'
                        isRequired
                      /> */}
                      <Field
                        name='tags'
                        label='Tags'
                        horizontal
                        tooltip='Tags'
                        type='text'
                        component={InputTagComponent}
                        placeholder='Type your products tags'
                        isRequired
                      />
                      <Field
                        label='Book Format'
                        name='book_format'
                        horizontal
                        tooltip='Book Formats'
                        isRequired
                        renderData={book_format}
                        renderItem={(item: SelectItem) => <>{item?.name}</>}
                        isActive={(item: SelectItem) =>
                          values?.book_format?.includes(item?.value as number)
                        }
                        renderName={() => (
                          <MultiSelectItem<any>
                            data={values?.book_format}
                            defaultName='Select...'
                            displayName='name'
                            name={(data) =>
                              book_format?.find(
                                (el) => Number(el?.value) == Number(data),
                              )?.name || ''
                            }
                            onClick={(item: number) => {
                              if (
                                item === 1 &&
                                values?.cat1?.Slug === 'print-books'
                              ) {
                                return toast.error(
                                  'You can not remove print book format',
                                )
                              }
                              if (
                                item === 2 &&
                                values?.cat1?.Slug === 'ebooks'
                              ) {
                                return toast.error(
                                  'You can not remove ebook book format',
                                )
                              }
                              if (
                                item === 3 &&
                                values?.cat1?.Slug === 'audio-books'
                              ) {
                                return toast.error(
                                  'You can not remove audio book format',
                                )
                              }
                              setFieldValue(
                                'book_format',
                                values?.book_format?.filter(
                                  (book_format) => book_format !== item,
                                ),
                              )
                            }}
                          />
                        )}
                        onChangeCallback={(item: SelectItem) => {
                          // check unique item in array
                          const isUnique = values?.book_format?.includes(
                            item?.value as number,
                          )
                          if (!isUnique) {
                            const data = values?.book_format || []
                            setFieldValue('book_format', [...data, item?.value])
                          } else {
                            return
                          }
                        }}
                        clearData={(item: SelectItem) => {
                          // find data and clear
                          const data = values?.book_format?.filter(
                            (book_format) => book_format !== item?.value,
                          )
                          setFieldValue('book_format', data)
                        }}
                        isSelected={false}
                        component={InfiniteSelect}
                        isAuth
                      />
                      {values?.book_format?.includes(1) ? (
                        <>
                          <Field
                            name='HardCopyPrice'
                            label='Hard Copy Price'
                            horizontal
                            type='number'
                            component={CustomInput}
                            tooltip='Hard Copy Price'
                            placeholder='Type your products hard copy price'
                            isRequired
                          />
                          <Field
                            name='Stock'
                            label='Hard Copy Stock'
                            horizontal
                            type='number'
                            component={CustomInput}
                            tooltip='Stock'
                            placeholder='Type your products stock'
                            isRequired
                          />

                          <CheckboxGroup
                            name='hardCopyPrice'
                            label='Hard Copy Price'
                            isMulti
                            horizontal
                            tooltip='Hard Copy Price'
                            options={[
                              { key: 'Sales Price', value: '1' },
                              { key: 'Foreign Price', value: '2' },
                            ]}
                          />

                          {values?.hardCopyPrice?.includes('1') ? (
                            <Field
                              name='Hardcopy_SalePrice'
                              label='Hard Copy Sale Price'
                              horizontal
                              type='number'
                              component={CustomInput}
                              min={0}
                              tooltip='Hard Copy Sale Price'
                              placeholder='Type your products hard copy sale price'
                              isRequired
                            />
                          ) : null}

                          {values?.hardCopyPrice?.includes('2') ? (
                            <Field
                              name='Hardcopy_Sale_ForeignCPrice'
                              label='Hard Copy Foreign Price'
                              horizontal
                              type='number'
                              component={CustomInput}
                              min={0}
                              tooltip='Hard Copy Foreign Price'
                              placeholder='Type your products hard copy foreign price'
                              isRequired
                            />
                          ) : null}
                        </>
                      ) : null}
                      {values?.book_format?.includes(2) ? (
                        <>
                          <Field
                            name='File_URL'
                            label='E-Book File'
                            horizontal
                            component={FileUpload}
                            maxFileSize={100}
                            supportedString='pdf, doc, docx, epub'
                            acceptFile={{
                              'application/pdf': ['pdf'],
                              'application/msword': ['doc', 'docx'],
                              'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
                                ['docx'],
                              'application/epub+zip': ['epub'],
                            }}
                            tooltip='File URL'
                            isRequired
                          />
                          <Field
                            name='EbookPrice'
                            label='E-book Price'
                            horizontal
                            type='number'
                            component={CustomInput}
                            tooltip='Ebook Price'
                            placeholder='Type your products ebook price'
                            isRequired
                          />

                          <CheckboxGroup
                            name='ebookPrice'
                            label='E-book Price'
                            isMulti
                            horizontal
                            tooltip='E-book Price'
                            options={[
                              { key: 'Sales Price', value: '1' },
                              { key: 'Foreign Price', value: '2' },
                            ]}
                          />
                          {values?.ebookPrice?.includes('1') ? (
                            <Field
                              name='ebook_SalePrice'
                              label='E-book Sale Price'
                              horizontal
                              type='number'
                              component={CustomInput}
                              tooltip='E-book Sale Price'
                              min={0}
                              placeholder='Type your products ebook sale price'
                              isRequired
                            />
                          ) : null}

                          {values?.ebookPrice?.includes('2') ? (
                            <Field
                              name='ebook_ForeignCPrice'
                              label='E-book Foreign Price'
                              horizontal
                              type='number'
                              component={CustomInput}
                              min={0}
                              tooltip='E-book Foreign Price'
                              placeholder='Type your products ebook foreign price'
                              isRequired
                            />
                          ) : null}
                        </>
                      ) : null}
                      {values?.book_format?.includes(3) ? (
                        <>
                          <Field
                            name='Audio_URL'
                            label='Audio URL'
                            horizontal
                            component={FileUpload}
                            maxFileSize={100}
                            supportedString='mp3'
                            acceptFile={{
                              'audio/mpeg': ['mp3'],
                            }}
                            tooltip='Audio URL'
                            isRequired
                          />
                          <Field
                            name='AudioPrice'
                            label='Audio Price'
                            horizontal
                            type='number'
                            component={CustomInput}
                            tooltip='Audio Price'
                            placeholder='Type your products audio price'
                            isRequired
                          />

                          <CheckboxGroup
                            name='audioBookPrice'
                            label='Audio Book Price'
                            isMulti
                            horizontal
                            tooltip='Audio Book Price'
                            options={[
                              { key: 'Sales Price', value: '1' },
                              { key: 'Foreign Price', value: '2' },
                            ]}
                          />

                          {values?.audioBookPrice?.includes('1') ? (
                            <Field
                              name='Audibook_SalePrice'
                              label='Audio Sale Price'
                              horizontal
                              type='number'
                              component={CustomInput}
                              tooltip='Audio Sale Price'
                              min={0}
                              placeholder='Type your products audio sale price'
                              isRequired
                            />
                          ) : null}

                          {values?.audioBookPrice?.includes('2') ? (
                            <Field
                              name='Audibook_ForeignCPrice'
                              label='Audio Foreign Price'
                              horizontal
                              type='number'
                              min={0}
                              component={CustomInput}
                              tooltip='Audio Foreign Price'
                              placeholder='Type your products audio foreign price'
                              isRequired
                            />
                          ) : null}
                        </>
                      ) : null}
                      <Field
                        name='translated'
                        label='Translated'
                        horizontal
                        component={InputSelect}
                        items={[
                          { value: 'Yes', name: 'Yes' },
                          { value: 'No', name: 'No' },
                        ]}
                        tooltip='Translated'
                        isRequired
                      />
                      {values?.translated === 'Yes' && (
                        <Field
                          name='translator_name'
                          label='Translator Name'
                          horizontal
                          type='text'
                          component={CustomInput}
                          tooltip='Translator Name'
                          placeholder='Type your products translator name'
                          isRequired
                        />
                      )}

                      <Field
                        name='language'
                        label='Language'
                        horizontal
                        component={InputSelect}
                        items={language_select}
                        tooltip='Language'
                        isRequired
                      />

                      {/* <CheckboxGroup
                        name='allow_comments'
                        label='Allow Comments'
                        isMulti={false}
                        horizontal
                        tooltip='Allow Comments'
                        options={[
                          { key: 'Yes', value: 'Yes' },
                          { key: 'No', value: 'No' },
                        ]}
                      /> */}
                    </div>
                    <div className='flex justify-end'>
                      <button
                        type='submit'
                        className='button_primary'
                        disabled={isSubmitting || isLoading}
                      >
                        {isLoading || isSubmitting ? (
                          <>
                            <span className='w-5 h-5 border-2 animate-spin rounded-full border-transparent border-t-white mr-2' />
                            <span className='font-medium'>Processing</span>
                          </>
                        ) : (
                          <>
                            <span className='font-medium'>
                              {id ? 'Update' : 'Create'}
                            </span>
                            <span className='text-2xl ml-1'>
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
  )
}

export default ManageProduct
