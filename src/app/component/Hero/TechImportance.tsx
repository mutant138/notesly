"use client"
import React, { JSX, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Parallax, ParallaxProvider } from "react-scroll-parallax";
import { AiOutlineCode, AiOutlineRobot, AiOutlineCloud, AiOutlineGlobal } from "react-icons/ai";

// Define interface for topic items
interface Topic {
  id: number;
  icon: JSX.Element;
  title: string;
  text: string;
}

const TechImportance: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const topics: Topic[] = [
    { id: 1, icon: <AiOutlineCode size={50} />, title: "Coding Powers Innovation", text: "From websites to apps, coding is the backbone of modern tech." },
    { id: 2, icon: <AiOutlineRobot size={50} />, title: "AI is the Future", text: "Artificial Intelligence is shaping industries and driving automation." },
    { id: 3, icon: <AiOutlineCloud size={50} />, title: "Cloud & Web 3.0", text: "Decentralization, blockchain, and cloud computing are revolutionizing the web." },
    { id: 4, icon: <AiOutlineGlobal size={50} />, title: "Global Impact", text: "Technology connects the world and solves real-world problems at scale." },
  ];

  return (
    <ParallaxProvider >
    <div ref={ref} className="relative text-white py-20 bg-gradient-to-r from-black via-gray-900 to-black overflow-hidden">
      <Parallax speed={-15}>
        <div className="absolute inset-0 bg-[url('/tech-bg.jpg')] bg-cover bg-fixed opacity-20"></div>
      </Parallax>

      <div className="relative z-10 text-center px-6">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-4xl font-bold text-[#00df9a] mb-6"
        >
          Why Learn Coding, Tech & AI?
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {topics.map((topic, index) => (
            <motion.div
              key={topic.id}
              initial={{ opacity: 0, scale: 0.5, rotateY: 90 }}
              animate={isInView ? { opacity: 1, scale: 1, rotateY: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2, ease: "easeOut" }}
              className="p-6 bg-gray-900 rounded-lg flex flex-col items-center text-center hover:bg-gray-800 transition duration-300 shadow-lg shadow-[#00df9a]/30"
            >
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
                className="text-[#00df9a]"
              >
                {topic.icon}
              </motion.div>
              <h3 className="text-xl font-semibold mt-4">{topic.title}</h3>
              <p className="mt-2 text-gray-300">{topic.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
    </ParallaxProvider>
  );
};

export default TechImportance;
