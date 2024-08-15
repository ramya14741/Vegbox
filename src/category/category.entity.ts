import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table 
export class Category extends Model {
    @Column({
        type: DataType.STRING(32),
    unique: true,
    
    })
    categoryName: string;
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement:true
    })
    categoryId:number;
    @Column({
        type: DataType.STRING(32),
        unique: true
    })
    slugName: string;//check if same for every time login in 
    @Column({
        type: DataType.CHAR,
        defaultValue: 'Y'
    })
    active:string;
}
