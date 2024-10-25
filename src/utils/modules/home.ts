const checkType = (type: string) => {
  switch (type) {
    case 'delete-feature-slider':
      return true
    case 'delete-feature-sub-slider':
      return true
    case 'delete-feature-product':
      return true
    case 'delete-new-in':
      return true
    case 'delete-top-ten-books':
      return true
    default:
      return false
  }
}

const getTitle = (type: string, data: any) => {
  switch (type) {
    case 'manage-feature-slider':
      return data?.text
    case 'delete-feature-slider':
      return data?.text
    case 'delete-feature-product':
      return data?.productDetails?.book_title
    case 'delete-new-in':
      return data?.productDetails?.book_title
    case 'delete-top-ten-books':
      return data?.BookId?.book_title
    default:
      return ''
  }
}

const getModuleName = (type: string) => {
  switch (type) {
    case 'delete-feature-slider':
      return 'Feature Slider'
    case 'delete-feature-sub-slider':
      return 'Feature Sub Slider'
    case 'delete-feature-product':
      return 'Feature Product'
    case 'delete-new-in':
      return 'New In'
    case 'delete-top-ten-books':
      return 'Top Ten Books'
    default:
      return ''
  }
}

export { checkType, getModuleName, getTitle }
