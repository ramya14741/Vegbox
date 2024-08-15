import { Table, Column, DataType, Model } from "sequelize-typescript";

@Table 
export class PromotionData extends Model {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement:true
    })
    promotionId: number;
    @Column({
        type: DataType.DATE,
    })
    expiry:Date;
   
    @Column({
        type: DataType.STRING
    })
    promotionName:string;
    @Column({
        type: DataType.STRING
        //unique: true
    })
    promotionDescription: string;//check if same for every time login in 
    @Column({
        type: DataType.CHAR,
        defaultValue: 'Y'
    })
    active:string;
    @Column({
        type: DataType.FLOAT
    //unique: true,
    
    })
    discount:number;
}
