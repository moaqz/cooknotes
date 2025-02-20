import { BaseDirectory, readTextFile } from "@tauri-apps/plugin-fs";

export async function readJSONFile(path:string) {
  const data = await readTextFile(path, {
    baseDir: BaseDirectory.AppLocalData
  });

  return JSON.parse(data);
}
