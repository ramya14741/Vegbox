import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table 
export class Return extends Model {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement:true
    })
    returnId: number;
    @Column({
        type: DataType.INTEGER,
    })
    orderId:number;
    @Column({
        type: DataType.STRING
    })
    userId: string;
    @Column({
        type: DataType.STRING,
    })
    status:string;
}
@Table 
export class ReturnReqItem extends Model {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement:true
    })
    returnReqItemId: number;
    @Column({
        type: DataType.INTEGER,
    })
    returnId:number;
    @Column({
        type: DataType.INTEGER
    })
    productId: number;
    @Column({
        type: DataType.INTEGER
    })
    quantitytypecode: number;
    @Column({
        type: DataType.STRING,
    })
    status:string;
    @Column({
        type: DataType.STRING
    })
    unitchoosenbyUser: string;
}
