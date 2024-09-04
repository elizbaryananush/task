import { Module } from '@nestjs/common';
import { ConnectionService } from './connection.service';
import { ConnectionController } from './connection.controller';
import { PrismaService } from 'src/prisma.service';
import { UserService } from 'src/user/user.service';

@Module({
  imports : [],
  controllers: [ConnectionController],
  providers: [ConnectionService , PrismaService, UserService],
})
export class ConnectionModule {}
