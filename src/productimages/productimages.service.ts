import { Inject, Injectable } from '@nestjs/common';
import * as cloudinary from 'cloudinary';
import { Product } from '../product/product.entity';
import { ProductImages } from './productimages.entity';
// import { Express } from 'express';
// import { Multer } from 'express';

@Injectable()
export class ProductimagesService {
  constructor(@Inject('PRODUCTIMAGES_REPOSITORY')
    private productimageRepository:typeof ProductImages)
    {}
    async uploadImage(file) {
        try {
          const result = await cloudinary.v2.uploader.upload(file.path);
          return result;
        } catch (error) {
          throw new Error('Image upload failed');
        }
      }
    
      async getImage(publicId: string) {
        const imageUrl = cloudinary.v2.url(publicId);
        return imageUrl;
      }
    
      async deleteImage(publicId: string) {
        try {
          const result = await cloudinary.v2.uploader.destroy(publicId);
          if (result.result === 'ok') {
            return { message: 'Image deleted successfully' };
          }
        } catch (error) {
          throw new Error('Image not found or could not be deleted');
        }
      }

      async addProductImage(product):Promise<ProductImages>{
        try{
            return await this.productimageRepository.create(product);
        }
        catch(e){
            throw e;
        }

    }

    async getImagesbyProductId(id):Promise<ProductImages[]>{
      try{
          let res;
          await this.productimageRepository.findAll({
              where:{
                  productId:id
              }
          })
          //.map(el=>el.get({plain:true}))
          .then(results=>{
              res= results;
          })
          return res;
      }
      catch(e){
          throw e;
      }
  }

  async deleteImagebyPublicId(publicid):Promise<any>{
    try{
       const res =  await this.productimageRepository.update({
        active:'N'
        },{
            where:{
              publicId:publicid
            }
        })

        return res;
    }
    catch(e){
        throw e;
    }
}
    }
    
