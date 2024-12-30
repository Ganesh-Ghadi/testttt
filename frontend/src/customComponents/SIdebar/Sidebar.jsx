import { useState } from "react";
import { IoIosArrowDropleft } from "react-icons/io";
import { IoLogoSlack } from "react-icons/io";
import { NavLink } from "react-router-dom";
import { IoIosArrowDown } from "react-icons/io";
import Navbar from "../Navbar/Navbar";

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // State to track which parent item has its children visible
  const [activeParent, setActiveParent] = useState(null);

  const items = [
    {
      name: "Home",
      path: "/",
      logo: <IoLogoSlack />,
      children: [
        {
          name: "Registration",
          path: "/registration",
          logo: <IoLogoSlack />,
        },
        {
          name: "All Registration",
          path: "/registrationlist",
          logo: <IoLogoSlack />,
        },
      ],
    },
    {
      name: "Projects",
      path: "/projects",
      logo: <IoLogoSlack />,
      children: [
        {
          name: "Registration",
          path: "/registration",
          logo: <IoLogoSlack />,
        },
        {
          name: "All Registration",
          path: "/registrationlist",
          logo: <IoLogoSlack />,
        },
      ],
    },
    {
      name: "Tasks",
      path: "/tasks",
      logo: <IoLogoSlack />,
    },
    {
      name: "Services",
      path: "/services",
      logo: <IoLogoSlack />,
    },
    {
      name: "Contact",
      path: "/contact",
      logo: <IoLogoSlack />,
    },
  ];

  // Function to toggle children visibility (close previous and open current)
  const toggleChildren = (itemName) => {
    setActiveParent((prev) => (prev === itemName ? null : itemName)); // If same item clicked, close, else open it
  };

  return (
    <>
      <div
        className={`${
          isSidebarOpen ? "w-72" : "w-16"
        } hidden md:block duration-300 px-4 pt-3.5 relative h-screen bg-slate-100`}
      >
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
          <IoIosArrowDropleft
            className={`absolute rounded-full cursor-pointer -right-3 top-32 w-7 h-7 border-2 border-black ${
              !isSidebarOpen && "rotate-180"
            }`}
          />
        </button>
        {/* <div className="flex gap-x-4 items-center">
        <p className="text-4xl p-1 text-black">
          <IoLogoSlack />
        </p>
        <p
          className={`text-3xl duration-300 ${
            !isSidebarOpen && "opacity-0 invisible"
          }`}
        >
          Designer
        </p>
      </div> */}
        <ul className="mt-10">
          {items.map((item, index) => {
            return (
              <div key={index}>
                {/* Parent item */}
                <NavLink
                  className={({ isActive }) =>
                    `flex text-sm my-2 p-1 rounded hover:bg-light-white items-center ${
                      isActive ? "bg-gray-300" : ""
                    } border-b-2 border-gray-200`
                  }
                  to={item.path || "#"}
                  onClick={() => item.children && toggleChildren(item.name)} // Toggle children visibility on click
                >
                  <p className="text-xl">{item.logo}</p>
                  <div
                    className={`w-full px-2 flex justify-between items-center ${
                      !isSidebarOpen && "opacity-0 invisible"
                    }`}
                  >
                    <p className="">{item.name}</p>
                    <p className="">
                      <IoIosArrowDown
                        className={`${
                          item.children &&
                          activeParent === item.name &&
                          "rotate-180"
                        }`}
                      />
                    </p>
                  </div>
                </NavLink>
                {/* Render children if the parent item has children and it's the active one */}
                {item.children && activeParent === item.name && (
                  <div>
                    {item.children.map((child, idx) => (
                      <NavLink
                        key={idx}
                        className={`pl-1 w-full my-2 gap-2 flex items-center text-sm text-gray-600 hover:text-black ${
                          isSidebarOpen && "pl-8"
                        } `}
                        to={child.path}
                      >
                        <p className="text-xl">{child.logo}</p>
                        <p
                          className={`${
                            !isSidebarOpen && "hidden"
                          } origin-left duration-300 text-sm`}
                        >
                          {child.name}
                        </p>
                      </NavLink>
                    ))}
                    <p className="border-b-2 border-gray-200"></p>
                  </div>
                )}
              </div>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
//hhh
