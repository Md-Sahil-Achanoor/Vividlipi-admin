import { Role } from '..'

export interface MenuType {
  id: string
  title: string
  icon: React.ElementType | null
  link: string
  role: Role[]
  list?: MenuType[]
}

export interface SidebarProps {
  collapsed: boolean
  isMobile?: boolean
  toggleMobileMenu: (menu: boolean | undefined) => void
}

export interface MultiMenuProps {
  menu: MenuType
  collapsed: boolean
  expandedMenu: string | null
  showSubmenuIcon?: false
  setExpandedMenu: (name: string | null) => void
  handleMultiMenuClick: (name: string) => void
}

export interface SingleMenuProps {
  menu: MenuType
  collapsed: boolean
  setExpandedMenu: (name: string | null) => void
}
