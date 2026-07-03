import { createBrowserRouter, RouterProvider } from "react-router";
import { ToastContainer } from "react-toastify";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { Provider } from "react-redux";
import store from "./redux/store";
import StudentDashboard from "./pages/StudentDashboard";
import TutorDashboard from "./pages/TutorDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import { adminLoader, studentLoader, tutorLoader } from "./loaders/roleLoaders";
import Courses from "./pages/Courses";
import CourseDetails from "./pages/CourseDetails";
import CreateCourse from "./pages/CreateCourse";

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
    hydrateFallbackElement: (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    ),
  },
  {
    path: "/tutor/dashboard",
    element: <TutorDashboard />,
    loader: tutorLoader,
    hydrateFallbackElement: (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    ),
  },
  {
    path: "/admin/dashboard",
    element: <AdminDashboard />,
    loader: adminLoader,
    hydrateFallbackElement: (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    ),
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
]);

const App = () => {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </Provider>
  );
};

export default App;
