import { useState } from "react";
import { CheckboxPro } from "@/components/ui/checkbox-pro";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { twMerge } from "tailwind-merge";
import { RefreshCw } from "lucide-react";
import { motion } from "framer-motion";

export default function LabelDemo() {
  const [key, setKey] = useState(0);
  const [rotate, setRotate] = useState(false);

  const handleReload = () => {
    setRotate(true);
    setKey((prev) => prev + 1);
    setTimeout(() => setRotate(false), 600);
  };

  return (
    <div
      key={key}
      className={twMerge(
        "relative flex min-h-[350px] w-full justify-center items-center not-prose rounded"
      )}
    >
      <div className="flex items-center space-x-2">
        <CheckboxPro id="terms" />
        <Label htmlFor="terms" direction="right">
          Accept terms and conditions
        </Label>
      </div>

      <Button
        onClick={handleReload}
        className="absolute right-4 top-4 p-2"
        aria-label="Reload demo"
        variant="outline"
      >
        <motion.div
          animate={{ rotate: rotate ? 360 : 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          <RefreshCw className="w-6 h-6" />
        </motion.div>
      </Button>
    </div>
  );
}
