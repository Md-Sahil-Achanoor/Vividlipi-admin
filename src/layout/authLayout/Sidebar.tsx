import Logo from '@/components/atoms/Logo'
import { useCallback, useMemo, useState } from 'react'
import { RxCross2 } from 'react-icons/rx'
import { useAppSelector } from '../../app/store'
import { MenuType, RolePermission, SidebarProps } from '../../types'
import { cn } from '../../utils/twmerge'
import NavbarAllLink from '../common/NavbarAllLink'
import MultiMenu from './Sidebar/MultiMenu'
import SingleMenu from './Sidebar/SingleMenu'

const Sidebar = ({
  collapsed,
  // toggleCollapse,
  toggleMobileMenu,
}: SidebarProps) => {
  // const location = useLocation();
  const { isMobile } = useAppSelector((state) => state.layout)
  const [expandedMenu, setExpandedMenu] = useState<string | null>(null)
  // console.log(`\n\nexpandedMenu:`, expandedMenu);

  const { role, roleDetails, user } = useAppSelector((state) => state.auth)
  // console.log(`\n\n role:`, role, user, roleDetails)

  const navItems = useMemo(() => {
    if (role === 'admin') {
      return NavbarAllLink
    }
    if (user?.role === 'sub-admin') {
      const newNav: Record<string, MenuType> = {}
      const permission = roleDetails as RolePermission
      const items: Record<string, string[]> = {}
      console.log(`\n\n permission:`, permission)
      Object.keys(permission)?.forEach((key) => {
        // console.log(`\n\n key:`, key, permission[key])
        if (Object.keys(permission[key])?.length > 0) {
          const prefix = key.split('_')?.[0] as typeof key
          // console.log(`\n\n prefix:`, prefix)
          if (!items[`${prefix}_Management`]) {
            items[`${prefix}_Management`] = [key]
          } else {
            items[`${prefix}_Management`].push(key)
          }
        }
      })
      console.log(`\n\n items:`, items)
      NavbarAllLink?.forEach((item) => {
        console.log(`\n\n item:`, items[item?.id])
        if (items[item?.id]?.length === 0) {
          newNav[item?.id] = item
        } else {
          const filtered = item?.list?.filter((list) =>
            items[item?.id]?.includes(list?.id),
          ) as MenuType[] | []
          if (filtered?.length > 0) {
            newNav[item?.id] = item
            newNav[item?.id].list = filtered
          }
        }
      })
      console.log(`\n\n newNav:`, newNav)
      return Object.values(newNav)
    }
    return []
  }, [role, roleDetails, user])

  // console.log(`\n\nnavItems:`, navItems)

  // const navItem = NavbarAllLink?.filter((item) => item?.role?.includes(role))

  const handleMultiMenuClick = useCallback((name: string) => {
    setExpandedMenu((prev) => (prev === name ? null : name))
  }, [])

  return (
    <div
      className={cn(
        `fixed left-0 top-0 w-auto md:w-[250px] bg-white transition-all duration-300 z-[1002]`,
        collapsed ? 'w-[70px] md:w-[70px]' : 'w-60',
        isMobile ? 'h-full' : 'h-[calc(100vh)]',
      )}
    >
      <div
        className={cn(
          'h-16 w-[70px] md:w-[250px] bg-white text-black flex items-center justify-center',
          collapsed ? 'md:w-[70px]' : 'md:w-[250px]',
        )}
      >
        <Logo />
      </div>
      <div>
        <div className='px-5 py-3 text-xs uppercase relative'>
          Menu
          {isMobile ? (
            <div
              className='absolute right-4 cursor-pointer top-1/2 -translate-y-1/2'
              onClick={(e) => {
                e.stopPropagation()
                // console.log('close')
                toggleMobileMenu(false)
              }}
            >
              <RxCross2 className='text-2xl' />
            </div>
          ) : null}
        </div>

        {navItems.map((menu, index) =>
          'list' in menu ? (
            <MultiMenu
              key={index}
              menu={menu}
              collapsed={collapsed}
              expandedMenu={expandedMenu}
              setExpandedMenu={setExpandedMenu}
              handleMultiMenuClick={handleMultiMenuClick}
            />
          ) : (
            <SingleMenu
              key={index}
              menu={menu}
              collapsed={collapsed}
              setExpandedMenu={setExpandedMenu}
            />
          ),
        )}
      </div>
    </div>
  )
}

export default Sidebar
