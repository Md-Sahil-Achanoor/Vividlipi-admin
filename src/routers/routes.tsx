/* eslint-disable react-refresh/only-export-components */
import { lazy } from 'react'
import { Navigate, createBrowserRouter } from 'react-router-dom'
import AccessLayout from './middleware/access-layout'

const ProductCommentList = lazy(() => import('@/pages/admin/product-comments'))
const AssignOrderList = lazy(
  () => import('@/pages/admin/order-management/assign-orders'),
)
const OrderList = lazy(
  () => import('@/pages/admin/order-management/order-list'),
)
const ManageAssignOrder = lazy(
  () =>
    import('@/pages/admin/order-management/assign-orders/manage-assign-order'),
)
const OrderUserList = lazy(() => import('@/pages/admin/order-management/user'))
const CouponList = lazy(() => import('@/pages/admin/coupon'))
const ManageCoupon = lazy(() => import('@/pages/admin/coupon/manage-coupon'))
const ViewCoupon = lazy(() => import('@/pages/admin/coupon/view-coupon'))
const PublisherList = lazy(() => import('@/pages/admin/publisher'))
const ManageRole = lazy(
  () => import('@/pages/admin/user-management/ManageRole'),
)
const RoleList = lazy(() => import('@/pages/admin/user-management/RoleList'))
const UserList = lazy(() => import('@/pages/admin/user-management/UserList'))
const ErrorPage = lazy(() => import('../pages/error'))
const NotFound = lazy(() => import('../pages/NotFound'))
const AdminDashboard = lazy(() => import('../pages/admin/dashboard'))
const MainCategoryList = lazy(() => import('../pages/admin/main-category'))
const ProductList = lazy(() => import('../pages/admin/product'))
const ManageProduct = lazy(() => import('../pages/admin/product/ManageProduct'))
const SubCategoryList = lazy(() => import('../pages/admin/sub-category'))
const NonAuth = lazy(() => import('../layout/NonAuth'))
// const Home = lazy(() => import('../pages/Home'))
const Login = lazy(() => import('../pages/auth/Login'))
const AppWrapper = lazy(() => import('./middleware/AppWrapper'))
const PrivateOutlet = lazy(() => import('./middleware/PrivateOutlet'))
const AuthorList = lazy(() => import('@/pages/admin/author'))
const HomePage = lazy(() => import('@/pages/admin/home'))

/**
 * @module { Router } @URLs
 * @description
 */
