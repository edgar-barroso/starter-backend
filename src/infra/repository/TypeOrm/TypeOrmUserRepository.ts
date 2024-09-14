import { User } from "@/domain/entity/User";
import { UserRepository } from "@/domain/repository/UserRepository";
import { dataSource } from "@/type-orm/dataSource";
import { ORMUser } from "@/type-orm/entities/user.entity";
import { UserMapper } from "@/type-orm/mappers/user.mapper";
import { Repository } from "typeorm";


export class TypeOrmUserRepository implements UserRepository {
  private static instance:TypeOrmUserRepository
  private users: Repository<ORMUser> = dataSource.getRepository(ORMUser);
  private mapper: UserMapper = new UserMapper();
  
  private constructor() {
  }

  static getInstance(): TypeOrmUserRepository {
    if(!TypeOrmUserRepository.instance) TypeOrmUserRepository.instance = new TypeOrmUserRepository()
    return TypeOrmUserRepository.instance
  }

  async update(user: User): Promise<User> {
    const ormUser = this.mapper.toPersistence(user);
    const updatedUser = await this.users.save(ormUser);
    return this.mapper.toDomain(updatedUser);
  }
  async delete(user: User): Promise<User> {
    const ormUser = await this.users.findOneBy({ id: user.getId() });
    await this.users.remove(ormUser);
    return this.mapper.toDomain(ormUser);
  }
  async create(user: User): Promise<User> {
    const ormUser = this.mapper.toPersistence(user);
    const createdUser = await this.users.save(ormUser);
    return this.mapper.toDomain(createdUser);
  }
  async findById(id: string): Promise<User | undefined> {
    const ormUser = await this.users.findOneBy({ id });
    if (!ormUser) return;
    return this.mapper.toDomain(ormUser);
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const ormUser = await this.users.findOneBy({ email });
    if (!ormUser) return;
    return this.mapper.toDomain(ormUser);
  }
}
