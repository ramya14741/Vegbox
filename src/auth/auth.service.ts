import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
var CryptoJS = require("crypto-js");
@Injectable()
export class AuthService {
    constructor( 
    @Inject(forwardRef(() => JwtService))
    private jwtService: JwtService,
    private userService: UserService
    ) {}

    async validateAdmin(email, password): Promise<any> {
        try {
            let user;
            await this.userService.findUserByEmail(email).then(res => {
                user = res;
            })
            if (user && user[0].role != 'customer') {
                const savedDecrypt = CryptoJS.AES.decrypt(user[0].password, process.env.cipher).toString(CryptoJS.enc.Utf8);
                const loginDecrypt = CryptoJS.AES.decrypt(password, process.env.cipher).toString(CryptoJS.enc.Utf8);
                if (user && savedDecrypt == loginDecrypt) {
                    return user[0];
                }
            }
            return user[0]
        }
        catch (e) {
            throw e;
        }
    }


    async validateSuperAdmin(email, password): Promise<any> {
        try {
            let user;
            await this.userService.findUserByEmail(email).then(res => {
                user = res;
            })
            if (user && user[0].role != 'SA') {
                const savedDecrypt = CryptoJS.AES.decrypt(user[0].password, process.env.cipher).toString(CryptoJS.enc.Utf8);
                const loginDecrypt = CryptoJS.AES.decrypt(password, process.env.cipher).toString(CryptoJS.enc.Utf8);
                if (user && savedDecrypt == loginDecrypt) {
                    return user[0];
                }
            }
            return user[0]
        }
        catch (e) {
            throw e;
        }
    }


    async validateWarehouseAdmin(email, password): Promise<any> {
        try {
            let user;
            await this.userService.findUserByEmail(email).then(res => {
                user = res;
            })
            if (user && user[0].role != 'WA') {
                const savedDecrypt = CryptoJS.AES.decrypt(user[0].password, process.env.cipher).toString(CryptoJS.enc.Utf8);
                const loginDecrypt = CryptoJS.AES.decrypt(password, process.env.cipher).toString(CryptoJS.enc.Utf8);
                if (user && savedDecrypt == loginDecrypt) {
                    return user[0];
                }
            }
            return user[0]
        }
        catch (e) {
            throw e;
        }
    }

    async validateDeliveryAdmin(email, password): Promise<any> {
        try {
            let user;
            await this.userService.findUserByEmail(email).then(res => {
                user = res;
            })
            if (user && user.role[0] != 'DA') {
                const savedDecrypt = CryptoJS.AES.decrypt(user[0].password, process.env.cipher).toString(CryptoJS.enc.Utf8);
                const loginDecrypt = CryptoJS.AES.decrypt(password, process.env.cipher).toString(CryptoJS.enc.Utf8);
                if (user && savedDecrypt == loginDecrypt) {
                    return user[0];
                }
            }
            return user[0]
        }
        catch (e) {
            throw e;
        }
    }


    async validateSuperWarehouseAdmin(email, password): Promise<any> {
        try {
            let user;
            await this.userService.findUserByEmail(email).then(res => {
                user = res;
            })
            if (user && (user[0].role == 'SA' || user[0].role == 'WA')) {
                const savedDecrypt = CryptoJS.AES.decrypt(user[0].password, process.env.cipher).toString(CryptoJS.enc.Utf8);
                const loginDecrypt = CryptoJS.AES.decrypt(password, process.env.cipher).toString(CryptoJS.enc.Utf8);
                if (user && savedDecrypt == loginDecrypt) {
                    return user[0];
                }
            }
            return user[0]
        }
        catch (e) {
            throw e;
        }
    }

    async validateSuperDeliveryAdmin(email, password): Promise<any> {
        try {
            let user;
            await this.userService.findUserByEmail(email).then(res => {
                user = res;
            })
            if (user && (user[0].role == 'SA' || user[0].role == 'DA')) {
                const savedDecrypt = CryptoJS.AES.decrypt(user[0].password, process.env.cipher).toString(CryptoJS.enc.Utf8);
                const loginDecrypt = CryptoJS.AES.decrypt(password, process.env.cipher).toString(CryptoJS.enc.Utf8);
                if (user && savedDecrypt == loginDecrypt) {
                    return user[0];
                }
            }
            return user[0]
        }
        catch (e) {
            throw e;
        }
    }

    async adminLogin(user) {
        try{
           // let jwt;
            const payload = { email: user.body.email, password: user.body.password };
            const jwt = await this.jwtService.sign(payload, { expiresIn: '90d' , secret:"techbrainvegbox"});
            const userData = await this.userService.findUserByEmail(user.body.email)
            const res = { jwt:jwt,role:userData[0].role}
            return res;
        }
        catch(e){
            throw e
        }
       
    }
}
