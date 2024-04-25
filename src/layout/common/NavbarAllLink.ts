import { LuLayoutDashboard } from "react-icons/lu";
import { MenuType } from "../../types";

const NavbarAllLink: MenuType[] = [
  {
    title: "Dashboard",
    link: "/admin/dashboard",
    role: ["Admin"],
    icon: LuLayoutDashboard,
  },
  {
    title: "Product",
    link: "/admin/product",
    role: ["Admin"],
    icon: LuLayoutDashboard,
  },
  // {
  //   title: "Operator",
  //   link: "/#",
  //   role: ["Admin"],
  //   icon: BsPinMap,
  //   list: [
  //     {
  //       title: "Pending List",
  //       link: "/admin/operator/pending-list",
  //       role: ["Admin"],
  //       icon: null,
  //     },
  //     {
  //       title: "Approved List",
  //       link: "/admin/operator/approved-list",
  //       role: ["Admin"],
  //       icon: null,
  //     },
  //     // {
  //     //   title: "Employee List",
  //     //   link: "/admin/operator/employee-list",
  //     //   role: ["Admin"],
  //     //   icon: null,
  //     // },
  //   ],
  // },
];
export default NavbarAllLink;
