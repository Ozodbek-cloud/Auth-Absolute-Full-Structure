import { Table, Column, Model } from "sequelize-typescript";
import { DataTypes } from "sequelize";
import { UserRole } from "src/global/types/user.roles";

@Table({tableName: "users"})
export class Users extends Model{
    @Column({
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    })
    user_id : number

    @Column
    username: string

    @Column
    email: string

    @Column
    password: string

    @Column({
        type: DataTypes.ENUM(...Object.values(UserRole)),
        defaultValue: UserRole.USER
    })
    role : UserRole 
}