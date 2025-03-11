import { BaseDirectory, readTextFile, writeTextFile, readDir, rename, remove } from "@tauri-apps/plugin-fs";
import { toKebabCase, toSentenceCase } from "./strings";
import { RecipeEntries } from "~/types";

export async function readJSONFile<T>(path:string) {
  const data = await readTextFile(path, {
    baseDir: BaseDirectory.AppLocalData
  });

  return JSON.parse(data) as T;
}

export async function writeJSONFile<T>(path: string, data: T) {
  const _data = typeof data === "string" ? data : JSON.stringify(data);
  return await writeTextFile(path, _data, {
    baseDir: BaseDirectory.AppLocalData,
  });
}

export async function listRecipes(path: string = "") {
  const entries = await readDir(path, {
    baseDir: BaseDirectory.AppLocalData
  });

  const recipeEntries: RecipeEntries = [];

  for (const entry of entries) {
    if (entry.isDirectory || entry.isSymlink) {
      continue;
    }

    if (!entry.name.endsWith(".json")) {
      continue;
    }

    const identifier = entry.name.split(".")[0];
    const fileName = toSentenceCase(identifier);
    recipeEntries.push({ id: identifier, name: fileName });
  }

  return recipeEntries;
}

export function deleteFile(path: string) {
  return remove(path, {
    baseDir: BaseDirectory.AppLocalData
  });
}

export function renameFile(oldPath: string, newPath: string) {
  return rename(oldPath, newPath, {
    newPathBaseDir: BaseDirectory.AppLocalData,
    oldPathBaseDir: BaseDirectory.AppLocalData
  });
}

export function getRecipePath(name: string): string {
  return `recipes/${toKebabCase(name)}.json`;
}
