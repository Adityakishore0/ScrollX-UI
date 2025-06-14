"use client";
import React, {
  useRef,
  useState,
  useEffect,
  createContext,
  useContext,
} from "react";
import { motion } from "framer-motion";
import { MinusIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface InputOtpContextType {
  values: string[];
  visibleValues: string[];
  handleChange: (val: string, idx: number) => void;
  handleKeyDown: (e: React.KeyboardEvent, idx: number) => void;
  handleFocus: (idx: number) => void;
  handleBlur: (idx: number) => void;
  handlePaste: (e: React.ClipboardEvent, idx: number) => void;
  inputsRef: React.MutableRefObject<(HTMLInputElement | null)[]>;
  mask: boolean;
  maskSymbol: string;
  inputClassName?: string;
}

const InputOtpContext = createContext<InputOtpContextType | null>(null);

interface InputOTPProps {
  maxLength?: number;
  onComplete?: (value: string) => void;
  className?: string;
  containerClassName?: string;
  inputClassName?: string;
  mask?: boolean;
  maskSymbol?: string;
  maskDelay?: number;
  children: React.ReactNode;
}

function InputOTP({
  maxLength = 6,
  onComplete,
  className,
  containerClassName,
  inputClassName,
  mask = false,
  maskSymbol = "*",
  maskDelay = 800,
  children,
}: InputOTPProps) {
  const [values, setValues] = useState(Array(maxLength).fill(""));
  const [visibleValues, setVisibleValues] = useState(Array(maxLength).fill(""));
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);
  const timeoutsRef = useRef<(NodeJS.Timeout | null)[]>(
    Array(maxLength).fill(null)
  );

  const clearTimeoutForIndex = (idx: number) => {
    if (timeoutsRef.current[idx]) {
      clearTimeout(timeoutsRef.current[idx]!);
      timeoutsRef.current[idx] = null;
    }
  };

  const applyMaskWithDelay = (idx: number, currentValue: string) => {
    clearTimeoutForIndex(idx);
    if (mask && currentValue) {
      timeoutsRef.current[idx] = setTimeout(() => {
        setVisibleValues((prev) => {
          const updated = [...prev];
          if (updated[idx] !== maskSymbol) {
            updated[idx] = maskSymbol;
          }
          return updated;
        });
      }, maskDelay);
    }
  };

  const handleChange = (val: string, idx: number) => {
    if (val.length > 1) return;

    clearTimeoutForIndex(idx);

    const newValues = [...values];
    const newVisibleValues = [...visibleValues];
    newValues[idx] = val;
    newVisibleValues[idx] = val;
    setValues(newValues);
    setVisibleValues(newVisibleValues);

    if (mask && val) {
      applyMaskWithDelay(idx, val);
    }

    if (val && idx < maxLength - 1) {
      inputsRef.current[idx + 1]?.focus();
    }

    if (newValues.every((v) => v)) {
      onComplete?.(newValues.join(""));
    }
  };

  const handlePaste = (e: React.ClipboardEvent, startIdx: number) => {
    e.preventDefault();
    const pastedText = e.clipboardData.getData("text");

    if (!pastedText) return;

    const newValues = [...values];
    const newVisibleValues = [...visibleValues];

    timeoutsRef.current.forEach((timeout, i) => {
      if (timeout) {
        clearTimeout(timeout);
        timeoutsRef.current[i] = null;
      }
    });

    for (let i = 0; i < pastedText.length && startIdx + i < maxLength; i++) {
      const char = pastedText[i];
      newValues[startIdx + i] = char;
      newVisibleValues[startIdx + i] = char;
    }

    setValues(newValues);
    setVisibleValues(newVisibleValues);

    if (mask) {
      for (let i = 0; i < pastedText.length && startIdx + i < maxLength; i++) {
        const idx = startIdx + i;
        if (newValues[idx]) {
          timeoutsRef.current[idx] = setTimeout(() => {
            setVisibleValues((prev) => {
              const updated = [...prev];
              if (updated[idx] !== maskSymbol) {
                updated[idx] = maskSymbol;
              }
              return updated;
            });
          }, maskDelay);
        }
      }
    }

    const nextEmptyIndex = newValues.findIndex((v, i) => i > startIdx && !v);
    const focusIndex =
      nextEmptyIndex !== -1
        ? nextEmptyIndex
        : Math.min(startIdx + pastedText.length, maxLength - 1);

    setTimeout(() => {
      inputsRef.current[focusIndex]?.focus();
    }, 0);

    if (newValues.every((v) => v)) {
      onComplete?.(newValues.join(""));
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, idx: number) => {
    if (e.key === "Backspace") {
      clearTimeoutForIndex(idx);
      if (!values[idx] && idx > 0) {
        inputsRef.current[idx - 1]?.focus();
      } else {
        const newValues = [...values];
        const newVisibleValues = [...visibleValues];
        newValues[idx] = "";
        newVisibleValues[idx] = "";
        setValues(newValues);
        setVisibleValues(newVisibleValues);
      }
    }
  };

  const handleFocus = (idx: number) => {
    if (mask && values[idx]) {
      clearTimeoutForIndex(idx);
      setVisibleValues((prev) => {
        const updated = [...prev];
        updated[idx] = values[idx];
        return updated;
      });
      applyMaskWithDelay(idx, values[idx]);
    }
  };

  const handleBlur = (idx: number) => {
    if (mask && values[idx]) {
      clearTimeoutForIndex(idx);
      setVisibleValues((prev) => {
        const updated = [...prev];
        updated[idx] = maskSymbol;
        return updated;
      });
    }
  };

  useEffect(() => {
    const currentTimeouts = timeoutsRef.current;

    return () => {
      currentTimeouts.forEach((timeout) => {
        if (timeout) clearTimeout(timeout);
      });
    };
  }, []);

  const contextValue: InputOtpContextType = {
    values,
    visibleValues,
    handleChange,
    handleKeyDown,
    handleFocus,
    handleBlur,
    handlePaste,
    inputsRef,
    mask,
    maskSymbol,
    inputClassName,
  };

  return (
    <InputOtpContext.Provider value={contextValue}>
      <div
        data-slot="input-otp"
        className={cn(
          "flex items-center gap-1 sm:gap-2 has-disabled:opacity-50",
          containerClassName
        )}
      >
        <div className={cn("flex items-center gap-1 sm:gap-2", className)}>
          {children}
        </div>
      </div>
    </InputOtpContext.Provider>
  );
}

function InputOTPGroup({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="input-otp-group"
      className={cn(
        "flex items-center gap-1 sm:gap-2 px-1 py-0.5 rounded-md sm:rounded-lg",
        "bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

function InputOTPSlot({
  index,
  className,
  ...props
}: Omit<React.ComponentProps<"div">, "children"> & {
  index: number;
}) {
  const context = useContext(InputOtpContext);

  if (!context) {
    throw new Error("InputOTPSlot must be used within InputOTP");
  }

  const {
    visibleValues,
    handleChange,
    handleKeyDown,
    handleFocus,
    handleBlur,
    handlePaste,
    inputsRef,
    mask,
    maskSymbol,
    inputClassName,
  } = context;

  return (
    <motion.div
      className="relative"
      initial={{ scale: 1 }}
      whileFocus={{ scale: 1.05 }}
      whileHover={{ scale: 1.02 }}
    >
      <input
        ref={(el) => (inputsRef.current[index] = el)}
        type="text"
        inputMode="text"
        maxLength={1}
        value={visibleValues[index]}
        onChange={(e) => handleChange(e.target.value, index)}
        onKeyDown={(e) => handleKeyDown(e, index)}
        onFocus={() => handleFocus(index)}
        onBlur={() => handleBlur(index)}
        onPaste={(e) => handlePaste(e, index)}
        className={cn(
          "w-8 h-10 sm:w-10 sm:h-12 md:w-12 md:h-14",
          "rounded-lg sm:rounded-xl text-center font-semibold outline-none transition-all duration-200",
          "border border-transparent bg-white/60 dark:bg-white/10 shadow-inner",
          "focus:ring-2 focus:ring-primary/70 dark:focus:ring-primary/40 focus:border-primary/30",
          "backdrop-blur-md text-black dark:text-white placeholder-transparent",
          visibleValues[index] === maskSymbol
            ? "text-lg sm:text-xl md:text-2xl"
            : "text-sm sm:text-base md:text-lg",
          "font-mono",
          inputClassName,
          className
        )}
      />
      <motion.div
        layoutId={`glow-${index}`}
        className="absolute inset-0 rounded-lg sm:rounded-xl pointer-events-none"
        style={{ boxShadow: "0 0 4px 1px rgba(0,0,0,0.06)" }}
      />
    </motion.div>
  );
}

function InputOTPSeparator({
  separatorSymbol,
  className,
  ...props
}: React.ComponentProps<"div"> & {
  separatorSymbol?: React.ReactNode;
}) {
  return (
    <div
      data-slot="input-otp-separator"
      role="separator"
      className={cn("flex items-center justify-center", className)}
      {...props}
    >
      {separatorSymbol || <MinusIcon className="w-3 h-3 sm:w-4 sm:h-4" />}
    </div>
  );
}

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator };
