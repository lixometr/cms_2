import { MulterField } from "@nestjs/platform-express/multer/interfaces/multer-options.interface";
import { IsInt, IsOptional, IsString } from "class-validator";

export class CreateImportDto {
    file: any;
}
