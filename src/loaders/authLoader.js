import { redirect } from "react-router-dom";
import { clearUser, setUser } from "../redux/authSlice";
import store from "../redux/store";
import { getMe } from "../services/authServices";

const authLoader = async () => {
  try {
    const response = await getMe();

    store.dispatch(setUser(response.user));

    return response;
  } catch (error) {
    console.error("Auth Loader Error:", error);

    store.dispatch(clearUser());

    return redirect("/login");
  }
};

export default authLoader;
