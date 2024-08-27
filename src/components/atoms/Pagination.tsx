import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react'
// import { BiLeftArrow, BiRightArrow } from "react-icons/bi";
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'
import { twMerge } from 'tailwind-merge'

interface Page {
  //   page: string;
  //   setCurrentPage: (e: string) => void;
  parentClass?: string
  reInitialize: boolean
  totalPage: number
  setPage: Dispatch<SetStateAction<number>>
}

const Pagination: FC<Page> = ({
  parentClass,
  reInitialize,
  totalPage,
  setPage,
}) => {
  // const dispatch = useAppDispatch();
  // const { totalPage } = useAppSelector((state) => state.common);
  const numberOfPages: string[] = []
  for (let i = 1; i <= totalPage; i++) {
    numberOfPages.push(String(i))
  }
  const handlePagination = (e: string) => {
    setCurrentButton(e)
  }
  const handlePrev = () => {
    setCurrentButton(String(Number(currentButton) - 1))
  }
  const handleNext = () => {
    setCurrentButton(String(Number(currentButton) + 1))
  }

  // Current active button number
  const [currentButton, setCurrentButton] = useState<string>('1')

  // Array of buttons what we see on the page
  const [arrOfCurrButtons, setArrOfCurrButtons] = useState<string[]>([])

  useEffect(() => {
    setCurrentButton('1')
  }, [reInitialize])

  useEffect(() => {
    // setCurrentButton(1)
    let tempNumberOfPages: string[] = [...arrOfCurrButtons]
    const dotsInitial = '...'
    const dotsLeft = '... '
    const dotsRight = ' ...'

    if (numberOfPages.length < 6) {
      tempNumberOfPages = numberOfPages
    } else if (Number(currentButton) >= 1 && Number(currentButton) <= 3) {
      tempNumberOfPages = [
        '1',
        '2',
        '3',
        '4',
        dotsInitial,
        String(numberOfPages.length),
      ]
    } else if (Number(currentButton) === 4) {
      const sliced: string[] = numberOfPages.slice(0, 5).map((el) => String(el))
      tempNumberOfPages = [...sliced, dotsInitial, String(numberOfPages.length)]
    } else if (
      Number(currentButton) > 4 &&
      Number(currentButton) < numberOfPages.length - 2
    ) {
      // from 5 to 8 -> (10 - 2)
      const sliced1: string[] = numberOfPages
        .slice(Number(currentButton) - 2, Number(currentButton))
        .map((el) => String(el)) // sliced1 (5-2, 5) -> [4,5]
      const sliced2: string[] = numberOfPages
        .slice(Number(currentButton), Number(currentButton) + 1)
        .map((el) => String(el)) // sliced1 (5, 5+1) -> [6]
      tempNumberOfPages = [
        '1',
        dotsLeft,
        ...sliced1,
        ...sliced2,
        dotsRight,
        String(numberOfPages.length),
      ] // [1, '...', 4, 5, 6, '...', 10]
    } else if (Number(currentButton) > numberOfPages.length - 3) {
      // > 7
      const sliced: string[] = numberOfPages
        .slice(numberOfPages.length - 4)
        .map((el) => String(el)) // slice(10-4)
      tempNumberOfPages = ['1', dotsLeft, ...sliced]
    } else if (currentButton === dotsInitial) {
      //[1, 2, 3, 4, "...", 10].length = 6 - 3  = 3
      // arrOfCurrButtons[3] = 4 + 1 = 5
      // or
      // [1, 2, 3, 4, 5, "...", 10].length = 7 - 3 = 4
      // [1, 2, 3, 4, 5, "...", 10][4] = 5 + 1 = 6
      setCurrentButton(arrOfCurrButtons[arrOfCurrButtons.length - 3] + 1)
    } else if (currentButton === dotsRight) {
      setCurrentButton(String(Number(arrOfCurrButtons[3]) + 2))
    } else if (currentButton === dotsLeft) {
      setCurrentButton(String(Number(arrOfCurrButtons[3]) - 2))
    }
    setArrOfCurrButtons(tempNumberOfPages)
    setPage(Number(currentButton))
    // dispatch(commonAction.changePageNumber(Number(currentButton)));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentButton, totalPage])

  const helper = (value: string | number) => {
    const dotsInitial = '...'
    const dotsLeft = '... '
    const dotsRight = ' ...'
    if (value == dotsInitial || value == dotsLeft || value == dotsRight) {
      return false
    }
    return true
  }

  const pageNumber = arrOfCurrButtons.map((number) => {
    return (
      <li
        key={number}
        // className={`${currentButton === number ? "bg-primary-main" : ""}`}
        onClick={() => {
          helper(number) ? handlePagination(number) : null
        }}
        className={`flex items-center cursor-pointer justify-center px-4 h-10 ${
          currentButton === number
            ? 'text-white bg-primary-main'
            : ' text-content-primary bg-white border border-borderClr-gray300 hover:bg-gray-100 hover:text-gray-700'
        }`}
      >
        {number}
      </li>
    )
  })

  return (
    <div className={twMerge('my-3 flex justify-center', parentClass)}>
      <ul className='flex justify-center items-center gap-2'>
        <button
          className='flex items-center justify-center px-4 h-10 ml-0  text-content-primary bg-white border cursor-pointer border-borderClr-gray300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 text-sm font-semibold'
          onClick={handlePrev}
          disabled={currentButton === numberOfPages[0]}
        >
          <IoIosArrowBack className='text-xl' /> Previous
        </button>
        <div className='flex justify-between items-center gap-2'>
          {pageNumber}
        </div>
        {Number(currentButton) === numberOfPages.length ? null : (
          <li className=''>
            <button
              onClick={handleNext}
              className='flex items-center justify-center px-4 h-10 text-content-primary bg-white border cursor-pointer border-borderClr-gray300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 text-sm font-semibold '
              disabled={Number(currentButton) === numberOfPages.length}
            >
              Next <IoIosArrowForward className='text-xl' />
            </button>
          </li>
        )}
      </ul>
    </div>
  )
}

export default Pagination
