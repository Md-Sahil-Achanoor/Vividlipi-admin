import { cn } from '@/utils/twmerge'
import { PropsWithChildren, useLayoutEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/store'
import { changeSidebarType } from '../../feature/layout/layoutSlice'
import Footer from './Footer'
import Header from './Header'
import Sidebar from './Sidebar'

// const getName = (pathName: string) => {
//   const path = pathName?.split("/");
//   return path?.[path?.length - 1];
// };

interface Props extends PropsWithChildren {}

const AuthLayout = ({ children }: Props) => {
  // const location = useLocation();
  const dispatch = useAppDispatch()
  const layout = useAppSelector((state) => state.layout)
  // console.log(`\n\n layout: =====>`, layout);

  const toggleMobileMenu = (menu: boolean | undefined) => {
    if (menu !== undefined) {
      // console.log(`\n\n menu:`, menu);
      dispatch(
        changeSidebarType({
          sidebarType: 'default',
          isMobile: layout.isMobile,
          showMenu: menu,
        }),
      )
    }
  }

  useLayoutEffect(() => {
    window.addEventListener('resize', function () {
      if (window.innerWidth <= 768) {
        dispatch(
          changeSidebarType({
            sidebarType: 'default',
            isMobile: true,
            showMenu: false,
          }),
        )
      } else {
        dispatch(
          changeSidebarType({
            sidebarType: 'default',
            isMobile: false,
            showMenu: false,
          }),
        )
      }
    })

    if (window.innerWidth <= 768) {
      dispatch(
        changeSidebarType({
          sidebarType: 'default',
          isMobile: true,
          showMenu: false,
        }),
      )
    } else {
      dispatch(
        changeSidebarType({
          sidebarType: 'default',
          isMobile: false,
          showMenu: false,
        }),
      )
    }

    window.scrollTo(0, 0)
    // const currentPage = toCapitalize(getName(location.pathname));
    // document.title = `${currentPage} | ${projectName}`;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // console.log(`\n\n  window.innerWidth:`, window.innerWidth);

  return (
    <>
      <Header />
      {layout.isMobile ? (
        <div
          className={`bg-[#fff] ${
            layout.showMenu
              ? 'fixed w-full h-screen top-[70px] z-[999999999]'
              : 'w-auto'
          }`}
        >
          {layout.showMenu && (
            <div
              className='bg-gray-900 bg-opacity-50 inset-0 w-full fixed h-full z-10'
              onClick={() => toggleMobileMenu(false)}
            />
          )}
          <div
            className={`fixed top-0 left-0 z-40 h-screen overflow-y-auto transition-all  ${
              layout.showMenu ? 'transform-none w-60 p-4' : '-translate-x-full'
            }`}
          >
            <Sidebar
              collapsed={layout?.leftSideBarType === 'condensed'}
              toggleMobileMenu={toggleMobileMenu}
            />
          </div>
        </div>
      ) : (
        <Sidebar
          collapsed={layout?.leftSideBarType === 'condensed'}
          toggleMobileMenu={toggleMobileMenu}
        />
      )}
      <div
        className={cn(
          'h-full !bg-bg-body',
          !layout.isMobile
            ? `${
                layout?.leftSideBarType === 'condensed'
                  ? 'pl-[70px]'
                  : 'ml-[250px]'
              } transition-all`
            : '',
        )}
      >
        {children}
      </div>
      <Footer />
    </>
  )
}

export default AuthLayout
