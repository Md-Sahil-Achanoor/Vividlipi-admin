// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { useAppSelector } from "../app/store";
import Banner from "../assets/Images/Banner.png";
import Footer from "../components/module/web/Footer";
import Navbar from "../components/module/web/Navbar";

const Home = () => {
  // const navigate = useNavigate();
  // const { isLoggedIn } = useAppSelector((state) => state.auth);

  // useEffect(() => {
  //   navigate(isLoggedIn ? "/admin/dashboard" : "/account/login");
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  return (
    <div>
      <Navbar />
      <div className="w-full">
        <img className="w-full pt-12 h-screen" src={Banner} alt="/" />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
