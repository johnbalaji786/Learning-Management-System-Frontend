import { createBrowserRouter, RouterProvider } from "react-router";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";

import store from "./redux/store";

import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import StudentDashboard from "./pages/StudentDashboard";
import TutorDashboard from "./pages/TutorDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import Courses from "./pages/Courses";
import CourseDetails from "./pages/CourseDetails";
import CreateCourse from "./pages/CreateCourse";
import MyCourses from "./pages/MyCourses";
import EditCourse from "./pages/EditCourse";
import MyBookings from "./pages/MyBookings";
import TutorBookings from "./pages/TutorBookings";
import TutorPayments from "./pages/TutorPayments";
import ManageUsers from "./pages/ManageUsers";
import Tutors from "./pages/Tutors";
import NotFound from "./pages/NotFound";

import { adminLoader, studentLoader, tutorLoader } from "./loaders/roleLoaders";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/student/dashboard",
    element: <StudentDashboard />,
    loader: studentLoader,
  },
  {
    path: "/tutor/dashboard",
    element: <TutorDashboard />,
    loader: tutorLoader,
  },
  {
    path: "/admin/dashboard",
    element: <AdminDashboard />,
    loader: adminLoader,
  },
  {
    path: "/courses",
    element: <Courses />,
  },
  {
    path: "/courses/:id",
    element: <CourseDetails />,
  },
  {
    path: "/tutor/create-course",
    element: <CreateCourse />,
    loader: tutorLoader,
  },
  {
    path: "/tutor/my-courses",
    element: <MyCourses />,
    loader: tutorLoader,
  },
  {
    path: "/tutor/edit-course/:id",
    element: <EditCourse />,
    loader: tutorLoader,
  },
  {
    path: "/my-bookings",
    element: <MyBookings />,
    loader: studentLoader,
  },
  {
    path: "/tutor/bookings",
    element: <TutorBookings />,
    loader: tutorLoader,
  },
  {
    path: "/tutor/payments",
    element: <TutorPayments />,
    loader: tutorLoader,
  },
  {
    path: "/users",
    element: <ManageUsers />,
    loader: adminLoader,
  },
  {
    path: "/tutors",
    element: <Tutors />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </Provider>
  );
}

export default App;
