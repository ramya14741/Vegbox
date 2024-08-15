import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Strategy, ExtractJwt } from 'passport-firebase-jwt';
import { auth } from 'firebase-admin';
import { AuthService } from './auth.service';
const path = require('path')
const dotenv = require('dotenv').config({ path: path.resolve(__dirname, '../dotenv') })

@Injectable()
export class FirebaseAuthStrategy extends PassportStrategy(Strategy,'firebase-jwt') {
  constructor(private authService:AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(token: string): Promise<any> {
    try {
      const user = await auth().verifyIdToken(token);
      return user; // This user object will be available in the request
    } catch (e) {
      throw new UnauthorizedException();
    }
  }
}



@Injectable()
export class AdminAuthGuard extends PassportStrategy(Strategy,'admin'){
  constructor(private authService:AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey:dotenv.secret,
    });
  }
async validate(payload: any):Promise<any>{
    let user;
    await this.authService.validateAdmin(payload.email, payload.password).then(res=>{
        user =res;
    })
    if(!user){
        throw new UnauthorizedException();
    }
    return user;
}
}


// @Injectable()
// export class VegAdminStrategy extends PassportStrategy(Strategy,'veg-admin'){
//   constructor(private authService:AuthService) {
//     super();
//   }
//   async validate(payload:any):Promise<any>{
//     let user;
//     console.log('test');
//     await this.authService.validateAdmin(payload.email, payload.password).then(res=>{
//         user =res;
//     })
//     if(!user){
//         throw new UnauthorizedException();
//     }
//     return user;
// }
//}