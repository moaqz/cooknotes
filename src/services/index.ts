import { TauriFileSystemService } from "./file-system";
import { ImageService } from "./image";
import { RecipesService } from "./recipes";

export const fileSystemService = new TauriFileSystemService();
export const recipesService = new RecipesService(fileSystemService);
export const imageService = new ImageService(fileSystemService);
