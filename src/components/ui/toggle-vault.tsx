import React, {
  createContext,
  useContext,
  useId,
  useMemo,
  useState,
  ReactNode,
} from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";


type RenderProp<T> = (state: T) => ReactNode;

interface ToggleVaultContextValue {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  toggle: () => void;
  close: () => void;
  triggerId: string;
  panelId: string;
}

const ToggleVaultContext = createContext<ToggleVaultContextValue | null>(null);

export function useToggleVault() {
  const ctx = useContext(ToggleVaultContext);
  if (!ctx) throw new Error("ToggleVault components must be used within <ToggleVault>");
  return ctx;
}


interface ColorSet {
  closedBg?: string;
  closedText?: string;
  openBg?: string;
  openText?: string;
  panelBg?: string;
  panelText?: string;
}

interface SizeSet {
  width?: string;
  height?: string;
  rounded?: string;
}

interface ToggleVaultProps {
  children: ReactNode;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function ToggleVault({ children, defaultOpen = false, onOpenChange }: ToggleVaultProps) {
  const [open, setOpen] = useState(defaultOpen);
  const triggerId = useId();
  const panelId = useId();

  const ctx = useMemo<ToggleVaultContextValue>(
    () => ({
      open,
      setOpen,
      toggle: () => setOpen((o) => !o),
      close: () => setOpen(false),
      triggerId,
      panelId,
    }),
    [open, triggerId, panelId]
  );

  React.useEffect(() => {
    onOpenChange?.(open);
  }, [open, onOpenChange]);

  return <ToggleVaultContext.Provider value={ctx}>{children}</ToggleVaultContext.Provider>;
}


interface ToggleVaultTriggerProps {
  children?: ReactNode | RenderProp<{ open: boolean }>;
  className?: string;
  positionClassName?: string;
  textClassName?: string;
  lightColors?: ColorSet;
  darkColors?: ColorSet;
  buttonSize?: SizeSet;
}

export function ToggleVaultTrigger({
  children,
  className,
  positionClassName = "absolute top-4 right-4",
  textClassName = "font-bold",
  lightColors,
  darkColors,
  buttonSize,
}: ToggleVaultTriggerProps) {
  const { open, toggle, triggerId, panelId } = useToggleVault();

  const lc = {
    closedBg: lightColors?.closedBg ?? "bg-black",
    closedText: lightColors?.closedText ?? "text-white",
    openBg: lightColors?.openBg ?? "bg-white",
    openText: lightColors?.openText ?? "text-black",
  };

  const dc = {
    closedBg: darkColors?.closedBg ?? "bg-white",
    closedText: darkColors?.closedText ?? "text-black",
    openBg: darkColors?.openBg ?? "bg-black",
    openText: darkColors?.openText ?? "text-white",
  };

  const size = {
    width: buttonSize?.width ?? "w-[100px]",
    height: buttonSize?.height ?? "h-[40px]",
    rounded: buttonSize?.rounded ?? "rounded-full",
  };

  const textVariants: Variants = {
    hiddenUp: { y: -10, opacity: 0, transition: { duration: 0.3 } },
    hiddenDown: { y: 10, opacity: 0, transition: { duration: 0.3 } },
    visible: { y: 0, opacity: 1, transition: { duration: 0.3 } },
  };

  const content =
    typeof children === "function"
      ? (children as RenderProp<{ open: boolean }> )({ open })
      : children;

  return (
    <motion.button
      id={triggerId}
      onClick={toggle}
      role="button"
      aria-expanded={open}
      aria-controls={panelId}
      className={[
        positionClassName,
        size.width,
        size.height,
        size.rounded,
        "flex items-center justify-center cursor-pointer z-50 transition-all duration-300 hover:scale-105 border shadow-lg",
        open
          ? `${lc.openBg} ${lc.openText} dark:${dc.openBg} dark:${dc.openText}`
          : `${lc.closedBg} ${lc.closedText} dark:${dc.closedBg} dark:${dc.closedText}`,
        className ?? "",
      ]
        .filter(Boolean)
        .join(" ")}
      style={{
        boxShadow: open
          ? "0 0 20px rgba(0,0,0,0.4)"
          : "0 0 20px rgba(255,255,255,0.3)",
      }}
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={open ? "close" : "menu"}
          variants={textVariants}
          initial={open ? "hiddenDown" : "hiddenUp"}
          animate="visible"
          exit={open ? "hiddenUp" : "hiddenDown"}
          className={textClassName}
        >
          {content ?? (open ? "CLOSE" : "MENU")}
        </motion.span>
      </AnimatePresence>
    </motion.button>
  );
}


interface ToggleVaultContentProps {
  children: ReactNode | RenderProp<{ close: () => void; open: boolean }>;
  panelClassName?: string;
  innerClassName?: string;
  lightColors?: ColorSet;
  darkColors?: ColorSet;
  panelSize?: SizeSet;
  positionClassName?: string;
  originClass?: string;
}

export function ToggleVaultContent({
  children,
  panelClassName,
  innerClassName = "p-12 flex flex-col gap-3 font-bold text-2xl",
  lightColors,
  darkColors,
  panelSize,
  positionClassName = "absolute top-0 right-0",
  originClass = "top right",
}: ToggleVaultContentProps) {
  const { open, close, panelId } = useToggleVault();

  const lc = {
    panelBg: lightColors?.panelBg ?? "bg-black",
    panelText: lightColors?.panelText ?? "text-white",
  };

  const dc = {
    panelBg: darkColors?.panelBg ?? "bg-white",
    panelText: darkColors?.panelText ?? "text-black",
  };

  const size = {
    width: panelSize?.width ?? "w-[400px]",
    height: panelSize?.height ?? "h-[350px]",
    rounded: panelSize?.rounded ?? "rounded-2xl",
  };

  const rendered =
    typeof children === "function"
      ? (children as RenderProp<{ close: () => void; open: boolean }> )({ close, open })
      : children;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          id={panelId}
          key="panel"
          initial={{ scaleX: 0.2, scaleY: 0.066, opacity: 0 }}
          animate={{
            scaleX: 1,
            scaleY: 1,
            opacity: 1,
            transition: { duration: 0.7, ease: [0.2, 0.9, 0.3, 1] },
          }}
          exit={{
            scaleX: 0.2,
            scaleY: 0.066,
            opacity: 0,
            transition: { duration: 0.6, ease: [0.2, 0.9, 0.3, 1] },
          }}
          className={[
            "absolute z-40 shadow-lg border",
            size.width,
            size.height,
            size.rounded,
            `${lc.panelBg} ${lc.panelText} dark:${dc.panelBg} dark:${dc.panelText}`,
            positionClassName,
            panelClassName ?? "",
          ].join(" ")}
          style={{
            transformOrigin: originClass,
            boxShadow: "0 0 25px rgba(0,0,0,0.3)",
          }}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: 0.4 } }}
            exit={{ opacity: 0 }}
            className={innerClassName}
          >
            {rendered}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}


interface ToggleVaultCloseProps {
  children: ReactNode | RenderProp<{ open: boolean }>;
  className?: string;
}

export function ToggleVaultClose({ children, className }: ToggleVaultCloseProps) {
  const { close, open } = useToggleVault();
  const content =
    typeof children === "function"
      ? (children as RenderProp<{ open: boolean }>)({ open })
      : children;

  return (
    <button onClick={close} className={className}>
      {content ?? "Close"}
    </button>
  );
}
