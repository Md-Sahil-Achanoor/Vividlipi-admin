// import moment from "moment";
import moment from "moment";
import { PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../../app/store";
import AuthLayout from "../../layout/authLayout";
import { Role } from "../../types";
import { checkTimeGapBetweenTwo } from "../../utils/time";
// import { checkTimeGapBetweenTwo } from "../../utils/time";

interface PrivateOutletProps extends PropsWithChildren {
  roles?: Role[];
}

const PrivateOutlet = ({ children, roles }: PrivateOutletProps) => {
  const { isLoggedIn, token, role } = useAppSelector((state) => state.auth);
  console.log(
    `\n\n ~ PrivateOut ~ isLoggedIn, token, role:`,
    isLoggedIn,
    token,
    role
  );

  const loggedIn = isLoggedIn;

  const decodedToken = token ? JSON.parse(atob(token.split(".")[1])) : null;
  // console.log(`\n\n decodedToken:`, decodedToken);
  const checkTokenTime = checkTimeGapBetweenTwo(
    moment().format(),
    decodedToken?.exp * 1000,
    "seconds"
  );
  // console.log(`\n\n checkTokenTime:`, checkTokenTime);

  if (
    !loggedIn ||
    !token ||
    !roles?.includes(role) ||
    checkTokenTime < 0
    // decodedToken?.role !== role ||
    // decodedToken?.id !== user?.ID ||
    // decodedToken?.email !== user?.email ||
  ) {
    return <Navigate to="/account/login" />;
  }

  return <AuthLayout>{children}</AuthLayout>;
  // return children;
};

export default PrivateOutlet;
