import { useLayoutEffect } from 'react'
import { BiChevronDown, BiChevronUp } from 'react-icons/bi'
import { Link, useLocation } from 'react-router-dom'
import { MultiMenuProps } from '@/types'
import { stringToArray } from '@/utils/capitalize'
import { cn } from '@/utils/twmerge'

const MultiMenu: React.FC<MultiMenuProps> = ({
  menu: { icon: MenuIcon, list = [], title: menuName },
  collapsed,
  expandedMenu,
  showSubmenuIcon,
  setExpandedMenu,
  handleMultiMenuClick,
}) => {
  const location = useLocation()
  const isActive = list?.some((item) => {
    // console.log(
    //   `\n\n item.link:`,
    //   stringToArray(item.link, "/")?.[2],
    //   stringToArray(location?.pathname, "/")?.[2],
    //   menuName
    // );
    return (
      stringToArray(item.link, '/')?.[2] ===
      stringToArray(location?.pathname, '/')?.[2]
    )
  })
  // console.log(`\n\n ~ file: MultiMenu.tsx:30 ~ isActive ~ isActive:`, isActive);

  const toggleMenu = () => {
    handleMultiMenuClick(menuName)
  }

  // set menu is default open when menu is active
  useLayoutEffect(() => {
    if (isActive) {
      setExpandedMenu(menuName)
    }
  }, [isActive, menuName, setExpandedMenu])

  return (
    <div className='relative hover-multi-menu hover:bg-gray-50'>
      <div
        className={cn(
          `transition-colors block w-full px-5 py-3 text-content-primary text-sm cursor-pointer relative`,
          isActive || expandedMenu === menuName
            ? 'text-custom-primary-main font-medium'
            : 'hover:bg-custom-primary-light inActive-menu',
          collapsed ? 'flex justify-center' : 'flex items-center',
        )}
        onClick={toggleMenu}
      >
        {MenuIcon && (
          <MenuIcon
            className={cn(
              'text-xl',
              isActive || expandedMenu === menuName
                ? 'text-custom-primary-main svg_active'
                : '',
            )}
          />
        )}
        {!collapsed && <span className='ml-3'>{menuName}</span>}
        {!collapsed && (
          <div className='absolute right-5'>
            {expandedMenu === menuName ? (
              <BiChevronUp className='text-2xl' />
            ) : (
              <BiChevronDown className='text-2xl' />
            )}
          </div>
        )}
      </div>
      <div
        className={
          collapsed
            ? 'hover-menu-open top-0 left-[70px] shadow-sm hidden !w-48'
            : ''
        }
      >
        {collapsed ? (
          <>
            <span
              className={cn(
                `menu-item inActive-menu bg-gray-50 hover:bg-gray-50 !cursor-default select-none`,
                collapsed ? '!w-full !block' : 'flex items-center',
              )}
            >
              {showSubmenuIcon ? (
                MenuIcon ? (
                  <MenuIcon className={cn('text-xl')} />
                ) : null
              ) : (
                <span className='w-5 block' />
              )}
              <span className='md:ml-3 block text-base'>{menuName}</span>
            </span>
            {list?.map(({ icon: Icon, link, title }, index) => (
              <Link
                key={index}
                to={link}
                className={`menu-item ${
                  location.pathname === link ||
                  stringToArray(location.pathname, '/')?.[2] ===
                    stringToArray(link, '/')?.[2]
                    ? 'active-menu'
                    : 'inActive-menu'
                } ${collapsed ? '!w-full !block' : 'flex items-center'}`}
              >
                {showSubmenuIcon ? (
                  Icon ? (
                    <Icon
                      className={cn(
                        'text-xl',
                        // isActive ? "text-primary-main" : ""
                      )}
                    />
                  ) : null
                ) : (
                  <span className='w-5 block' />
                )}
                <span className='ml-3 block'>{title}</span>
              </Link>
            ))}
          </>
        ) : (
          expandedMenu === menuName &&
          list.map(({ icon: Icon, link, title }, index) => (
            <Link
              key={index}
              to={link}
              className={cn(
                `menu-item`,
                location.pathname === link ||
                  stringToArray(location.pathname, '/')?.[2] ===
                    stringToArray(link, '/')?.[2]
                  ? 'active-menu'
                  : 'inactive-submenu',
                collapsed ? '!w-full !block' : 'flex items-center',
              )}
            >
              {showSubmenuIcon ? (
                Icon ? (
                  <Icon />
                ) : null
              ) : (
                <span className='w-5 block' />
              )}
              <span className='ml-3 block'>{title}</span>
            </Link>
          ))
        )}
      </div>
    </div>
  )
}

export default MultiMenu
