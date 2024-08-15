import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table 
export class DeliveryPersonnel extends Model {
    
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement:true
    })
    dpId:number;
    @Column({
        type: DataType.STRING
        //unique: true
    })
    dpemail: string;//check if same for every time login in 
    @Column({
        type: DataType.STRING,
    })
    dpmobileNumber:string;
    @Column({
        type: DataType.STRING
    //unique: true,
    
    })
    username: string;
    @Column({
        type: DataType.CHAR,
        defaultValue: 'Y'
    //unique: true,
    
    })
    active: string;
}