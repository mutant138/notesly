"use client"
import { motion } from "framer-motion";
import { Parallax , ParallaxProvider} from "react-scroll-parallax";

const Hero = () => {
  return (
    <ParallaxProvider>
    <div className="relative w-full h-[80vh] flex flex-col justify-center items-center text-center px-6 bg-gradient-to-r overflow-hidden from-black via-gray-900 to-black">
      <Parallax speed={-10} className="absolute inset-0 z-0">
        <div className="w-full h-full bg-[url('/your-bg-image.jpg')] bg-cover bg-center opacity-40"></div>
      </Parallax>
      <motion.h1
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="text-4xl md:text-6xl font-bold text-[#00df9a] neon-text relative z-10 mt-6"
      >
        Notesly - Free Study Materials & PDFs
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="text-lg md:text-xl max-w-2xl mt-14 text-white relative z-10"
      >
        Notely is a 100% open-source platform for students and developers.
        Download **free educational PDFs, handwritten notes, and study guides**.
        Access resources for exams, competitive tests, and technical learning.
        Learn from experts and contribute your own study materials. Knowledge
        should be **free for everyone!** 🚀
      </motion.p>

      {/* Buttons with Hover Effects */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.8, ease: "easeOut" }}
        className="flex gap-4 mt-16 relative z-10"
      >
        <motion.a
          href="/resources"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-3 bg-[#00df9a] text-black font-semibold rounded-lg hover:bg-[#00bf7a] transition duration-300 shadow-lg"
        >
          Browse Notes
        </motion.a>

        <motion.a
          href="/contribute"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-3 bg-transparent border border-[#00df9a] text-[#00df9a] font-semibold rounded-lg hover:bg-[#00df9a] hover:text-black transition duration-300 shadow-lg"
        >
          Contribute Now
        </motion.a>
      </motion.div>
    </div>
    </ParallaxProvider>
  );
};

export default Hero;
