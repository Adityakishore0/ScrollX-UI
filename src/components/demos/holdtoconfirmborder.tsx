"use client";

import { HoldToConfirm } from "@/components/ui/hold-toconfirm";
import { motion } from "framer-motion";

export default function HoldToConfirmBorder() {
  return (
    <div className="flex  items-center justify-center ">
      <div className="w-full max-w-md rounded-2xl border bg-card p-6 shadow-lg text-center space-y-4">
        <h2 className="text-xl font-semibold text-foreground">
          Confirm Payment
        </h2>
        <p className="text-sm text-muted-foreground">
          You are about to{" "}
          <span className="font-medium">buy the Pro subscription</span>
          for <span className="font-medium">$49.99</span>. Hold the button below
          to confirm. This purchase will be processed securely.
        </p>

        <HoldToConfirm
          className="border border-black dark:border-white"
          variant="outline"
          size="lg"
          animation="border"
          fillClassName="bg-green-600 dark:bg-green-500 text-white dark:text-black"
          confirmedClassName="text-white dark:text-black font-semibold"
          showProgressOnConfirm={true}
          confirmedChildren={
            <>
              <motion.svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                strokeWidth={2}
                stroke="currentColor"
                className="w-5 h-5 text-white dark:text-black"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{
                  delay: 0.6,
                  type: "spring",
                  stiffness: 300,
                  damping: 10,
                }}
              >
                <motion.path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{
                    duration: 0.6,
                    ease: "easeInOut",
                  }}
                />
              </motion.svg>
              <span className="ml-2">Payment Successful!</span>
            </>
          }
          resetAfter={3000}
        >
          Hold to Pay $49.99
        </HoldToConfirm>
      </div>
    </div>
  );
}
