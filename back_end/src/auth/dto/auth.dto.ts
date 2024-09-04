import { IsOptional, IsString, MinLength } from "class-validator";

export class AuthDto {
    @IsString()
    username: string

    @IsString()
    @IsOptional()
    name?: string

    @MinLength(6, {
        message: 'password must be at least 6 characters long'
    })
    @IsString()
    password: string
}