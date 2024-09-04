import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { ActsModule } from './acts/acts.module';
import { ConnectionModule } from './connection/connection.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    ConfigModule.forRoot(),
    ActsModule,
    ConnectionModule],
})
export class AppModule { }
