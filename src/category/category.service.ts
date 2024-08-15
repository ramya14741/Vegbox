import { Inject, Injectable } from '@nestjs/common';
import { Category } from './category.entity';
import { Op, QueryTypes, Sequelize } from 'sequelize';
import slugify from 'slugify';

@Injectable()
export class CategoryService {
    constructor(@Inject('CATEGORY_REPOSITORY')
    private categoryRepository:typeof Category)
    {}
    async getCategories():Promise<Category[]>{
        let res;
        try{
            await this.categoryRepository.findAll(
                {
                    where:{
                        active:'Y'
                    }
                }
            )
            //.then(el=>
                //el.get({plain:true}))
                .then(results=>{
                    res = results;
                })
                return res;
        }
        catch(e){
            throw e;
        }
    }

    async addCategory(Category):Promise<Category>{
        try{
            Category.slugName = slugify(Category.categoryName);
            return await this.categoryRepository.create(Category);
        }
        catch(e){
            throw e;
        }

    }

    async updateCategory(category, idCategory):Promise<Category>{
        let res;
        try{
            await this.categoryRepository.update({
                categoryName:category.categoryName,
                slugName:slugify(category.categoryName)
            },{where:{
                categoryId:idCategory
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

    async deleteCategorybyId(idCategory):Promise<any>{
        try{
           const res =  await this.categoryRepository.update({
            active:'N'
            },{
                where:{
                    categoryId:idCategory
                }
            })

            return res;
        }
        catch(e){
            throw e;
        }
    }

    async getCategorybyId(id):Promise<Category[]>{
        try{
            let res;
            await this.categoryRepository.findAll({
                where:{
                    categoryId:id
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
}
