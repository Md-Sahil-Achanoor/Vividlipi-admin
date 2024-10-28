import { TabItem } from '@/types'

export const featureSliderHeader = [
  'SL',
  'Text',
  'Image',
  'Mobile Image',
  'Position',
  'Action',
]

export const featureSubSliderHeader = ['SL', 'Image', 'Action']

export const featureProductHeader = [
  'SL',
  'Name',
  'Author',
  'Publisher',
  'Language',
  'Position',
  'Action',
]

export const topTenProductHeader = [
  'SL',
  'Name',
  'Thumbnail',
  'Category',
  'Action',
]

export const productLIstTableHead = [
  'SL',
  'Name',
  'Thumbnail',
  'Author',
  // 'Price',
  'Publisher',
  'Release Date',
  'Language',
  'Book Formats',
  'Action',
]

export const publisherTableHead = [
  'SL',
  'Name',
  // 'Slug',
  'Description',
  'Action',
]

export const authorTableHead = [
  'SL',
  'Name',
  // 'Slug',
  'Description',
  'Picture',
  'Action',
]

export const categoryTableHeader = ['SL', 'Name', 'Slug', 'Action']

export const subCategoryTableHeader = [
  'SL',
  'Name',
  'Slug',
  // 'Category',
  'Action',
]

export const couponTableHead = [
  'SL',
  'Name',
  'Discount Type',
  'Discount Value',
  'Minimum Cart Value',
  'Start Date',
  'End Date',
  'Action',
]

// Order

export const orderTableHead = [
  'SL',
  'User Name',
  'User Email',
  'User Type',
  'Total Purchase',
  'Total Amount',
  // 'Details',
  'Payment Status',
  'Order Status',
  'Action',
  // 'Action',
]

export const tabItems: TabItem[] = [
  {
    name: 'Feature Slider',
    type: 'feature-slider',
  },
  {
    name: 'New In',
    type: 'feature-new-in',
  },
  {
    name: 'Feature Products',
    type: 'feature-product',
  },
  {
    name: 'Top 10 Books',
    type: 'top-ten-books',
  },
]
