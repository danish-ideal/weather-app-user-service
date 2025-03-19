
import { Table,Column,Model, DataType } from "sequelize-typescript";

@Table({tableName:'users'})

export class User extends Model{
    @Column({
        type:DataType.UUID,
        defaultValue:DataType.UUIDV4,
        primaryKey:true,
    })
    id:string;
    
    getCombined(){
        return this.name+this.email
    }
    @Column({
        type:DataType.STRING,
        allowNull:false
        })
        name:string

        @Column({
            type:DataType.STRING,
            allowNull:false,
            unique:true
        })
        email:string

        @Column({
            type:DataType.STRING,
            allowNull:false,
        })
        password:string

        @Column({
            type:DataType.STRING
        })
        profileImg:string



}

