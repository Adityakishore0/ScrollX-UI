"use client";

import React, { useState, createContext, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavbarProps {
  children: React.ReactNode;
  className?: string;
}

interface NavbarLogoProps {
  className?: string;
}

interface NavBodyProps {
  children: React.ReactNode;
  className?: string;
}

interface NavItemsProps {
  items: {
    label: string;
    href: string;
  }[];
  className?: string;
  onItemClick?: () => void;
}
type IconType = LucideIcon | React.ComponentType<React.SVGProps<SVGSVGElement>>;
interface NavDropdownProps {
  label: string;
  items: {
    label: string;
    href: string;
    icon?: IconType;
  }[];
  className?: string;
  index?: number;
}

interface MobileNavProps {
  children: React.ReactNode;
  className?: string;
  isOpen?: boolean;
}

interface MobileNavHeaderProps {
  children: React.ReactNode;
  className?: string;
}

interface MobileNavMenuProps {
  children: React.ReactNode;
  className?: string;
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenuContext = createContext<{
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
}>({
  isMobileMenuOpen: false,
  setIsMobileMenuOpen: () => {},
});

export const Navbar = ({ children, className }: NavbarProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <MobileMenuContext.Provider
      value={{ isMobileMenuOpen, setIsMobileMenuOpen }}
    >
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 px-4 md:px-6 py-4",
          className
        )}
      >
        <motion.div
          className={cn(
            "flex items-center justify-between max-w-screen-2xl mx-auto"
          )}
          transition={{ duration: 0.3 }}
        >
          {children}
        </motion.div>
      </nav>
    </MobileMenuContext.Provider>
  );
};

export const NavBody = ({ children, className }: NavBodyProps) => {
  return (
    <motion.div
      className={cn(
        "hidden md:flex bg-black dark:bg-white shadow-lg px-6 py-1",
        className
      )}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 1 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <div className="flex items-center gap-1">{children}</div>
    </motion.div>
  );
};

export const NavDropdown = ({
  label,
  items,
  className,
  index = 0,
}: NavDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <motion.button
        className={cn(
          "relative px-4 py-2 text-sm font-medium text-white dark:text-black hover:bg-white hover:text-black dark:hover:bg-black dark:hover:text-white rounded-full flex items-center gap-1",
          className
        )}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 * index }}
      >
        {label}
        <ChevronDown
          size={16}
          className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute top-full left-0 mt-2 bg-black dark:bg-white rounded-xl shadow-2xl p-4 min-w-[205px]"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {items.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.label}
                  href={item.href}
                  className="flex items-center justify-between px-4 py-3 text-gray-200 dark:text-gray-800 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-900 rounded-lg transition-colors"
                >
                  <span className="font-medium text-sm">{item.label}</span>
                  {Icon && <Icon size={18} className="text-gray-400" />}
                </a>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const NavItems = ({ items, className, onItemClick }: NavItemsProps) => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  return (
    <>
      {items.map((item, index) => (
        <motion.a
          key={item.label}
          href={item.href}
          onClick={onItemClick}
          className={cn(
            "relative px-4 py-2 text-sm font-medium text-white dark:text-black hover:bg-white hover:text-black dark:hover:bg-black dark:hover:text-white rounded-full ",
            className
          )}
          onMouseEnter={() => setHoveredItem(item.label)}
          onMouseLeave={() => setHoveredItem(null)}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 * index }}
        >
          {hoveredItem === item.label && (
            <motion.div
              className="absolute inset-0 bg-gray-100 dark:bg-gray-900 rounded-full"
              layoutId="navbar-hover"
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            />
          )}
          <span className="relative z-10">{item.label}</span>
        </motion.a>
      ))}
    </>
  );
};

