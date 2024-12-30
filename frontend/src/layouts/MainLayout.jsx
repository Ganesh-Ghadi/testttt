import React, { useEffect, useRef, useState } from "react";
import Sidebar from "../customComponents/SIdebar/Sidebar";
import { Outlet, useNavigate } from "react-router-dom";
import MobileSidebar from "../customComponents/SIdebar/MobileSidebar";
import { FaRegMoon } from "react-icons/fa";
import { LuSunMedium } from "react-icons/lu";
import logo from "../assets/react.svg";
import { TbLogout2 } from "react-icons/tb";
import { toast } from "react-toastify";
import axios from "axios";
import Navbar from "../customComponents/Navbar/Navbar";

const MainLayout = ({ toggleTheme, darkMode }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user.token;
  const modalRef = useRef(null); // Create a ref for the sidebar
  const navigate = useNavigate();
  const logout = async () => {
    try {
      // Make API request with axios
      const response = await axios.get("http://127.0.0.1:8000/api/logout", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Include the Bearer token
        },
      });
      toast.success("Logged-out successfully");
      localStorage.removeItem("user");
      navigate("/login");
    } catch (error) {
      if (error.response) {
        toast.error("logout failed: " + error.response.data); // Customize error message
      } else if (error.request) {
        toast.error("No response from server. Please try again later.");
      } else {
        toast.error("An error occurred while logout.");
      }
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setIsModalOpen(false);
      }
    };

    if (isModalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isModalOpen]);

  return (
    <>
      <Navbar />
      <MobileSidebar
        logout={logout}
        setIsModalOpen={setIsModalOpen}
        isModalOpen={isModalOpen}
        darkMode={darkMode}
        toggleTheme={toggleTheme}
      />
      <div className=" bg-gray-50 min-h-screen dark:bg-gray-900 flex md:flex-row flex-col ">
        <Sidebar />
        <div className="p-7 flex-1 h-screen  overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default MainLayout;
