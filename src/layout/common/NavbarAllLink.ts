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
