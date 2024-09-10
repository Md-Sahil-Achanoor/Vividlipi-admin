import Lottie from 'react-lottie'
import { isRouteErrorResponse, Link, useRouteError } from 'react-router-dom'
import animated500 from '../assets/animations/error-500.json'

function RootBoundary() {
  const error: any = useRouteError()
  let message: string = error?.message || 'Something went wrong'

  //   console.log(error?.message)
  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      message = 'The page you were looking for was not found.'
    }

    if (error.status === 401) {
      message = "You aren't authorized to see this"
    }

    if (error.status === 503) {
      message = 'Looks like our API is down'
    }

    if (error.status === 500) {
      message = 'Internal Server Error'
    }
    if (error.status === 418) {
      message = '🫖'
    }
  }

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animated500,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  }

  return (
    <div className='mx-auto my-40 flex h-full flex-col items-center justify-center'>
      <div>
        <Lottie options={defaultOptions} height={200} width={300} />
      </div>
      <p className='text-center text-primary'>There was a problem</p>
      <h1 className='mt-4 text-center text-3xl font-semibold md:text-5xl'>
        {message}
      </h1>
      <p className='mt-3 text-center text-red-600'>
        Please try again later or contact support if the problem persists.
      </p>
      <div className='mt-7 flex items-center justify-center gap-x-4'>
        <button
          className='button_sm_primary text-sm'
          onClick={() => window?.location.reload()}
        >
          Try again
        </button>
        <Link className='text-primary-main underline' to='/'>
          Go back home
        </Link>
      </div>
    </div>
  )
}

export default RootBoundary
