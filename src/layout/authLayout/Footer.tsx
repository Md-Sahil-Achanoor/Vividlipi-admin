import { useAppSelector } from '@/app/store'
import config from '@/config/config'
import { cn } from '@/utils/twmerge'

const Footer = () => {
  const { leftSideBarType, isMobile } = useAppSelector((state) => state.layout)
  return (
    <footer
      className={cn(
        'fixed bottom-0 right-0 ml-0 left-0 md:left-[250px] h-16 mx-auto px-3 py-5 bg-white',
        leftSideBarType === 'condensed' ? 'md:left-[70px]' : '',
        isMobile ? 'md:left-0' : '',
      )}
    >
      <div className='grid grid-cols-12 items-center'>
        <div className='col-span-6'>
          <span className='text-xs sm:text-sm'>
            {new Date().getFullYear()} © Copyright {config?.projectName}.
          </span>
        </div>
        <div className='col-span-6'>
          <div className='d-none d-sm-block' style={{ textAlign: 'right' }}>
            <span className='text-xs sm:text-sm'>
              Design & Develop by <a href='https://kalpas.in/'>Kalpas</a>
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
