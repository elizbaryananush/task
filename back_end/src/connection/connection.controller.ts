import { Controller, Delete, Get, HttpCode, Param, Post } from '@nestjs/common';
import { ConnectionService } from './connection.service';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { CurrentUser } from 'src/auth/decorators/user.decorator';

@Controller('connection')
export class ConnectionController {
  constructor(private readonly connectionService: ConnectionService) { }

  @HttpCode(200)
  @Auth()
  @Get('/followers')
  async getAllFollowers(@CurrentUser('id') id: string) {
    return this.connectionService.getAllFollowers(id)
  }

  @HttpCode(200)
  @Auth()
  @Get('/followings')
  async getAllFollowings(@CurrentUser('id') id: string) {
    return this.connectionService.getAllFollowings(id)
  }

  @HttpCode(200)
  @Auth()
  @Post(':id')
  async follow(@CurrentUser('id') id: string, @Param('id') followingId: string) {
    return this.connectionService.follow(id, followingId)
  }

  @HttpCode(200)
  @Auth()
  @Delete(':id')
  async unfollow(@CurrentUser('id') id: string, @Param('id') followingId: string) {
    return this.connectionService.unfollow(id, followingId)
  }
}
