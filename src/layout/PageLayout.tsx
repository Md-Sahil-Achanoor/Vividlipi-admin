import React, { useEffect } from 'react'
import { BiPlus } from 'react-icons/bi'
import { twMerge } from 'tailwind-merge'
import config from '@/config/config'
import { useAppDispatch } from '../app/store'
import BreadcrumbItem from '../components/atoms/BreadCrumbItem'
import { coreAction } from '../feature/core/coreSlice'
import { BreadCrumbItem, ButtonType } from '../types'

interface Props extends React.PropsWithChildren {
  pageTitle?: string
  className?: string
  title?: string
  breadcrumbItem?: BreadCrumbItem[]
  buttonText?: string
  buttonProps?: ButtonType
  renderElements?: () => React.ReactNode
}

const PageLayout = ({
  children,
  className,
  title,
  breadcrumbItem,
  buttonProps,
  buttonText,
  renderElements,
}: Props) => {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(coreAction.resetSort())
    document.title = `${title} - ${config?.projectName}`
  }, [])

  return (
    <div className='pt-[60px] md:pt-[90px] pb-[80px] px-[24px] container mx-auto h-full'>
      <div className='flex item-center justify-between gap-2'>
        <div>
          {title && (
            <h1 className='text-lg md:text-xl font-semibold'>{title}</h1>
          )}
          {breadcrumbItem && <BreadcrumbItem items={breadcrumbItem} />}
        </div>
        <div className='flex items-center gap-1'>
          {renderElements && renderElements()}
          {buttonText && (
            <button className='button_sm_primary' {...buttonProps}>
              <BiPlus className='mr-1' />
              <span className='mr-1'>{buttonText}</span>
            </button>
          )}
        </div>
      </div>
      <div className={twMerge('w-full my-2', className)}>{children}</div>
    </div>
  )
}

export default PageLayout
