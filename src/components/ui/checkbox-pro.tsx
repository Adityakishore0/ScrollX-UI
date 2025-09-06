"use client";
import * as React from "react";
import { CheckIcon, MinusIcon } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type CheckedState = boolean | "indeterminate";

interface CheckboxProProps {
  className?: string;
  onCheckedChange?: (checked: CheckedState) => void;
  disabled?: boolean;
  defaultChecked?: CheckedState;
  checked?: CheckedState;
  id?: string;
  name?: string;
  value?: string;
  required?: boolean;
  asChild?: boolean;
  forceMount?: boolean;
  "aria-label"?: string;
  "aria-labelledby"?: string;
  "aria-describedby"?: string;
}

function AsChild({
  asChild,
  children,
  ...props
}: {
  asChild?: boolean;
  children: React.ReactElement;
} & React.HTMLAttributes<HTMLElement>) {
  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, {
      ...(children.props as Record<string, unknown>),
      ...props,
      className: cn(
        (children.props as { className?: string }).className,
        props.className
      ),
    } as React.HTMLAttributes<HTMLElement>);
  }
  return children;
}

function CheckboxPro({
  className,
  onCheckedChange,
  disabled = false,
  defaultChecked = false,
  checked: checkedProp,
  id,
  name,
  value,
  required = false,
  asChild = false,
  forceMount = false,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledby,
  "aria-describedby": ariaDescribedby,
  children,
  ...props
}: CheckboxProProps &
  React.HTMLAttributes<HTMLButtonElement> & { children?: React.ReactElement }) {
  const [animationKey, setAnimationKey] = React.useState(0);
  const [internalChecked, setInternalChecked] =
    React.useState<CheckedState>(defaultChecked);
  const [isKeyboardUser, setIsKeyboardUser] = React.useState(false);
  const buttonRef = React.useRef<HTMLButtonElement>(null);

  const isControlled = checkedProp !== undefined;
  const checked = isControlled ? checkedProp : internalChecked;
  const isIndeterminate = checked === "indeterminate";
  const isChecked = checked === true;

  const getDataState = (
    checked: CheckedState
  ): "checked" | "unchecked" | "indeterminate" => {
    if (checked === "indeterminate") return "indeterminate";
    return checked ? "checked" : "unchecked";
  };

  const handleToggle = React.useCallback(() => {
    if (disabled) return;

    let newChecked: CheckedState;

    if (isIndeterminate) {
      newChecked = false;
    } else {
      newChecked = !isChecked;
    }

    setAnimationKey((prev) => prev + 1);

    if (!isControlled) {
      setInternalChecked(newChecked);
    }

    onCheckedChange?.(newChecked);

    if (isKeyboardUser) {
      requestAnimationFrame(() => {
        buttonRef.current?.focus();
      });
    }
  }, [
    disabled,
    isControlled,
    onCheckedChange,
    isKeyboardUser,
    isIndeterminate,
    isChecked,
  ]);

  const handleKeyDown = React.useCallback(
    (event: React.KeyboardEvent<HTMLButtonElement>) => {
      setIsKeyboardUser(true);

      if (event.key === " ") {
        event.preventDefault();
        event.stopPropagation();
        handleToggle();
      } else if (event.key === "Enter") {
        event.preventDefault();
        event.stopPropagation();
        handleToggle();
      }
    },
    [handleToggle]
  );

  const handleClick = React.useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      setIsKeyboardUser(false);
      event.preventDefault();
      event.stopPropagation();
      handleToggle();
    },
    [handleToggle]
  );

  const handleFocus = React.useCallback(
    (event: React.FocusEvent<HTMLButtonElement>) => {
      props.onFocus?.(event);
    },
    [props]
  );

  const handleBlur = React.useCallback(
    (event: React.FocusEvent<HTMLButtonElement>) => {
      setIsKeyboardUser(false);
      props.onBlur?.(event);
    },
    [props]
  );

  React.useEffect(() => {
    const handleGlobalKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Tab") {
        setIsKeyboardUser(true);
      }
    };

    const handleGlobalMouseDown = () => {
      setIsKeyboardUser(false);
    };

    document.addEventListener("keydown", handleGlobalKeyDown);
    document.addEventListener("mousedown", handleGlobalMouseDown);

    return () => {
      document.removeEventListener("keydown", handleGlobalKeyDown);
      document.removeEventListener("mousedown", handleGlobalMouseDown);
    };
  }, []);

  const getAriaChecked = (checked: CheckedState): boolean | "mixed" => {
    if (checked === "indeterminate") return "mixed";
    return checked === true;
  };

  const checkboxButton = (
    <motion.button
      ref={buttonRef}
      key={`checkbox-${animationKey}`}
      type="button"
      role="checkbox"
      aria-checked={getAriaChecked(checked)}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledby}
      aria-describedby={ariaDescribedby}
      aria-required={required}
      disabled={disabled}
      id={id}
      data-state={getDataState(checked)}
      data-disabled={disabled ? "" : undefined}
      className={cn(
        "relative peer border bg-input-background dark:bg-input/30 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground data-[state=indeterminate]:bg-primary data-[state=indeterminate]:text-primary-foreground dark:data-[state=checked]:bg-primary dark:data-[state=indeterminate]:bg-primary data-[state=checked]:border-primary data-[state=indeterminate]:border-primary size-4 shrink-0 rounded-[4px] shadow-xs transition-colors outline-none",
        isKeyboardUser &&
          "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        disabled
          ? "opacity-50 cursor-not-allowed"
          : "cursor-pointer hover:bg-accent/50",
        className
      )}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      onFocus={handleFocus}
      onBlur={handleBlur}
      tabIndex={disabled ? -1 : 0}
      initial={{ scale: 1, rotate: 0, x: 0, y: 0 }}
      animate={{
        x: [0, -2, 2, -1.5, 1.5, 0],
        y: [0, -1, 1, -0.5, 0.5, 0],
        scale: [1, 0.9, 1.1, 0.95, 1.05, 1],
        rotate: [0, -3, 3, -2, 2, 0],
      }}
      transition={{
        duration: 0.4,
        ease: "easeInOut",
        times: [0, 0.15, 0.3, 0.5, 0.7, 1],
      }}
      whileHover={
        disabled ? {} : { scale: 1.05, transition: { duration: 0.1 } }
      }
      whileTap={disabled ? {} : { scale: 0.95, transition: { duration: 0.05 } }}
      style={{ transformOrigin: "center" }}
    >
      {(forceMount || isChecked || isIndeterminate) && (
        <CheckboxProIndicator forceMount={forceMount} checked={checked} />
      )}
    </motion.button>
  );

  const hiddenInput = (name || value) && (
    <input
      type="checkbox"
      name={name}
      value={value}
      checked={isChecked}
      onChange={() => {}}
      tabIndex={-1}
      aria-hidden="true"
      className="sr-only absolute -left-[9999px]"
      disabled={disabled}
      required={required}
    />
  );

  return (
    <>
      <AsChild
        asChild={asChild}
        {...(asChild ? { children: children as React.ReactElement } : {})}
      >
        {asChild && children ? children : checkboxButton}
      </AsChild>
      {hiddenInput}
    </>
  );
}

