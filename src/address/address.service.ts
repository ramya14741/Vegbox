import { Inject, Injectable } from '@nestjs/common';
import { Op, QueryTypes, Sequelize } from 'sequelize';
import { Address } from './address.entity';
import { AddressDto } from './address.dto';
import { threadId } from 'worker_threads';
import { databaseConfig } from '../database/database.providers';
import { Database } from '../database/database.interface';

@Injectable()
export class AddressService {
    constructor(@Inject('ADDRESS_REPOSITORY')
    private addressRepository:typeof Address){}

    async getAddress(userid):Promise<Address[]>{
        try{
            let res;
            await this.addressRepository.findAll({
                where:{
                    active:'Y',
                    userid:userid
                }
            })
            //.map(el=>el.get({plain:true}))
            .then(results=>{
                res= results;
            })
            if(res.length ==0){
                return null;
            }
            return res;
        }
        catch(e){
            throw e;
        }
    }

    async getAddressbyId(id):Promise<Address>{
        try{
            let res;
            await this.addressRepository.findAll({
                where:{
                    idAddress:id
                }
            })
            //.map(el=>el.get({plain:true}))
            .then(results=>{
                res= results;
            })
            if(res.length ==0){
                return null;
            }
            return res[0];
        }
        catch(e){
            throw e;
        }
    }

async addAddress(address):Promise<Address>{
    let res;
    try{
        return await this.addressRepository.create(address)
    }
    catch(e){
        throw e;
    }
}
async updateAddress(address:AddressDto,idAddress:number):Promise<Address>{
    let res;
    try{
        await this.addressRepository.update(
               {addressLine1:address.addressLine1,
                addressLine2:address.addressLine2,
                name:address.name,
                city:address.city,
                state:address.state,
                addressType:address.addressType,
                userid:address.userid,
                zip:address.zip,
                Customer_mobileNumber:address.Customer_mobileNumber,
                Customer_email:address.Customer_email
                },
            {where:{
              idAddress:idAddress
            },returning:true
        }).then(results=>{
            res = results;
        })
        return res;
        }
    catch(e){
        throw e;
    }
}

async deleteAddress(idAddress:number):Promise<any>{
    let res;
    try{
        const res =  await this.addressRepository.update({
         active:'N'
         },{
             where:{
                idAddress:idAddress
             }
         })

         return res;
     }
     catch(e){
         throw e;
     }
}
}