import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table 
export class Rating extends Model {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement:true
    })
    rateId: number;
    @Column({
        type: DataType.INTEGER,
    })
    productId:number;
    @Column({
        type: DataType.INTEGER
    })
    rating: number;
    @Column({
        type: DataType.STRING,
    })
    postedBy:string;
}
