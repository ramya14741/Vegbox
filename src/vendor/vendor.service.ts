import { Inject, Injectable } from '@nestjs/common';
import { Vendor } from './vendor.entity';
import { Op } from 'sequelize';
import { couponDto } from 'src/coupoun/coupon.dto';
import { Coupon } from 'src/coupoun/coupon.entity';
import { vendorDto } from './vendor.dto';

@Injectable()
export class VendorService {
    constructor(@Inject('VENDOR_REPOSITORY')
    private vendorRepository:typeof Vendor){}
    async getVendor(idVendor):Promise<Vendor[]>{
        try{
            let res;
            await this.vendorRepository.findAll({
                where:{
                   [Op.and]:{vendorId:idVendor, active:'Y'} 
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

    async getvendorbyId(id):Promise<Vendor>{
        try{
            let res;
            await this.vendorRepository.findAll({
                where:{
                    [Op.and]:{vendorId:id, active:'Y'} 
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

async addVendor(Vendor):Promise<Vendor>{
    let res;
    try{
        return await this.vendorRepository.create(Vendor)
    }
    catch(e){
        throw e;
    }
}
async updateVendor(Vendor:vendorDto,vendorId:number):Promise<Vendor>{
    let res;
    try{
        await this.vendorRepository.update(
               {vendorName:Vendor.vendorName,
                contactPersonName:Vendor.contactPersonName,
                contactEmail:Vendor.contactEmail,
                contactMobile:Vendor.contactMobile,
                address:Vendor.address,
                city:Vendor.city,
                state:Vendor.state,
                zip:Vendor.zip,
                country:Vendor.country,
                businessName:Vendor.businessName,
                businessRegistrationNumber:Vendor.businessRegistrationNumber,
                TAXIdorVatId:Vendor.TAXIdorVatId,
                bankName:Vendor.bankName,
                accountHolderName:Vendor.accountHolderName,
                accountNumber:Vendor.accountNumber,
                IFSCCodeorRoutingNumber:Vendor.IFSCCodeorRoutingNumber,
                paymentTerms:Vendor.paymentTerms,
                currency:Vendor.currency
                },
            {where:{
                vendorId:vendorId
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

async deleteVendorbyId(vendorId:number):Promise<any>{
    let res;
    try{
        const res =  await this.vendorRepository.update({
         active:'N'
         },{
             where:{
                vendorId:vendorId
             }
         })

         return res;
     }
     catch(e){
         throw e;
     }
}

async getAllVendor():Promise<Vendor[]>{
    try{
        let res;
    await this.vendorRepository.findAll(
           { where:{
               [Op.and]:{active:'Y'} 
            }}
        )
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
}
