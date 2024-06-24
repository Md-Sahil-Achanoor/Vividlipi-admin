import { toCapitalize } from './capitalize'

const displayFileName = (url: string) => {
  if (!url) return ''
  const arr = url?.split('/')
  const fileName = arr?.[arr.length - 1]
  if (!fileName) return ''
  const arr2 = fileName?.split('-')
  return toCapitalize(arr2?.[arr2.length - 1] || '')
}

const findLinkFromUrl = (url: string): boolean => {
  if (url?.includes('https://imgeni.nyc3.digitaloceanspaces.com')) {
    return false
  }
  return true
}

const checkImage = (url: string): boolean => {
  const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'svg']
  const actualNameFromLink = displayFileName(url)
  const extension = actualNameFromLink?.split('.')?.pop()?.toLowerCase() || ''
  if (imageExtensions.includes(extension)) {
    return true
  }
  return false
}

export { checkImage, displayFileName, findLinkFromUrl }
