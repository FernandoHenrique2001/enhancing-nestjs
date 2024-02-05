import { ConfigService } from "@nestjs/config";
import { EnvType } from "./env";
import { Injectable } from "@nestjs/common";

@Injectable()
export class EnvService {
  constructor(private configService: ConfigService<EnvType, true>) {}

  get<T extends keyof EnvType>(key: T) {
    return this.configService.get(key, { infer: true });
  }
}
