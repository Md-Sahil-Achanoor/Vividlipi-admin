import { MenuType } from '@/types'
import { AiOutlineOrderedList } from 'react-icons/ai'
import { BiBookContent } from 'react-icons/bi'
import { FaUsersCog } from 'react-icons/fa'
import { LuLayoutDashboard } from 'react-icons/lu'
import { MdLibraryBooks } from 'react-icons/md'

export const sidebarData = [
  {
    id: 'featured_category_management',
    title: 'Feature Management',
    icon: 'atom',
    link: '/feature-management',
  },
  {
    id: 'domain_management',
    title: 'Domain Management',
    icon: 'cog',
    link: '/domain-management',
  },
  {
    id: 'referral_and_gifts',
    title: 'Referral Management',
    icon: 'badgePercent',
    link: '/referral-management',
  },
  {
    id: 'admin_user_management',
    title: 'Admin User Management',
    icon: 'userAdmin',
    link: '/admin-user-management',
  },
  {
    id: 'roles_management',
    title: 'Role Management',
    icon: 'users',
    link: '/role-management',
  },
  {
    id: 'course_management',
    title: 'Course Management',
    icon: 'packageCheck',
    link: '/course-management',
  },
  {
    id: 'application_user_management',
    title: 'App User Management',
    icon: 'user',
    link: '/app-user-management',
  },
  {
    id: 'insight_management',
    title: 'Insight Management',
    icon: 'radar',
    link: '/insight-management',
  },
  {
    id: 'banners_management',
    title: 'Banner Management',
    icon: 'appWindow',
    link: '/banner-management',
  },
  {
    id: 'subscription_management',
    title: 'Subscription Management',
    icon: 'layers',
    link: '/subscription-management',
  },
  {
    id: 'payment_management',
    title: 'Payment Management',
    icon: 'dollar',
    link: '/payment-management',
  },
  {
    id: 'static_content_management',
    title: 'Static Management',
    icon: 'fileText',
    link: '/static-management',
  },
]

const NavbarAllLink: MenuType[] = [
  {
    id: 'Dashboard_Management',
    title: 'Dashboard',
    link: '/admin/dashboard',
    role: ['admin', 'sub-admin'],
    icon: LuLayoutDashboard,
  },
  {
    id: 'CMS_Management',
    title: 'CMS',
    link: '/#',
    role: ['admin', 'sub-admin'],
    icon: BiBookContent,
    list: [
      {
        id: 'CMS_Home_Management',
        title: 'Home',
        link: '/admin/cms/home-page',
        role: ['admin', 'sub-admin'],
        icon: null,
      },
    ],
  },
  {
    id: 'Product_Management',
    title: 'Product Management',
    link: '/#',
    role: ['admin', 'sub-admin'],
    icon: MdLibraryBooks,
    list: [
      {
        id: 'Product_List_Management',
        title: 'Product',
        link: '/admin/products/product-list',
        role: ['admin', 'sub-admin'],
        icon: null,
      },
      {
        id: 'Product_Author_Management',
        title: 'Author',
        link: '/admin/author/author-list',
        role: ['admin', 'sub-admin'],
        icon: null,
      },
      {
        id: 'Product_Publisher_Management',
        title: 'Publisher',
        link: '/admin/publisher/publisher-list',
        role: ['admin', 'sub-admin'],
        icon: null,
      },
      {
        id: 'Product_Category_Management',
        title: 'Category',
        link: '/admin/categories/main-category',
        role: ['admin', 'sub-admin'],
        icon: null,
      },
      {
        id: 'Product_Sub_Category_Management',
        title: 'Sub Category',
        link: '/admin/categories/sub-category',
        role: ['admin', 'sub-admin'],
        icon: null,
      },
      {
        id: 'Product_Coupon_Management',
        title: 'Coupon',
        link: '/admin/coupon/coupon-list',
        role: ['admin', 'sub-admin'],
        icon: null,
      },
      {
        id: 'Product_Comment_Management',
        title: 'Product Comments',
        link: '/admin/product-comment/product-comment-list',
        role: ['admin', 'sub-admin'],
        icon: null,
      },
    ],
  },
  {
    id: 'User_Management',
    title: 'User Management',
    link: '/#',
    role: ['admin', 'sub-admin'],
    icon: FaUsersCog,
    list: [
      {
        id: 'User_Role_Management',
        title: 'Role List',
        link: '/admin/user-management/role-list',
        role: ['admin', 'sub-admin'],
        icon: null,
      },
      {
        id: 'User_Admin_Management',
        title: 'Admin Users',
        link: '/admin/user-management/user-list',
        role: ['admin', 'sub-admin'],
        icon: null,
      },
    ],
  },
  {
    id: 'Order_Management',
    title: 'Order Management',
    link: '/#',
    role: ['admin', 'sub-admin'],
    icon: AiOutlineOrderedList,
    list: [
      {
        id: 'Order_User_Management',
        title: 'User List',
        link: '/admin/order-management/order-user-list',
        role: ['admin', 'sub-admin'],
        icon: null,
      },
      {
        id: 'Order_Assign_Management',
        title: 'Assign Order List',
        link: '/admin/order-management/assign-order-list',
        role: ['admin', 'sub-admin'],
        icon: null,
      },
      {
        id: 'Order_List_Management',
        title: 'Order List',
        link: '/admin/order-management/order-list',
        role: ['admin', 'sub-admin'],
        icon: null,
      },
    ],
  },
  // {
  //   title: "Operator",
  //   link: "/#",
  //   role: ["admin"],
  //   icon: BsPinMap,
  //   list: [
  //     {
  //       title: "Pending List",
  //       link: "/admin/operator/pending-list",
  //       role: ["admin"],
  //       icon: null,
  //     },
  //     {
  //       title: "Approved List",
  //       link: "/admin/operator/approved-list",
  //       role: ["admin"],
  //       icon: null,
  //     },
  //     // {
  //     //   title: "Employee List",
  //     //   link: "/admin/operator/employee-list",
  //     //   role: ["admin"],
  //     //   icon: null,
  //     // },
  //   ],
  // },
]

export default NavbarAllLink
