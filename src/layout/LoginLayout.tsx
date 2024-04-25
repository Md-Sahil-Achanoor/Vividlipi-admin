import { PropsWithChildren } from "react";
import { Link } from "react-router-dom";
import LoginICon from "../assets/Images/login.jpg";
import logo from "../assets/Images/logo.jpg";

interface Props extends PropsWithChildren {}

const LoginLayout = ({ children }: Props) => {
  return (
    <div
      className="bg-cover bg-center min-h-screen relative primary-scrollbar"
      style={{ backgroundImage: `url(${LoginICon})` }}
    >
      {/* <div className="absolute -z-10 inset-0 " /> */}
      <nav className="fixed z-10 flex items-center justify-center py-2 w-full bg-white">
        <Link to="/" className="cursor-pointers">
          <div className="flex items-center justify-between">
            <img
              className="w-[50px] ml-2 rounded-r-full rounded-l-full"
              src={logo}
              alt="LOGO"
            />
            <h1 className="text-2xl ml-2">LEKPAY</h1>
          </div>
        </Link>
      </nav>
      {children}
    </div>
  );
};

export default LoginLayout;
