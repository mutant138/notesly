"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AiOutlineClose, AiOutlineMenu, AiFillGithub } from "react-icons/ai";

interface NavItem {
  id: number;
  text: string;
  path: string;
  title: string;
}

const Navbar: React.FC = () => {
  const [nav, setNav] = useState<boolean>(false);
  const pathname = usePathname();

  const handleNav = () => {
    setNav(!nav);
  };

  const navItems: NavItem[] = [
    { id: 1, text: "Home", path: "/", title: "Homepage" },
    { id: 3, text: "Resources", path: "/resources", title: "Highly curated open source pdf resources" },
    { id: 5, text: "AI Mock", path: "/mock", title: "AI powered mock Interview"},
    { id: 6, text: "Blogs", path: "/blogs", title:"Coming soon" },
  ];

  // Function to check if a path is active
  const isActivePath = (path: string): boolean => {
    if (path === "/" && pathname === "/") {
      return true;
    }
    return pathname === path;
  };

  return (
    <nav className="bg-gradient-to-r from-black via-gray-900 to-black flex justify-between items-center h-16 w-full px-6 text-white shadow-md fixed top-0 z-50">
      <a href="/">
        <h1 className="text-3xl font-bold text-[#00df9a]">Notesly</h1>
      </a>
      <ul className="hidden md:flex gap-6">
        {navItems.map((item) => (
          <li key={item.id} className="relative group">
            <Link
              href={item.path}
              onClick={(e) => {
                if (item.path === "/blogs" || item.path === "/donate") {
                  e.preventDefault(); // Prevents navigation
                }
              }}
              className={`p-2 inline-block transition duration-300 ${
                item.path === "/blogs" || item.path === "/class"
                  ? "cursor-not-allowed opacity-70"
                  : "cursor-pointer"
              } ${
                isActivePath(item.path)
                  ? "text-[#00df9a] font-medium"
                  : "text-white"
              }`}
              title={item.title}
            >
              {item.text}
            </Link>
            <span
              className={`absolute left-0 bottom-0 w-full h-0.5 bg-[#00df9a] transform ${
                isActivePath(item.path) ? "scale-x-100" : "scale-x-0"
              } group-hover:scale-x-100 transition-transform duration-300 origin-left`}
            />
          </li>
        ))}
        <li>
          <a
            href="https://github.com/mutant138/open-pdfs"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 p-1 border border-[#00df9a] text-[#00df9a] font-semibold rounded-lg transition duration-300 hover:bg-[#00df9a] hover:text-black"
            title="Contribute your handwritten pdf notes"
          >
            <AiFillGithub size={20} /> Contribute PDF
          </a>
        </li>
      </ul>

      {/* Mobile Menu Button */}
      <button onClick={handleNav} className="block md:hidden cursor-pointer">
        {nav ? <AiOutlineClose size={24} /> : <AiOutlineMenu size={24} />}
      </button>

      {/* Mobile Sidebar */}
      <div
        className={`fixed md:hidden left-0 top-0 w-2/3 h-full bg-[#000300] text-white transform ${
          nav ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-500 ease-in-out shadow-lg`}
      >
        {/* Sidebar Header */}
        <div className="flex justify-between items-center p-4 border-b border-gray-800">
          <h1 className="text-3xl font-bold text-[#00df9a]">Only Notes</h1>
          <AiOutlineClose
            size={24}
            className="cursor-pointer"
            onClick={handleNav}
          />
        </div>

        {/* Sidebar Links */}
        <ul>
          {navItems.map((item) => (
            <li key={item.id}>
              <Link
                href={item.path}
                onClick={() => setNav(false)}
                className={`block p-4 border-b border-gray-800 relative transition duration-300 ${
                  isActivePath(item.path) ? "text-[#00df9a]" : "text-white"
                } ${
                  isActivePath(item.path)
                    ? "border-l-4 border-l-[#00df9a] pl-3"
                    : ""
                } hover:bg-gray-800`}
              >
                {item.text}
              </Link>
            </li>
          ))}

          <li className="p-4">
            <a
              href="https://github.com/mutant138/open-pdfs"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 border border-[#00df9a] text-[#00df9a] font-semibold rounded-lg transition duration-300 hover:bg-[#00df9a] hover:text-black"
            >
              <AiFillGithub size={20} /> Contribute PDF
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;