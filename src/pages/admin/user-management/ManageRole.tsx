import { useAppDispatch, useAppSelector } from '@/app/store'
import Loader from '@/components/atoms/Loader'
import MultiSelectItem from '@/components/atoms/MultiSelectItem'
import CustomInput from '@/components/form/CustomInput'
import InfiniteSelect from '@/components/form/InfiniteSelect'
import { Card } from '@/components/ui/Card'
import { permissionOptions } from '@/constants/role-constant'
import {
  useGetRolePermissionByIdQuery,
  useManageRolePermissionMutation,
} from '@/feature/user-management/userManagementQuery'
import { userManagementAction } from '@/feature/user-management/userManagementSlice'
import PageLayout from '@/layout/PageLayout'
import {
  IOptions,
  IRolePermissionForm,
  rolePermissionFormSchema,
} from '@/models'
import { BreadCrumbItem, RoleBase, RolePermission } from '@/types'
import { convertPermissionIntoObject } from '@/utils/validateSchema'
import { Field, Form, Formik, FormikHelpers } from 'formik'
import { useEffect } from 'react'
import { BsArrowRightShort } from 'react-icons/bs'
import { useNavigate, useParams } from 'react-router-dom'

const initialValues: IRolePermissionForm = {
  Title: '',
  Dashboard: [],
  Product_List_Management: [],
  User_Admin_Management: [],
  User_Role_Management: [],
  Product_Category_Management: [],
  Product_Sub_Category_Management: [],
  CMS_Home_Management: [],
  Order_List_Management: [],
  Order_User_Management: [],
  Order_Assign_Management: [],
  Product_Author_Management: [],
  Product_Publisher_Management: [],
  Product_Coupon_Management: [],
  Photo_Albums: [],
  Photos: [],
}

