import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table 
export class Vendor extends Model {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement:true
    
    })
    vendorId: number;
    @Column({
        type: DataType.STRING,
       
    })
    vendorName:string;
    @Column({
        type: DataType.STRING
        //unique: true
    })
    contactPersonName: string;//check if same for every time login in 
    @Column({
        type: DataType.CHAR,
        defaultValue: 'Y'
    })
    active:string;
    @Column({
        type: DataType.STRING
    //unique: true,
    
    })
    contactEmail: string;
    @Column({
        type: DataType.STRING
   // unique: true,
    
    })
    contactMobile: string;
    @Column({
        type: DataType.STRING
    })
    address:string;
    @Column({
        type: DataType.STRING
    })
    city:string;
    @Column({
        type: DataType.STRING,
    })
    state:string;
    @Column({
        type: DataType.INTEGER
    //unique: true,
    
    })
    zip: number;
    @Column({
        type: DataType.STRING
    //unique: true,
    
    })
    country: string;

    @Column({
        type: DataType.STRING
    //unique: true,
    
    })
    businessName: string;

    @Column({
        type: DataType.STRING
    })
    businessRegistrationNumber: string;
    @Column({
        type: DataType.STRING
    })
    TAXIdorVatId: string;
    @Column({
        type: DataType.STRING
    })
    bankName: string;
    @Column({
        type: DataType.STRING
    })
    accountHolderName: string;
    @Column({
        type: DataType.STRING
    })
    accountNumber: string;
    @Column({
        type: DataType.STRING
    })
    IFSCCodeorRoutingNumber: string;
    @Column({
        type: DataType.STRING
    })
    paymentTerms: string;
    @Column({
        type: DataType.STRING
    })
    currency: string;
}
