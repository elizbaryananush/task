import { Module } from '@nestjs/common';
import { ActsService } from './acts.service';
import { ActsController } from './acts.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [ActsController],
  providers: [ActsService, PrismaService],
  exports: [ActsService]
})
export class ActsModule { }
