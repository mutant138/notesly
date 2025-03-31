"use client"
import React from "react";
import { AiFillGithub, AiOutlineTwitter } from "react-icons/ai";

const Footer: React.FC = () => {
  return (
    <div className="py-6 px-6 text-center text-gray-400 bg-gradient-to-r from-black via-gray-900 to-black">
      <p>© {new Date().getFullYear()} Notesly. All Rights Reserved.</p>
      <div className="flex justify-center gap-4 mt-4">
        <a href="https://github.com/mutant138/open-pdfs" target="_blank" rel="noopener noreferrer">
          <AiFillGithub size={24} />
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
          <AiOutlineTwitter size={24} />
        </a>
      </div>
    </div>
  );
};

export default Footer;
