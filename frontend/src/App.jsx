import React, { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
// import { ToastContainer } from "react-toastify";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Homepage from "./pages/HomePage/Homepage";
import Projects from "./pages/Projects/Projects";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Error from "./customComponents/Error/Error";
import CreateProject from "./pages/Projects/CreateProject";
import ProtectedRoute from "./customComponents/ProtectedRoute/ProtectedRoute";
import GuestRoute from "./customComponents/GuestRoute/GuestRoute";
import EditProject from "./pages/Projects/EditProject";
import Tasks from "./pages/Tasks/Tasks";
import CreateTask from "./pages/Tasks/CreateTask";
import EditTask from "./pages/Tasks/EditTask";
import { ToastContainer } from "react-toastify";

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route
          errorElement={<Error />}
          path="/"
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Homepage />} />
          <Route path="/projects" element={<Projects />} />
        </Route>
        <Route
          errorElement={<Error />}
          path="/login"
          element={
            <GuestRoute>
              {" "}
              <Login />
            </GuestRoute>
          }
        />
        <Route
          errorElement={<Error />}
          path="/register"
          element={
            <GuestRoute>
              <Register />
            </GuestRoute>
          }
        />
      </>
    )
  );

  return (
    <>
      <ToastContainer position="top-center" autoClose={5000} />
      <RouterProvider router={router} />
    </>
  );
};

export default App;
