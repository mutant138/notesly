"use client"
import React from "react";
import { motion } from "framer-motion";

const Disclaimer: React.FC = () => {
  return (
    <div className="relative py-10 px-6 text-center text-white bg-gradient-to-r from-black via-gray-900 to-black overflow-hidden">
      <h2 className="text-2xl font-bold text-red-500 mb-4">⚠️ Disclaimer</h2>
      <p className="text-lg max-w-3xl mx-auto text-gray-300 mt-12">
        Notesly provides <strong>free educational PDFs</strong> that are publicly available on the internet. We <strong>do not claim ownership, host, or distribute copyrighted material</strong>.  
        Our platform is dedicated to helping students and learners access study resources easily.  
        If you are a <strong>copyright holder</strong> and believe any content infringes on your rights, please <strong>contact us immediately</strong> for removal.
      </p>

      <div className="w-full overflow-hidden whitespace-nowrap mt-20">
        <motion.p
          className="text-lg text-gray-300 inline-block"
          initial={{ x: "100%" }}
          animate={{ x: "-100%" }}
          transition={{
            repeat: Infinity,
            duration: 8,
            ease: "linear",
          }}
        >
          🚨 Notesly does not host or distribute copyrighted material. If you own any content and want it removed, please <strong>contact us immediately</strong>. 🚨
        </motion.p>
      </div>
    </div>
  );
};

export default Disclaimer;