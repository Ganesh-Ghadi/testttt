import { useState } from "react";
import { IoIosArrowDropleft } from "react-icons/io";
import { IoLogoSlack } from "react-icons/io";
import { NavLink } from "react-router-dom";
import { IoIosArrowDown } from "react-icons/io";
import Navbar from "../Navbar/Navbar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useSelector } from "react-redux";

const Sidebar = () => {
  // const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { isSidebarOpen } = useSelector((store) => store.Sidebar);
  // State to track which parent item has its children visible
  const [activeParent, setActiveParent] = useState(null);

  const items = [
    {
      name: "Home",
      path: "/",
      logo: <IoLogoSlack />,
    },
    {
      name: "User Management",
      path: "#",
      logo: <IoLogoSlack />,
      children: [
        {
          name: "Roles",
          path: "/roles",
          logo: <IoLogoSlack />,
        },
        {
          name: "Users",
          path: "/users",
          logo: <IoLogoSlack />,
        },
      ],
    },
    {
      name: "Dashboard",
      path: "/gr",
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
      <ScrollArea
        className={`${
          isSidebarOpen
            ? "w-80 opacity-100 px-4  hidden md:block"
            : " w-0 opacity-0 px-0 "
        } duration-300 transition-all  pt-3.5 shadow-xl  min-h-screen   dark:bg-gray-800 bg-white`}
        // className={`${
        //   isSidebarOpen ? "w-80 opacity-100" : "w-0 opacity-0"
        // } duration-300 transition-all px-4 pt-3.5 shadow-xl min-h-screen dark:bg-gray-800 bg-slate-50`}
      >
        <ul className="pb-32 ">
          {/* mt-10 about */}
          {items.map((item, index) => {
            return (
              <div key={index}>
                {/* Parent item */}
                {item.children ? (
                  <NavLink
                    className="border-b-2 border-gray-200 dark:border-gray-600 flex text-sm my-2 p-1 rounded hover:bg-light-white items-center"
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
                      {item.children && (
                        <p>
                          <IoIosArrowDown
                            className={`${
                              item.children &&
                              activeParent === item.name &&
                              "rotate-180"
                            }`}
                          />
                        </p>
                      )}
                    </div>
                  </NavLink>
                ) : (
                  <NavLink
                    className={({ isActive }) =>
                      `border-b-2 border-gray-200 dark:border-gray-600 flex text-sm my-2 p-1 rounded hover:bg-light-white items-center ${
                        isActive && "bg-gray-300 dark:bg-gray-600"
                      }`
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
                      <p>{item.name}</p>
                      {item.children && (
                        <p>
                          <IoIosArrowDown
                            className={`${
                              item.children &&
                              activeParent === item.name &&
                              "rotate-180"
                            }`}
                          />
                        </p>
                      )}
                    </div>
                  </NavLink>
                )}
                {/* Render children if the parent item has children and it's the active one */}
                {item.children && activeParent === item.name && (
                  <div>
                    {item.children.map((child, idx) => (
                      <NavLink
                        key={idx}
                        className={({ isActive }) =>
                          `  ${
                            isActive && "bg-gray-300 dark:bg-gray-600"
                          } pl-1 w-full py-1 my-2 gap-2 flex items-center text-sm text-gray-600 dark:text-gray-300  ${
                            isSidebarOpen && "pl-8"
                          } `
                        }
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
      </ScrollArea>
    </>
  );
};

export default Sidebar;
