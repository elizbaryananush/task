import { IsOptional, IsString, MinLength } from "class-validator";

export class UserDto {

    // @IsOptional()
    @IsString()
    username: string

    @IsOptional()
    @IsString()
    name: string

    @IsOptional()
    @MinLength(6, {
        message: 'password must be at least 6 characters long'
    })
    @IsString()
    password: string
}