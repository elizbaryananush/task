import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { ActsService } from './acts.service';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { CurrentUser } from 'src/auth/decorators/user.decorator';
import { ActsDto } from './dto/acts.dto';

@Controller('acts')
export class ActsController {
  constructor(private readonly actsService: ActsService) { }

  @HttpCode(200)
  @Auth()
  @Get()
  async getAllTasks(@CurrentUser('id') user_id: string) {
    return this.actsService.getAllTasks(user_id)
  }

  @HttpCode(200)
  @Auth()
  @Get(':id')
  async getById(@Param('id') id: string) {
    return this.actsService.getById(id)
  }

  @HttpCode(200)
  @Auth()
  @Get('/useracts/:userId')
  async getByUserId(@Param(':userId') user_id: string) {
    return this.actsService.getByUserId(user_id)
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Auth()
  @Post()
  async create(@Body() dto: ActsDto, @CurrentUser('id') user_id: string) {
    return this.actsService.create(user_id, dto)
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Auth()
  @Put(':id')
  async update(@Body() dto: ActsDto, @CurrentUser('id') user_id: string, @Param('id') id: string) {
    return this.actsService.update(dto, id, user_id)
  }

  @HttpCode(200)
  @Auth()
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.actsService.delete(id)
  }
}
