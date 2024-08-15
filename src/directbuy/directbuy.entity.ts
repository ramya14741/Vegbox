import { Table, Column, DataType,Model } from "sequelize-typescript";

@Table 
export class DirectBuy extends Model {
    @Column({
       type: DataType.JSON,
    
    })
    cartJson: {};
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement:true
    })
    directBuyId:number;
    @Column({
        type: DataType.FLOAT,
    })
    cartTotal: number;
    @Column({
        type: DataType.CHAR,
        defaultValue: 'Y'
    })
    active:string;
    @Column({
        type: DataType.CHAR,
        defaultValue: 'N'
    })
    discountApplied:string;
    @Column({
        type: DataType.CHAR,
        defaultValue: 'N'
    })
    paidStatus:string;
    @Column({
        type: DataType.FLOAT,
    })
    cartTotalAfterDiscount: number;
    @Column({
        type: DataType.CHAR,
    })
    userid: string;
}
