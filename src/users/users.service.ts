import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { User } from './models/user';
import { InjectModel } from '@nestjs/sequelize';
import { RpcException } from '@nestjs/microservices';
import * as bcrypt from 'bcrypt'

@Injectable()
export class UsersService {
    constructor(@InjectModel(User) private readonly userService:typeof User){}

    async createUser(userData:any){
        try {
            const saltRound=10;
            userData.password = await bcrypt.hash(userData.password,saltRound)
            return await this.userService.create(userData)
        } catch (error) {
            console.log(error);
            throw new RpcException({
                statusCode: 500,
                message: ` ${error.message}`,
              });    
        }
     
    }

    async loginUser(userData:any){
        try {
            let user = await this.userService.findOne({where:{email:userData.email},attributes:['id','email','password','name']});
            if(!user) throw new RpcException({
                statusCode:401,
                message:"User is not found"
            })
            const isValidUser = await this.validateUser(userData.password,user.password)
            if(!isValidUser) throw new RpcException({
                statusCode:401,
                message:"Invalid user"
            })
            return {id:user.id,email:user.email,name:user.name}
        } catch (error) {
             throw new RpcException({
                statusCode:500,
                message:`${error.message}`
             })
        }
    }

   async validateUser(userPassword:string,dbUserPassword:string){
    try {
        return  bcrypt.compare(userPassword,dbUserPassword)
    } catch (error) {
         throw new error(error)
    }       
    }
}
