import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { User } from './user.entity';
import { databaseConfig } from '../database/database.providers';
import { Sequelize } from 'sequelize-typescript';
import { Op, QueryTypes } from 'sequelize';
import { userDto } from './user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
   constructor(@Inject('USER_REPOSITORY')
   private userRepository: typeof User,
   @Inject(forwardRef(() => JwtService))
   private jwtService: JwtService,
   ) {}

    async findUserByEmail(email) : Promise<any>{
        try {
            const sequelize = new Sequelize(databaseConfig);
            const sqlQuery = `SELECT * FROM vegbox.User WHERE 
                Useremail = :email;`
            let results = await sequelize.query(sqlQuery,
                {
                    replacements: { email:email },
                    type: QueryTypes.SELECT
                }
            );
            sequelize.close();
            return results;
        }
        catch (e) {
            throw e;
        }
    }

    async createUser(user): Promise<User> {
        try {
            const payload = {
                Useremail: user.body.Useremail,
                firebaseuserid: user.body.firebaseuserid,
                userid:  user.body.firebaseuserid,
                username: user.body.username ? user.body.username : user.body.Useremail.split("@")[0],
                role: user.body.role,
                mobileNumber:user.body.mobileNumber
            }
            const res = await this.userRepository.create(payload);

            return res;
        }
        catch (e) {
            throw e;
        }
    }


    async createAdmin(user): Promise<User> {
        try {
            const payload = {
                Useremail: user.body.email,
                firebaseuserid: user.body.firebaseuserid,
                password: user.body.password,
                userid:user.body.email,
                username: user.body.username ? user.body.username : user.body.userName.split("@")[0],
                role: user.body.role,
                mobileNumber:user.body.mobileNumber
            }
            const res = await this.userRepository.create(payload);

            return res;
        }
        catch (e) {
            throw e;
        }
    }

    async adminLogin(user) {
        let jwt;
        const payload = { email: user.email, password: user.password };
        jwt = await this.jwtService.sign(payload);
        return jwt;
    }
}
