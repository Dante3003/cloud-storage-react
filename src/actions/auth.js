import axios from "../plugins/axios";
import { setUser, logout } from "../reducers/user";

export const register = async (payload) => {
  try {
    const response = await axios.post("/auth/registration", payload);
    return response;
  } catch (err) {
    console.log(err);
  }
};

export const login = (payload) => {
  return async (dispatch) => {
    try {
      const { data: response } = await axios.post("/auth/login", payload);
      dispatch(setUser(response.user));
      localStorage.setItem("token", response.token);
    } catch (err) {
      console.dir(err);
    }
  };
};

export const auth = () => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem("token");
      if (token && token !== "undefined") {
        const { data: response } = await axios.get("/auth", {});
        dispatch(setUser(response.user));
        localStorage.setItem("token", response.token);
      } else {
        localStorage.removeItem("token");
        dispatch(logout());
        return false;
      }
    } catch (err) {
      localStorage.removeItem("token");
    }
  };
};
