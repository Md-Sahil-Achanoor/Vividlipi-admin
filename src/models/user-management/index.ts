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
  CMS_Home_Management: Yup.array(optionsSchema),
  Product_List_Management: Yup.array(optionsSchema),
  Product_Category_Management: Yup.array(optionsSchema),
  Product_Sub_Category_Management: Yup.array(optionsSchema),
  Product_Author_Management: Yup.array(optionsSchema),
  Product_Publisher_Management: Yup.array(optionsSchema),
  Product_Coupon_Management: Yup.array(optionsSchema),
  User_Admin_Management: Yup.array(optionsSchema),
  User_Role_Management: Yup.array(optionsSchema),
  Order_List_Management: Yup.array(optionsSchema),
  Order_User_Management: Yup.array(optionsSchema),
  Order_Assign_Management: Yup.array(optionsSchema),
  Photo_Albums: Yup.array(optionsSchema),
  Photos: Yup.array(optionsSchema),
})

export type IRolePermissionForm = Yup.InferType<typeof rolePermissionFormSchema>

export const userManagementFormSchema = Yup.object().shape({
  name: Yup.string()
    .required('Name is required')
    .test({
      test: (value) => {
        return !/^\s*$/g.test(value)
      },
      message: 'Name is required',
    }),
  email: Yup.string()
    // .email('Invalid email format')
    .matches(/^[^@]+@[^@]+\.[^@]+$/, 'Invalid email format')
    .required('Email is required'),
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
