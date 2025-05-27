import { RecipeEntries } from "~/types";
import { FileSystemService } from "./file-system";
import { toKebabCase, toSentenceCase } from "~/lib/strings";

export interface IRecipesService {
  list(): Promise<RecipeEntries>
  getRecipePath(name: string): string;
}

export class RecipesService implements IRecipesService {
  private readonly BASE_DIR = "recipes";

  constructor(
    private readonly _filesystem: FileSystemService
  ) {}

  public async list(): Promise<RecipeEntries> {
    const entries = await this._filesystem.readDir(this.BASE_DIR);
    const recipes: RecipeEntries = [];

    for (const entry of entries) {
      if (!entry.name.endsWith(".json")) {
        continue;
      }

      const identifier = entry.name.split(".")[0];
      recipes.push({
        id: identifier,
        name: toSentenceCase(identifier),
      });
    }

    return recipes;
  }

  public getRecipePath(name: string): string {
    return `${this.BASE_DIR}/${toKebabCase(name)}.json`;
  }
}
