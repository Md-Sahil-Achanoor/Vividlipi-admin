import { useAppSelector } from '@/app/store'
import logo from '@/assets/Images/logo.png'
import { cn } from '@/utils/twmerge'
import { Link } from 'react-router-dom'

const Logo = () => {
  const { leftSideBarType, isMobile } = useAppSelector((state) => state.layout)

  return (
    <Link
      to='/'
      className={cn(leftSideBarType === 'condensed' ? 'w-full' : 'w-full')}
    >
      {isMobile ? (
        <span className='w-full flex items-center justify-center'>
          <div className='flex items-center justify-center gap-2 my-2'>
            {/* <img className="w-10" src={logo} alt="LOGO" /> */}
            <h1 className='text-2xl ml-2'>Vlipi</h1>
          </div>
        </span>
      ) : leftSideBarType !== 'default' ? (
        <span className='w-full flex items-center justify-center'>
          <div className='flex items-center justify-center gap-2 my-2'>
            {/* <img className="w-10" src={logo} alt="LOGO" /> */}
            <h1 className='text-2xl ml-2'>Vlipi</h1>
          </div>
        </span>
      ) : (
        <span className='w-full '>
          <div className='flex items-center justify-center gap-2 my-2'>
            <img className='w-28' src={logo} alt='LOGO' />
            {/* <h1 className="text-2xl ml-2">Vividlipi</h1> */}
          </div>
        </span>
      )}
    </Link>
  )
}

export default Logo
