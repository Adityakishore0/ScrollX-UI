"use client";
import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Github, Twitter } from "lucide-react";
import { ArrowBigLeft } from "lucide-react";
import {
  motion,
  useMotionValue,
  useTransform,
  useAnimation,
  AnimatePresence,
} from "framer-motion";

interface ProfileCardProps {
  img: string;
  name: string;
  bio: string;
  skills: string[];
  githubUrl?: string;
  twitterUrl?: string;
  position: string;
}

export default function ProfileCard({
  img,
  name,
  bio,
  skills,
  githubUrl,
  twitterUrl,
  position,
}: ProfileCardProps) {
  const [isRevealed, setIsRevealed] = useState<boolean>(false);
  const [isImageShrunken, setIsImageShrunken] = useState<boolean>(false);
  const arrowControls = useAnimation();
  const dragX = useMotionValue(0);
  const dragThreshold = 50;
  const isAnimating = useRef<boolean>(false);

  const arrowRotation = useTransform(dragX, [0, dragThreshold], [-180, 145]);

  const handleDragEnd = () => {
    if (dragX.get() > dragThreshold && !isRevealed && !isAnimating.current) {
      isAnimating.current = true;
      arrowControls.start({ x: dragThreshold, transition: { duration: 0.2 } });
      setIsImageShrunken(true);
      setTimeout(() => {
        setIsRevealed(true);
        isAnimating.current = false;
      }, 400);
    } else if (dragX.get() <= dragThreshold && !isRevealed) {
      arrowControls.start({
        x: 0,
        transition: { type: "spring", stiffness: 500, damping: 30 },
      });
    } else if (isRevealed) {
      arrowControls.start({
        x: dragThreshold,
        transition: { type: "spring", stiffness: 500, damping: 30 },
      });
    }
  };

  const resetCard = () => {
    if (isRevealed && !isAnimating.current) {
      isAnimating.current = true;
      arrowControls.start({ x: 0, transition: { duration: 0.3 } });
      setIsRevealed(false);
      setTimeout(() => {
        setIsImageShrunken(false);
        isAnimating.current = false;
      }, 300);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="relative w-[17rem] h-[21.1875rem] rounded-[15px] overflow-hidden shadow-lg bg-neutral-50 dark:bg-black">
        <motion.div
          initial={{ width: "100%", height: "100%" }}
          animate={{
            width: isImageShrunken ? "6rem" : "100%",
            height: isImageShrunken ? "8rem" : "100%",
            top: isImageShrunken ? "4rem" : 0,
            left: isImageShrunken ? "1rem" : 0,
            borderRadius: isImageShrunken ? "0.5rem" : "0px",
          }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="absolute overflow-hidden"
        >
          <Image src={img} alt={name} layout="fill" objectFit="cover" />
          <motion.div
            className="absolute top-2 right-2 w-[1.6875rem] h-[1.8125rem] flex items-center justify-center bg-white rounded shadow cursor-grab active:cursor-grabbing z-10"
            drag="x"
            dragConstraints={{ left: 0, right: dragThreshold }}
            dragElastic={0.1}
            dragMomentum={false}
            onDragEnd={handleDragEnd}
            style={{ x: dragX }}
            animate={arrowControls}
            whileTap={{ scale: 1.1 }}
          >
            <motion.div style={{ rotate: arrowRotation }}>
              <ArrowBigLeft className="w-4 h-4 text-black pointer-events-none" />
            </motion.div>
          </motion.div>
        </motion.div>

        <AnimatePresence>
          {isRevealed && (
            <motion.div
              key="content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 text-dark"
            >
              <motion.div
                className="absolute top-2 right-2 w-6 h-6 flex items-center justify-center bg-gray-700 rounded-full cursor-pointer z-20"
                onClick={resetCard}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg
                  viewBox="0 0 24 24"
                  width="16"
                  height="16"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                >
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </motion.div>
              <div className="p-4">
                <h1 className="text-xl font-bold tracking-wider">{name}</h1>
                <p className="text-sm tracking-wider">{position}</p>
              </div>

              <div className="absolute top-[4rem] left-[8rem]">
                <h3 className="text-lg font-semibold mb-2">Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill, index) => (
                    <div
                      key={index}
                      className="bg-gray-300 dark:bg-gray-800 rounded-md p-1 flex items-center justify-center w-8 h-8"
                    >
                      <span className="text-black dark:text-white">
                        {skill}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="absolute top-[13rem] left-0 px-4">
                <p className="text-sm">{bio}</p>
              </div>

              <div className="absolute bottom-4 left-4 flex gap-4">
                {twitterUrl && (
                  <Link href={twitterUrl} target="_blank" rel="noreferrer">
                    <Twitter className="h-5 w-5" />
                    <span className="sr-only">Twitter</span>
                  </Link>
                )}
                {githubUrl && (
                  <Link href={githubUrl} target="_blank" rel="noreferrer">
                    <Github className="h-5 w-5" />
                    <span className="sr-only">GitHub</span>
                  </Link>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {!isRevealed && !isImageShrunken && (
          <motion.div
            className="absolute top-[0.625rem] right-[2.1875rem] text-white text-xs opacity-80 bg-black bg-opacity-50 px-2 py-1 rounded"
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0, 0.8, 0],
              transition: { repeat: Infinity, duration: 2, repeatDelay: 1 },
            }}
          >
            Drag →
          </motion.div>
        )}
      </div>
    </div>
  );
}
