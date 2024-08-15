import { Global, Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AdminAuthGuard, FirebaseAuthStrategy } from './firebase-auth.strategy';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { FirebaseModule } from 'nestjs-firebase';
import { UserService } from '../user/user.service';
import { UserProvider } from '../user/user.provider';
import { UserModule } from '../user/user.module';
import { VegAdminStrategy } from './local.strategy';
import { FirebaseAuthDeliveryAdminStrategy, FirebaseAuthSuperAdminStrategy, FirebaseAuthSuperDeliveryAdminStrategy, FirebaseAuthSuperWarehouseAdminStrategy, FirebaseAuthWarehouseAdminStrategy } from './jwt.strategy';
const dotenv =require('dotenv');
dotenv.config();

@Global()
@Module({
  imports:[UserModule, PassportModule,ConfigModule,
    JwtModule.register({
      secret:"techbrainvegbox",
      signOptions:{expiresIn:'90d'},
    })
  // JwtModule.registerAsync({
  //   imports: [ConfigModule,],
  //   useFactory: async (configService: ConfigService) => {
  //     return {
  //       secret:false,
  //       signOptions:{expiresIn:'90d'},
  //     };
  //   },
  //   inject: [ConfigService],
  // }),
  //  FirebaseModule.forRoot({
  //     googleApplicationCredential:"src/config/firebaseserviceAccountKey.json"
  //    // databaseURL: process.env.FirebaseDatabase,
  //   }),
],
  controllers: [AuthController],
  providers: [VegAdminStrategy,AdminAuthGuard,UserService,...UserProvider,JwtService,AuthService,FirebaseAuthStrategy,
    FirebaseAuthSuperAdminStrategy,FirebaseAuthWarehouseAdminStrategy,FirebaseAuthDeliveryAdminStrategy,FirebaseAuthSuperWarehouseAdminStrategy,FirebaseAuthSuperDeliveryAdminStrategy],
  exports: [PassportModule,AuthService],
})
export class AuthModule {}