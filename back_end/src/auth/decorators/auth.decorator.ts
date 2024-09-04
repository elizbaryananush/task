import { UseGuards } from "@nestjs/common";
import { JwtAuthGuart } from "../guards/jwt.guard";

export const Auth = () => UseGuards(JwtAuthGuart)