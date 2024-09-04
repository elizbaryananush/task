import { IsNotEmpty, IsString } from "class-validator";

export class ConnectionDto {
    @IsNotEmpty()
    @IsString()
    follower_Id:string    
    
    @IsNotEmpty()
    @IsString()
    following_Id:string
}