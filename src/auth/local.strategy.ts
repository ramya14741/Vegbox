import { AuthService } from './auth.service';
const path = require('path')
//const dotenv = require('dotenv').config({ path: path.resolve(__dirname, '../dotenv') })
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { Injectable, UnauthorizedException } from '@nestjs/common';
const dotenv =require('dotenv');
dotenv.config();

@Injectable()
export class VegAdminStrategy extends PassportStrategy(Strategy,'veg-admin'){
    constructor(private authService: AuthService) {
        super({
          usernameField: 'email', // Assuming 'email' is the field for username
        });
    
        // Override the name of the strategy to be used later with @UseGuards
      //  this.name = 'veg-admin';
      }
  async validate(email:string, password:string):Promise<any>{
    
        let user;
        console.log('test');
        await this.authService.validateAdmin(email,password).then(res=>{
            user =res;
        })
        if(!user){
            return null;
        }
        return user;
    
    // catch(e)
    // {
    //     throw e
    // }
}
    
}