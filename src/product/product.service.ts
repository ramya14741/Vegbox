import { forwardRef,Inject, Injectable } from '@nestjs/common';
import slugify from 'slugify';
import { Product } from './product.entity';
import { databaseConfig } from '../database/database.providers';
import { Sequelize } from 'sequelize-typescript';
import { Op, QueryTypes } from 'sequelize';
import { Category } from '../category/category.entity';
import { PromotionService } from '../promotion/promotion.service';
import { StockService } from '../stock/stock.service';
import { Stock } from '../stock/stock.entity';

@Injectable()
export class ProductService {
    constructor(@Inject('PRODUCT_REPOSITORY')
    private productRepository: typeof Product,
    private promotionService: PromotionService,
   // @Inject(forwardRef(() => StockService))
        @Inject('CATEGORY_REPOSITORY')
        private categoryRepository: typeof Category) { }
        async getProducts() {
            try {
                
                const sequelize = new Sequelize(databaseConfig);
                const sqlQuery = `SELECT *
                    FROM vegbox.product p
                    LEFT JOIN vegbox.category c
                    on c.categoryId = p.categoryId`
                let results = await sequelize.query(sqlQuery,
                    {
                        replacements: {},
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

    async addProduct(product): Promise<Product> {
        try {
            product.slugName = slugify(product.productName);
            return await this.productRepository.create(product);
        }
        catch (e) {
            throw e;
        }

    }

    async updateProduct(product, idProduct): Promise<Product> {
        let res;
        try {
            await this.productRepository.update({
                productName: product.productName,
                slugName: slugify(product.productName),
                productTamilName: product.productTamilName,
                productAlternativeName: product.productAlternativeName,
                categoryId: product.categoryId,
                QtyTypeCode: product.QtyTypeCode,
                calcBasedRateMaster: product.calcBasedRateMaster,
                barCode: product.barCode
            }, {
                where: {
                    productId: idProduct
                }, returning: true
            }).then(results => {
                res = results;
            })
            return res;
        }
        catch (e) {
            throw e;
        }
    }

    async deleteProductbyId(idProduct): Promise<any> {
        try {
            const res = await this.productRepository.update({
                active: 'N'
            }, {
                where: {
                    productId: idProduct
                }
            })

            return res;
        }
        catch (e) {
            throw e;
        }
    }

    async getProductbyId(id) {
        try {
            const sequelize = new Sequelize(databaseConfig);
          const specialPromotionPrice = await this.calculateSpecialPromotionPrice(id);
          const specialDiscountPrice = specialPromotionPrice?.length === 1 ? specialPromotionPrice[0].discount : null;
            const sqlQuery = `SELECT
            p.productId,
            p.productName,
            p.productslugName,
            p.active,
            p.productTamilName,
            p.productAlternativeName,
            p.categoryId,
            p.QtyTypeCode,
            p.calcBasedRateMaster,
            p.barCode,
            p.createdAt,
            p.updatedAt,
            pi.productImageName,
            pi.imageId,
            pi.publicId,
            pi.url,
            pi.secureUrl,
            rm.ratecode,
            rm.rateMasterId,
            rm.buyRate,
            rm.sellMarginPer,
            CASE 
            WHEN p.calcBasedRateMaster = 'Y' THEN rm.sellRate 
            ELSE s.sellRate
        END AS sellRate,
            ${specialDiscountPrice !== null ? `((rm.sellRate) - ROUND(rm.sellRate * (${specialDiscountPrice} / 100), 2)) as specialdiscountprice` : `0 as specialdiscountprice` } ,
            c.categoryName,
            c.slugName,
            q.idQuantity,
            q.Name,
            q.Active,
            q.shortName,
            ROUND(AVG(r.rating), 1) AS rating
        FROM
            vegbox.product p
            LEFT JOIN vegbox.productimages pi ON p.productId = pi.productId
            LEFT JOIN vegbox.rating r ON p.productId = r.productId
            LEFT JOIN vegbox.ratemaster rm ON rm.productId = p.productId
            JOIN vegbox.category c ON c.categoryId = p.categoryId
            JOIN vegbox.quantity q ON q.QtyTypeCode = p.QtyTypeCode
            LEFT JOIN vegbox.stock s 
            on s.productId = p.productId
        WHERE
            p.productId = :id
        GROUP BY
            p.productId,
            p.productName,
            p.productslugName,
            p.active,
            p.productTamilName,
            p.productAlternativeName,
            p.categoryId,
            p.QtyTypeCode,
            p.calcBasedRateMaster,
            p.barCode,
            p.createdAt,
            p.updatedAt,
            pi.productImageName,
            pi.imageId,
            pi.publicId,
            pi.url,
            pi.secureUrl,
            rm.ratecode,
            rm.rateMasterId,
            rm.buyRate,
            rm.sellMarginPer,
            sellRate,
            c.categoryName,
            c.slugName,
            q.idQuantity,
            q.Name,
            q.Active,
            q.shortName;
        `
            let results = await sequelize.query(sqlQuery,
                {
                    replacements: { id: id },
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

    async findAllProductsbyPageNo(pageno) {
        try {

            let limit = 25
            let offset = 0 + (pageno - 1) * limit
            const sequelize = new Sequelize(databaseConfig);
            const sqlQuery = `SELECT CASE 
            WHEN p.calcBasedRateMaster = 'Y' THEN rm.sellRate 
            ELSE s.sellRate
        END AS sellRate, CASE 
            WHEN s.promotionId > 0 THEN rm.sellRate - ROUND(rm.sellRate * (prom.discount / 100), 2) 
            ELSE 0 
        END AS specialdiscountprice,
    p.*,pi.url,pi.secureUrl
                    FROM vegbox.product p
                    LEFT JOIN vegbox.productimages pi
                    on p.productId = pi.productid
                    LEFT JOIN vegbox.rating r
                    on r.productId = p.productId
                   left JOIN vegbox.ratemaster rm
                    on rm.productId = p.productId
                    join vegbox.category c
                    on c.categoryId = p.categoryId
                    join vegbox.quantity q
                    on q.QtyTypeCode = p.QtyTypeCode
                   LEFT join vegbox.stock s
                    on s.productId = p.productId
                    LEFT JOIN vegbox.promotiondata prom
                    on prom.promotionId = s.promotionId
                LIMIT :LIMIT OFFSET :OFFSET`
            let results = await sequelize.query(sqlQuery,
                {
                    replacements: { LIMIT: limit, OFFSET: offset },
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

    async getNewArrivalProductsbyPageNo(pageno) {
        try {

            let limit = 25
            let offset = 0 + (pageno - 1) * limit
            const sequelize = new Sequelize(databaseConfig);
            const sqlQuery = `SELECT CASE 
            WHEN p.calcBasedRateMaster = 'Y' THEN rm.sellRate 
            ELSE s.sellRate
        END AS sellRate,
            CASE 
           WHEN s.promotionId > 0 THEN rm.sellRate - ROUND(rm.sellRate * (prom.discount / 100), 2) 
           ELSE 0 
       END AS specialdiscountprice,
       p.*,pi.url,pi.secureUrl
               FROM vegbox.product p
               LEFT JOIN vegbox.productimages pi
               on p.productId = pi.productid
               LEFT JOIN vegbox.rating r
               on r.productId = p.productId
              LEFT JOIN vegbox.ratemaster rm
               on rm.productId = p.productId
               join vegbox.category c
               on c.categoryId = p.categoryId
               join vegbox.quantity q
               on q.QtyTypeCode = p.QtyTypeCode
               LEFT JOIN vegbox.stock s
               on s.productId = p.productId
               LEFT JOIN vegbox.promotiondata prom
               on prom.promotionId = s.promotionId
               order by p.createdAt desc
                LIMIT :LIMIT OFFSET :OFFSET`
            let results = await sequelize.query(sqlQuery,
                {
                    replacements: { LIMIT: limit, OFFSET: offset },
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

    async getTotalProductCount() {
        try {
            const sequelize = new Sequelize(databaseConfig);
            const sqlQuery = `SELECT count(distinct productId) as totalProductCount FROM vegbox.product;`
            let results = await sequelize.query(sqlQuery,
                {
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

    async getProductbyCategory(idCategory, pageno) {

        try {

            let limit = 25
            let offset = 0 + (pageno - 1) * limit
            const sequelize = new Sequelize(databaseConfig);
            const sqlQuery = `SELECT
            p.productId,
            p.productName,
            p.productslugName,
            p.active,
            p.productTamilName,
            p.productAlternativeName,
            p.categoryId,
            p.QtyTypeCode,
            p.calcBasedRateMaster,
            p.barCode,
            p.createdAt,
            p.updatedAt,
            pi.productImageName,
            pi.imageId,
            pi.publicId,
            pi.url,
            pi.secureUrl,
            rm.ratecode,
            rm.rateMasterId,
            rm.buyRate,
            rm.sellMarginPer,
            CASE 
            WHEN p.calcBasedRateMaster = 'Y' THEN rm.sellRate 
            ELSE s.sellRate
        END AS sellRate,
            CASE 
            WHEN s.promotionId > 0 THEN rm.sellRate - ROUND(rm.sellRate * (prom.discount / 100), 2) 
            ELSE 0 
        END AS specialdiscountprice,
            c.categoryName,
            c.slugName,
            q.idQuantity,
            q.Name,
            q.Active,
            q.shortName,
            ROUND(AVG(r.rating), 1) AS rating
        FROM
            vegbox.product p
            LEFT JOIN vegbox.productimages pi ON p.productId = pi.productId
            LEFT JOIN vegbox.rating r ON p.productId = r.productId
            LEFT JOIN vegbox.ratemaster rm ON rm.productId = p.productId
            JOIN vegbox.category c ON c.categoryId = p.categoryId
            JOIN vegbox.quantity q ON q.QtyTypeCode = p.QtyTypeCode
           LEFT JOIN vegbox.stock s
            on s.productId = p.productId
            LEFT JOIN vegbox.promotiondata prom
            on prom.promotionId = s.promotionId
            WHERE c.categoryId = :idCategory
        GROUP BY
            p.productId,
            p.productName,
            p.productslugName,
            p.active,
            p.productTamilName,
            p.productAlternativeName,
            p.categoryId,
            p.QtyTypeCode,
            p.calcBasedRateMaster,
            p.barCode,
            p.createdAt,
            p.updatedAt,
            pi.productImageName,
            pi.imageId,
            pi.publicId,
            pi.url,
            pi.secureUrl,
            rm.ratecode,
            rm.rateMasterId,
            rm.buyRate,
            rm.sellMarginPer,
            sellRate,
            c.categoryName,
            c.slugName,
            q.idQuantity,
            specialdiscountprice,
            q.Name,
            q.Active,
            q.shortName
            LIMIT :LIMIT OFFSET :OFFSET`
            let results = await sequelize.query(sqlQuery,
                {
                    replacements: { LIMIT: limit, OFFSET: offset, idCategory: idCategory },
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




    async getAdminProductData(pageno) {
        try {

            let limit = 25
            let offset = 0 + (pageno - 1) * limit
            const sequelize = new Sequelize(databaseConfig);
            const sqlQuery = `SELECT CASE 
            WHEN p.calcBasedRateMaster = 'Y' THEN rm.sellRate 
            ELSE s.sellRate
        END AS sellRate,
            CASE 
           WHEN s.promotionId > 0 THEN rm.sellRate - ROUND(rm.sellRate * (prom.discount / 100), 2) 
           ELSE 0 
       END AS specialdiscountprice,
       p.*,pi.url,pi.secureUrl
                FROM vegbox.product p
                LEFT JOIN vegbox.productimages pi
                on p.productId = pi.productid
                LEFT JOIN vegbox.rating r
                on r.productId = p.productId
                LEFT JOIN vegbox.ratemaster rm
                on rm.productId = p.productId
                join vegbox.category c
                on c.categoryId = p.categoryId
                join vegbox.quantity q
                on q.QtyTypeCode = p.QtyTypeCode
                LEFT JOIN vegbox.stock s
                on s.productId = p.productId
                LEFT JOIN vegbox.promotiondata prom
                on prom.promotionId = s.promotionId
                LIMIT :LIMIT OFFSET :OFFSET`
            let results = await sequelize.query(sqlQuery,
                {
                    replacements: { LIMIT: limit, OFFSET: offset },
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

    async filterprSearchCriteria(productFilter, pageno) {
        try {
            const sequelize = new Sequelize(databaseConfig);
            if (productFilter.searchText) {
                let limit = 25
                let offset = 0 + (pageno - 1) * limit
                const searchText = productFilter.searchText
                const sqlQuery = `SELECT
                p.productId,
                p.productName,
                p.productslugName,
                p.active,
                p.productTamilName,
                p.productAlternativeName,
                p.categoryId,
                p.QtyTypeCode,
                p.calcBasedRateMaster,
                p.barCode,
                p.createdAt,
                p.updatedAt,
                pi.productImageName,
                pi.imageId,
                pi.publicId,
                pi.url,
                pi.secureUrl,
                rm.ratecode,
                rm.rateMasterId,
                rm.buyRate,
                rm.sellMarginPer,
                CASE 
            WHEN p.calcBasedRateMaster = 'Y' THEN rm.sellRate 
            ELSE s.sellRate
        END AS sellRate,
                CASE 
           WHEN s.promotionId > 0 THEN rm.sellRate - ROUND(rm.sellRate * (prom.discount / 100), 2) 
           ELSE 0 
       END AS specialdiscountprice,
                c.categoryName,
                c.slugName,
                q.idQuantity,
                q.Name,
                q.Active,
                q.shortName,
                ROUND(AVG(r.rating), 1) AS rating
            FROM
                vegbox.product p
                LEFT JOIN vegbox.productimages pi ON p.productId = pi.productId
                LEFT JOIN vegbox.rating r ON p.productId = r.productId
                LEFT JOIN vegbox.ratemaster rm ON rm.productId = p.productId
                JOIN vegbox.category c ON c.categoryId = p.categoryId
                JOIN vegbox.quantity q ON q.QtyTypeCode = p.QtyTypeCode
                LEFT JOIN vegbox.stock s
                on s.productId = p.productId
                LEFT JOIN vegbox.promotiondata prom
                on prom.promotionId = s.promotionId
    where p.productName LIKE '%${searchText}%'
            GROUP BY
                p.productId,
                p.productName,
                p.productslugName,
                p.active,
                p.productTamilName,
                p.productAlternativeName,
                p.categoryId,
                p.QtyTypeCode,
                p.calcBasedRateMaster,
                p.barCode,
                p.createdAt,
                p.updatedAt,
                pi.productImageName,
                pi.imageId,
                pi.publicId,
                pi.url,
                pi.secureUrl,
                rm.ratecode,
                rm.rateMasterId,
                rm.buyRate,
                rm.sellMarginPer,
                sellRate,
                c.categoryName,
                c.slugName,
                specialdiscountprice,
                q.idQuantity,
                q.Name,
                q.Active,
                q.shortName
    LIMIT :LIMIT OFFSET :OFFSET`
                let results = await sequelize.query(sqlQuery,
                    {
                        replacements: { searchText: searchText, LIMIT: limit, OFFSET: offset },
                        type: QueryTypes.SELECT
                    }
                );
                sequelize.close();
                return results;
            }

            if (productFilter.price) {
                const startRange = productFilter.price[0];
                const endRange = productFilter.price[1]
                const sqlQuery = `SELECT
                p.productId,
                p.productName,
                p.productslugName,
                p.active,
                p.productTamilName,
                p.productAlternativeName,
                p.categoryId,
                p.QtyTypeCode,
                p.calcBasedRateMaster,
                p.barCode,
                p.createdAt,
                p.updatedAt,
                pi.productImageName,
                pi.imageId,
                pi.publicId,
                pi.url,
                pi.secureUrl,
                rm.ratecode,
                rm.rateMasterId,
                rm.buyRate,
                rm.sellMarginPer,
                CASE 
            WHEN p.calcBasedRateMaster = 'Y' THEN rm.sellRate 
            ELSE s.sellRate
        END AS sellRate,
                c.categoryName,
                c.slugName,
                q.idQuantity,
                q.Name,
                q.Active,
                q.shortName,
                ROUND(AVG(r.rating), 1) AS rating
            FROM
                vegbox.product p
                LEFT JOIN vegbox.productimages pi ON p.productId = pi.productId
                LEFT JOIN vegbox.rating r ON p.productId = r.productId
                LEFT JOIN vegbox.ratemaster rm ON rm.productId = p.productId
                JOIN vegbox.category c ON c.categoryId = p.categoryId
                JOIN vegbox.quantity q ON q.QtyTypeCode = p.QtyTypeCode
                LEFT JOIN vegbox.stock s
                on s.productId = p.productId 
where rm.sellRate between :startRange and :endRange
            GROUP BY
                p.productId,
                p.productName,
                p.productslugName,
                p.active,
                p.productTamilName,
                p.productAlternativeName,
                p.categoryId,
                p.QtyTypeCode,
                p.calcBasedRateMaster,
                p.barCode,
                p.createdAt,
                p.updatedAt,
                pi.productImageName,
                pi.imageId,
                pi.publicId,
                pi.url,
                pi.secureUrl,
                rm.ratecode,
                rm.rateMasterId,
                rm.buyRate,
                rm.sellMarginPer,
                sellRate,
                c.categoryName,
                c.slugName,
                q.idQuantity,
                q.Name,
                q.Active,
                q.shortName`
                let results = await sequelize.query(sqlQuery,
                    {
                        replacements: { startRange: startRange, endRange: endRange },
                        type: QueryTypes.SELECT
                    }
                );
                sequelize.close();
                return results;
            }
            if (productFilter.category) {

                const category = productFilter.category; // Replace with your array of values

                // Generate placeholders like $1, $2, $3, ...
                const placeholders = category.map((value, index) => `${index + 1}`).join(', ');
                const sqlQuery = ` CASE 
                WHEN p.calcBasedRateMaster = 'Y' THEN rm.sellRate 
                ELSE s.sellRate
            END AS sellRate,
                CASE 
               WHEN s.promotionId > 0 THEN rm.sellRate - ROUND(rm.sellRate * (prom.discount / 100), 2) 
               ELSE 0 
           END AS specialdiscountprice,
           p.*,pi.url,pi.secureUrl
FROM vegbox.product p
LEFT JOIN vegbox.productimages pi
on p.productId = pi.productid
LEFT JOIN vegbox.rating r
on r.productId = p.productId
LEFT JOIN vegbox.ratemaster rm
on rm.productId = p.productId
join vegbox.category c
on c.categoryId = p.categoryId
join vegbox.quantity q
on q.QtyTypeCode = p.QtyTypeCode
LEFT JOIN vegbox.stock s
on s.productId = p.productId
LEFT JOIN vegbox.promotiondata prom
on prom.promotionId = s.promotionId
WHERE c.categoryId IN (${placeholders})`;
                let results = await sequelize.query(sqlQuery,
                    {
                        replacements: { placeholders: placeholders },
                        type: QueryTypes.SELECT
                    }
                );
                sequelize.close();
                return results;

            }

            if (productFilter.rating) {

                const productId = productFilter.rating[0];
                const rating = productFilter.rating[1];

                const sqlQuery = `
                SELECT
                count(r.rateId) AS greaterthanorequalratingcount
                p.productId,
                p.productName,
                p.productslugName,
                p.active,
                p.productTamilName,
                p.productAlternativeName,
                p.categoryId,
                p.QtyTypeCode,
                p.calcBasedRateMaster,
                p.barCode,
                p.createdAt,
                p.updatedAt,
                pi.productImageName,
                pi.imageId,
                pi.publicId,
                pi.url,
                pi.secureUrl,
                rm.ratecode,
                rm.rateMasterId,
                rm.buyRate,
                rm.sellMarginPer,
                CASE 
            WHEN p.calcBasedRateMaster = 'Y' THEN rm.sellRate 
            ELSE s.sellRate
        END AS sellRate,
                CASE 
                WHEN s.promotionId > 0 THEN rm.sellRate - ROUND(rm.sellRate * (prom.discount / 100), 2) 
                ELSE 0 
            END AS specialdiscountprice,
                c.categoryName,
                c.slugName,
                q.idQuantity,
                q.Name,
                q.Active,
                q.shortName,
                ROUND(AVG(r.rating), 1) AS rating
            FROM
                vegbox.product p
                LEFT JOIN vegbox.productimages pi ON p.productId = pi.productId
                LEFT JOIN vegbox.rating r ON p.productId = r.productId
                JOIN vegbox.ratemaster rm ON rm.productId = p.productId
                JOIN vegbox.category c ON c.categoryId = p.categoryId
                JOIN vegbox.quantity q ON q.QtyTypeCode = p.QtyTypeCode
                LEFT JOIN vegbox.stock s
                on s.productId = p.productId
                LEFT JOIN vegbox.promotiondata prom
                on prom.promotionId = s.promotionId
                WHERE ROUND(AVG(r.rating), 1) >=:rating
            GROUP BY
                p.productId,
                p.productName,
                p.productslugName,
                p.active,
                p.productTamilName,
                p.productAlternativeName,
                p.categoryId,
                p.QtyTypeCode,
                p.calcBasedRateMaster,
                p.barCode,
                p.createdAt,
                p.updatedAt,
                pi.productImageName,
                pi.imageId,
                pi.publicId,
                pi.url,
                pi.secureUrl,
                rm.ratecode,
                rm.rateMasterId,
                rm.buyRate,
                rm.sellMarginPer,
                sellRate,
                specialdiscountprice,
                c.categoryName,
                c.slugName,
                q.idQuantity,
                q.Name,
                q.Active,
                q.shortName
`
                let results = await sequelize.query(sqlQuery,
                    {
                        replacements: { productId: productId, rating: rating },
                        type: QueryTypes.SELECT
                    }
                );
                sequelize.close();
                return results;

            }

        }
        catch (e) {
            throw e;
        }
    }


    async calculateEachProductPrice(priceData) {
        try {

            const quantity = Number(priceData.unitchoosenbyUser.match(/(\d+(\.\d+)?)/)[0]);
            const quantitycode = priceData.quantitycode;
            const productId = priceData.productId;
            const specialPromotionPrice = await this.calculateSpecialPromotionPrice(productId);
            const specialDiscountPrice = specialPromotionPrice?.length === 1 ? specialPromotionPrice[0].discount : null;
            const sequelize = new Sequelize(databaseConfig);
            const sqlQuery = `SELECT
            p.productId,
            CASE
                WHEN (p.QtyTypeCode IN ('1','3') AND p.calcBasedRateMaster='Y' AND ${specialDiscountPrice == null})THEN ((((rm.sellRate) / 1000)) * :quantity)
                WHEN (p.QtyTypeCode IN ('1','3') AND p.calcBasedRateMaster='Y' AND ${specialDiscountPrice !== null})THEN ((((((rm.sellRate) - ROUND(rm.sellRate * (${specialDiscountPrice} / 100), 2))) / 1000)) * :quantity)
                WHEN (p.QtyTypeCode = '2' AND p.calcBasedRateMaster='Y' AND ${specialDiscountPrice == null}) THEN ((rm.sellRate) * :quantity)
                WHEN (p.QtyTypeCode = '2' AND p.calcBasedRateMaster='Y' AND ${specialDiscountPrice !== null}) THEN (((rm.sellRate) - ROUND(rm.sellRate * (${specialDiscountPrice} / 100), 2)) * :quantity)
                WHEN (p.QtyTypeCode IN ('1','3') AND p.calcBasedRateMaster='N' AND ${specialDiscountPrice == null})THEN ((((s.sellRate) / 1000)) * :quantity)
                WHEN (p.QtyTypeCode IN ('1','3') AND p.calcBasedRateMaster='N' AND ${specialDiscountPrice !== null})THEN ((((((s.sellRate) - ROUND(s.sellRate * (${specialDiscountPrice} / 100), 2))) / 1000)) * :quantity)
                WHEN (p.QtyTypeCode = '2' AND p.calcBasedRateMaster='N' AND ${specialDiscountPrice == null}) THEN ((s.sellRate) * :quantity)
                WHEN (p.QtyTypeCode = '2' AND p.calcBasedRateMaster='N' AND ${specialDiscountPrice !== null}) THEN (((s.sellRate) - ROUND(s.sellRate * (${specialDiscountPrice} / 100), 2)) * :quantity)
            END as price_basedon_unitchoosen
        FROM vegbox.product p
        LEFT JOIN vegbox.ratemaster rm ON rm.productId = p.productId
        LEFT JOIN vegbox.stock s on 
        s.productId = p.productId
        WHERE p.productId = :productId;
        `

            let results = await sequelize.query(sqlQuery,
                {
                    replacements: { productId: productId, quantity: quantity, quantitycode: quantitycode },
                    type: QueryTypes.SELECT
                }
            );
            sequelize.close();
            return results[0];
        }
        catch (e) {
            throw e;
        }
    }

    async filterproductbytextandPrice(productFilter, pageno) {
        try {
            let limit = 25;
            let offset = 0 + (pageno - 1) * limit;
            const searchText = productFilter.searchText;
            const priceRanges = productFilter.price || []; // Get price ranges array
            const sequelize = new Sequelize(databaseConfig);
        
            let whereConditions = ''; // To store the WHERE conditions for price ranges
        
            // Constructing WHERE conditions for each price range dynamically
            priceRanges.forEach((range, index) => {
              const startRange = range.start || 0; // Default start range to 0 if not provided
              const endRange = range.end || Number.MAX_SAFE_INTEGER; // Default end range to max value if not provided
              
              whereConditions += ` (rm.sellRate BETWEEN :startRange${index} AND :endRange${index})`;
              
              if (index !== priceRanges.length - 1) {
                whereConditions += ' OR'; // Add OR between conditions except for the last one
              }
            });
        
            const sqlQuery = `
            SELECT
            p.productId,
            p.productName,
            p.productslugName,
            p.active,
            p.productTamilName,
            p.productAlternativeName,
            p.categoryId,
            p.QtyTypeCode,
            p.calcBasedRateMaster,
            p.barCode,
            p.createdAt,
            p.updatedAt,
            pi.productImageName,
            pi.imageId,
            pi.publicId,
            pi.url,
            pi.secureUrl,
            rm.ratecode,
            rm.rateMasterId,
            rm.buyRate,
            rm.sellMarginPer,
            CASE 
            WHEN p.calcBasedRateMaster = 'Y' THEN rm.sellRate 
            ELSE s.sellRate
        END AS sellRate,
            CASE 
            WHEN s.promotionId > 0 THEN rm.sellRate - ROUND(rm.sellRate * (prom.discount / 100), 2) 
            ELSE 0 
        END AS specialdiscountprice,
            c.categoryName,
            c.slugName,
            q.idQuantity,
            q.Name,
            q.Active,
            q.shortName,
            ROUND(AVG(r.rating), 1) AS rating
        FROM
            vegbox.product p
            LEFT JOIN vegbox.productimages pi ON p.productId = pi.productId
            LEFT JOIN vegbox.rating r ON p.productId = r.productId
            LEFT JOIN vegbox.ratemaster rm ON rm.productId = p.productId
            JOIN vegbox.category c ON c.categoryId = p.categoryId
            JOIN vegbox.quantity q ON q.QtyTypeCode = p.QtyTypeCode
            LEFT JOIN vegbox.stock s
            on s.productId = p.productId
            LEFT JOIN vegbox.promotiondata prom
            on prom.promotionId = s.promotionId
            WHERE p.productName LIKE :searchText
            AND (${whereConditions})
        GROUP BY
            p.productId,
            p.productName,
            p.productslugName,
            p.active,
            p.productTamilName,
            p.productAlternativeName,
            p.categoryId,
            p.QtyTypeCode,
            p.calcBasedRateMaster,
            p.barCode,
            p.createdAt,
            p.updatedAt,
            pi.productImageName,
            pi.imageId,
            pi.publicId,
            pi.url,
            pi.secureUrl,
            rm.ratecode,
            rm.rateMasterId,
            rm.buyRate,
            rm.sellMarginPer,
            sellRate,
            c.categoryName,
            c.slugName,
            specialdiscountprice,
            q.idQuantity,
            q.Name,
            q.Active,
            q.shortName
              LIMIT :limit OFFSET :offset;
            `;
        
            const replacements = {
              searchText: `%${searchText}%`,
              limit: limit,
              offset: offset
            };
        
            // Add replacements for each price range
            priceRanges.forEach((range, index) => {
              replacements[`startRange${index}`] = range.start || 0;
              replacements[`endRange${index}`] = range.end || Number.MAX_SAFE_INTEGER;
            });
        
            let results = await sequelize.query(sqlQuery, {
              replacements: replacements,
              type: QueryTypes.SELECT
            });
        
            sequelize.close();
            return results;
          } catch (e) {
            throw e;
          }
    }


    async filterproductbytextPriceRating(productFilter, pageno) {
        try {

            let limit = 25;
            let offset = 0 + (pageno - 1) * limit;
            const searchText = productFilter.searchText;
            const priceRanges = productFilter.price || []; // Get price ranges array
            const sequelize = new Sequelize(databaseConfig);
            const rating = productFilter.rating;
        
            let whereConditions = ''; // To store the WHERE conditions for price ranges
        
            // Constructing WHERE conditions for each price range dynamically
            priceRanges.forEach((range, index) => {
              const startRange = range.start || 0; // Default start range to 0 if not provided
              const endRange = range.end || Number.MAX_SAFE_INTEGER; // Default end range to max value if not provided
              
              whereConditions += ` (rm.sellRate BETWEEN :startRange${index} AND :endRange${index})`;
              
              if (index !== priceRanges.length - 1) {
                whereConditions += ' OR'; // Add OR between conditions except for the last one
              }
            });

            const sqlQuery = `
            SELECT
            p.productId,
            p.productName,
            p.productslugName,
            p.active,
            p.productTamilName,
            p.productAlternativeName,
            p.categoryId,
            p.QtyTypeCode,
            p.calcBasedRateMaster,
            p.barCode,
            p.createdAt,
            p.updatedAt,
            pi.productImageName,
            pi.imageId,
            pi.publicId,
            pi.url,
            pi.secureUrl,
            rm.ratecode,
            rm.rateMasterId,
            CASE 
            WHEN p.calcBasedRateMaster = 'Y' THEN rm.sellRate 
            ELSE s.sellRate
        END AS sellRate,
            rm.sellMarginPer,
          
            CASE 
            WHEN s.promotionId > 0 THEN rm.sellRate - ROUND(rm.sellRate * (prom.discount / 100), 2) 
            ELSE 0 
        END AS specialdiscountprice,
            c.categoryName,
            c.slugName,
            q.idQuantity,
            q.Name,
            q.Active,
            q.shortName,
            ROUND(AVG(r.rating), 1) AS rating
        FROM
            vegbox.product p
            LEFT JOIN vegbox.productimages pi ON p.productId = pi.productId
            LEFT JOIN vegbox.rating r ON p.productId = r.productId
            LEFT JOIN vegbox.ratemaster rm ON rm.productId = p.productId
            JOIN vegbox.category c ON c.categoryId = p.categoryId
            JOIN vegbox.quantity q ON q.QtyTypeCode = p.QtyTypeCode
            LEFT JOIN vegbox.stock s
            on s.productId = p.productId
            LEFT JOIN vegbox.promotiondata prom
            on prom.promotionId = s.promotionId
            WHERE p.productName LIKE :searchText
            AND (${whereConditions})
        GROUP BY
            p.productId,
            p.productName,
            p.productslugName,
            p.active,
            p.productTamilName,
            p.productAlternativeName,
            p.categoryId,
            p.QtyTypeCode,
            p.calcBasedRateMaster,
            p.barCode,
            p.createdAt,
            p.updatedAt,
            pi.productImageName,
            pi.imageId,
            pi.publicId,
            pi.url,
            pi.secureUrl,
            rm.ratecode,
            rm.rateMasterId,
            rm.buyRate,
            rm.sellMarginPer,
            sellRate,
            c.categoryName,
            c.slugName,
            q.idQuantity,
            specialdiscountprice,
            q.Name,
            q.Active,
            q.shortName
            HAVING
        rating >= :rating
              LIMIT :limit OFFSET :offset;
            `;

            const replacements = {
                searchText: `%${searchText}%`,
                limit: limit,
                offset: offset,
                rating:rating
              };
          
              // Add replacements for each price range
              priceRanges.forEach((range, index) => {
                replacements[`startRange${index}`] = range.start || 0;
                replacements[`endRange${index}`] = range.end || Number.MAX_SAFE_INTEGER;
              });
          
              let results = await sequelize.query(sqlQuery, {
                replacements: replacements,
                type: QueryTypes.SELECT
              });
          
              sequelize.close();
              return results;
            } catch (e) {
              throw e;
            }
    }

    private processRatings(results) {
        const processedResults = results.map((result) => {
          const productId = result.productId;
          const ratings = results
            .filter((res) => res.productId === productId && res.rating)
            .map((res) => res.rating);
          
          return {
            ...result,
            rating: ratings.length ? ratings : null,
          };
        });
    
        return processedResults;
      }

      async filterproductbyCategoryandPrice(productFilter, pageno) {
        try {
            let limit = 25;
            let offset = 0 + (pageno - 1) * limit;
            const categoryId = productFilter.categoryId;
            const priceRanges = productFilter.price || []; // Get price ranges array
            const sequelize = new Sequelize(databaseConfig);
        
            let whereConditions = ''; // To store the WHERE conditions for price ranges
        
            // Constructing WHERE conditions for each price range dynamically
            priceRanges.forEach((range, index) => {
              const startRange = range.start || 0; // Default start range to 0 if not provided
              const endRange = range.end || Number.MAX_SAFE_INTEGER; // Default end range to max value if not provided
              
              whereConditions += ` (rm.sellRate BETWEEN :startRange${index} AND :endRange${index})`;
              
              if (index !== priceRanges.length - 1) {
                whereConditions += ' OR'; // Add OR between conditions except for the last one
              }
            });
        
            const sqlQuery = `
            SELECT
            p.productId,
            p.productName,
            p.productslugName,
            p.active,
            p.productTamilName,
            p.productAlternativeName,
            p.categoryId,
            p.QtyTypeCode,
            p.calcBasedRateMaster,
            p.barCode,
            p.createdAt,
            p.updatedAt,
            pi.productImageName,
            pi.imageId,
            pi.publicId,
            pi.url,
            pi.secureUrl,
            rm.ratecode,
            rm.rateMasterId,
            rm.buyRate,
            rm.sellMarginPer,
            CASE 
            WHEN p.calcBasedRateMaster = 'Y' THEN rm.sellRate 
            ELSE s.sellRate
        END AS sellRate,
            CASE 
            WHEN s.promotionId > 0 THEN rm.sellRate - ROUND(rm.sellRate * (prom.discount / 100), 2) 
            ELSE 0 
        END AS specialdiscountprice,
            c.categoryName,
            c.slugName,
            q.idQuantity,
            q.Name,
            q.Active,
            q.shortName,
            ROUND(AVG(r.rating), 1) AS rating
        FROM
            vegbox.product p
            LEFT JOIN vegbox.productimages pi ON p.productId = pi.productId
            LEFT JOIN vegbox.rating r ON p.productId = r.productId
            LEFT JOIN vegbox.ratemaster rm ON rm.productId = p.productId
            JOIN vegbox.category c ON c.categoryId = p.categoryId
            JOIN vegbox.quantity q ON q.QtyTypeCode = p.QtyTypeCode
            LEFT JOIN vegbox.stock s
            on s.productId = p.productId
            LEFT JOIN vegbox.promotiondata prom
            on prom.promotionId = s.promotionId
            WHERE c.categoryId = :categoryId
            AND (${whereConditions})
        GROUP BY
            p.productId,
            p.productName,
            p.productslugName,
            p.active,
            p.productTamilName,
            p.productAlternativeName,
            p.categoryId,
            p.QtyTypeCode,
            p.calcBasedRateMaster,
            p.barCode,
            p.createdAt,
            p.updatedAt,
            pi.productImageName,
            pi.imageId,
            pi.publicId,
            pi.url,
            pi.secureUrl,
            rm.ratecode,
            rm.rateMasterId,
            rm.buyRate,
            rm.sellMarginPer,
            sellRate,
            c.categoryName,
            c.slugName,
            q.idQuantity,
            specialdiscountprice,
            q.Name,
            q.Active,
            q.shortName
              LIMIT :limit OFFSET :offset;
            `;
        
            const replacements = {
                categoryId: categoryId,
              limit: limit,
              offset: offset
            };
        
            // Add replacements for each price range
            priceRanges.forEach((range, index) => {
              replacements[`startRange${index}`] = range.start || 0;
              replacements[`endRange${index}`] = range.end || Number.MAX_SAFE_INTEGER;
            });
        
            let results = await sequelize.query(sqlQuery, {
              replacements: replacements,
              type: QueryTypes.SELECT
            });
        
            sequelize.close();
            return results;
          } catch (e) {
            throw e;
          }
    }


    async filterproductbyCategoryPriceRating(productFilter, pageno) {
        try {

            let limit = 25;
            let offset = 0 + (pageno - 1) * limit;
            const categoryId = productFilter.categoryId;
            const priceRanges = productFilter.price || []; // Get price ranges array
            const sequelize = new Sequelize(databaseConfig);
            const rating = productFilter.rating;
        
            let whereConditions = ''; // To store the WHERE conditions for price ranges
        
            // Constructing WHERE conditions for each price range dynamically
            priceRanges.forEach((range, index) => {
              const startRange = range.start || 0; // Default start range to 0 if not provided
              const endRange = range.end || Number.MAX_SAFE_INTEGER; // Default end range to max value if not provided
              
              whereConditions += ` (rm.sellRate BETWEEN :startRange${index} AND :endRange${index})`;
              
              if (index !== priceRanges.length - 1) {
                whereConditions += ' OR'; // Add OR between conditions except for the last one
              }
            });

            const sqlQuery = `
            SELECT
            p.productId,
            p.productName,
            p.productslugName,
            p.active,
            p.productTamilName,
            p.productAlternativeName,
            p.categoryId,
            p.QtyTypeCode,
            p.calcBasedRateMaster,
            p.barCode,
            p.createdAt,
            p.updatedAt,
            pi.productImageName,
            pi.imageId,
            pi.publicId,
            pi.url,
            pi.secureUrl,
            rm.ratecode,
            rm.rateMasterId,
            rm.buyRate,
            rm.sellMarginPer,
            CASE 
            WHEN p.calcBasedRateMaster = 'Y' THEN rm.sellRate 
            ELSE s.sellRate
        END AS sellRate,
            CASE 
            WHEN s.promotionId > 0 THEN rm.sellRate - ROUND(rm.sellRate * (prom.discount / 100), 2) 
            ELSE 0 
        END AS specialdiscountprice,
            c.categoryName,
            c.slugName,
            q.idQuantity,
            q.Name,
            q.Active,
            q.shortName,
            ROUND(AVG(r.rating), 1) AS rating
        FROM
            vegbox.product p
            LEFT JOIN vegbox.productimages pi ON p.productId = pi.productId
            LEFT JOIN vegbox.rating r ON p.productId = r.productId
            LEFT JOIN vegbox.ratemaster rm ON rm.productId = p.productId
            JOIN vegbox.category c ON c.categoryId = p.categoryId
            JOIN vegbox.quantity q ON q.QtyTypeCode = p.QtyTypeCode
            LEFT JOIN vegbox.stock s
            on s.productId = p.productId
            LEFT JOIN vegbox.promotiondata prom
            on prom.promotionId = s.promotionId
            WHERE c.categoryId = :categoryId
            AND (${whereConditions})
        GROUP BY
            p.productId,
            p.productName,
            p.productslugName,
            p.active,
            p.productTamilName,
            p.productAlternativeName,
            p.categoryId,
            p.QtyTypeCode,
            p.calcBasedRateMaster,
            p.barCode,
            p.createdAt,
            p.updatedAt,
            pi.productImageName,
            pi.imageId,
            pi.publicId,
            pi.url,
            pi.secureUrl,
            rm.ratecode,
            rm.rateMasterId,
            rm.buyRate,
            rm.sellMarginPer,
            sellRate,
            c.categoryName,
            c.slugName,
            q.idQuantity,
            specialdiscountprice,
            q.Name,
            q.Active,
            q.shortName
            HAVING
        rating >= :rating
              LIMIT :limit OFFSET :offset;
            `;

            const replacements = {
                categoryId: categoryId,
                limit: limit,
                offset: offset,
                rating:rating
              };
          
              // Add replacements for each price range
              priceRanges.forEach((range, index) => {
                replacements[`startRange${index}`] = range.start || 0;
                replacements[`endRange${index}`] = range.end || Number.MAX_SAFE_INTEGER;
              });
          
              let results = await sequelize.query(sqlQuery, {
                replacements: replacements,
                type: QueryTypes.SELECT
              });
          
              sequelize.close();
              return results;
            } catch (e) {
              throw e;
            }
    }

    async activateProductbyId(idProduct): Promise<any> {
        try {
            const res = await this.productRepository.update({
                active: 'Y'
            }, {
                where: {
                    productId: idProduct
                }
            })

            return res;
        }
        catch (e) {
            throw e;
        }
    }

    async calculateSpecialPromotionPrice(productId){
        try {
                
            const sequelize = new Sequelize(databaseConfig);
            const sqlQuery = `SELECT *
                FROM vegbox.stock s
                where s.productId = :productId`
                const promotionQuery =`SELECT *
                FROM vegbox.promotiondata p
                where p.promotionId = :promotionId
                and p.expiry > now()
                and p.active ='Y'`
            let stockData:any = await sequelize.query(sqlQuery,
                {
                    replacements: { productId: productId},
                    type: QueryTypes.SELECT
                }
            );
            if(stockData.length>0&& stockData[0].promotionId > 0)
            {
                const promotionId = stockData[0].promotionId;
                let promotionData:any = await sequelize.query(promotionQuery,
                    {
                        replacements: { promotionId: promotionId},
                        type: QueryTypes.SELECT
                    }
                );
                return promotionData;
            }
            
            sequelize.close();
            
        }
        catch (e) {
            throw e;
        }
    }

    async getAllSpecialPromotionProducts(promotionId) {
        try {
            const sequelize = new Sequelize(databaseConfig);
            const sqlQuery = `SELECT
            p.productId,
            p.productName,
            p.productslugName,
            p.active,
            p.productTamilName,
            p.productAlternativeName,
            p.categoryId,
            p.QtyTypeCode,
            p.calcBasedRateMaster,
            p.barCode,
            p.createdAt,
            p.updatedAt,
            pi.productImageName,
            pi.imageId,
            pi.publicId,
            pi.url,
            pi.secureUrl,
            rm.ratecode,
            rm.rateMasterId,
            rm.buyRate,
            rm.sellMarginPer,
            CASE 
            WHEN p.calcBasedRateMaster = 'Y' THEN rm.sellRate 
            ELSE s.sellRate
        END AS sellRate,
            CASE 
            WHEN s.promotionId > 0 THEN rm.sellRate - ROUND(rm.sellRate * (prom.discount / 100), 2) 
            ELSE 0 
        END AS specialdiscountprice,
            c.categoryName,
            c.slugName,
            q.idQuantity,
            q.Name,
            q.Active,
            q.shortName,
            ROUND(AVG(r.rating), 1) AS rating
        FROM
            vegbox.product p
            LEFT JOIN vegbox.productimages pi ON p.productId = pi.productId
            LEFT JOIN vegbox.rating r ON p.productId = r.productId
           LEFT JOIN vegbox.ratemaster rm ON rm.productId = p.productId
            JOIN vegbox.category c ON c.categoryId = p.categoryId
            JOIN vegbox.quantity q ON q.QtyTypeCode = p.QtyTypeCode
            LEFT JOIN vegbox.stock s
            on s.productId = p.productId
            LEFT JOIN vegbox.promotiondata prom
            on prom.promotionId = s.promotionId
        WHERE
        prom.promotionId = :promotionId
        GROUP BY
            p.productId,
            p.productName,
            p.productslugName,
            p.active,
            p.productTamilName,
            p.productAlternativeName,
            p.categoryId,
            p.QtyTypeCode,
            p.calcBasedRateMaster,
            p.barCode,
            p.createdAt,
            p.updatedAt,
            pi.productImageName,
            pi.imageId,
            pi.publicId,
            pi.url,
            pi.secureUrl,
            rm.ratecode,
            rm.rateMasterId,
            rm.buyRate,
            rm.sellMarginPer,
            sellRate,
            c.categoryName,
            c.slugName,
            q.idQuantity,
            q.Name,
            q.Active,
            q.shortName;
        `
            let results = await sequelize.query(sqlQuery,
                {
                    replacements: { promotionId: promotionId },
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
}



