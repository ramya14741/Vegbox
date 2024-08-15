import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table 
export class Product extends Model {
    @Column({
        type: DataType.STRING(32)
   // unique: true,
    
    })
    productName: string;
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement:true
    })
    productId:number;
    @Column({
        type: DataType.STRING(32)
        //unique: true
    })
    productslugName: string;//check if same for every time login in 
    @Column({
        type: DataType.CHAR,
        defaultValue: 'Y'
    })
    active:string;
    @Column({
        type: DataType.STRING(32)
    //unique: true,
    
    })
    productTamilName: string;
    @Column({
        type: DataType.STRING(32)
   // unique: true,
    
    })
    productAlternativeName: string;
    @Column({
        type: DataType.INTEGER
    })
    categoryId:number;
    @Column({
        type: DataType.INTEGER
    })
    QtyTypeCode:number;
    @Column({
        type: DataType.CHAR,
        defaultValue: 'Y'
    })
    calcBasedRateMaster:string;
    @Column({
        type: DataType.STRING(32)
    //unique: true,
    
    })
    barCode: string;
}
