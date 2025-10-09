import fs from "fs";
import path from "path";

const src = path.join(process.cwd(), "src/utils/service-worker.js");
const dest = path.join(process.cwd(), "public/service-worker.js");

fs.copyFileSync(src, dest);
console.log("✅ Service worker copied!");
