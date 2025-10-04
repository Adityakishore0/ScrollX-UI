import fs from "fs";
import path from "path";

const rootRegistryPath = path.join(process.cwd(), "registry.json");
const publicRegistryDir = path.join(process.cwd(), "public", "registry");

if (!fs.existsSync(publicRegistryDir)) {
  fs.mkdirSync(publicRegistryDir, { recursive: true });
}

const indexRegistryPath = path.join(publicRegistryDir, "registry.json");
fs.copyFileSync(rootRegistryPath, indexRegistryPath);
