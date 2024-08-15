import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table 
export class Review extends Model {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement:true
    })
    reviewId: number;
    @Column({
        type: DataType.INTEGER,
    })
    productId:number;
    @Column({
        type: DataType.STRING
    })
    reviewText: string;
    @Column({
        type: DataType.STRING,
    })
    postedBy:string;
}
