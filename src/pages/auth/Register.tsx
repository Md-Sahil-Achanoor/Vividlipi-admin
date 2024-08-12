import CheckboxGroup from '@/components/form/CheckboxGroup'
import CustomInput from '@/components/form/CustomInput'
import config from '@/config/config'
import { operatorSignUpSchema } from '@/modelsauth/signup-validation'
import { FormikSubmitOption } from '@/types'
import { Field, Form, Formik } from 'formik'
import { useEffect, useState } from 'react'
import { BsArrowRightShort } from 'react-icons/bs'
import { Link, useNavigate } from 'react-router-dom'

const initialValues: any = {
  CompanyName: '',
  ShortName: '',
  CompanyEmail: '',
  PhoneNo: '',
  ContactName: '',
  ContactEmail: '',
  GSTIN: '',
  CIN: '',
  Address1: '',
  Address2: '',
  City: '',
  Pincode: '',
  Password: '',
  passwordConfirm: '',
  as: 'operator',
}

const Register = () => {
  const router = useNavigate()
  // const dispatch = useAppDispatch();
  const [type, setType] = useState('password')
  const [showPassword, setShowPassword] = useState('password')

  const isLoading = false
  // const [signIn, { isLoading }] = useOperatorSignUpMutation();

  const onSubmit = async (
    values: any,
    { setSubmitting, resetForm }: FormikSubmitOption,
  ) => {
    const distinctValues = operatorSignUpSchema.cast(values)
    const { Address2, CIN, ...rest } = distinctValues
    const body: any = { ...rest, Address2: Address2 || '' }
    if (CIN) {
      body.CIN = CIN
    }
    setSubmitting(true)
    console.log(body)
    resetForm()
    router('/account/login')
    // signIn({
    //   data: body,
    //   options: { router, setSubmitting, resetForm, conditions: { as } },
    // });
  }

  useEffect(() => {
    document.title = `Register | ${config.projectName}`
  }, [])

  return (
    // <LoginLayout>
    <div className='z-30 flex items-center justify-start mx-[5%] h-full '>
      <div className='max-w-[500px] overflow-y-auto primary-scrollbar w-full my-auto mt-[7%] mb-10 p-8 rounded-md bg-white'>
        <h2 className='text-4xl text-pink-500 text-center pt-0 pb-4'>
          Register
        </h2>
        <Formik
          initialValues={initialValues}
          validationSchema={operatorSignUpSchema}
          onSubmit={onSubmit}
        >
          {({ values, isSubmitting }) => (
            <Form>
              <div>
                <CheckboxGroup
                  name='as'
                  options={[
                    { key: 'As Operator', value: 'operator' },
                    { key: 'As Event Manager', value: 'eventmanager' },
                  ]}
                  isMulti={false}
                  itemsclass='my-2 mb-5'
                  type='radio'
                />
              </div>
              <div className='mt-5'>
                <Field
                  name='CompanyName'
                  label='Company Name'
                  type='text'
                  component={CustomInput}
                  placeholder='Type your company name'
                  isRequired
                />

                <Field
                  name='ShortName'
                  label='Short Name'
                  type='text'
                  component={CustomInput}
                  placeholder='Type your short name'
                  isRequired
                />

                <Field
                  name='CompanyEmail'
                  label='Company Email'
                  type='text'
                  component={CustomInput}
                  placeholder='example@domain.com'
                  isRequired
                />

                <Field
                  name='PhoneNo'
                  label='Phone no'
                  type='text'
                  component={CustomInput}
                  placeholder='Type your phone no'
                  isRequired
                />

                <Field
                  name='ContactName'
                  label='Contact Name'
                  type='text'
                  component={CustomInput}
                  placeholder='Type your contact name'
                  isRequired
                />

                <Field
                  name='ContactEmail'
                  label='Contact Email'
                  type='email'
                  component={CustomInput}
                  placeholder='example@domain.com'
                  isRequired
                />

                <Field
                  name='GSTIN'
                  label='GSTIN'
                  type='text'
                  component={CustomInput}
                  placeholder='Type your GSTIN'
                  isRequired
                />

                {values.as === 'operator' && (
                  <Field
                    name='CIN'
                    label='CIN'
                    type='text'
                    component={CustomInput}
                    placeholder='Type your CIN'
                    isRequired
                  />
                )}

                <Field
                  name='Address1'
                  label='Address1'
                  type='text'
                  component={CustomInput}
                  placeholder='Type your address'
                  isRequired
                />

                <Field
                  name='Address2'
                  label='Address2'
                  type='text'
                  component={CustomInput}
                  placeholder='Type your address'
                  isRequired={false}
                />

                <Field
                  name='City'
                  label='City'
                  type='text'
                  component={CustomInput}
                  placeholder='Type your City'
                  isRequired
                />

                <Field
                  name='Pincode'
                  label='Pin Code'
                  type='text'
                  component={CustomInput}
                  placeholder='Type your pin code'
                  isRequired
                />

                <Field
                  name='Password'
                  label='Password'
                  type={type}
                  component={CustomInput}
                  placeholder='Password 8+ characters'
                  isRequired
                  isPassword
                  // onChange={handleChange}
                  handleViewPassword={() => {
                    setType(type === 'password' ? 'text' : 'password')
                  }}
                />

                <Field
                  name='passwordConfirm'
                  label='Confirm Password'
                  type={showPassword}
                  component={CustomInput}
                  placeholder='Password 8+ characters'
                  isRequired
                  isPassword
                  handleViewPassword={() => {
                    setShowPassword(
                      showPassword === 'password' ? 'text' : 'password',
                    )
                  }}
                />

                {/* <div className="flex justify-between">
                    <p className="flex items-center">
                      <input type="checkbox" className="mr-2 cursor-pointer" />
                      Remember Me
                    </p>
                    <Link
                      to={"/account/forgot-password"}
                      className="text-sm font-normal underline hover:text-pink-500"
                    >
                      I forgot my password
                    </Link>
                  </div> */}

                <button
                  type='submit'
                  className='border flex items-center justify-center w-full my-5 py-2 text-white bg-pink-500 rounded text-lg hover:bg-pink-400 duration-200'
                  disabled={isSubmitting || isLoading}
                >
                  {isLoading || isSubmitting ? (
                    <>
                      <span className='w-5 h-5 border-2 animate-spin rounded-full border-transparent border-t-white mr-2' />
                      <span className='font-medium'>Processing</span>
                    </>
                  ) : (
                    <>
                      <span className='font-medium'>Register</span>
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

        <div className='flex justify-between'>
          <p className='mx-auto'>
            <Link to='/account/login'>
              Already have an account?
              <span className='text-pink-500 hover:underline mx-1'>Login</span>
            </Link>
          </p>
        </div>
      </div>
    </div>
    // </LoginLayout>
  )
}

export default Register
