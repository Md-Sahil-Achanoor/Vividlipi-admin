import * as Yup from 'yup'

export const optionsSchema = Yup.object({
  label: Yup.string().required(),
  value: Yup.string().required(),
})

export type IOptions = Yup.InferType<typeof optionsSchema>

export const rolePermissionFormSchema = Yup.object({
  Title: Yup.string()
    .required("Role name can't be empty")
    .test({
      test: (value) => {
        return !/^\s*$/g.test(value)
      },
      message: "Role name can't be empty",
    }),
  Dashboard: Yup.array(optionsSchema),
  Product_Management: Yup.array(optionsSchema),
  User_Management: Yup.array(optionsSchema),
  Promotions_and_Discounts: Yup.array(optionsSchema),
  Return_and_Refund_Management: Yup.array(optionsSchema),
  Product_Category_Management: Yup.array(optionsSchema),
  Product_Sub_Category_Management: Yup.array(optionsSchema),
  Permissions_and_Roles: Yup.array(optionsSchema),
  Analytics_and_Reporting: Yup.array(optionsSchema),
  Customer_Support: Yup.array(optionsSchema),
  Shipping_Management: Yup.array(optionsSchema),
  Content_Management: Yup.array(optionsSchema),
  Dashboard_Customization: Yup.array(optionsSchema),
  Multi_language_Support: Yup.array(optionsSchema),
  Backup_and_Recovery: Yup.array(optionsSchema),
  Notification_Management: Yup.array(optionsSchema),
  Tax_Management: Yup.array(optionsSchema),
  Order_Management: Yup.array(optionsSchema),
})

export type IRolePermissionForm = Yup.InferType<typeof rolePermissionFormSchema>

export const userManagementFormSchema = Yup.object({
  name: Yup.string()
    .required('Name is required')
    .test({
      test: (value) => {
        return !/^\s*$/g.test(value)
      },
      message: 'Name is required',
    }),
  email: Yup.string().required('Email is required').email('Invalid email'),
  password: Yup.string().required('Password is required').min(6, 'Too short'),
  // confirmPassword: Yup.string()
  //   .required("Confirm password is required")
  //   .oneOf([Yup.ref("password")], "Passwords must match"),
  role: Yup.object({
    Title: Yup.string().required(),
    id: Yup.string().required(),
  })
    .nullable()
    .test({
      test: (value) => {
        return value !== null
      },
      message: 'Role is required',
    }),
})

export type IUserManagementForm = Yup.InferType<typeof userManagementFormSchema>

export type IUserManagement = Omit<IUserManagementForm, 'role'>
