import { useCallback, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { useAppSelector } from "../../app/store";
import { SidebarProps } from "../../types";
import { cn } from "../../utils/twmerge";
import NavbarAllLink from "../common/NavbarAllLink";
import MultiMenu from "./Sidebar/MultiMenu";
import SingleMenu from "./Sidebar/SingleMenu";

const Sidebar = ({
  collapsed,
  // toggleCollapse,
  toggleMobileMenu,
}: SidebarProps) => {
  // const location = useLocation();
  const { isMobile } = useAppSelector((state) => state.layout);
  const [expandedMenu, setExpandedMenu] = useState<string | null>(null);
  // console.log(`\n\nexpandedMenu:`, expandedMenu);

  const { role } = useAppSelector((state) => state.auth);

  const navItem = NavbarAllLink?.filter((item) => item?.role?.includes(role));

  const handleMultiMenuClick = useCallback((name: string) => {
    setExpandedMenu((prev) => (prev === name ? null : name));
  }, []);

  return (
    <div
      className={cn(
        `fixed left-0 top-0 w-auto md:w-[250px] bg-[#f6f6f6] shadow transition-all duration-300`,
        collapsed ? "w-[70px] md:w-[70px]" : "w-60",
        isMobile ? "h-full" : "h-[calc(100vh-4rem)] mt-16"
      )}
    >
      <div>
        <div className="px-5 py-3 text-xs uppercase relative">
          Menu
          {isMobile ? (
            <div
              className="absolute right-4 cursor-pointer top-1/2 -translate-y-1/2"
              onClick={(e) => {
                e.stopPropagation();
                console.log("close");
                toggleMobileMenu(false);
              }}
            >
              <RxCross2 className="text-2xl" />
            </div>
          ) : null}
        </div>

        {navItem.map((menu, index) =>
          "list" in menu ? (
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
          )
        )}
      </div>
    </div>
  );
};

export default Sidebar;
