import { TabItem } from '@/types'

export const featureSliderHeader = ['SL', 'Text', 'Image', 'Position', 'Action']

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

export const productLIstTableHead = [
  'SL',
  'Name',
  'Thumbnail',
  'Author',
  'Price',
  'Publisher',
  'Release Date',
  'Language',
  'Book Formats',
  'Action',
]

export const publisherTableHead = [
  'SL',
  'Name',
  'Slug',
  'Description',
  'Action',
]

export const authorTableHead = [
  'SL',
  'Name',
  'Slug',
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
  'Product',
  'Category 1',
  'Category 2',
  'Publishers',
  'Authors',
  'Start Date',
  'End Date',
  'Percentage Off',
  'Value Off',
  'Cart Conditions',
  'Action',
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
]
