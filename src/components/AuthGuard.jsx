// import { useSelector } from "react-redux"

import { Redirect } from "react-router";

export default function AuthGuard({ children }) {
  const isAuth = localStorage.getItem("token");
  if (isAuth) {
    return <> {children} </>;
  } else {
    return <Redirect to="/auth" />;
  }
}
