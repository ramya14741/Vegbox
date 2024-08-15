import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table 
export class ProductImages extends Model {
    @Column({
        type: DataType.STRING(32)
   // unique: true,
    
    })
    productImageName: string;
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement:true
    })
    imageId:number;
    @Column({
        type: DataType.STRING
        //unique: true
    })
    publicId: string;//check if same for every time login in 
    @Column({
        type: DataType.CHAR,
        defaultValue: 'Y'
    })
    active:string;
    @Column({
        type: DataType.STRING
    //unique: true,
    
    })
    url: string;
    @Column({
        type: DataType.STRING
   // unique: true,
    
    })
    secureUrl: string;
    @Column({
        type: DataType.INTEGER
    })
    productId:number;
    @Column({
        type: DataType.INTEGER,
        defaultValue:0
    })
    promotionId:number;

}