const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <PrivateOutlet roles={['admin', 'sub-admin']}>
        <AppWrapper />
      </PrivateOutlet>
    ),
    errorElement: <ErrorPage />,
    children: [{ path: '', element: <Navigate to='/admin/dashboard' /> }],
  },

  /**
   * @module Main { Admin } @protected
   * @Role Admin
   */
  {
    path: '/admin',
    element: <PrivateOutlet roles={['admin', 'sub-admin']} />,
    errorElement: <ErrorPage />,
    children: [
      { path: '', element: <Navigate to='/admin/dashboard' /> },

      /**
       * @SubModule { Dashboard }
       * @Role Admin
       * */
      {
        path: 'dashboard',
        element: <AdminDashboard />,
      },
      /**
       * @SubModule { CMS }
       * @Role Admin
       * */
      {
        path: 'cms',
        element: (
          <AccessLayout
            access='CMS_Home_Management'
            type={['view', 'add', 'update', 'delete']}
          >
            <AppWrapper />
          </AccessLayout>
        ),
        children: [
          { path: '', element: <Navigate to='/admin/cms/home-page' /> },
          { path: 'home-page', element: <HomePage /> },
        ],
      },
      /**
       * @SubModule { Products }
       * @Role Admin
       * */
      {
        path: 'products',
        element: <AppWrapper />,
        children: [
          {
            path: '',
            element: <Navigate to='/admin/products/product-list' />,
          },
          {
            path: 'product-list',
            element: (
              <AccessLayout
                access='Product_List_Management'
                type={['view', 'add', 'update', 'delete']}
              >
                <ProductList />
              </AccessLayout>
            ),
          },
          {
            path: 'product-list/add-product',
            element: (
              <AccessLayout
                access='Product_List_Management'
                type={['add', 'edit']}
              >
                <ManageProduct />
              </AccessLayout>
            ),
          },
          {
            path: 'product-list/edit-product/:id',
            element: (
              <AccessLayout access='Product_List_Management' type={'edit'}>
                <ManageProduct />
              </AccessLayout>
            ),
          },
        ],
      },
      /**
       * @SubModule { Categories }
       * @Role Admin
       * */
      {
        path: 'categories',
        element: <AppWrapper />,
        children: [
          {
            path: 'main-category',
            element: (
              <AccessLayout
                access='Product_Category_Management'
                type={['view', 'add', 'update', 'delete']}
              >
                <MainCategoryList />
              </AccessLayout>
            ),
          },
          {
            path: 'sub-category',
            element: (
              <AccessLayout
                access='Product_Sub_Category_Management'
                type={['view', 'add', 'update', 'delete']}
              >
                <SubCategoryList />
              </AccessLayout>
            ),
          },
          // { path: "edit/:id", element: <EditProduct /> },
        ],
      },
      /**
       * @SubModule { Publisher }
       * @Role Admin
       * */
      {
        path: 'publisher',
        element: <AppWrapper />,
        children: [
          {
            path: '',
            element: <Navigate to='/admin/publisher/publisher-list' />,
          },
          {
            path: 'publisher-list',
            element: (
              <AccessLayout
                access='Product_Publisher_Management'
                type={['view', 'add', 'update', 'delete']}
              >
                <PublisherList />
              </AccessLayout>
            ),
          },
          // { path: "edit/:id", element: <EditProduct /> },
        ],
      },

      /**
       * @SubModule { Author }
       * @Role Admin
       * */
      {
        path: 'author',
        element: <AppWrapper />,
        children: [
          {
            path: 'author-list',
            element: (
              <AccessLayout
                access='Product_Author_Management'
                type={['view', 'add', 'update', 'delete']}
              >
                <AuthorList />
              </AccessLayout>
            ),
          },
          // { path: "edit/:id", element: <EditProduct /> },
        ],
      },
      /**
       * @SubModule { User Management }
       * @Role Admin
       * */
      {
        path: 'user-management',
        element: <AppWrapper />,
        children: [
          {
            path: '',
            element: <Navigate to='/admin/user-management/role-list' />,
          },
          {
            path: 'role-list',
            element: <AppWrapper />,
            children: [
              {
                path: '',
                element: (
                  <AccessLayout
                    access='User_Role_Management'
                    type={['view', 'add', 'update', 'delete']}
                  >
                    <RoleList />
                  </AccessLayout>
                ),
              },
              {
                path: 'add-role',
                element: (
                  <AccessLayout
                    access='User_Role_Management'
                    type={['add', 'update']}
                  >
                    <ManageRole />
                  </AccessLayout>
                ),
              },
              {
                path: 'edit-role/:id',
                element: (
                  <AccessLayout access='User_Role_Management' type={'edit'}>
                    <ManageRole />
                  </AccessLayout>
                ),
              },
            ],
          },
          {
            path: 'user-list',
            element: (
              <AccessLayout
                access='User_Admin_Management'
                type={['view', 'add', 'update', 'delete']}
              >
                <UserList />
              </AccessLayout>
            ),
          },
        ],
      },
      /**
       * @SubModule { Coupon }
       * @Role Admin
       * */
      {
        path: 'coupon',
        element: <AppWrapper />,
        children: [
          {
            path: '',
            element: <Navigate to='/admin/coupon/coupon-list' />,
          },
          {
            path: 'coupon-list',
            element: (
              <AccessLayout
                access='Product_Coupon_Management'
                type={['view', 'add', 'update', 'delete']}
              >
                <CouponList />
              </AccessLayout>
            ),
          },
          {
            path: 'coupon-list/add-coupon',
            element: (
              <AccessLayout
                access='Product_Coupon_Management'
                type={['add', 'update']}
              >
                <ManageCoupon />
              </AccessLayout>
            ),
          },
          {
            path: 'coupon-list/edit-coupon/:id',
            element: (
              <AccessLayout access='Product_Coupon_Management' type={'edit'}>
                <ManageCoupon />
              </AccessLayout>
            ),
          },
          {
            path: 'coupon-list/view-coupon/:id',
            element: (
              <AccessLayout access='Product_Coupon_Management' type={'view'}>
                <ViewCoupon />
              </AccessLayout>
            ),
          },
        ],
      },

      /**
       * @SubModule { Coupon }
       * @Role Admin
       * */
      {
        path: 'product-comment',
        element: <AppWrapper />,
        children: [
          {
            path: '',
            element: (
              <Navigate to='/admin/product-comment/product-comment-list' />
            ),
          },
          {
            path: 'product-comment-list',
            element: (
              <AccessLayout
                access='Product_Comment_Management'
                type={['view', 'update', 'delete']}
              >
                <ProductCommentList />
              </AccessLayout>
            ),
          },
        ],
      },

      /**
       * @SubModule { Order Management }
       * @Role Admin
       * */
      {
        path: 'order-management',
        element: <AppWrapper />,
        children: [
          {
            path: '',
            element: (
              <Navigate to='/admin/order-management/assign-order-list' />
            ),
          },
          {
            path: 'assign-order-list',
            element: <AppWrapper />,
            children: [
              {
                path: '',
                element: (
                  <AccessLayout
                    access='Order_List_Management'
                    type={['view', 'add', 'update', 'delete']}
                  >
                    <AssignOrderList />
                  </AccessLayout>
                ),
              },
              {
                path: 'assign-order',
                element: (
                  <AccessLayout
                    access='Order_Assign_Management'
                    type={['view', 'add', 'update', 'delete']}
                  >
                    <ManageAssignOrder />
                  </AccessLayout>
                ),
              },
              {
                path: 'edit-assign-order/:id',
                element: (
                  <AccessLayout access='Order_Assign_Management' type={'edit'}>
                    <ManageAssignOrder />
                  </AccessLayout>
                ),
              },
            ],
          },
          {
            path: 'order-list',
            element: <OrderList />,
          },
          {
            path: 'order-user-list',
            element: (
              <AccessLayout
                access='Order_User_Management'
                type={['view', 'add', 'update', 'delete']}
              >
                <OrderUserList />
              </AccessLayout>
            ),
          },
        ],
      },
    ],
  },

  /**
   *
   * @module Main { Auth } @public
   *
   */
  {
    path: '/account',
    errorElement: <ErrorPage />,
    element: (
      <NonAuth>
        <AppWrapper />
      </NonAuth>
    ),
    children: [
      { path: '', element: <Navigate to='/account/login' /> },
      { path: 'login', element: <Login /> },
      // { path: "register", element: <Register /> },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
])

export default router
