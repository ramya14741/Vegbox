import { Inject, Injectable } from '@nestjs/common';
import slugify from 'slugify';
import { Product } from '../product/product.entity';
import { RateMaster } from './rate-master.entity';

@Injectable()
export class RateMasterService {
    constructor(@Inject('RATEMASTER_REPOSITORY')
    private rateMasterRepository:typeof RateMaster)
    {}

    async addRateMater(rateMaster):Promise<RateMaster>{
        try{
            return await this.rateMasterRepository.create(rateMaster);
        }
        catch(e){
            throw e;
        }

    }

    async updateRateMaster(rateMaster, rateMastereId):Promise<RateMaster>{
        let res;
        try{
            await this.rateMasterRepository.update({
                productId:rateMaster.productId,
                buyRate:rateMaster.buyRate,
                sellMarginPer:rateMaster.sellMarginPer,
                sellRate:rateMaster.sellRate
            },{where:{
                rateMasterId:rateMastereId
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

}
