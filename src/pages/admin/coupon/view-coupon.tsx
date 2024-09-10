import Loader from '@/components/atoms/Loader'
import CouponAuthor from '@/components/module/coupon/coupon-author'
import CouponCategory from '@/components/module/coupon/coupon-category'
import CouponProduct from '@/components/module/coupon/coupon-product'
import CouponPublisher from '@/components/module/coupon/coupon-publisher'
import CouponSubCategory from '@/components/module/coupon/coupon-sub-category'
import { Card } from '@/components/ui/Card'
import { useGetCouponByIdQuery } from '@/feature/coupon/couponQuery'
import PageLayout from '@/layout/PageLayout'
import {
  AuthorResponse,
  BreadCrumbItem,
  CategoryResponse,
  ProductResponse,
} from '@/types'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
const breadcrumbItem: BreadCrumbItem[] = [
  {
    name: 'Coupon List',
    link: '/admin/coupon/coupon-list',
  },
  {
    name: 'View Coupon',
    link: '#',
  },
]

const ViewCoupon = () => {
  const { id } = useParams()

  const {
    isLoading: loading,
    refetch,
    data,
  } = useGetCouponByIdQuery({ query: { id } }, { skip: !id })

  useEffect(() => {
    if (!id) {
      refetch()
    }
  }, [id, refetch])

  return (
    <PageLayout title='View Coupon' breadcrumbItem={breadcrumbItem}>
      <Card className='border rounded-md'>
        <div className='max-w-screen-lg mx-auto'>
          <h3 className='text-center text-2xl font-semibold text-primary-main'>
            Coupon Details
          </h3>
          {id && loading ? (
            <Loader />
          ) : (
            <div className='grid grid-cols-2 gap-6 mt-5'>
              <div className=''>
                <label className='font-semibold mb-2 inline-block'>
                  Coupon Code
                </label>
                <p className='text-sm text-green-600'>
                  {data?.data?.coupon_name}
                </p>
              </div>

              <div>
                <label className='font-semibold mb-2 inline-block'>
                  Discount Type
                </label>
                <p className='text-sm'>{data?.data?.discount_type}</p>
              </div>
              <div>
                <label className='font-semibold mb-2 inline-block'>
                  Discount
                </label>
                <p className='text-sm'>{data?.data?.discount_value}</p>
              </div>
              <div>
                <label className='font-semibold mb-2 inline-block'>
                  Minimum Amount
                </label>
                <p className='text-sm'>{data?.data?.minimum_cart_value}</p>
              </div>
              <div>
                <label className='font-semibold mb-2 inline-block'>
                  Start Date
                </label>
                <p className='text-sm'>{data?.data?.start_date}</p>
              </div>
              <div>
                <label className='font-semibold mb-2 inline-block'>
                  End Date
                </label>
                <p className='text-sm'>{data?.data?.end_date}</p>
              </div>
              <CouponProduct
                data={(data?.data?.product_ids as ProductResponse[]) || []}
              />
              <CouponCategory
                data={(data?.data?.category_1 as CategoryResponse[]) || []}
              />
              <CouponSubCategory
                data={(data?.data?.category_2 as CategoryResponse[]) || []}
              />
              <CouponAuthor
                data={(data?.data?.author_ids as AuthorResponse[]) || []}
              />
              <CouponPublisher
                data={(data?.data?.publisher_ids as AuthorResponse[]) || []}
              />
            </div>
          )}
        </div>
      </Card>
    </PageLayout>
  )
}

export default ViewCoupon
