import { useAppDispatch, useAppSelector } from '@/app/store'
import ManageModule from '@/components/elements/modal/ManageModule'
import FeatureNewIn from '@/components/module/home/feature-new-in/FeatureNewIn'
import ManageFeatureNewIn from '@/components/module/home/feature-new-in/ManageFeatureNewIn'
import FeatureProducts from '@/components/module/home/feature-product/FeatureProducts'
import ManageFeatureProduct from '@/components/module/home/feature-product/ManageFeatureProduct'
import FeatureSlider from '@/components/module/home/feature-slider/FeatureSlider'
import { default as ManageFeatureSlider } from '@/components/module/home/feature-slider/ManageFeatureSlider'
import FeatureSubSlider from '@/components/module/home/feature-sub-slider/FeatureSubSlider'
import ManageFeatureSubSlider from '@/components/module/home/feature-sub-slider/ManageFeatureSubSlider'
import ManageTopTenBook from '@/components/module/home/top-ten-books/ManageTopTenBooks'
import TopTenBook from '@/components/module/home/top-ten-books/TopTenBooks'
import { Card } from '@/components/ui/Card'
import TabButtons from '@/components/ui/TabButtons'
import { tabItems } from '@/constants/tableHeader'
import { coreAction } from '@/feature/core/coreSlice'
import {
  useDeleteFeatureProductMutation,
  useDeleteFeatureSlideMutation,
  useDeleteFeatureSubSlideMutation,
  useDeleteNewInMutation,
  useDeleteTopTenBookMutation,
} from '@/feature/home/homeQuery'
import { homeAction } from '@/feature/home/homeSlice'
import PageLayout from '@/layout/PageLayout'
import { RolePermission } from '@/types'
import { checkType, getModuleName, getTitle } from '@/utils/modules/home'
import { checkPermission } from '@/utils/validateSchema'
import { useState } from 'react'

const HomePage = () => {
  const dispatch = useAppDispatch()
  const { roleDetails } = useAppSelector((state) => state.auth)
  const [activeTab, setActiveTab] = useState<string>('feature-slider')
  const { type } = useAppSelector((state) => state.core)
  const {
    selectedFeatureSlider,
    selectedFeatureSubSlider,
    selectedFeatureProduct,
    selectedTopTenBooks,
  } = useAppSelector((state) => state.home)

  const [deleteFeatureSlider, { isLoading: isDeleteCategory }] =
    useDeleteFeatureSlideMutation()
  const [deleteFeatureSubSlider, { isLoading: isDeleteSubCategory }] =
    useDeleteFeatureSubSlideMutation()
  const [deleteFeatureProduct, { isLoading: isDeleteProduct }] =
    useDeleteFeatureProductMutation()
  const [deleteNewIn, { isLoading: isDeleteNewIn }] = useDeleteNewInMutation()
  const [deleteTopTenBook, { isLoading: isDeleteTopTenBook }] =
    useDeleteTopTenBookMutation()

  const renderItems = () => {
    switch (activeTab) {
      case 'feature-product':
        return <FeatureProducts />
      case 'feature-sub-slider':
        return <FeatureSubSlider />
      case 'feature-new-in':
        return <FeatureNewIn />
      case 'top-ten-books':
        return <TopTenBook />
      default:
        return <FeatureSlider />
    }
  }

  const handleModal = (type: string) => {
    if (type === 'cancelled') {
      dispatch(homeAction.resetHome())
      dispatch(coreAction.toggleModal({ type: '', open: false }))
    }
  }

  const handleUpdateStatus = async () => {
    if (type === 'delete-feature-slider') {
      await deleteFeatureSlider({
        id: selectedFeatureSlider?.id,
        query: {},
      })
    } else if (type === 'delete-feature-sub-slider') {
      await deleteFeatureSubSlider({
        id: selectedFeatureSubSlider?.id,
        query: {},
      })
    } else if (type === 'delete-new-in') {
      await deleteNewIn({
        id: selectedFeatureProduct?.products,
        query: {},
      })
    } else if (type === 'delete-top-ten-books') {
      await deleteTopTenBook({
        id: selectedTopTenBooks?.BookId?.id,
        query: {},
      })
    } else {
      await deleteFeatureProduct({
        id: selectedFeatureProduct?.productId?.id,
        query: {},
      })
    }
  }

  const hasAddPermission = checkPermission({
    rolePermissions: roleDetails as RolePermission,
    type: 'add',
    access: 'CMS_Home_Management',
  })

  const hasDeletePermission = checkPermission({
    rolePermissions: roleDetails as RolePermission,
    type: 'delete',
    access: 'CMS_Home_Management',
  })

  return (
    <PageLayout title='Home Page CMS'>
      {hasAddPermission && (
        <>
          <ManageFeatureSlider />
          <ManageFeatureSubSlider />
          <ManageFeatureProduct />
          <ManageFeatureNewIn />
          <ManageTopTenBook />
        </>
      )}
      {hasDeletePermission && (
        <ManageModule
          classes={
            checkType(type)
              ? {
                  top: 'visible',
                  body: `-translate-y-[0%] max-w-[400px] p-3 min-w-[400px] border-red-500`,
                }
              : {
                  top: 'invisible',
                  body: '-translate-y-[300%] max-w-[400px] p-3 min-w-[400px]',
                }
          }
          handleModal={handleModal}
          wrapperClass='h-full'
          isModalHeader
          outSideClick
          headText={`Delete the ${getModuleName(type)}?`}
          heading={getTitle(
            type,
            selectedFeatureSlider ||
              selectedFeatureSubSlider ||
              selectedFeatureProduct ||
              selectedTopTenBooks,
          )}
          details='Are you certain you want to delete?'
          type='delete'
          buttonText={
            isDeleteCategory ||
            isDeleteSubCategory ||
            isDeleteProduct ||
            isDeleteNewIn ||
            isDeleteTopTenBook
              ? 'Deleting...'
              : 'Delete'
          }
          buttonProps={{
            onClick: handleUpdateStatus,
            disabled:
              isDeleteCategory ||
              isDeleteSubCategory ||
              isDeleteProduct ||
              isDeleteNewIn ||
              isDeleteTopTenBook,
          }}
        />
      )}
      <Card>
        <div className='mb-3 pb-5'>
          <div className='flex justify-center relative mt-2'>
            <TabButtons
              data={tabItems}
              containerClass='box-border justify-safe-center'
              itemClasses='p-3 px-4 whitespace-nowrap'
              onChangeCallback={(data) => setActiveTab(data?.type)}
              isActive={(data) => data?.type === activeTab}
              renderData={(data) => <>{data?.name}</>}
            />
          </div>
          {renderItems()}
        </div>
      </Card>
    </PageLayout>
  )
}

export default HomePage
