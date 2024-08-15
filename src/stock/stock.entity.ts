import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table 
export class Stock extends Model {
    @Column({
        type: DataType.INTEGER
   // unique: true,
    
    })
    productId: number;
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement:true
    })
    stockId:number;
    @Column({
        type: DataType.FLOAT
        //unique: true
    })
    TotalQuantity: number;//check if same for every time login in 
    @Column({
        type: DataType.CHAR,
        defaultValue: 'Y'
    })
    active:string;
    @Column({
        type: DataType.FLOAT
    //unique: true,
    
    })
    PurchaseRate: number;
    @Column({
        type: DataType.FLOAT
   // unique: true,
    
    })
    MRP: number;
    @Column({
        type: DataType.FLOAT
    })
    sellRate:number;
    @Column({
        type: DataType.FLOAT
    })
    sellMarginPerc:number;
    @Column({
        type: DataType.FLOAT,
    })
    DiscountPerc:number;
    @Column({
        type: DataType.FLOAT
    //unique: true,
    
    })
    DiscountRate: number;
    @Column({
        type: DataType.FLOAT
    //unique: true,
    
    })
    soldQuantity: number;

    @Column({
        type: DataType.INTEGER
    //unique: true,
    
    })
    reserveQuantity: number;

    @Column({
        type: DataType.INTEGER,
        defaultValue: 0
    //unique: true,
    
    })
    promotionId: number;
    @Column({
        type: DataType.INTEGER,
    //unique: true,
    
    })
    vendorId: number;
}
