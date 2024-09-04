import { Body, Controller, Delete, Get, HttpCode, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { CurrentUser } from 'src/auth/decorators/user.decorator';
import { UserDto } from './dto/user.dto';

@Controller('user/profile')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @HttpCode(200)
  @Auth()
  @Get()
  async profile(@CurrentUser('id') id: string) {
    return this.userService.getProfile(id)
  }

  @HttpCode(200)
  @Auth()
  @Post()
  async findByUsername(@Body('username') username : string){
    return this.userService.getByUsername(username)
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Auth()
  @Put()
  async updateProfile(@CurrentUser('id') id: string, @Body() dto: UserDto) {
    return this.userService.update(id, dto)
  }

  @HttpCode(200)
  @Auth()
  @Delete()
  async deleteProfile(@CurrentUser('id') id: string) {
    return this.userService.delete(id)
  }
}
