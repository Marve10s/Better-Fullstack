import path from "node:path";
import { Config } from "@remotion/cli/config";

Config.setPublicDir(path.resolve(process.cwd(), "../apps/web/public"));
Config.setOverwriteOutput(true);
