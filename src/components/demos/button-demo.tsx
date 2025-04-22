import * as React from "react";
import { Button } from "@/components/ui/button";

export default function ButtonDemo() {
  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
        <Button>Default</Button>
        <Button variant="link">Link</Button>
        <Button variant="success">Success</Button>
      </div>
    </div>
  );
}
