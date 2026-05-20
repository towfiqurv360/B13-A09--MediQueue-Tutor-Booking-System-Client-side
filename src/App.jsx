import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import ErrorPage from "./pages/ErrorPage";
import AddTutor from "./pages/AddTutor";
import Tutors from "./pages/Tutors";
import TutorDetails from "./pages/TutorDetails";
import MyTutors from "./pages/MyTutors";
import Sessions from "./pages/Sessions";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PrivateRoute from "./routes/PrivateRoute";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="tutors" element={<Tutors />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />

          <Route
            path="tutor/:id"
            element={<PrivateRoute><TutorDetails /></PrivateRoute>}
          />
          <Route
            path="add-tutor"
            element={<PrivateRoute><AddTutor /></PrivateRoute>}
          />
          <Route
            path="my-tutors"
            element={<PrivateRoute><MyTutors /></PrivateRoute>}
          />
          <Route
            path="sessions"
            element={<PrivateRoute><Sessions /></PrivateRoute>}
          />
        </Route>

        <Route path="*" element={<ErrorPage />} />
      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={2500}
        hideProgressBar={true}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        toastClassName="!bg-white dark:!bg-slate-900 !text-slate-800 dark:!text-slate-100 !shadow-[0_20px_50px_rgba(8,112,184,0.12)] dark:!shadow-[0_20px_50px_rgba(0,0,0,0.5)] !border !border-slate-100 dark:!border-slate-800/80 !rounded-2xl !mt-4 !font-semibold !text-sm !px-4 !py-3"
        style={{ zIndex: 99999 }}
      />
    </BrowserRouter>
  );
}

export default App;