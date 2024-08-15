import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table 
export class Replace extends Model {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement:true
    })
    replaceId: number;
    @Column({
        type: DataType.INTEGER
    })
    productId: number;
    @Column({
        type: DataType.INTEGER
    })
    orderId: number;
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