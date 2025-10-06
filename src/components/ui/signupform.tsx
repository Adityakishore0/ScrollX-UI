"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import Transition from "@/components/ui/transition";
import { motion } from "framer-motion";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm transition-all duration-300",
          className
        )}
        style={{
          borderWidth: "2px",
          borderImage: `conic-gradient(
            rgb(212, 212, 212) 0deg,
            rgb(23, 23, 23) 90deg,
            rgb(212, 212, 212) 180deg,
            rgb(23, 23, 23) 270deg,
            rgb(212, 212, 212) 360deg
          ) 1 / 1 / 0 stretch`,
        }}
        ref={ref}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const introContent = (triggerExit: () => void) => (
    <div className="flex flex-col items-center justify-center ">
      <div className="mb-6 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white dark:text-black text-center">
        ScrollX UI
      </div>
      <div className="text-lg sm:text-xl md:text-2xl text-white dark:text-black font-light tracking-wide opacity-80 max-w-[280px] sm:max-w-md text-center break-words">
        Join us today and start creating amazing experiences
      </div>
      <div className="mt-4 w-16 h-0.5 bg-white/50"></div>
      <button
        onClick={triggerExit}
        className="mt-8 px-6 py-2 border border-white/30 dark:border-black/30 text-white dark:text-black hover:bg-white/10 dark:hover:bg-black/10 rounded-full transition-all duration-300 text-sm tracking-wide"
      >
        Click to continue
      </button>
    </div>
  );

  const [transitionEnded, setTransitionEnded] = React.useState(false);

  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm  md:max-w-3xl">
        <div
          className={cn("flex flex-col gap-6 overflow-hidden ", className)}
          {...props}
        >
          <Transition
            intro={introContent}
            introDuration={3}
            transitionDuration={1.2}
            type="slide"
            direction="right"
            className="bg-neutral-900 dark:bg-white rounded-xl"
            autoExit={false}
            onFinished={() => setTransitionEnded(true)}
          >
            <Card className="overflow-hidden p-0 border-0 backdrop-blur-sm">
              <CardContent className="grid p-0 md:grid-cols-2 bg-[hsla(240,4%,16%,1)]  dark:bg-white">
                <div className="p-6 md:p-8 relative">
                  <div className="flex flex-col gap-6 relative z-10">
                    <div className="flex flex-col items-center text-center">
                      <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 bg-clip-text text-transparent whitespace-nowrap">
                        Create your account
                      </h1>

                      <p className="text-muted-foreground text-balance mt-1">
                        Enter your email to sign up.
                      </p>
                    </div>

                    <div className="grid gap-4">
                      <div className="space-y-2">
                        <Label
                          htmlFor="email"
                          className="text-sm dark:text-black text-white font-medium"
                        >
                          Email
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="s@example.com"
                          required
                          className="h-12 border-gray-200 focus:border-purple-500 focus:ring-purple-500/20 transition-all duration-200"
                        />
                      </div>
                      <div className="space-y-4">
                        <div className="space-y-1">
                          <Label
                            htmlFor="password"
                            className="text-sm dark:text-black text-white font-medium"
                          >
                            Password
                          </Label>
                          <Input
                            id="password"
                            type="password"
                            required
                            className="h-12 border-gray-200 focus:border-purple-500 focus:ring-purple-500/20 transition-all duration-200"
                          />
                          <p className="text-xs text-gray-400 dark:text-gray-600">
                            Must be at least 8 characters long.
                          </p>
                        </div>

                        <div className="space-y-1">
                          <Label
                            htmlFor="confirmPassword"
                            className="text-sm dark:text-black text-white font-medium"
                          >
                            Confirm Password
                          </Label>
                          <Input
                            id="confirmPassword"
                            type="password"
                            required
                            className="h-12 border-gray-200 focus:border-purple-500 focus:ring-purple-500/20 transition-all duration-200"
                          />
                          <p className="text-xs text-gray-400 dark:text-gray-600">
                            Please confirm your password.
                          </p>
                        </div>
                      </div>
                    </div>

                    <Button
                      type="submit"
                      className="w-full h-12 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5"
                    >
                      Create Account
                    </Button>

                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t border-gray-200" />
                      </div>
                      <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-white dark:bg-black dark:text-gray-200 px-3 text-gray-500 font-medium">
                          Or continue with
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                      <Button
                        variant="outline"
                        type="button"
                        className="h-12 border-gray-200 hover:border-gray-300 hover:bg-gray-200 dark:hover:bg-neutral-800 transition-all duration-200 hover:shadow-md"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          className="w-5 h-5"
                        >
                          <path
                            d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"
                            fill="currentColor"
                          />
                        </svg>
                        <span className="sr-only">Signup with Apple</span>
                      </Button>
                      <Button
                        variant="outline"
                        type="button"
                        className="h-12 border-gray-200 hover:border-gray-300 hover:bg-gray-200 dark:hover:bg-neutral-800 transition-all duration-200 hover:shadow-md"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          className="w-5 h-5"
                        >
                          <path
                            d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                            fill="currentColor"
                          />
                        </svg>
                        <span className="sr-only">Signup with Google</span>
                      </Button>
                      <Button
                        variant="outline"
                        type="button"
                        className="h-12 border-gray-200 hover:border-gray-300 hover:bg-gray-200 dark:hover:bg-neutral-800 transition-all duration-200 hover:shadow-md"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="48"
                          height="48"
                          viewBox="0 0 21 21"
                        >
                          <g
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                          >
                            <path
                              strokeDasharray="32"
                              strokeDashoffset="32"
                              d="M12 4c1.67 0 2.61 0.4 3 0.5c0.53 -0.43 1.94 -1.5 3.5 -1.5c0.34 1 0.29 2.22 0 3c0.75 1 1 2 1 3.5c0 2.19 -0.48 3.58 -1.5 4.5c-1.02 0.92 -2.11 1.37 -3.5 1.5c0.65 0.54 0.5 1.87 0.5 2.5c0 0.73 0 3 0 3M12 4c-1.67 0 -2.61 0.4 -3 0.5c-0.53 -0.43 -1.94 -1.5 -3.5 -1.5c-0.34 1 -0.29 2.22 0 3c-0.75 1 -1 2 -1 3.5c0 2.19 0.48 3.58 1.5 4.5c1.02 0.92 2.11 1.37 3.5 1.5c-0.65 0.54 -0.5 1.87 -0.5 2.5c0 0.73 0 3 0 3"
                            >
                              <animate
                                fill="freeze"
                                attributeName="stroke-dashoffset"
                                dur="0.7s"
                                values="32;0"
                              />
                            </path>
                            <path
                              strokeDasharray="10"
                              strokeDashoffset="10"
                              d="M9 19c-1.41 0 -2.84 -0.56 -3.69 -1.19c-0.84 -0.63 -1.09 -1.66 -2.31 -2.31"
                            >
                              <animate
                                fill="freeze"
                                attributeName="stroke-dashoffset"
                                begin="0.8s"
                                dur="0.2s"
                                values="10;0"
                              />
                            </path>
                          </g>
                        </svg>
                        <span className="sr-only">Signup with Github</span>
                      </Button>
                    </div>

                    <div className="text-center text-sm dark:text-gray-600 text-gray-400">
                      Already have an account?{" "}
                      <a
                        href="#"
                        className="text-purple-600 hover:text-purple-700 underline underline-offset-4 transition-colors"
                      >
                        Sign in
                      </a>
                    </div>
                  </div>
                </div>

                <div className="relative hidden md:flex overflow-hidden w-full h-full">
                  <img
                    src="https://images.unsplash.com/photo-1636928332666-5b92cd14a46c?q=80&w=1920&auto=format&fit=crop&ixlib=rb-4.0.3"
                    alt="Background"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
              </CardContent>
            </Card>
          </Transition>

          {transitionEnded && (
            <div className="w-full max-w-sm md:max-w-3xl mx-auto px-4 sm:px-6">
              <motion.div
                className="text-muted-foreground text-center text-xs sm:text-sm text-balance break-words"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                By clicking continue, you agree to our{" "}
                <a
                  href="#"
                  className="text-purple-600 hover:text-purple-700 underline underline-offset-4 transition-colors"
                >
                  Terms of Service
                </a>{" "}
                and{" "}
                <a
                  href="#"
                  className="text-purple-600 hover:text-purple-700 underline underline-offset-4 transition-colors"
                >
                  Privacy Policy
                </a>
                .
              </motion.div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
