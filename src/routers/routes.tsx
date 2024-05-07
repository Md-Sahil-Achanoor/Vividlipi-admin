/* eslint-disable react-refresh/only-export-components */
import { lazy } from "react";
import { Navigate, createBrowserRouter } from "react-router-dom";

const ErrorPage = lazy(() => import("../pages/NotFound"));
const AdminDashboard = lazy(() => import("../pages/admin/dashboard"));
const MainCategoryList = lazy(() => import("../pages/admin/main-category"));
const ProductList = lazy(() => import("../pages/admin/product"));
const ManageProduct = lazy(
  () => import("../pages/admin/product/ManageProduct")
);
const SubCategoryList = lazy(() => import("../pages/admin/sub-category"));
const NonAuth = lazy(() => import("../layout/NonAuth"));
const Home = lazy(() => import("../pages/Home"));
const Login = lazy(() => import("../pages/auth/Login"));
// const Register = lazy(() => import("../pages/auth/Register"));
const AppWrapper = lazy(() => import("./middleware/AppWrapper"));
const PrivateOutlet = lazy(() => import("./middleware/PrivateOutlet"));

/**
 * @module { Router } @URLs
 * @description
 */
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PrivateOutlet>
        <AppWrapper />
      </PrivateOutlet>
    ),
    errorElement: <ErrorPage />,
    children: [
      { path: "", element: <Home /> },
      // { path: "privacy-policy", element: <PrivacyPolicy /> },
      // { path: "terms-and-conditions", element: <TermsAndConditions /> },
      // { path: "refund-and-cancellations", element: <RefundsAndCancels /> },
      // { path: "about-us", element: <About /> },
      // { path: "contact-us", element: <Contact /> },
    ],
  },

  /**
   * @module Main { Admin } @protected
   * @Role Admin
   */
  {
    path: "/admin",
    element: (
      <PrivateOutlet roles={["admin"]}>
        <AppWrapper />
      </PrivateOutlet>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        path: "dashboard",
        element: <AdminDashboard />,
      },
      {
        path: "products",
        element: <AppWrapper />,
        children: [
          { path: "product-list", element: <ProductList /> },
          { path: "product-list/add-product", element: <ManageProduct /> },
          // { path: "edit/:id", element: <EditProduct /> },
        ],
      },
      {
        path: "categories",
        element: <AppWrapper />,
        children: [
          { path: "main-category", element: <MainCategoryList /> },
          { path: "sub-category", element: <SubCategoryList /> },
          // { path: "edit/:id", element: <EditProduct /> },
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
    path: "/account",
    errorElement: <ErrorPage />,
    element: (
      <NonAuth>
        <AppWrapper />
      </NonAuth>
    ),
    children: [
      { path: "", element: <Navigate to="/account/login" /> },
      { path: "login", element: <Login /> },
      // { path: "register", element: <Register /> },
    ],
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);

export default router;
