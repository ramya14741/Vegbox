import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table 
export class User extends Model {
    @Column({
        type: DataType.STRING,
    unique: true
    })
    Useremail: string;
    @Column({
        type: DataType.STRING,
    unique: true
    })
    mobileNumber: string;
    @Column({
        type: DataType.STRING,
        primaryKey: true,
        
    })
    userid:string;
    @Column({
        type: DataType.STRING
    })
    firebaseuserid: string;//check if same for every time login in 
    @Column({
        type: DataType.STRING
    })
    username:string;
    @Column({
        type: DataType.STRING
    })
    role:string;
    @Column({
        type: DataType.STRING
    })
    password:string;
}
