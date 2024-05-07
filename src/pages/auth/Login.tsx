import { Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { BiLock } from "react-icons/bi";
import { BsArrowRightShort } from "react-icons/bs";
import { HiOutlineEnvelope } from "react-icons/hi2";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/Images/logo.png";
import CustomInput from "../../components/elements/InputComponents/CustomInput";
import { projectName } from "../../constants/service";
import { useSignInMutation } from "../../feature/auth/authQuery";
import { signInSchema } from "../../models/auth/signup-validation";
import { FormikSubmitOption, LoginData } from "../../types";

const initialValues: LoginData = {
  email: "",
  password: "",
};

const Login = () => {
  const router = useNavigate();
  // const dispatch = useAppDispatch();
  const [type, setType] = useState("password");
  const [signIn, { isLoading }] = useSignInMutation();

  const onSubmit = async (
    values: LoginData,
    { setSubmitting, resetForm }: FormikSubmitOption
  ) => {
    const castData = signInSchema.cast(values);
    await signIn({
      data: castData,
      options: { router, setSubmitting, resetForm },
    });
    // const res = {
    //   user: {
    //     ID: "1",
    //     email: castData.email_phone,
    //     name: "John Doe",
    //     role: "Admin",
    //   },
    //   status: 1,
    //   message: "success",
    //   jwt: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.4S5J1j6ZJY2",
    // };
    // dispatch(authAction.loginSuccess(res as any));
    // localStorage.setItem("user", JSON.stringify(res));
    // router("/admin/dashboard");
    // setSubmitting(false);
    // resetForm();
    // console.log(values);
  };

  useEffect(() => {
    document.title = `Login | ${projectName}`;
  }, []);

  return (
    <div className="relative flex items-center justify-center mx-auto h-full">
      <div className="max-w-[500px] w-full my-auto mt-[10%] p-8 rounded-md bg-white shadow-lg">
        <div className="flex justify-center ">
          <img src={logo} alt="logo" className="text-center" />
        </div>
        <h2 className="text-2xl text-custom-primary-main text-center py-3">
          Sign In
        </h2>
        <Formik
          initialValues={initialValues}
          validationSchema={signInSchema}
          onSubmit={onSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="mt-2">
                <Field
                  name="email"
                  label={"Enter Email"}
                  type="email"
                  component={CustomInput}
                  placeholder="example@domain.com"
                  min="0"
                  isRequired
                  // onChange={handleChange}
                  leftIcon={() => (
                    <HiOutlineEnvelope className="text-gray-500 text-xl mr-2" />
                  )}
                />
                <Field
                  name="password"
                  label={"Enter Your Password"}
                  type={type}
                  component={CustomInput}
                  placeholder="Enter your password"
                  min="0"
                  isRequired
                  isPassword
                  // onChange={handleChange}
                  handleViewPassword={() => {
                    setType(type === "password" ? "text" : "password");
                  }}
                  leftIcon={() => (
                    <BiLock className="text-gray-500 text-xl mr-2" />
                  )}
                />

                <div className="flex justify-between">
                  {/* <label htmlFor="RemeberMe" className="flex items-center">
                    <input
                      id="RemeberMe"
                      name="RemeberMe"
                      onChange={() => {
                        setFieldValue("RemeberMe", values.RemeberMe ? 0 : 1);
                      }}
                      checked={values.RemeberMe === 1}
                      type="checkbox"
                      className="mr-2 cursor-pointer"
                    />
                    Remember Me
                  </label> */}
                  <Link
                    to={"/account/forgot-password"}
                    className="text-sm font-normal underline hover:text-custom-primary-main"
                  >
                    I forgot my password
                  </Link>
                </div>

                <button
                  type="submit"
                  className="border flex items-center justify-center w-full my-5 py-2 text-white bg-custom-primary-main rounded text-lg hover:bg-custom-primary-main duration-200"
                  disabled={isSubmitting || isLoading}
                >
                  {isSubmitting || isLoading ? (
                    <>
                      <span className="w-5 h-5 border-2 animate-spin rounded-full border-transparent border-t-white mr-2"></span>
                      <span className="font-medium">Processing</span>
                    </>
                  ) : (
                    <>
                      <span className="font-medium">Log in</span>
                      <span className="text-2xl ml-1">
                        <BsArrowRightShort />
                      </span>
                    </>
                  )}
                </button>
              </div>
            </Form>
          )}
        </Formik>

        {/* <div className="flex justify-between">
          <p className="mx-auto">
            <Link to="/account/register">
              Don't have an account?
              <span className="text-custom-primary-main hover:underline mx-1">
                Register
              </span>
            </Link>
          </p>
        </div> */}
      </div>
    </div>
  );
};

export default Login;
