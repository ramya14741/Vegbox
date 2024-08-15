import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table 
export class RateMaster extends Model {
    @Column({
        type: DataType.INTEGER  
    })
    productId: number;
    @Column({
        type: DataType.INTEGER  
    })
    ratecode: number;
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement:true
    })
    rateMasterId:number;
    @Column({
        type: DataType.FLOAT
        //unique: true
    })
    buyRate: number;//check if same for every time login in 
    @Column({
        type: DataType.FLOAT,
    })
    sellMarginPer:number;
    @Column({
        type: DataType.FLOAT
    //unique: true,
    
    })
    sellRate: number;
}
