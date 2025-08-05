"use client";
import React, { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import ThemeSwitchIcon from "@/components/demos/themeswitchicon";
import {
  Menu as List,
  X as Close,
  ChevronDown as ArrowDown,
  ChevronUp as ArrowUp,
} from "lucide-react";
import ScrollXHeading from "@/components/heading";
import Link from "next/link";

interface NavLink {
  text: string;
  url?: string;
  submenu?: React.ReactNode;
}

interface LinkedNavbarProps {
  emblem?: React.ReactNode;
  links?: NavLink[];
  displayGitIcon?: boolean;
  gitUrl?: string;
  extraIcons?: React.ReactNode[];
  styleName?: string;
}

interface ListItemProps {
  setSelected: (element: string | null) => void;
  selected: string | null;
  element: string;
  children: React.ReactNode;
}

interface HoverLinkProps {
  url: string;
  children: React.ReactNode;
  onPress?: () => void;
}

interface FeatureItemProps {
  heading: string;
  url: string;
  info: string;
  onPress?: () => void;
}

const springTransition = {
  type: "spring",
  mass: 0.5,
  damping: 11.5,
  stiffness: 100,
  restDelta: 0.001,
  restSpeed: 0.001,
};

const ListItem: React.FC<ListItemProps> = ({
  setSelected,
  selected,
  element,
  children,
}) => {
  return (
    <div className="relative" onMouseEnter={() => setSelected(element)}>
      <motion.p
        transition={{ duration: 0.3 }}
        className="cursor-pointer text-gray-800 dark:text-gray-200 font-medium text-base lg:text-xl whitespace-nowrap hover:opacity-[0.9] hover:text-gray-900 dark:hover:text-white"
      >
        {element}
      </motion.p>
      {selected !== null && (
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={springTransition}
        >
          {selected === element && (
            <div className="absolute top-[calc(100%_+_1.2rem)] left-1/2 transform -translate-x-1/2 pt-4">
              <motion.div
                transition={springTransition}
                layoutId="selected"
                className="bg-white dark:bg-gray-900 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 shadow-xl"
              >
                <motion.div layout className="w-max h-full p-4">
                  {children}
                </motion.div>
              </motion.div>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

const HoverLink: React.FC<HoverLinkProps> = ({ url, children, onPress }) => {
  return (
    <Link
      href={url}
      onClick={onPress}
      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
    >
      {children}
    </Link>
  );
};

const FeatureItem: React.FC<FeatureItemProps> = ({
  heading,
  url,
  info,
  onPress,
}) => {
  return (
    <Link
      href={url}
      onClick={onPress}
      className="block p-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
    >
      <h4 className="font-medium text-gray-900 dark:text-white">{heading}</h4>
      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{info}</p>
    </Link>
  );
};

const LinkedNavbar: React.FC<LinkedNavbarProps> = ({
  emblem = <ScrollXHeading className="w-auto h-4 sm:h-5 whitespace-nowrap" />,
  links = [
    {
      text: "Components",
      submenu: (
        <div className="flex flex-col space-y-2">
          <HoverLink url="/components/button">Button</HoverLink>
          <HoverLink url="/components/hero">Hero Section</HoverLink>
          <HoverLink url="/components/navbar">Navbar</HoverLink>
          <HoverLink url="/components/footer">Footer</HoverLink>
          <HoverLink url="/components/cards">Cards</HoverLink>
          <HoverLink url="/components/forms">Forms</HoverLink>
        </div>
      ),
    },
    {
      text: "Templates",
      submenu: (
        <div className="grid grid-cols-1 gap-2 w-48">
          <FeatureItem
            heading="Portfolio Template"
            url="/templates/portfolio"
            info="Clean, personal showcase for designers & developers."
          />
          <FeatureItem
            heading="Business Template"
            url="/templates/business"
            info="Professional website layout for startups & businesses."
          />
          <FeatureItem
            heading="Blog Template"
            url="/templates/blog"
            info="Minimal blog with modern reading experience."
          />
          <FeatureItem
            heading="Landing Page"
            url="/templates/landing"
            info="High-converting landing page for product launches."
          />
        </div>
      ),
    },
    {
      text: "Showcase",
      submenu: (
        <div className="flex flex-col space-y-2">
          <HoverLink url="/showcase/astroship">Astroship</HoverLink>
          <HoverLink url="/showcase/papermod">PaperMod</HoverLink>
          <HoverLink url="/showcase/satori">Satori</HoverLink>
          <HoverLink url="/showcase/scrollx">ScrollX</HoverLink>
          <HoverLink url="/showcase/speedyfolio">Speedyfolio</HoverLink>
        </div>
      ),
    },
    { text: "About", url: "/about" },
  ],
  extraIcons = [],
  styleName = "",
}) => {
  const [sequenceDone, setSequenceDone] = useState(false);
  const [mobileMenuVisible, setMobileMenuVisible] = useState(false);
  const [mobileView, setMobileView] = useState(false);
  const [selectedSubmenu, setSelectedSubmenu] = useState<string | null>(null);
  const [openedSections, setOpenedSections] = useState<Record<string, boolean>>(
    {}
  );

  const navMotion = useAnimation();
  const emblemMotion = useAnimation();
  const switchMotion = useAnimation();
  const svgMotion = useAnimation();

  useEffect(() => {
    const detectMobile = () => {
      setMobileView(window.innerWidth < 768);
    };

    detectMobile();
    window.addEventListener("resize", detectMobile);
    return () => window.removeEventListener("resize", detectMobile);
  }, []);

  useEffect(() => {
    const runSequence = async () => {
      if (mobileView) {
        await Promise.all([
          emblemMotion.start({
            opacity: 1,
            x: 0,
            transition: { duration: 0.6, ease: "easeOut" },
          }),
          navMotion.start({
            opacity: 1,
            transition: { duration: 0.6, ease: "easeOut" },
          }),
          switchMotion.start({
            opacity: 1,
            x: 0,
            transition: { duration: 0.6, ease: "easeOut" },
          }),
        ]);
      } else {
        await navMotion.start({
          width: "auto",
          padding: "16px 40px",
          transition: { duration: 0.8, ease: "easeOut" },
        });

        await svgMotion.start({
          opacity: 1,
          transition: { duration: 0.5 },
        });

        await Promise.all([
          emblemMotion.start({
            opacity: 1,
            x: 0,
            transition: { duration: 0.6, ease: "easeOut" },
          }),
          switchMotion.start({
            opacity: 1,
            x: 0,
            transition: { duration: 0.6, ease: "easeOut" },
          }),
        ]);
      }

      setSequenceDone(true);
    };

    runSequence();
  }, [navMotion, emblemMotion, switchMotion, svgMotion, mobileView]);

  const toggleMobileMenu = () => {
    setMobileMenuVisible(!mobileMenuVisible);
  };

  const toggleSection = (text: string) => {
    setOpenedSections((prev) => ({
      ...prev,
      [text]: !prev[text],
    }));
  };

  const hideMobileMenu = () => {
    setMobileMenuVisible(false);
  };

  const renderSubmenuItems = (submenu: React.ReactNode) => {
    if (!React.isValidElement(submenu)) return null;

    const submenuProps = submenu.props as { children?: React.ReactNode };
    if (!submenuProps.children) return null;

    return React.Children.map(submenuProps.children, (child, childIdx) => (
      <div key={childIdx} onClick={hideMobileMenu}>
        {child}
      </div>
    ));
  };

  return (
    <div className={`sticky top-0 z-50 w-full  ${styleName}`}>
      <div className="hidden md:block">
        <div className="relative w-full max-w-7xl mx-auto h-24 flex items-center justify-between px-4 lg:px-10">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={emblemMotion}
            className="bg-gray-200/80 dark:bg-gray-800/80 backdrop-blur-sm text-gray-800 dark:text-gray-200 px-4 lg:px-8 py-3 lg:py-4 rounded-full font-semibold text-lg lg:text-xl z-10 flex-shrink-0"
          >
            {emblem}
          </motion.div>

          <motion.nav
            initial={{
              width: "120px",
              padding: "12px 24px",
            }}
            animate={navMotion}
            className="bg-gray-200/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full flex items-center justify-center gap-6 lg:gap-12 z-10 flex-shrink-0"
            onMouseLeave={() => setSelectedSubmenu(null)}
          >
            {links.map((element) => (
              <div key={element.text}>
                {element.submenu ? (
                  <ListItem
                    setSelected={setSelectedSubmenu}
                    selected={selectedSubmenu}
                    element={element.text}
                  >
                    {element.submenu}
                  </ListItem>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: sequenceDone ? 1 : 0 }}
                  >
                    <Link
                      href={element.url || "#"}
                      className="text-gray-800 dark:text-gray-200 font-medium text-base lg:text-xl whitespace-nowrap hover:text-gray-900 dark:hover:text-white transition-colors"
                    >
                      {element.text}
                    </Link>
                  </motion.div>
                )}
              </div>
            ))}
          </motion.nav>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={switchMotion}
            className="bg-gray-200/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full p-2 lg:p-3 z-10 flex-shrink-0 flex items-center gap-2 lg:gap-3"
          >
            {extraIcons.map((icon, idx) => (
              <div key={idx} className="flex items-center justify-center">
                {icon}
              </div>
            ))}

            <div className="flex items-center justify-center">
              <ThemeSwitchIcon />
            </div>
          </motion.div>

          <motion.svg
            initial={{ opacity: 0 }}
            animate={svgMotion}
            className="absolute inset-0 w-full h-full z-0 pointer-events-none"
            viewBox="0 0 1400 96"
            preserveAspectRatio="none"
          >
            <defs>
              <filter id="connectionBlur">
                <feGaussianBlur in="SourceGraphic" stdDeviation="3" />
              </filter>
              <linearGradient
                id="blueGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0" />
                <stop offset="50%" stopColor="#3b82f6" stopOpacity="1" />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
              </linearGradient>
              <linearGradient
                id="cyanGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <stop offset="0%" stopColor="#06b6d4" stopOpacity="0" />
                <stop offset="50%" stopColor="#06b6d4" stopOpacity="1" />
                <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
              </linearGradient>
              <linearGradient
                id="purpleGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0" />
                <stop offset="50%" stopColor="#8b5cf6" stopOpacity="1" />
                <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
              </linearGradient>
              <linearGradient
                id="orangeGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <stop offset="0%" stopColor="#f59e0b" stopOpacity="0" />
                <stop offset="50%" stopColor="#f59e0b" stopOpacity="1" />
                <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
              </linearGradient>
              <linearGradient
                id="redGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <stop offset="0%" stopColor="#ef4444" stopOpacity="0" />
                <stop offset="50%" stopColor="#ef4444" stopOpacity="1" />
                <stop offset="100%" stopColor="#ef4444" stopOpacity="0" />
              </linearGradient>
              <linearGradient
                id="greenGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <stop offset="0%" stopColor="#10b981" stopOpacity="0" />
                <stop offset="50%" stopColor="#10b981" stopOpacity="1" />
                <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
              </linearGradient>
            </defs>

            <motion.path
              d="M 700 48 Q 500 30, 300 40 Q 200 35, 120 48"
              stroke="url(#blueGradient)"
              strokeWidth="3"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.8 }}
              transition={{ duration: 2, ease: "easeOut", delay: 1.5 }}
            />

            <motion.path
              d="M 700 44 Q 520 60, 320 50 Q 220 55, 130 44"
              stroke="url(#cyanGradient)"
              strokeWidth="2.5"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.7 }}
              transition={{ duration: 2.2, ease: "easeOut", delay: 1.7 }}
            />

            <motion.path
              d="M 700 52 Q 480 25, 280 45 Q 180 30, 110 52"
              stroke="url(#purpleGradient)"
              strokeWidth="2.5"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.6 }}
              transition={{ duration: 1.8, ease: "easeOut", delay: 1.9 }}
            />

            <motion.path
              d="M 700 48 Q 900 35, 1100 45 Q 1200 40, 1280 48"
              stroke="url(#orangeGradient)"
              strokeWidth="3"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.8 }}
              transition={{ duration: 2, ease: "easeOut", delay: 2.1 }}
            />

            <motion.path
              d="M 700 44 Q 880 65, 1080 50 Q 1180 60, 1270 44"
              stroke="url(#redGradient)"
              strokeWidth="2.5"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.7 }}
              transition={{ duration: 2.2, ease: "easeOut", delay: 2.3 }}
            />

            <motion.path
              d="M 700 52 Q 920 25, 1120 40 Q 1220 30, 1290 52"
              stroke="url(#greenGradient)"
              strokeWidth="2.5"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.6 }}
              transition={{ duration: 1.8, ease: "easeOut", delay: 2.5 }}
            />

            <g filter="url(#connectionBlur)" opacity="0.3">
              <path
                d="M 700 48 Q 500 30, 300 40 Q 200 35, 120 48"
                stroke="#3b82f6"
                strokeWidth="4"
                fill="none"
              />
              <path
                d="M 700 44 Q 520 60, 320 50 Q 220 55, 130 44"
                stroke="#06b6d4"
                strokeWidth="4"
                fill="none"
              />
              <path
                d="M 700 52 Q 480 25, 280 45 Q 180 30, 110 52"
                stroke="#8b5cf6"
                strokeWidth="4"
                fill="none"
              />
              <path
                d="M 700 48 Q 900 35, 1100 45 Q 1200 40, 1280 48"
                stroke="#f59e0b"
                strokeWidth="4"
                fill="none"
              />
              <path
                d="M 700 44 Q 880 65, 1080 50 Q 1180 60, 1270 44"
                stroke="#ef4444"
                strokeWidth="4"
                fill="none"
              />
              <path
                d="M 700 52 Q 920 25, 1120 40 Q 1220 30, 1290 52"
                stroke="#10b981"
                strokeWidth="4"
                fill="none"
              />
            </g>
          </motion.svg>
        </div>
      </div>

      <div className="block md:hidden">
        <div className=" top-0 z-50 w-full border-b border-gray-200/40 dark:border-gray-800/40 bg-gray-50/95 dark:bg-black/95 backdrop-blur supports-[backdrop-filter]:bg-gray-50/60 dark:supports-[backdrop-filter]:bg-black/60 relative">
          <div className="container flex h-16 max-w-screen-2xl items-center px-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={emblemMotion}
              className="mr-4 flex-shrink-0"
            >
              <div className="bg-gray-200/80 dark:bg-gray-800/80 backdrop-blur-sm text-gray-800 dark:text-gray-200 px-4 py-2 rounded-full font-semibold text-base">
                {emblem}
              </div>
            </motion.div>

            <div className="flex flex-1 items-center justify-end space-x-2">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={switchMotion}
                className="flex items-center space-x-2"
              >
                {extraIcons.map((icon, idx) => (
                  <div key={idx} className="flex items-center justify-center">
                    {icon}
                  </div>
                ))}

                <div className="flex items-center justify-center">
                  <ThemeSwitchIcon />
                </div>
              </motion.div>

              <button
                onClick={toggleMobileMenu}
                className="flex items-center justify-center w-9 h-9 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                {mobileMenuVisible ? (
                  <Close className="h-5 w-5" />
                ) : (
                  <List className="h-5 w-5" />
                )}
                <span className="sr-only">Toggle menu</span>
              </button>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, maxHeight: 0 }}
            animate={{
              opacity: mobileMenuVisible ? 1 : 0,
              maxHeight: mobileMenuVisible ? "80vh" : 0,
            }}
            transition={{ duration: 0.3 }}
            className="absolute left-0 right-0 top-full z-40 overflow-y-auto border-t border-gray-200/40 dark:border-gray-800/40 bg-gray-50/95 dark:bg-black/95 backdrop-blur"
          >
            <div className="container py-4 px-4">
              <nav className="flex flex-col space-y-3">
                {links.map((element, idx) => (
                  <div key={element.text} className="space-y-2">
                    {element.submenu ? (
                      <>
                        <button
                          className="flex items-center justify-between w-full text-gray-800 dark:text-gray-200 font-medium text-base py-2 px-4 rounded-lg hover:bg-gray-200/50 dark:hover:bg-gray-800/50 transition-colors border-b border-gray-200 dark:border-gray-800"
                          onClick={() => toggleSection(element.text)}
                        >
                          <span>{element.text}</span>
                          <span>
                            {openedSections[element.text] ? (
                              <ArrowUp className="h-4 w-4" />
                            ) : (
                              <ArrowDown className="h-4 w-4" />
                            )}
                          </span>
                        </button>

                        {openedSections[element.text] && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            transition={{ duration: 0.2 }}
                            className="pl-4 space-y-1 overflow-hidden"
                          >
                            {renderSubmenuItems(element.submenu)}
                          </motion.div>
                        )}
                      </>
                    ) : (
                      <Link
                        href={element.url || "#"}
                        onClick={hideMobileMenu}
                        className="text-gray-800 dark:text-gray-200 font-medium text-base py-2 px-4 rounded-lg hover:bg-gray-200/50 dark:hover:bg-gray-800/50 transition-colors border-b border-gray-200 dark:border-gray-800 block"
                      >
                        {element.text}
                      </Link>
                    )}
                  </div>
                ))}
              </nav>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default LinkedNavbar;
