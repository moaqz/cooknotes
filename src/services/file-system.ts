import { convertFileSrc } from "@tauri-apps/api/core";
import { dirname, join, appLocalDataDir, downloadDir } from "@tauri-apps/api/path";
import {
  BaseDirectory,
  readTextFile,
  readDir,
  remove,
  exists,
  mkdir,
  writeTextFile,
  rename,
  writeFile
} from "@tauri-apps/plugin-fs";

export type DeserializeFn<T> = (raw: string) => T;

export type SerializeFn<T> = (data: T) => string;

export type FileSystemEntry = {
  path: string;
  name: string;
  depth: number;
};

export interface FileSystemService {
  readFile<T = string>(
    path: string,
    deserialize?: DeserializeFn<T>
  ): Promise<T>;
  readDir(path: string, recursive?: boolean): Promise<FileSystemEntry[]>
  writeFile<T>(
    path: string,
    data: T,
    serialize?: SerializeFn<T>
  ): Promise<void>
  renameFile(oldPath: string, newPath: string): Promise<void>
  createDirectory(path: string): Promise<void>
  deleteFile(path: string): Promise<void>
  localFilePath(path: string): Promise<string>
  getPublicUrl(path: string): Promise<string>
  getDownloadDirectory(): Promise<string>
}

export class TauriFileSystemService implements FileSystemService {
  public async readFile<T>(path: string, deserialize?: DeserializeFn<T>): Promise<T> {
    const content = await readTextFile(path, {
      baseDir: BaseDirectory.AppLocalData,
    });

    if (deserialize) {
      return deserialize(content);
    }

    return JSON.parse(content);
  }

  public async readDir(path: string, recursive = false): Promise<FileSystemEntry[]> {
    const result: FileSystemEntry[] = [];

    const walk = async (dir: string, depth = 0) => {
      const entries = await readDir(dir, {
        baseDir: BaseDirectory.AppLocalData,
      });

      for (const entry of entries) {
        const fullPath = await join(dir, entry.name);

        if (entry.isFile) {
          result.push({
            name: entry.name,
            depth,
            path: fullPath,
          });

          continue;
        }

        if (recursive && entry.isDirectory) {
          await walk(fullPath, depth + 1);
        }
      }
    };

    await walk(path);
    return result;
  }

  public async deleteFile(path: string): Promise<void> {
    return remove(path, {
      baseDir: BaseDirectory.AppLocalData
    });
  }

  public async createDirectory(path: string): Promise<void> {
    const dir = await dirname(path);

    if (!await exists(dir, { baseDir: BaseDirectory.AppLocalData, })) {
      await mkdir(dir, {
        baseDir: BaseDirectory.AppLocalData,
        recursive: true,
      });
    };
  }

  public async writeFile<T>(path: string, data: T, serialize?: SerializeFn<T>): Promise<void> {
    await this.createDirectory(path);

    if (data instanceof Uint8Array) {
      return writeFile(path, data);
    }

    let _data: string;
    if (serialize) {
      _data = serialize(data);
    } else {
      _data = JSON.stringify(data);
    }

    return writeTextFile(path, _data, {
      baseDir: BaseDirectory.AppLocalData,
    });
  }

  public async renameFile(oldPath: string, newPath: string): Promise<void> {
    await this.createDirectory(newPath);

    return rename(oldPath, newPath, {
      newPathBaseDir: BaseDirectory.AppLocalData,
      oldPathBaseDir: BaseDirectory.AppLocalData
    });
  }

  public async localFilePath(path: string): Promise<string> {
    const base = await appLocalDataDir();
    return join(base, path);
  }

  public async getPublicUrl(path: string): Promise<string> {
    const absolutePath = await this.localFilePath(path);
    return convertFileSrc(absolutePath);
  }

  public getDownloadDirectory(): Promise<string> {
    return downloadDir();
  }
}
