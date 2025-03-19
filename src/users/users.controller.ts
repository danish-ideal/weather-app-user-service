import { Controller } from '@nestjs/common';
import { UsersService } from './users.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {
  }
  
  @MessagePattern({cmd:'create_user'})
  async createUser(userData:any){
      return await this.usersService.createUser(userData)
  }

  @MessagePattern({cmd:'login_user'})

  async loginUser(userData:any){
    return await this.usersService.loginUser(userData)
  }

}
