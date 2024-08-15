import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table
export class Order extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  orderId: number;

  @Column({
    type: DataType.JSON,
  })
  productData: {};

  @Column({
    type: DataType.STRING,
  })
  userId: string;

  @Column({
    type: DataType.STRING,
  })
  paymentIntentClientSecret: string;

  @Column({
    type: DataType.INTEGER,
    defaultValue: 0
  })
  cartId: number;
  @Column({
    type: DataType.INTEGER,
    defaultValue: 0
  })
  directBuyId: number;
  @Column({
    type: DataType.JSON,
  })
  paymentIntent: {};
  @Column({
    type: DataType.STRING,
    defaultValue: 'Not Paid'
  })
  webhookpaidStatus: String;

  @Column({
    type: DataType.ENUM('Not processed', 'processing', 'dispatched', 'cancelled', 'completed','cash on delivery', 'Replace Initiated', 'Replace Completed','Return Initiated','Return Completed'),
    defaultValue: 'Not processed',
  })
  orderStatus: 'Not processed' | 'processing' | 'dispatched' | 'cancelled' | 'completed' | 'cash on delivery' | 'Replace Initiated' | 'Replace Completed' | 'Return Initiated'| 'Return Completed';

  @Column({
    type: DataType.STRING,
    allowNull: true, // Allow null as an order might not always have an associated invoice initially
  })
  invoiceId: string;
  @Column({
    type: DataType.INTEGER,
    defaultValue: 0
  })
  deliveryPersonnelId: number;
 
  @Column({
    type: DataType.INTEGER,
    defaultValue: 0
  })
  idshippingAddress: number;
  @Column({
    type: DataType.INTEGER,
    defaultValue: 0
  })
  idbillingAddress: number;
  
}


