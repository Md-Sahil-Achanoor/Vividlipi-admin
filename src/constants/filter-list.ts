import { SelectItem } from '@/types'

export const book_format: SelectItem[] = [
  { value: 1, name: 'Physical' },
  { value: 2, name: 'E-book' },
  { value: 3, name: 'Audio Book' },
]

export const language_select: SelectItem[] = [
  { value: 'English', name: 'English' },
  { value: 'Kannada', name: 'Kannada' },
]

export const commission_goes_to: SelectItem[] = [
  { value: 1, name: 'Author' },
  { value: 2, name: 'Publisher' },
]
