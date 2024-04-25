import { Suspense, useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { RouterProvider } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "./app/store";
import Loading from "./components/atoms/Loading";
import { authAction } from "./feature/auth/authSlice";
import useDarkSide from "./hooks/useDarkSide";
import router from "./routers/routes";
import instance from "./utils/axios.config";

function App() {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);
  const isUser = JSON.parse(localStorage.getItem("user") || "{}");
  const { token } = useAppSelector((state) => state.auth);

  // const theme = ""; # nfp_XJBHcyfgGWLqWkptd6CBVwe58rYiAiXwe24d
  const { setTheme } = useDarkSide();
  // const [darkSide, setDarkSide] = useState(
  //   colorTheme === "light" ? true : false
  // );

  // const toggleDarkMode = (checked: boolean) => {
  //   setTheme(colorTheme);
  //   setDarkSide(checked);
  // };

  useEffect(() => {
    setTheme("light");
    setLoading(false);
    if (isUser?.user) {
      dispatch(authAction.loginSuccess(isUser));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isUser?.token]);

  if (token) {
    instance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <Suspense fallback={<Loading />}>
      <Toaster position="top-right" reverseOrder={false} />
      <RouterProvider router={router} />
    </Suspense>
  );
}

export default App;
