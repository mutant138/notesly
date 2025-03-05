"use client"
import React from "react";
import { AiFillGithub, AiOutlineTwitter } from "react-icons/ai";

const Footer: React.FC = () => {
  return (
    <div className="py-6 px-6 text-center text-gray-400 bg-gray-900">
      <p>© {new Date().getFullYear()} Only Notes. All Rights Reserved.</p>
      <div className="flex justify-center gap-4 mt-4">
        <a href="https://github.com/your-repo-link" target="_blank" rel="noopener noreferrer">
          <AiFillGithub size={24} />
        </a>
        <a href="https://twitter.com/your-profile" target="_blank" rel="noopener noreferrer">
          <AiOutlineTwitter size={24} />
        </a>
      </div>
    </div>
  );
};

export default Footer;
