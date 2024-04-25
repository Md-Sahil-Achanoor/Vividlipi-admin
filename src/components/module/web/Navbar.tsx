import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="fixed px-8 py-4 z-25 shadow-lg text-xl bg-white flex flex-row justify-between items-center h-16 w-full">
      <Link to="/">
        <div className="flex items-center justify-between gap-4">
          {/* <img
            className="w-[40px] ml-2 rounded-r-full rounded-l-full"
            src={logo}
            alt="LOGO"
          /> */}
          <div>Vividlipi</div>
        </div>
      </Link>
      <div>
        <ul className="flex flex-row gap-6">
          <li className="text-lg p-2 hover:cursor-pointer hover:underline duration-200">
            <Link to="/account/login">Login</Link>
          </li>
          <li className="text-lg p-2 hover:cursor-pointer hover:underline duration-200">
            <Link to="/about-us">About Us</Link>
          </li>
          <li className="text-lg p-2 hover:cursor-pointer hover:underline duration-200">
            FAQ's
          </li>
          <li className="text-lg p-2 hover:cursor-pointer hover:underline duration-200">
            <Link to="/contact-us">Contact Us</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
