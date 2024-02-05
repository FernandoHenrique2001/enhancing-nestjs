import { Uploader } from "@/domain/forum/application/storage/uploader";
import { Module } from "@nestjs/common";
import { TibeStorage } from "./storage";
import { EnvModule } from "../env/env.module";

@Module({
  imports: [EnvModule],
  providers: [{ provide: Uploader, useClass: TibeStorage }],
  exports: [Uploader],
})
export class StorageModule {}
