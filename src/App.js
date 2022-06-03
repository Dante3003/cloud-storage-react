import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import "./App.css";

import { auth } from "./actions/auth";
import { Routes } from "./routes";
import ToastList from "./components/toast-list/ToastList";

function App() {
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    async function checkAuth() {
      const isAuth = await dispatch(auth());
      console.log(isAuth);
      if (!isAuth) {
        history?.push("/auth");
      }
    }
    checkAuth();
  }, [dispatch, history]);

  return (
    <>
      <ToastList />
      <Routes />
    </>
  );
}

export default App;
