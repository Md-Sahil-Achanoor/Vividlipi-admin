import { BiLoader } from 'react-icons/bi'

const Loading = () => {
  return (
    <div className='flex justify-center items-center flex-column bg-background gap-2 h-screen'>
      {/* <img src={logoLightSvg} alt="" className="h-[50px]" /> */}
      <span className='uppercase'>Vividlipi</span>
      <BiLoader className='text-xl text-pink-500' />
    </div>
  )
}

export default Loading
