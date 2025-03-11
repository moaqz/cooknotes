import { BaseDirectory, readTextFile, readDir } from "@tauri-apps/plugin-fs";
import { toSentenceCase } from "./strings";
import { RecipeEntries } from "~/types";

export async function readJSONFile<T>(path:string) {
  const data = await readTextFile(path, {
    baseDir: BaseDirectory.AppLocalData
  });

  return JSON.parse(data) as T;
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
