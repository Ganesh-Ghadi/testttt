import { useState } from "react";
import { IoIosArrowDropleft } from "react-icons/io";
import { IoLogoSlack } from "react-icons/io";
import { NavLink } from "react-router-dom";
import { IoIosArrowDown } from "react-icons/io";

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
    <div
      className={`${
        isSidebarOpen ? "w-72" : "w-20"
      } hidden md:block duration-300 px-4 pt-3.5 relative h-screen bg-slate-200`}
    >
      <button onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
        <IoIosArrowDropleft
          className={`absolute rounded-full cursor-pointer -right-4 top-32 w-9 h-9 border-2 border-black ${
            !isSidebarOpen && "rotate-180"
          }`}
        />
      </button>
      <div className="flex gap-x-4 items-center">
        <p className="text-4xl p-1 text-black">
          <IoLogoSlack />
        </p>
        <p className={`text-3xl duration-300 ${!isSidebarOpen && "scale-0"}`}>
          Designer
        </p>
      </div>
      <ul className="mt-10">
        {items.map((item, index) => {
          return (
            <div key={index}>
              {/* Parent item */}
              <NavLink
                className={({ isActive }) =>
                  `flex mb-2 p-2 text-sm rounded hover:bg-light-white items-center gap-4 ${
                    isActive ? "bg-gray-300" : ""
                  } border-b-2 border-gray-300`
                }
                to={item.path || "#"}
                onClick={() => item.children && toggleChildren(item.name)} // Toggle children visibility on click
              >
                <p className="w-full flex justify-between items-center">
                  <p className="flex gap-2">
                    <p className="text-xl">{item.logo}</p>
                    <p
                      className={`${
                        !isSidebarOpen && "scale-0"
                      } origin-left duration-300 text-sm`}
                    >
                      {item.name}
                    </p>
                  </p>
                  <p className="flex justify-end">
                    <IoIosArrowDown
                      className={`${
                        item.children &&
                        activeParent === item.name &&
                        "rotate-180"
                      } ${!isSidebarOpen && "scale-0"}`}
                    />
                  </p>
                </p>
              </NavLink>
              {/* Render children if the parent item has children and it's the active one */}
              {item.children && activeParent === item.name && (
                <div className="pl-8 mt-2 duration-300">
                  {item.children.map((child, idx) => (
                    <NavLink
                      key={idx}
                      className="block mb-2 text-sm text-gray-600 hover:text-black"
                      to={child.path}
                    >
                      {child.name}
                    </NavLink>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </ul>
    </div>
  );
};

export default Sidebar;
//hhh
