import { Inject, Injectable } from '@nestjs/common';
import { DeliveryPersonnel } from './delivery-personnel.entity';

@Injectable()
export class DeliveryPersonnelService {
    constructor(@Inject('DELIVERYPERSONNEL_REPOSITORY')
    private dpRepository:typeof DeliveryPersonnel)
    {}

    async addDeliveryPersonnel(dp):Promise<DeliveryPersonnel>{
        try{
            return await this.dpRepository.create(dp);
        }
        catch(e){
            throw e;
        }

    }

    async updateDeliveryPersonnel(dp, dpId):Promise<DeliveryPersonnel>{
        let res;
        try{
            await this.dpRepository.update({
                dpemail:dp.dpemail,
                dpmobileNumber:dp.dpmobileNumber,
                username:dp.username
            },{where:{
                dpId:dpId
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

    async getDeliveryPersonnelbyId(id):Promise<DeliveryPersonnel>{
        try{
            let res;
            await this.dpRepository.findAll({
                where:{
                    active:'Y',
                    dpId:id
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


    async deletedeliveryPersonnelbyId(id:number):Promise<any>{
        let res;
        try{
            const res =  await this.dpRepository.update({
             active:'N'
             },{
                 where:{
                    dpId:id
                 }
             })
    
             return res;
         }
         catch(e){
             throw e;
         }
    }
}
