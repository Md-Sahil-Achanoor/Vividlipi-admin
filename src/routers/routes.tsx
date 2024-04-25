/* eslint-disable react-refresh/only-export-components */
import { lazy } from "react";
import { Navigate, createBrowserRouter } from "react-router-dom";
import ErrorPage from "../pages/NotFound";
import AdminDashboard from "../pages/admin/dashboard";
const NonAuth = lazy(() => import("../layout/NonAuth"));
const Home = lazy(() => import("../pages/Home"));
const Login = lazy(() => import("../pages/auth/Login"));
const Register = lazy(() => import("../pages/auth/Register"));
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
      <PrivateOutlet roles={["Admin"]}>
        <AppWrapper />
      </PrivateOutlet>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        path: "dashboard",
        element: <AdminDashboard />,
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
      { path: "register", element: <Register /> },
    ],
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);

export default router;
