// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { useAppSelector } from "../app/store";
// import Banner from "../assets/Images/Banner.png";

const Home = () => {
  // const navigate = useNavigate();
  // const { isLoggedIn } = useAppSelector((state) => state.auth);

  // useEffect(() => {
  //   navigate(isLoggedIn ? "/admin/dashboard" : "/account/login");
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  return (
    <div>
      {/* <Navbar /> */}
      <div className='w-full'>
        <h3>Home</h3>
        {/* <img className="w-full pt-12 h-screen" src={Banner} alt="/" /> */}
      </div>
      {/* <Footer /> */}
    </div>
  )
}

export default Home
