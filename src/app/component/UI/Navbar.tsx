"use client";

import { useState } from "react";
import Link from "next/link";
import { AiOutlineClose, AiOutlineMenu, AiFillGithub } from "react-icons/ai";


interface NavItem {
  id: number;
  text: string;
  path: string;
}

const Navbar: React.FC = () => {
  const [nav, setNav] = useState<boolean>(false);

  const handleNav = () => {
    setNav(!nav);
  };

  const navItems: NavItem[] = [
    { id: 1, text: "Home", path: "/" },
    { id: 3, text: "Resources", path: "/resources" },
    { id: 5, text: "AI Mock Interview", path: "/mock" },
    { id: 6, text: "Blogs", path: "/blogs" },
  ];

  return (
    <nav className="bg-gradient-to-r from-black via-gray-900 to-black flex justify-between items-center h-16 w-full px-6 text-white shadow-md fixed top-0 z-50">
      <h1 className="text-3xl font-bold text-[#00df9a]">Notesly</h1>

      <ul className="hidden md:flex gap-6">
        {navItems.map((item) => (
          <li key={item.id}>
            <Link
              href={item.path}
             onClick={(e)=>{
              if (item.path === "/blogs" || item.path === "/donate") {
                e.preventDefault(); // Prevents navigation
              }
             }}
              className= {`p-2 hover:bg-[#00df9a] rounded-lg ${item.path === "/blogs" || item.path==="/class" ?"cursor-not-allowed" : "cursor-pointer"} transition duration-300 hover:text-black`}
            >
              {item.text}
            </Link>
          </li>
        ))}
        <li>
          <a
            href="https://github.com/mutant138/open-pdfs"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 p-1 bg-[#00df9a] text-black font-semibold rounded-lg transition duration-300 hover:bg-[#00bf7a] pointer-events-none"
          >
            <AiFillGithub size={20} /> Contribute
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
          <AiOutlineClose size={24} className="cursor-pointer" onClick={handleNav} />
        </div>

        {/* Sidebar Links */}
        <ul>
          {navItems.map((item) => (
            <li key={item.id}>
              <Link
                href={item.path}
                onClick={() => setNav(false)}
                className="block p-4 border-b border-gray-800 hover:bg-[#00df9a] hover:text-black transition duration-300 cursor-pointer"
              >
                {item.text}
              </Link>
            </li>
          ))}

          <li className="p-4">
            <a
              href="undefined"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-[#00df9a] text-black font-semibold rounded-lg transition duration-300 hover:bg-[#00bf7a] pointer-events-none"
            >
              <AiFillGithub size={20} /> Contribute
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
