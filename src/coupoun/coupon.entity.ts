import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table 
export class Coupon extends Model {
    @Column({
        type: DataType.STRING(10),
        unique:true
    })
    name: string;
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement:true
    })
    couponid:number;
    @Column({
        type: DataType.INTEGER,
        unique: true
    })
    discount: number;//check if same for every time login in 
    @Column({
        type: DataType.DATE,
    })
    expiry:Date;
    @Column({
        type: DataType.STRING,
    })
    active:String;
}
