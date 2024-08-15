import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserProvider } from './user.provider';
import { ConfigModule } from '@nestjs/config';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from '../auth/auth.service';
import { AuthController } from '../auth/auth.controller';
import { AdminAuthGuard } from '../auth/firebase-auth.strategy';
import { VegAdminStrategy } from '../auth/local.strategy';
const path = require('path')
const dotenv = require('dotenv').config({ path: path.resolve(__dirname, '../dotenv') })

@Module({
  imports:[
    JwtModule.register({
      secret:"techbrainvegbox",
      signOptions:{expiresIn:'90d'},
    })
  ],
  controllers: [UserController,AuthController],
  providers: [UserService,...UserProvider, JwtService,AuthService,VegAdminStrategy]
})
export class UserModule {}
