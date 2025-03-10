import { convertFileSrc } from "@tauri-apps/api/core";
import { appLocalDataDir, join } from "@tauri-apps/api/path";
import { writeFile, BaseDirectory } from "@tauri-apps/plugin-fs";

export async function getLocalImage(imageSrc: string) {
  const localDir = await appLocalDataDir();
  const imagePath = await join(localDir, `/images/${imageSrc}`);
  return convertFileSrc(imagePath);
}

export async function copyImage(name: string, file: File) {
  const content = await file.bytes();
  return writeFile(`images/${name}`, content, {
    baseDir: BaseDirectory.AppLocalData,
  });
}
