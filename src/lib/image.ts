import { convertFileSrc } from "@tauri-apps/api/core";
import { appLocalDataDir, join } from "@tauri-apps/api/path";
import { writeFile, BaseDirectory } from "@tauri-apps/plugin-fs";

export async function getLocalImage(imageSrc: string) {
  const localDir = await appLocalDataDir();
  const imagePath = await join(localDir, `/images/${imageSrc}`);
  return convertFileSrc(imagePath);
}

async function getAsByteArray(file: File) {
  const buffer = await file.arrayBuffer();
  return new Uint8Array(buffer);
}

export async function copyImage(name: string, file: File) {
  const content = await getAsByteArray(file);
  return writeFile(`images/${name}`, content, {
    baseDir: BaseDirectory.AppLocalData,
  });
}
