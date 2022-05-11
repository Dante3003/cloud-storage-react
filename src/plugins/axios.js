import Axios from "axios";
import { logout } from "../reducers/user";
import { toast } from "../actions/toast";
import { store } from "../reducers";

const axios = Axios.create({
  baseURL: "http://localhost:9999/api",
  headers: {
    "Content-Type": "application/json",
  },
});
const generateToastMessage = (
  title,
  subtitle,
  type = "error",
  duration = 2000
) => ({
  id: Date.now(),
  title,
  subTitle: subtitle,
  duration,
  type,
});

const errorStatuses = {
  401: () => {
    toast(generateToastMessage("Error!", "Unauthorized"), store.dispatch);
    store.dispatch(logout());
  },
  404: () => {
    toast(generateToastMessage("Error!", "Not Found!"), store.dispatch);
  },
  500: () => {
    toast(
      generateToastMessage("Error!", "Internal Server Error!"),
      store.dispatch
    );
  },
};

const authInterceptor = (config) => {
  const authToken = localStorage.getItem("token");
  if (authToken) {
    config.headers["Authorization"] = authToken;
  }
  return config;
};

const errorInterceptor = async (error) => {
  if (error.status in errorStatuses) {
    errorStatuses[error.status]();
  } else {
    toast(generateToastMessage("Error!", error.message), store.dispatch);
  }

  return Promise.reject(error);
};

const responseInterceptor = (response) => response;

axios.interceptors.response.use(responseInterceptor, errorInterceptor);
axios.interceptors.request.use(authInterceptor);

export default axios;
