import { SingleMenuProps } from "@/types";
import { stringToArray } from "@/utils/capitalize";
import { cn } from "@/utils/twmerge";
import { useLayoutEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const SingleMenu: React.FC<SingleMenuProps> = ({
  menu: { icon: MenuIcon, link, title: menuName },
  collapsed,
  setExpandedMenu,
}) => {
  const location = useLocation();
  const isActive =
    stringToArray(link, "/")?.[1] ===
    stringToArray(location?.pathname, "/")?.[1];

  // set menu is default open when menu is active
  useLayoutEffect(() => {
    if (isActive) {
      setExpandedMenu(menuName);
    }
  }, [isActive, menuName, setExpandedMenu]);

  return (
    <div className="relative hover-multi-menu hover:bg-gray-50">
      <Link
        to={link}
        className={cn(
          `menu-item transition-colors`,
          isActive
            ? "active-menu"
            : "hover:bg-custom-primary-light inActive-menu",
          collapsed ? "flex justify-center" : "flex items-center"
        )}
      >
        {MenuIcon && (
          <MenuIcon
            className={cn(
              "text-xl text-content-primary",
              isActive ? "text-white svg_active_white" : ""
            )}
          />
        )}
        {!collapsed && <span className={`ml-3`}>{menuName}</span>}
      </Link>
      {collapsed && (
        <div
          className={
            collapsed
              ? "hover-menu-open top-0 left-[70px] shadow-sm hidden !w-48"
              : ""
          }
        >
          <span
            className={cn(
              `menu-item inActive-menu bg-gray-50 hover:bg-gray-50 !cursor-default select-none`,
              collapsed ? "w-full block" : "flex items-center"
            )}
          >
            <span className={`md:ml-3 block text-base`}>{menuName}</span>
          </span>
        </div>
      )}
    </div>
  );
};

export default SingleMenu;
