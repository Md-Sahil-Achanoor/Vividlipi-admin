/**
 * Changes the body attribute
 */
function changeBodyAttribute(attribute: string, value: string) {
  if (document.body) document.body.setAttribute(attribute, value)
  return true
}

/**
 * Toggle the class on body
 * @param {*} cssClass
 */
function manageBodyClass(cssClass: string, action: string = 'toggle') {
  switch (action) {
    case 'add':
      if (document.body) document.body.classList.add(cssClass)
      break
    case 'remove':
      if (document.body) document.body.classList.remove(cssClass)
      break
    default:
      if (document.body) document.body.classList.toggle(cssClass)
      break
  }

  return true
}

const changeLeftSidebarType = ({
  sidebarType,
  isMobile,
}: {
  sidebarType: string
  isMobile: boolean
}) => {
  try {
    switch (sidebarType) {
      case 'compact':
        changeBodyAttribute('data-sidebar-size', 'small')
        manageBodyClass('sidebar-enable', 'remove')
        manageBodyClass('vertical-collpsed', 'remove')
        break
      case 'icon':
        changeBodyAttribute('data-keep-enlarged', 'true')
        manageBodyClass('vertical-collpsed', 'add')
        break
      case 'condensed':
        manageBodyClass('sidebar-enable', 'add')
        if (!isMobile) manageBodyClass('vertical-collpsed', 'add')
        break
      default:
        changeBodyAttribute('data-sidebar-size', '')
        manageBodyClass('sidebar-enable', 'remove')
        if (!isMobile) manageBodyClass('vertical-collpsed', 'remove')
        break
    }
  } catch (error) {
    console.error('Error: ', error)
  }
}

export { changeLeftSidebarType }
