import { HashComparer } from "@/domain/forum/application/cryptography/hash-comparer";
import { HashGenerator } from "@/domain/forum/application/cryptography/hash-generator";
import {
  UploadParams,
  Uploader,
} from "@/domain/forum/application/storage/uploader";
import { randomUUID } from "crypto";

interface Upload {
  fileName: string;
  url: string;
}

export class FakeUploader implements Uploader {
  public uploads: Upload[] = [];

  async upload({ fileName }: UploadParams): Promise<{ url: string }> {
    const url = randomUUID();

    this.uploads.push({
      fileName,
      url,
    });

    return { url };
  }
}
