import { redirect } from "react-router-dom";
import { clearUser, setUser } from "../redux/authSlice";
import store from "../redux/store";
import { getMe } from "../services/authServices";

export const studentLoader = async () => {
  try {
    const response = await getMe();
    const user = response.user;

    store.dispatch(setUser(user));

    if (user.role !== "student") {
      if (user.role === "admin") {
        return redirect("/admin/dashboard");
      } else if (user.role === "tutor") {
        return redirect("/tutor/dashboard");
      }

      return redirect("/login");
    }

    return response;
  } catch (error) {
    console.error("Student loader error:", error);
    store.dispatch(clearUser());
    return redirect("/login");
  }
};

export const tutorLoader = async () => {
  try {
    const response = await getMe();
    const user = response.user;

    store.dispatch(setUser(user));

    if (user.role !== "tutor") {
      if (user.role === "student") {
        return redirect("/student/dashboard");
      } else if (user.role === "admin") {
        return redirect("/admin/dashboard");
      }

      return redirect("/login");
    }

    return response;
  } catch (error) {
    console.error("Tutor loader error:", error);
    store.dispatch(clearUser());
    return redirect("/login");
  }
};

export const adminLoader = async () => {
  try {
    console.log("Calling getMe...");

    const response = await getMe();

    console.log("Response:", response);
    const user = response.user;

    store.dispatch(setUser(user));

    if (user.role !== "admin") {
      if (user.role === "student") {
        return redirect("/student/dashboard");
      } else if (user.role === "tutor") {
        return redirect("/tutor/dashboard");
      }

      return redirect("/login");
    }

    return response;
  } catch (error) {
    console.log("Error:", error);
    console.log("Status:", error.response?.status);
    console.log("Data:", error.response?.data);

    store.dispatch(clearUser());
    return redirect("/login");
  }
};
