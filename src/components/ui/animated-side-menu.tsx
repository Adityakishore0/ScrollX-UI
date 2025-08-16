import React, { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";

const AnimatedSideMenu: React.FC = () => {
  const [open, setOpen] = useState(false);

  const handleNavClick = () => setOpen(false);

  const textVariants: Variants = {
    hiddenUp: {
      y: -10,
      opacity: 0,
      transition: { duration: 0.3, ease: [0.42, 0, 0.58, 1] },
    },
    hiddenDown: {
      y: 10,
      opacity: 0,
      transition: { duration: 0.3, ease: [0.42, 0, 0.58, 1] },
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.3, ease: [0.42, 0, 0.58, 1] },
    },
  };

  const isDark =
    typeof window !== "undefined" &&
    document.documentElement.classList.contains("dark");

  const buttonBoxShadow = isDark
    ? "0 0 20px rgba(255,255,255,0.4), 0 0 40px rgba(255,255,255,0.25)"
    : "0 0 20px rgba(0,0,0,0.4), 0 0 40px rgba(0,0,0,0.25)";

  const panelBoxShadow = isDark
    ? "0 4px 20px rgba(0,0,0,0.15), 0 0 30px rgba(255,255,255,0.2)"
    : "0 8px 30px rgba(0,0,0,0.35), 0 0 40px rgba(0,0,0,0.2)";

  return (
    <div>
      <motion.div
        className={`fixed top-4 right-4 w-[100px] h-[40px] rounded-full flex items-center justify-center cursor-pointer z-50 
          transition-all duration-300 hover:scale-105`}
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        style={{
          boxShadow: buttonBoxShadow,
          background: isDark
            ? open
              ? "#000"
              : "#fff"
            : open
            ? "#fff"
            : "#000",
          color: isDark
            ? open
              ? "#fff"
              : "#000"
            : open
            ? "#000"
            : "#fff",
          transition:
            "background 0.3s ease, color 0.3s ease, box-shadow 0.3s ease, transform 0.2s ease",
        }}
      >
        <div className="relative w-full h-full flex items-center justify-center rounded-full">
          <AnimatePresence mode="wait">
            {!open && (
              <motion.span
                key="menu"
                variants={textVariants}
                initial="hiddenUp"
                animate="visible"
                exit="hiddenDown"
                className="absolute font-bold"
              >
                MENU
              </motion.span>
            )}
            {open && (
              <motion.span
                key="close"
                variants={textVariants}
                initial="hiddenDown"
                animate="visible"
                exit="hiddenUp"
                className="absolute font-bold"
              >
                CLOSE
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      <AnimatePresence>
        {open && (
          <motion.div
            key="panel"
            initial={{
              scaleX: 0.2,
              scaleY: 0.066,
              top: "1rem",
              right: "1rem",
              opacity: 0,
            }}
            animate={{
              scaleX: 1,
              scaleY: 1,
              top: "0.6rem",
              right: "0.6rem",
              opacity: 1,
              transition: {
                duration: 0.7,
                ease: [0.2, 0.9, 0.3, 1],
              },
            }}
            exit={{
              scaleX: 0.2,
              scaleY: 0.066,
              top: "1rem",
              right: "1rem",
              opacity: 0,
              transition: {
                duration: 0.6,
                ease: [0.2, 0.9, 0.3, 1],
              },
            }}
            className="fixed w-[400px] h-[350px] rounded-2xl overflow-hidden z-40 shadow-lg
                       bg-black text-white dark:bg-white dark:text-black"
            style={{
              transformOrigin: "top right",
              boxShadow: panelBoxShadow,
            }}
            aria-hidden={!open}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.4 } }}
              exit={{ opacity: 0 }}
              className="p-12 flex flex-col gap-3 font-bold text-4xl md:text-4xl font-bricolage"
            >
              <a href="#hero" onClick={handleNavClick} className="hover:opacity-70">
                HOME
              </a>
              <a href="#about" onClick={handleNavClick} className="hover:opacity-70">
                ABOUT
              </a>
              <a href="#projects" onClick={handleNavClick} className="hover:opacity-70">
                PROJECTS
              </a>
              <a href="#resume" onClick={handleNavClick} className="hover:opacity-70">
                RESUME
              </a>
              <a href="#contact" onClick={handleNavClick} className="hover:opacity-70">
                CONTACT
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AnimatedSideMenu;
