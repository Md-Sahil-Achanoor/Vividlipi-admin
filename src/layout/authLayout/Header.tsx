import React from 'react'
import { BiFullscreen, BiMenu } from 'react-icons/bi'
import { useDispatch } from 'react-redux'
import { useAppSelector } from '../../app/store'
import { changeSidebarType } from '../../feature/layout/layoutSlice'
import { cn } from '../../utils/twmerge'
import ProfileMenu from '../common/TopbarDropdown/ProfileMenu'

const doc = document as Document & {
  fullscreenElement: Element | null
  mozFullScreenElement: Element | null
  webkitFullscreenElement: Element | null
  documentElement: {
    requestFullscreen?(): Promise<void>
    mozRequestFullScreen?(): Promise<void>
    webkitRequestFullscreen?(element?: any): Promise<void>
    msRequestFullscreen?(): Promise<void>
  }
  mozCancelFullScreen?(): Promise<void>
  cancelFullScreen?(): Promise<void>
  webkitCancelFullScreen?(): Promise<void>
}

const Header = () => {
  // const location = useLocation();
  const { leftSideBarType, isMobile } = useAppSelector((state) => state.layout)
  // const { type } = useAppSelector((state) => state.auth);

  const dispatch = useDispatch()

  // const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  const element: any = Element

  function toggleFullscreen() {
    if (
      !doc.fullscreenElement &&
      /* alternative standard method */ !doc.mozFullScreenElement &&
      !doc.webkitFullscreenElement
    ) {
      // current working methods
      if (doc.documentElement.requestFullscreen) {
        doc.documentElement.requestFullscreen()
      } else if (doc.documentElement.mozRequestFullScreen) {
        doc.documentElement.mozRequestFullScreen()
      } else if (doc.documentElement.webkitRequestFullscreen) {
        doc.documentElement.webkitRequestFullscreen(
          element?.ALLOW_KEYBOARD_INPUT,
        )
      }
    } else if (doc.cancelFullScreen) {
      doc.cancelFullScreen()
    } else if (doc.mozCancelFullScreen) {
      doc.mozCancelFullScreen()
    } else if (doc.webkitCancelFullScreen) {
      doc.webkitCancelFullScreen()
    }
  }

  function tToggle() {
    // dispatch(toggleLeftmenu(!leftMenu));
    if (isMobile) {
      dispatch(
        changeSidebarType({
          sidebarType: 'default',
          isMobile,
          showMenu: true,
        }),
      )
      return
    }
    if (leftSideBarType === 'default') {
      dispatch(changeSidebarType({ sidebarType: 'condensed', isMobile }))
      // changeLeftSidebarType({ sidebarType: "condensed", isMobile });
    } else if (leftSideBarType === 'condensed') {
      // changeLeftSidebarType({ sidebarType: "default", isMobile });
      dispatch(changeSidebarType({ sidebarType: 'default', isMobile }))
    }
  }

  return (
    <header
      className={cn(
        'fixed top-0 right-0 ml-0 left-0 md:left-[250px] bg-white shadow-header z-[1002] ',
        leftSideBarType === 'condensed' || isMobile ? 'ml-0' : '',
        leftSideBarType === 'condensed' ? 'md:left-[70px]' : '',
        isMobile ? 'md:left-0' : '',
      )}
    >
      <div className='h-16 flex justify-between items-center mx-auto'>
        <button type='button' onClick={tToggle} className='px-3 header-item'>
          <BiMenu className='text-2xl' />
        </button>
        <div className='flex items-center  gap-3 px-4'>
          <div className='hidden lg:inline-block ml-1'>
            <button
              type='button'
              onClick={() => {
                toggleFullscreen()
              }}
              className='header-dropdown flex items-center justify-center'
              data-toggle='fullscreen'
            >
              <BiFullscreen className='text-2xl' />
            </button>
          </div>
          {/* <NotificationDropdown /> */}
          <ProfileMenu />
        </div>
      </div>
    </header>
  )
}

export default Header
