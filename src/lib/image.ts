import { convertFileSrc } from "@tauri-apps/api/core";
import { appLocalDataDir, join } from "@tauri-apps/api/path";

export async function getLocalImage(imageSrc: string) {
  const localDir = await appLocalDataDir();
  const imagePath = await join(localDir, `/images/${imageSrc}`);
  return convertFileSrc(imagePath);
}
