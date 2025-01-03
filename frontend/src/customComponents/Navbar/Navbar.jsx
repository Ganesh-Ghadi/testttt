import { ModeToggle } from "@/components/ModeToggle";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AlignJustify } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import logo from "../../images/tt.jpg";
import { useDispatch, useSelector } from "react-redux";
import {
  closeSidebar,
  openSidebar,
} from "@/features/SidebarSlice/SidebarSlice";
import MobileSidebar from "../SIdebar/MobileSidebar";
const Navbar = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user.token;
  const dispatch = useDispatch();
  const { isSidebarOpen } = useSelector((store) => store.Sidebar);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false); // open state to manage Sheet visibility

  const navigate = useNavigate();
  const logout = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/logout", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Include the Bearer token
        },
      });
      console.log(response);
      toast.success("Logged-out successfully");
      localStorage.removeItem("user");
      navigate("/login");
    } catch (error) {
      console.log(error);
      if (error.response) {
        toast.error("logout failed: " + error.response.data); // Customize error message
      } else if (error.request) {
        toast.error("No response from server. Please try again later.");
      } else {
        toast.error("An error occurred while logout.");
      }
    }
  };

  return (
    <div className="w-full sticky top-0 bg-white dark:bg-gray-800 shadow-md z-50">
      <div className="w-full flex items-center">
        <div className="w-full gap-2 flex justify-start items-center text-xl p-3">
          <Button
            variant="outline"
            className="hidden md:block"
            onClick={() => {
              isSidebarOpen
                ? dispatch(closeSidebar())
                : dispatch(openSidebar());
            }}
          >
            <AlignJustify color="black" size={48} />
          </Button>

          <MobileSidebar
            open={mobileSidebarOpen}
            setOpen={setMobileSidebarOpen}
          />
          <h1 className="">Navigation bar</h1>
        </div>
        <div className=" w-full flex justify-end items-center">
          <ModeToggle></ModeToggle>
          <div className="p-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="overflow-hidden rounded-full"
                >
                  <img
                    src={logo}
                    width={36}
                    height={36}
                    alt="Avatar"
                    className="overflow-hidden rounded-full"
                  />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Support</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => logout()}>
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
