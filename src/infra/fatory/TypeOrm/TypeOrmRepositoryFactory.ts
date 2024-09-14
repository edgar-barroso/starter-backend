import { DAOFactory } from "@/application/dao/factory/DAOFactory";
import { UserDAO } from "@/application/dao/UserDAO";
import { RepositoryFactory } from "@/domain/factory/RepositoryFactory";
import { UserRepository } from "@/domain/repository/UserRepository";
import { TypeOrmUserDAO } from "@/infra/dao/TypeOrm/typeOrmUserDAO";
import { TypeOrmUserRepository } from "@/infra/repository/TypeOrm/TypeOrmUserRepository";

export class TypeOrmFactory implements RepositoryFactory ,DAOFactory {
  private static instance: TypeOrmFactory;

  private constructor() {}

  public static getInstance(): TypeOrmFactory {
    if (!TypeOrmFactory.instance) TypeOrmFactory.instance = new TypeOrmFactory();
    return TypeOrmFactory.instance;
  }

  createUserDAO(): UserDAO {
    return TypeOrmUserDAO.getInstance()
  }

  createUserRepository(): UserRepository {
    return TypeOrmUserRepository.getInstance()
  }
}
