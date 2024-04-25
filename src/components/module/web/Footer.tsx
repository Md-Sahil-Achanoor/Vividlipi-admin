import { BsFacebook } from "react-icons/bs";
import { FaLinkedinIn } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="fixed bottom-0 z-25 shadow-lg px-8 pt-2 pb-1 h-auto w-full flex justify-center items-center text-white bg-black">
      <div className="flex flex-col items-center">
        <div className="flex gap-8">
          <a
            href="https://www.facebook.com/Lekpayments"
            target="_blank"
            rel="noreferrer"
          >
            <BsFacebook size={18} />
          </a>
          <a
            href="https://linkedin.com/company/lekpay"
            target="_blank"
            rel="noreferrer"
          >
            <FaLinkedinIn size={18} />
          </a>
        </div>
        <p className="text-md my-1">
          {new Date().getFullYear()} © Copyright LEKPAY | Design & Develop by
          <a href="https://kalpas.in/"> Kalpas</a>
        </p>
        <div className="flex gap-4 text-md">
          <Link to="/privacy-policy">Privacy Policy</Link>
          <p>|</p>
          <Link to="/terms-and-conditions">Terms & Conditions</Link>
          <p>|</p>
          <Link to="/refund-and-cancellations">Refund & Cancellation</Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
