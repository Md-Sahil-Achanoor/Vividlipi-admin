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

export const publisherTableHead = ['SL', 'Name', 'Description', 'Action']

export const authorTableHead = [
  'SL',
  'Name',
  'Description',
  'Picture',
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
