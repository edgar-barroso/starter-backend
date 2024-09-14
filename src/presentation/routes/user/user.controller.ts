import { DAOFactory } from '@/application/dao/factory/DAOFactory';
import { FetchUser } from '@/application/query/FetchUsers';
import { AuthorizeUser } from '@/application/usecase/AuthorizeUser';
import { CreateUser } from '@/application/usecase/CreateUser';
import { DeleteUser } from '@/application/usecase/DeleteUser';
import { GetUser } from '@/application/usecase/GetUser';
import { UpdateUser } from '@/application/usecase/UpdateUser';
import { RepositoryFactory } from '@/domain/factory/RepositoryFactory';
import { Public } from '@/presentation/auth/auth.decorator';
import { Body, Controller, Delete, Get, Inject, Param, Post, Put, Query, Request } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthorizeUserDto } from './dto/authorize-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';


@Controller('user')
export class UserController {
  constructor(
    @Inject('REPOSITORY_FACTORY') private readonly repositoryFactory:RepositoryFactory,
    @Inject('DAO_FACTORY') private readonly daoFactory:DAOFactory,
    private readonly jwtService: JwtService
  ) {}
  
  @Public()
  @Post("/register")
  async create(@Body() createUserDto: CreateUserDto) {
    const useCase = new CreateUser(this.repositoryFactory.createUserRepository())
    const {email,id} = await useCase.execute(createUserDto)
    const payload = { sub: id, email: email };
  
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  @Public()
  @Post("/login")
  async register(@Body() authorizeUserDto: AuthorizeUserDto) {
    const useCase = new AuthorizeUser(this.repositoryFactory.createUserRepository())
    const {email,id} = await useCase.execute(authorizeUserDto)
    const payload = { sub: id, email: email };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  @Get("/:page")
  findAll(@Param('page') page: number, @Query('pageLength') pageLength?: number){
    const fetchUser = new FetchUser(this.daoFactory.createUserDAO())  
    return fetchUser.execute({page,pageLength})
  }

  @Get()
  findOne(@Request() req) {
    const id = req.user.sub
    const useCase = new GetUser(this.repositoryFactory.createUserRepository())
    return useCase.execute({id})
  }

  @Put()
  update(@Request() req,@Body() updateUserDto: UpdateUserDto) {
    const id = req.user.sub
    const useCase = new UpdateUser(this.repositoryFactory.createUserRepository())
    return useCase.execute({id,...updateUserDto})
  }

  @Delete()
  remove(@Request() req) {
    const id = req.user.sub
    const useCase = new DeleteUser(this.repositoryFactory.createUserRepository())
    return useCase.execute({id})
  }
}