const ManageRole = () => {
  const { id } = useParams()
  // console.log(`\n\n ~ ManageRole ~ id:`, id)
  const router = useNavigate()
  const dispatch = useAppDispatch()
  // const [values] = useState<Role | null>(null);
  const { singleRolePermission } = useAppSelector(
    (state) => state.userManagement,
  )
  const breadcrumbItem: BreadCrumbItem[] = [
    {
      name: 'Role List',
      link: '/admin/user-management/role-list',
    },
    {
      name: id ? 'Edit Role' : 'Create Role',
      link: '#',
    },
  ]

  const { isLoading: loading, refetch } = useGetRolePermissionByIdQuery(
    { query: { id } },
    { skip: !id },
  )

  const [manageRolePermission, { isLoading }] =
    useManageRolePermissionMutation()

  const onSubmit = async (
    values: IRolePermissionForm,
    { setSubmitting, resetForm }: FormikHelpers<IRolePermissionForm>,
  ) => {
    console.log(values)
    const { Title, ...rest } = values

    type Type = keyof RolePermission
    type RestType = IRolePermissionForm[keyof IRolePermissionForm]
    const obj: Record<Type, RoleBase> = {}
    const newRest = rest as Record<string, RestType>
    Object.keys(newRest).forEach((key) => {
      if (newRest[key] && newRest[key]?.length > 0) {
        obj[key] = convertPermissionIntoObject(
          newRest[key] as IOptions[],
        ) as RoleBase
      }
    })

    // const permissions = {
    //   Dashboard: convertPermissionIntoObject(values.Dashboard as IOptions[]),
    //   Product_Category_Management: convertPermissionIntoObject(
    //     values.Product_Category_Management as IOptions[]
    //   ),
    //   Analytics_and_Reporting: convertPermissionIntoObject(
    //     values.Analytics_and_Reporting as IOptions[]
    //   ),
    //   Customer_Support: convertPermissionIntoObject(
    //     values.Customer_Support as IOptions[]
    //   ),
    //   Shipping_Management: convertPermissionIntoObject(
    //     values.Shipping_Management as IOptions[]
    //   ),
    //   Content_Management: convertPermissionIntoObject(
    //     values.Content_Management as IOptions[]
    //   ),
    //   Dashboard_Customization: convertPermissionIntoObject(
    //     values.Dashboard_Customization as IOptions[]
    //   ),
    //   Multi_language_Support: convertPermissionIntoObject(
    //     values.Multi_language_Support as IOptions[]
    //   ),
    //   Backup_and_Recovery: convertPermissionIntoObject(
    //     values.Backup_and_Recovery as IOptions[]
    //   ),
    //   Notification_Management: convertPermissionIntoObject(
    //     values.Notification_Management as IOptions[]
    //   ),
    //   Product_List_Management: convertPermissionIntoObject(
    //     values.Product_List_Management as IOptions[]
    //   ),
    //   User_Management: convertPermissionIntoObject(
    //     values.User_Management as IOptions[]
    //   ),
    //   Promotions_and_Discounts: convertPermissionIntoObject(
    //     values.Promotions_and_Discounts as IOptions[]
    //   ),
    //   Return_and_Refund_Management: convertPermissionIntoObject(
    //     values.Return_and_Refund_Management as IOptions[]
    //   ),
    //   Permissions_and_Roles: convertPermissionIntoObject(
    //     values.Permissions_and_Roles as IOptions[]
    //   ),
    //   Product_Sub_Category_Management: convertPermissionIntoObject(
    //     values.Product_Sub_Category_Management as IOptions[]
    //   ),
    // };

    await manageRolePermission({
      id,
      data: {
        Title,
        Permissions: obj,
      },
      options: {
        setSubmitting,
        resetForm,
        router,
      },
    })
  }

  useEffect(() => {
    if (id) {
      refetch()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  useEffect(() => {
    dispatch(userManagementAction.resetRolePermission())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <PageLayout
      title={id ? 'Edit Role' : 'Create Role'}
      breadcrumbItem={breadcrumbItem}
    >
      <Card className='border rounded-md'>
        {id && loading ? (
          <Loader />
        ) : (
          <Formik
            initialValues={singleRolePermission || initialValues}
            validationSchema={rolePermissionFormSchema}
            onSubmit={onSubmit}
            enableReinitialize
          >
            {({ isSubmitting, values, setFieldValue }) => (
              <Form>
                {/* {console.log(errors)} */}
                <div className='mt-5'>
                  <div className='max-w-[50%]'>
                    <Field
                      name='Title'
                      label='Role Name'
                      component={CustomInput}
                      placeholder='Type here...'
                      isRequired
                    />
                  </div>
                  <div className='grid grid-cols-2 gap-3'>
                    <div className='col-span-1'>
                      <Field
                        label='Dashboard'
                        name='Dashboard'
                        isRequired={false}
                        renderData={permissionOptions.Dashboard}
                        renderItem={(item: IOptions) => <>{item?.label}</>}
                        isActive={(item: IOptions) =>
                          values?.Dashboard?.find(
                            (Dashboard) => Dashboard?.value === item?.value,
                          )
                        }
                        renderName={() => (
                          <MultiSelectItem<IOptions>
                            data={values?.Dashboard as IOptions[]}
                            defaultName='Select...'
                            displayName='label'
                            onClick={(item) => {
                              setFieldValue(
                                'Dashboard',
                                values?.Dashboard?.filter(
                                  (Dashboard) =>
                                    Dashboard?.value !== item?.value,
                                ),
                              )
                            }}
                          />
                        )}
                        onChangeCallback={(item: IOptions) => {
                          // check unique item in array
                          const isUnique = values?.Dashboard?.find(
                            (Dashboard) => Dashboard?.value === item?.value,
                          )
                          if (!isUnique) {
                            setFieldValue('Dashboard', [
                              ...(values?.Dashboard as IOptions[]),
                              item,
                            ])
                          }
                        }}
                        clearData={(item: IOptions) => {
                          // find data and clear
                          const data = values?.Dashboard?.filter(
                            (Dashboard) => Dashboard?.value !== item?.value,
                          )
                          setFieldValue('Dashboard', data)
                        }}
                        isSelected={false}
                        component={InfiniteSelect}
                        isAuth
                      />
                    </div>

                    <div className='col-span-1'>
                      <Field
                        label='CMS Home Management'
                        name='CMS_Home_Management'
                        isRequired={false}
                        renderData={permissionOptions.CMS_Home_Management}
                        renderItem={(item: IOptions) => <>{item?.label}</>}
                        isActive={(item: IOptions) =>
                          values?.CMS_Home_Management?.find(
                            (CMS_Home_Management) =>
                              CMS_Home_Management?.value === item?.value,
                          )
                        }
                        renderName={() => (
                          <MultiSelectItem<IOptions>
                            data={values?.CMS_Home_Management as IOptions[]}
                            defaultName='Select...'
                            displayName='label'
                            onClick={(item) => {
                              setFieldValue(
                                'CMS_Home_Management',
                                values?.CMS_Home_Management?.filter(
                                  (CMS_Home_Management) =>
                                    CMS_Home_Management?.value !== item?.value,
                                ),
                              )
                            }}
                          />
                        )}
                        onChangeCallback={(item: IOptions) => {
                          const isUnique = values?.CMS_Home_Management?.find(
                            (CMS_Home_Management) =>
                              CMS_Home_Management?.value === item?.value,
                          )
                          if (!isUnique) {
                            setFieldValue('CMS_Home_Management', [
                              ...(values?.CMS_Home_Management as IOptions[]),
                              item,
                            ])
                          }
                        }}
                        clearData={(item: IOptions) => {
                          const data = values?.CMS_Home_Management?.filter(
                            (CMS_Home_Management) =>
                              CMS_Home_Management?.value !== item?.value,
                          )
                          setFieldValue('CMS_Home_Management', data)
                        }}
                        isSelected={false}
                        component={InfiniteSelect}
                        isAuth
                      />
                    </div>

                    <div className='col-span-1'>
                      <Field
                        label='Product Management'
                        name='Product_List_Management'
                        isRequired={false}
                        renderData={permissionOptions.Product_List_Management}
                        renderItem={(item: IOptions) => <>{item?.label}</>}
                        isActive={(item: IOptions) =>
                          values?.Product_List_Management?.find(
                            (Product_List_Management) =>
                              Product_List_Management?.value === item?.value,
                          )
                        }
                        renderName={() => (
                          <MultiSelectItem<IOptions>
                            data={values?.Product_List_Management as IOptions[]}
                            defaultName='Select...'
                            displayName='label'
                            onClick={(item) => {
                              setFieldValue(
                                'Product_List_Management',
                                values?.Product_List_Management?.filter(
                                  (Product_List_Management) =>
                                    Product_List_Management?.value !==
                                    item?.value,
                                ),
                              )
                            }}
                          />
                        )}
                        onChangeCallback={(item: IOptions) => {
                          // check unique item in array
                          const isUnique =
                            values?.Product_List_Management?.find(
                              (Product_List_Management) =>
                                Product_List_Management?.value === item?.value,
                            )
                          if (!isUnique) {
                            setFieldValue('Product_List_Management', [
                              ...(values?.Product_List_Management as IOptions[]),
                              item,
                            ])
                          }
                        }}
                        clearData={(item: IOptions) => {
                          // find data and clear
                          const data = values?.Product_List_Management?.filter(
                            (Product_List_Management) =>
                              Product_List_Management?.value !== item?.value,
                          )
                          setFieldValue('Product_List_Management', data)
                        }}
                        isSelected={false}
                        component={InfiniteSelect}
                        isAuth
                      />
                    </div>
                    <div className='col-span-1'>
                      <Field
                        label='Category Management'
                        name='Product_Category_Management'
                        isRequired={false}
                        renderData={
                          permissionOptions.Product_Category_Management
                        }
                        renderItem={(item: IOptions) => <>{item?.label}</>}
                        isActive={(item: IOptions) =>
                          values?.Product_Category_Management?.find(
                            (Product_Category_Management) =>
                              Product_Category_Management?.value ===
                              item?.value,
                          )
                        }
                        renderName={() => (
                          <MultiSelectItem<IOptions>
                            data={
                              values?.Product_Category_Management as IOptions[]
                            }
                            defaultName='Select...'
                            displayName='label'
                            onClick={(item) => {
                              setFieldValue(
                                'Product_Category_Management',
                                values?.Product_Category_Management?.filter(
                                  (Product_Category_Management) =>
                                    Product_Category_Management?.value !==
                                    item?.value,
                                ),
                              )
                            }}
                          />
                        )}
                        onChangeCallback={(item: IOptions) => {
                          // check unique item in array
                          const isUnique =
                            values?.Product_Category_Management?.find(
                              (Product_Category_Management) =>
                                Product_Category_Management?.value ===
                                item?.value,
                            )
                          if (!isUnique) {
                            setFieldValue('Product_Category_Management', [
                              ...(values?.Product_Category_Management as IOptions[]),
                              item,
                            ])
                          }
                        }}
                        clearData={(item: IOptions) => {
                          // find data and clear
                          const data =
                            values?.Product_Category_Management?.filter(
                              (Product_Category_Management) =>
                                Product_Category_Management?.value !==
                                item?.value,
                            )
                          setFieldValue('Product_Category_Management', data)
                        }}
                        isSelected={false}
                        component={InfiniteSelect}
                        isAuth
                      />
                    </div>

                    <div className='col-span-1'>
                      <Field
                        label='Sub Category Management'
                        name='Product_Sub_Category_Management'
                        isRequired={false}
                        renderData={
                          permissionOptions.Product_Sub_Category_Management
                        }
                        renderItem={(item: IOptions) => <>{item?.label}</>}
                        isActive={(item: IOptions) =>
                          values?.Product_Sub_Category_Management?.find(
                            (Product_Sub_Category_Management) =>
                              Product_Sub_Category_Management?.value ===
                              item?.value,
                          )
                        }
                        renderName={() => (
                          <MultiSelectItem<IOptions>
                            data={
                              values?.Product_Sub_Category_Management as IOptions[]
                            }
                            defaultName='Select...'
                            displayName='label'
                            onClick={(item) => {
                              setFieldValue(
                                'Product_Sub_Category_Management',
                                values?.Product_Sub_Category_Management?.filter(
                                  (Product_Sub_Category_Management) =>
                                    Product_Sub_Category_Management?.value !==
                                    item?.value,
                                ),
                              )
                            }}
                          />
                        )}
                        onChangeCallback={(item: IOptions) => {
                          // check unique item in array
                          const isUnique =
                            values?.Product_Sub_Category_Management?.find(
                              (Product_Sub_Category_Management) =>
                                Product_Sub_Category_Management?.value ===
                                item?.value,
                            )
                          if (!isUnique) {
                            setFieldValue('Product_Sub_Category_Management', [
                              ...(values?.Product_Sub_Category_Management as IOptions[]),
                              item,
                            ])
                          }
                        }}
                        clearData={(item: IOptions) => {
                          // find data and clear
                          const data =
                            values?.Product_Sub_Category_Management?.filter(
                              (Product_Sub_Category_Management) =>
                                Product_Sub_Category_Management?.value !==
                                item?.value,
                            )
                          setFieldValue('Product_Sub_Category_Management', data)
                        }}
                        isSelected={false}
                        component={InfiniteSelect}
                        isAuth
                      />
                    </div>

                    <div className='col-span-1'>
                      <Field
                        label='Product Author Management'
                        name='Product_Author_Management'
                        isRequired={false}
                        renderData={permissionOptions.Product_Author_Management}
                        renderItem={(item: IOptions) => <>{item?.label}</>}
                        isActive={(item: IOptions) =>
                          values?.Product_Author_Management?.find(
                            (author) => author?.value === item?.value,
                          )
                        }
                        renderName={() => (
                          <MultiSelectItem<IOptions>
                            data={
                              values?.Product_Author_Management as IOptions[]
                            }
                            defaultName='Select...'
                            displayName='label'
                            onClick={(item) => {
                              setFieldValue(
                                'Product_Author_Management',
                                values?.Product_Author_Management?.filter(
                                  (author) => author?.value !== item?.value,
                                ),
                              )
                            }}
                          />
                        )}
                        onChangeCallback={(item: IOptions) => {
                          const isUnique =
                            values?.Product_Author_Management?.find(
                              (author) => author?.value === item?.value,
                            )
                          if (!isUnique) {
                            setFieldValue('Product_Author_Management', [
                              ...(values?.Product_Author_Management as IOptions[]),
                              item,
                            ])
                          }
                        }}
                        clearData={(item: IOptions) => {
                          const data =
                            values?.Product_Author_Management?.filter(
                              (author) => author?.value !== item?.value,
                            )
                          setFieldValue('Product_Author_Management', data)
                        }}
                        isSelected={false}
                        component={InfiniteSelect}
                        isAuth
                      />
                    </div>

                    <div className='col-span-1'>
                      <Field
                        label='Product Publisher Management'
                        name='Product_Publisher_Management'
                        isRequired={false}
                        renderData={
                          permissionOptions.Product_Publisher_Management
                        }
                        renderItem={(item: IOptions) => <>{item?.label}</>}
                        isActive={(item: IOptions) =>
                          values?.Product_Publisher_Management?.find(
                            (Product_Publisher_Management) =>
                              Product_Publisher_Management?.value ===
                              item?.value,
                          )
                        }
                        renderName={() => (
                          <MultiSelectItem<IOptions>
                            data={
                              values?.Product_Publisher_Management as IOptions[]
                            }
                            defaultName='Select...'
                            displayName='label'
                            onClick={(item) => {
                              setFieldValue(
                                'Product_Publisher_Management',
                                values?.Product_Publisher_Management?.filter(
                                  (Product_Publisher_Management) =>
                                    Product_Publisher_Management?.value !==
                                    item?.value,
                                ),
                              )
                            }}
                          />
                        )}
                        onChangeCallback={(item: IOptions) => {
                          const isUnique =
                            values?.Product_Publisher_Management?.find(
                              (Product_Publisher_Management) =>
                                Product_Publisher_Management?.value ===
                                item?.value,
                            )
                          if (!isUnique) {
                            setFieldValue('Product_Publisher_Management', [
                              ...(values?.Product_Publisher_Management as IOptions[]),
                              item,
                            ])
                          }
                        }}
                        clearData={(item: IOptions) => {
                          const data =
                            values?.Product_Publisher_Management?.filter(
                              (Product_Publisher_Management) =>
                                Product_Publisher_Management?.value !==
                                item?.value,
                            )
                          setFieldValue('Product_Publisher_Management', data)
                        }}
                        isSelected={false}
                        component={InfiniteSelect}
                        isAuth
                      />
                    </div>

                    <div className='col-span-1'>
                      <Field
                        label='Product Coupon Management'
                        name='Product_Coupon_Management'
                        isRequired={false}
                        renderData={permissionOptions.Product_Coupon_Management}
                        renderItem={(item: IOptions) => <>{item?.label}</>}
                        isActive={(item: IOptions) =>
                          values?.Product_Coupon_Management?.find(
                            (Product_Coupon_Management) =>
                              Product_Coupon_Management?.value === item?.value,
                          )
                        }
                        renderName={() => (
                          <MultiSelectItem<IOptions>
                            data={
                              values?.Product_Coupon_Management as IOptions[]
                            }
                            defaultName='Select...'
                            displayName='label'
                            onClick={(item) => {
                              setFieldValue(
                                'Product_Coupon_Management',
                                values?.Product_Coupon_Management?.filter(
                                  (Product_Coupon_Management) =>
                                    Product_Coupon_Management?.value !==
                                    item?.value,
                                ),
                              )
                            }}
                          />
                        )}
                        onChangeCallback={(item: IOptions) => {
                          const isUnique =
                            values?.Product_Coupon_Management?.find(
                              (Product_Coupon_Management) =>
                                Product_Coupon_Management?.value ===
                                item?.value,
                            )
                          if (!isUnique) {
                            setFieldValue('Product_Coupon_Management', [
                              ...(values?.Product_Coupon_Management as IOptions[]),
                              item,
                            ])
                          }
                        }}
                        clearData={(item: IOptions) => {
                          const data =
                            values?.Product_Coupon_Management?.filter(
                              (Product_Coupon_Management) =>
                                Product_Coupon_Management?.value !==
                                item?.value,
                            )
                          setFieldValue('Product_Coupon_Management', data)
                        }}
                        isSelected={false}
                        component={InfiniteSelect}
                        isAuth
                      />
                    </div>

                    <div className='col-span-1'>
                      <Field
                        label='User Management'
                        name='User_Management'
                        isRequired={false}
                        renderData={permissionOptions.User_Admin_Management}
                        renderItem={(item: IOptions) => <>{item?.label}</>}
                        isActive={(item: IOptions) =>
                          values?.User_Admin_Management?.find(
                            (User_Management) =>
                              User_Management?.value === item?.value,
                          )
                        }
                        renderName={() => (
                          <MultiSelectItem<IOptions>
                            data={values?.User_Admin_Management as IOptions[]}
                            defaultName='Select...'
                            displayName='label'
                            onClick={(item) => {
                              setFieldValue(
                                'User_Management',
                                values?.User_Admin_Management?.filter(
                                  (User_Management) =>
                                    User_Management?.value !== item?.value,
                                ),
                              )
                            }}
                          />
                        )}
                        onChangeCallback={(item: IOptions) => {
                          // check unique item in array
                          const isUnique = values?.User_Admin_Management?.find(
                            (User_Management) =>
                              User_Management?.value === item?.value,
                          )
                          if (!isUnique) {
                            setFieldValue('User_Admin_Management', [
                              ...(values?.User_Admin_Management as IOptions[]),
                              item,
                            ])
                          }
                        }}
                        clearData={(item: IOptions) => {
                          // find data and clear
                          const data = values?.User_Admin_Management?.filter(
                            (User_Management) =>
                              User_Management?.value !== item?.value,
                          )
                          setFieldValue('User_Admin_Management', data)
                        }}
                        isSelected={false}
                        component={InfiniteSelect}
                        isAuth
                      />
                    </div>

                    <div className='col-span-1'>
                      <Field
                        label='User Role Management'
                        name='user_role'
                        isRequired={false}
                        renderData={permissionOptions.User_Role_Management}
                        renderItem={(item: IOptions) => <>{item?.label}</>}
                        isActive={(item: IOptions) =>
                          values?.User_Role_Management?.find(
                            (user_role) => user_role?.value === item?.value,
                          )
                        }
                        renderName={() => (
                          <MultiSelectItem<IOptions>
                            data={values?.User_Role_Management as IOptions[]}
                            defaultName='Select...'
                            displayName='label'
                            onClick={(item) => {
                              setFieldValue(
                                'user_role',
                                values?.User_Role_Management?.filter(
                                  (user_role) =>
                                    user_role?.value !== item?.value,
                                ),
                              )
                            }}
                          />
                        )}
                        onChangeCallback={(item: IOptions) => {
                          // check unique item in array
                          const isUnique = values?.User_Role_Management?.find(
                            (user_role) => user_role?.value === item?.value,
                          )
                          if (!isUnique) {
                            setFieldValue('User_Role_Management', [
                              ...(values?.User_Role_Management as IOptions[]),
                              item,
                            ])
                          }
                        }}
                        clearData={(item: IOptions) => {
                          // find data and clear
                          const data = values?.User_Role_Management?.filter(
                            (user_role) => user_role?.value !== item?.value,
                          )
                          setFieldValue('User_Role_Management', data)
                        }}
                        isSelected={false}
                        component={InfiniteSelect}
                        isAuth
                      />
                    </div>

                    <div className='col-span-1'>
                      <Field
                        label='Order List Management'
                        name='Order_List_Management'
                        isRequired={false}
                        renderData={permissionOptions.Order_List_Management}
                        renderItem={(item: IOptions) => <>{item?.label}</>}
                        isActive={(item: IOptions) =>
                          values?.Order_List_Management?.find(
                            (Order_List_Management) =>
                              Order_List_Management?.value === item?.value,
                          )
                        }
                        renderName={() => (
                          <MultiSelectItem<IOptions>
                            data={values?.Order_List_Management as IOptions[]}
                            defaultName='Select...'
                            displayName='label'
                            onClick={(item) => {
                              setFieldValue(
                                'Order_List_Management',
                                values?.Order_List_Management?.filter(
                                  (Order_List_Management) =>
                                    Order_List_Management?.value !==
                                    item?.value,
                                ),
                              )
                            }}
                          />
                        )}
                        onChangeCallback={(item: IOptions) => {
                          const isUnique = values?.Order_List_Management?.find(
                            (Order_List_Management) =>
                              Order_List_Management?.value === item?.value,
                          )
                          if (!isUnique) {
                            setFieldValue('Order_List_Management', [
                              ...(values?.Order_List_Management as IOptions[]),
                              item,
                            ])
                          }
                        }}
                        clearData={(item: IOptions) => {
                          const data = values?.Order_List_Management?.filter(
                            (Order_Management) =>
                              Order_Management?.value !== item?.value,
                          )
                          setFieldValue('Order_Management', data)
                        }}
                        isSelected={false}
                        component={InfiniteSelect}
                        isAuth
                      />
                    </div>

                    <div className='col-span-1'>
                      <Field
                        label='Order User Management'
                        name='Order_User_Management'
                        isRequired={false}
                        renderData={permissionOptions.Order_User_Management}
                        renderItem={(item: IOptions) => <>{item?.label}</>}
                        isActive={(item: IOptions) =>
                          values?.Order_User_Management?.find(
                            (Order_User_Management) =>
                              Order_User_Management?.value === item?.value,
                          )
                        }
                        renderName={() => (
                          <MultiSelectItem<IOptions>
                            data={values?.Order_User_Management as IOptions[]}
                            defaultName='Select...'
                            displayName='label'
                            onClick={(item) => {
                              setFieldValue(
                                'Order_User_Management',
                                values?.Order_User_Management?.filter(
                                  (Order_User_Management) =>
                                    Order_User_Management?.value !==
                                    item?.value,
                                ),
                              )
                            }}
                          />
                        )}
                        onChangeCallback={(item: IOptions) => {
                          const isUnique = values?.Order_User_Management?.find(
                            (Order_User_Management) =>
                              Order_User_Management?.value === item?.value,
                          )
                          if (!isUnique) {
                            setFieldValue('Order_User_Management', [
                              ...(values?.Order_User_Management as IOptions[]),
                              item,
                            ])
                          }
                        }}
                        clearData={(item: IOptions) => {
                          const data = values?.Order_User_Management?.filter(
                            (Order_User_Management) =>
                              Order_User_Management?.value !== item?.value,
                          )
                          setFieldValue('Order_User_Management', data)
                        }}
                        isSelected={false}
                        component={InfiniteSelect}
                        isAuth
                      />
                    </div>

                    <div className='col-span-1'>
                      <Field
                        label='Assign Order Management'
                        name='Order_Assign_Management'
                        isRequired={false}
                        renderData={permissionOptions.Order_Assign_Management}
                        renderItem={(item: IOptions) => <>{item?.label}</>}
                        isActive={(item: IOptions) =>
                          values?.Order_Assign_Management?.find(
                            (order) => order?.value === item?.value,
                          )
                        }
                        renderName={() => (
                          <MultiSelectItem<IOptions>
                            data={values?.Order_Assign_Management as IOptions[]}
                            defaultName='Select...'
                            displayName='label'
                            onClick={(item) => {
                              setFieldValue(
                                'Order_Assign_Management',
                                values?.Order_Assign_Management?.filter(
                                  (order) => order?.value !== item?.value,
                                ),
                              )
                            }}
                          />
                        )}
                        onChangeCallback={(item: IOptions) => {
                          const isUnique =
                            values?.Order_Assign_Management?.find(
                              (order) => order?.value === item?.value,
                            )
                          if (!isUnique) {
                            setFieldValue('Order_Assign_Management', [
                              ...(values?.Order_Assign_Management as IOptions[]),
                              item,
                            ])
                          }
                        }}
                        clearData={(item: IOptions) => {
                          const data = values?.Order_Assign_Management?.filter(
                            (order) => order?.value !== item?.value,
                          )
                          setFieldValue('Order_Assign_Management', data)
                        }}
                        isSelected={false}
                        component={InfiniteSelect}
                        isAuth
                      />
                    </div>
                  </div>
                </div>
                <div className='flex justify-end'>
                  <button
                    type='submit'
                    className='button_primary'
                    disabled={isSubmitting || isLoading}
                  >
                    {isSubmitting || isLoading ? (
                      <>
                        <span className='w-5 h-5 border-2 animate-spin rounded-full border-transparent border-t-white mr-2' />
                        <span className='font-medium'>Processing</span>
                      </>
                    ) : (
                      <>
                        <span className='font-medium'>
                          {id ? 'Update' : 'Create'}
                        </span>
                        <span className='text-2xl ml-1'>
                          <BsArrowRightShort />
                        </span>
                      </>
                    )}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        )}
      </Card>
    </PageLayout>
  )
}

export default ManageRole
