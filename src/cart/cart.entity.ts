import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table 
export class Cart extends Model {
    @Column({
       type: DataType.JSON,
    
    })
    cartJson: {};
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement:true
    })
    cartId:number;
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