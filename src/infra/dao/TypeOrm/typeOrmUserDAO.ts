import { UserDAO } from "@/application/dao/UserDAO";
import { dataSource } from "@/type-orm/dataSource";
import { ORMUser } from "@/type-orm/entities/user.entity";
import { Repository } from "typeorm";

export class TypeOrmUserDAO implements UserDAO {
  private static instance: TypeOrmUserDAO;
  userRepository:Repository<ORMUser> = dataSource.getRepository(ORMUser);
  private constructor() {}

  public static getInstance(): TypeOrmUserDAO {
    if (!TypeOrmUserDAO.instance) TypeOrmUserDAO.instance = new TypeOrmUserDAO();
    return TypeOrmUserDAO.instance;
  }

  async findAll(page: number, itemsPerPage: number): Promise<{ name: string; email: string }[]> {
    const offset = (page - 1) * itemsPerPage;

    const users = await this.userRepository
      .createQueryBuilder("user")
      .select(["user.name", "user.email"])
      .skip(offset)
      .take(itemsPerPage)
      .getRawMany();

    return users;
  }
}
