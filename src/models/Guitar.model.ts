import { Table, Column, Model, DataType, AllowNull, Default } from "sequelize-typescript";

@Table({
  tableName: "guitars",
})
class Guitar extends Model {

  @Default("Sin marca")
  @AllowNull(false)
  @Column({type: DataType.STRING(100)})
  declare brand: string;

  @AllowNull(false)
  @Column({ type: DataType.STRING(100) })
  declare name: string;

  @AllowNull(false)
  @Column({ type: DataType.STRING(100) })
  declare image: string;

  @AllowNull(false)
  @Column({ type: DataType.TEXT })
  declare description: string;

  @AllowNull(false)
  @Column({ type: DataType.DECIMAL(8, 2) })
  declare price: number;
}

export default Guitar;
