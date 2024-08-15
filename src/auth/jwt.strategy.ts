import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from "./auth.service";
const path = require('path')
const dotenv = require('dotenv').config({ path: path.resolve(__dirname, '../dotenv') })
@Injectable()
export class FirebaseAuthSuperAdminStrategy extends PassportStrategy(Strategy,'firebase-jwt-superadmin') {
  constructor(private authService:AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey:"techbrainvegbox",
      ignoreExpiration: false,
    });
  }

  async validate(payload:any):Promise<any>{
    let user;
    const { email, password } = payload;
    await this.authService.validateSuperDeliveryAdmin(email, password).then(res=>{
        user =res;
    })
    if(!user){
        throw new UnauthorizedException();
    }
    return user;
}
}

@Injectable()
export class FirebaseAuthWarehouseAdminStrategy extends PassportStrategy(Strategy,'firebase-jwt-warehouseadmin') {
  constructor(private authService:AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey:"techbrainvegbox",
      ignoreExpiration: false,
    });
  }

  async validate(payload:any):Promise<any>{
    let user;
    const { email, password } = payload;
    await this.authService.validateSuperDeliveryAdmin(email, password).then(res=>{
        user =res;
    })
    if(!user){
        throw new UnauthorizedException();
    }
    return user;
}
}


@Injectable()
export class FirebaseAuthDeliveryAdminStrategy extends PassportStrategy(Strategy,'firebase-jwt-deliveryadmin') {
  constructor(private authService:AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey:"techbrainvegbox",
      ignoreExpiration: false,
    });
  }

  async validate(payload:any):Promise<any>{
    let user;
    const { email, password } = payload;
    await this.authService.validateSuperDeliveryAdmin(email, password).then(res=>{
        user =res;
    })
    if(!user){
        throw new UnauthorizedException();
    }
    return user;
}
  
  
}



@Injectable()
export class FirebaseAuthSuperWarehouseAdminStrategy extends PassportStrategy(Strategy,'firebase-jwt-superwarehouseadmin') {
  constructor(private authService:AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey:"techbrainvegbox",
      ignoreExpiration: false,
    });
  }

  async validate(payload:any):Promise<any>{
    let user;
    const { email, password } = payload;
    await this.authService.validateSuperDeliveryAdmin(email, password).then(res=>{
        user =res;
    })
    if(!user){
        throw new UnauthorizedException();
    }
    return user;
}
  
}

@Injectable()
export class FirebaseAuthSuperDeliveryAdminStrategy extends PassportStrategy(Strategy,'firebase-jwt-superdeliveryadmin') {
  constructor(private authService:AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey:"techbrainvegbox",
      ignoreExpiration: false,
    });
  }

  async validate(payload:any):Promise<any>{
    let user;
    const { email, password } = payload;
    await this.authService.validateSuperDeliveryAdmin(email, password).then(res=>{
        user =res;
    })
    if(!user){
        throw new UnauthorizedException();
    }
    return user;
}
  
}