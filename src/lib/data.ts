import { promises as fs } from "fs";
import path from "path";

export async function getLocalData<T>(fileName: string): Promise<T | null> {
  try {
    const filePath = path.join(process.cwd(), "public", "Main", fileName);
    const fileContents = await fs.readFile(filePath, "utf8");
    return JSON.parse(fileContents) as T;
  } catch (error) {
    console.error(`Error reading data from ${fileName}:`, error);
    return null;
  }
}
