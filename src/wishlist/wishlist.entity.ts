import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table
export class Wishlist extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  wishId: number;

  @Column({
    type: DataType.JSON,
  })
  productData: {};

  @Column({
    type: DataType.STRING,
  })
  userId: string;
}