export const MobileNav = ({
  children,
  className,
  isOpen = false,
}: MobileNavProps) => {
  const { isMobileMenuOpen } = useContext(MobileMenuContext);

  return (
    <motion.div
      className={cn(
        "md:hidden bg-black dark:bg-white shadow-lg z-20 fixed right-4",
        className
      )}
      animate={{
        width: isMobileMenuOpen ? "calc(100vw - 2rem)" : "auto",
        right: isMobileMenuOpen ? "1rem" : "4",
      }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
};

export const MobileNavHeader = ({
  children,
  className,
}: MobileNavHeaderProps) => {
  const { isMobileMenuOpen } = useContext(MobileMenuContext);

  return (
    <div
      className={cn(
        "flex items-center",
        isMobileMenuOpen ? "w-full justify-end" : "justify-end",
        className
      )}
    >
      {children}
    </div>
  );
};

export const MobileNavMenu = ({
  children,
  className,
}: Omit<MobileNavMenuProps, "isOpen" | "onClose">) => {
  const { isMobileMenuOpen, setIsMobileMenuOpen } =
    useContext(MobileMenuContext);

  const onClose = () => setIsMobileMenuOpen(false);

  return (
    <>
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className={cn(
              "md:hidden fixed inset-x-4 top-16 bg-black dark:bg-white shadow-2xl overflow-hidden origin-top z-50",
              className
            )}
            initial={{ opacity: 0, scaleY: 0, height: 0 }}
            animate={{
              opacity: 1,
              scaleY: 1,
              height: "auto",
              transition: {
                duration: 0.4,
                ease: [0.4, 0.0, 0.2, 1],
                opacity: { duration: 0.3 },
                scaleY: { duration: 0.4 },
              },
            }}
            exit={{
              opacity: 0,
              scaleY: 0,
              height: 0,
              transition: {
                duration: 0.3,
                ease: [0.4, 0.0, 0.2, 1],
              },
            }}
          >
            <div className="px-6 py-8">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 w-full z-40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export const MobileNavToggle = ({
  isOpen,
  onClick,
}: {
  isOpen: boolean;
  onClick: () => void;
}) => {
  const { isMobileMenuOpen, setIsMobileMenuOpen } =
    useContext(MobileMenuContext);

  const handleClick = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <motion.button
      onClick={handleClick}
      className="flex items-center gap-2 text-sm font-medium text-gray-300 dark:text-gray-700 px-4 py-2.5"
    >
      <AnimatePresence mode="wait">
        {isMobileMenuOpen ? (
          <motion.div
            key="close"
            initial={{ opacity: 0, filter: "blur(4px)", y: 10 }}
            animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
            exit={{ opacity: 0, filter: "blur(4px)", y: -10 }}
            transition={{ duration: 0.1, ease: "easeInOut" }}
            className="flex items-center gap-2"
          >
            <X size={20} />
            <span>Close</span>
          </motion.div>
        ) : (
          <motion.div
            key="menu"
            initial={{ opacity: 0, filter: "blur(4px)", y: 10 }}
            animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
            exit={{ opacity: 0, filter: "blur(4px)", y: -10 }}
            transition={{ duration: 0.1, ease: "easeInOut" }}
            className="flex items-center gap-2"
          >
            <Menu size={20} />
            <span>Menu</span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
};

export const NavbarLogo = ({ className }: NavbarLogoProps) => {
  const { isMobileMenuOpen } = useContext(MobileMenuContext);

  return (
    <motion.a
      href="/"
      className={cn("flex items-center h-10 gap-2 relative z-20", className)}
      animate={{
        opacity: isMobileMenuOpen ? 0 : 1,
        x: isMobileMenuOpen ? -100 : 0,
      }}
      transition={{ duration: 0.3 }}
    >
      <img
        src="/images/scrollxuilogo.svg"
        alt="logo"
        width={30}
        height={30}
        className="md:w-10 md:h-10"
      />
      <span
        className={cn(
          "text-xl md:text-xl font-semibold transition-colors duration-300",
          className
        )}
      >
        ScrollX UI
      </span>
    </motion.a>
  );
};

export const NavbarButton = ({
  href,
  children,
  className,
  variant = "primary",
  onClick,
}: {
  href?: string;
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary";
  onClick?: () => void;
}) => {
  const baseStyles =
    "flex justify-center items-center w-full max-w-[280px] mx-auto px-4 py-2 text-sm font-medium rounded-full transition-colors";

  const variantStyles = {
    primary: "text-white bg-orange-500 hover:bg-orange-600 font-semibold",
    secondary:
      "text-white dark:text-black hover:bg-white hover:text-black dark:hover:bg-black dark:hover:text-white",
  };

  return (
    <motion.a
      href={href}
      onClick={onClick}
      className={cn(baseStyles, variantStyles[variant], className)}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.a>
  );
};

export const NavbarDivider = () => {
  return <div className="w-px h-6 bg-gray-300 mx-2" />;
};
