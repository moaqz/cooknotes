import { FileSystemService } from "./file-system";

export interface IImageService {
  getImageUrl(name: string): Promise<string>
  saveImage(name: string, file: File): Promise<void>
}

export class ImageService implements IImageService {
  private readonly BASE_DIR = "images";

  constructor(
    private readonly _filesystem: FileSystemService
  ) { }

  public async getImageUrl(name: string): Promise<string> {
    return this._filesystem.getPublicUrl(`${this.BASE_DIR}/${name}`);
  }

  public async saveImage(name: string, file: File): Promise<void> {
    await this._filesystem.createDirectory(`${this.BASE_DIR}/${name}`);

    const content = await this.getAsByteArray(file);
    return this._filesystem.writeFile(
      await this._filesystem.localFilePath(`${this.BASE_DIR}/${name}`),
      content
    );
  }

  private async getAsByteArray(file: File) {
    const buffer = await file.arrayBuffer();
    return new Uint8Array(buffer);
  }
}
