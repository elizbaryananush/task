import { IsNotEmpty, IsString } from "class-validator";

export class ActsDto {
    @IsString()
    @IsNotEmpty()
    header: string;

    @IsString()
    @IsNotEmpty()
    description: string;
}