interface CheckboxProIndicatorProps {
  forceMount?: boolean;
  checked: CheckedState;
  className?: string;
  asChild?: boolean;
  children?: React.ReactElement;
}

function CheckboxProIndicator({
  forceMount = false,
  checked,
  className,
  asChild = false,
  children,
}: CheckboxProIndicatorProps) {
  const isIndeterminate = checked === "indeterminate";
  const isChecked = checked === true;
  const shouldShow = forceMount || isChecked || isIndeterminate;

  if (!shouldShow) return null;

  const indicator = (
    <motion.div
      data-slot="checkbox-indicator"
      className={cn(
        "flex items-center justify-center text-current w-full h-full pointer-events-none absolute inset-0",
        className
      )}
      initial={{ scale: 0, opacity: 0, rotate: isIndeterminate ? 0 : -90 }}
      animate={{ scale: 1, opacity: 1, rotate: 0 }}
      exit={{ scale: 0, opacity: 0, rotate: isIndeterminate ? 0 : 90 }}
      transition={{
        delay: 0.1,
        duration: 0.2,
        type: "spring",
        stiffness: 400,
        damping: 25,
      }}
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{
          delay: 0.15,
          type: "spring",
          stiffness: 600,
          damping: 30,
          duration: 0.15,
        }}
      >
        {isIndeterminate ? (
          <MinusIcon className="size-3.5 pointer-events-none" />
        ) : (
          <CheckIcon className="size-3.5 pointer-events-none" />
        )}
      </motion.div>
    </motion.div>
  );

  return (
    <AsChild asChild={asChild} className={className}>
      {asChild && children ? children : indicator}
    </AsChild>
  );
}

export { CheckboxPro, CheckboxProIndicator, type CheckedState };
