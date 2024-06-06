import { BiBookContent } from "react-icons/bi";
import { FaUsersCog } from "react-icons/fa";
import { LuLayoutDashboard } from "react-icons/lu";
import { MdLibraryBooks } from "react-icons/md";
import { MenuType } from "../../types";

const NavbarAllLink: MenuType[] = [
  {
    title: "Dashboard",
    link: "/admin/dashboard",
    role: ["admin"],
    icon: LuLayoutDashboard,
  },
  {
    title: "CMS",
    link: "/#",
    role: ["admin"],
    icon: BiBookContent,
    list: [
      {
        title: "Home",
        link: "/admin/cms/home-page",
        role: ["admin"],
        icon: null,
      },
    ],
  },
  {
    title: "Product Management",
    link: "/#",
    role: ["admin"],
    icon: MdLibraryBooks,
    list: [
      {
        title: "Product",
        link: "/admin/products/product-list",
        role: ["admin"],
        icon: null,
      },
      {
        title: "Publisher",
        link: "/admin/publisher/publisher-list",
        role: ["admin"],
        icon: null,
      },
      {
        title: "Category",
        link: "/admin/categories/main-category",
        role: ["admin"],
        icon: null,
      },
      {
        title: "Sub Category",
        link: "/admin/categories/sub-category",
        role: ["admin"],
        icon: null,
      },
    ],
  },
  {
    title: "User Management",
    link: "/#",
    role: ["admin"],
    icon: FaUsersCog,
    list: [
      {
        title: "Role List",
        link: "/admin/user-management/role-list",
        role: ["admin"],
        icon: null,
      },
      {
        title: "User List",
        link: "/admin/user-management/user-list",
        role: ["admin"],
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
];
export default NavbarAllLink;
