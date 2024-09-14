import { DAOFactory } from "@/application/dao/factory/DAOFactory";
import { UserDAO } from "@/application/dao/UserDAO";
import { RepositoryFactory } from "@/domain/factory/RepositoryFactory";
import { UserRepository } from "@/domain/repository/UserRepository";
import { InMemoryUserDAO } from "@/infra/dao/InMemory/InMemoryUserDAO";
import { InMemoryUserRepository } from "@/infra/repository/InMemory/InMemoryUserRepository";

export class InMemoryFactory implements RepositoryFactory ,DAOFactory {
  private static instance: InMemoryFactory;

  private constructor() {}

  public static getInstance(): InMemoryFactory {
    if (!InMemoryFactory.instance) InMemoryFactory.instance = new InMemoryFactory();
    return InMemoryFactory.instance;
  }

  createUserDAO(): UserDAO {
    const dao = InMemoryUserDAO.getInstance()
    dao.items = InMemoryUserRepository.getInstance().items
    return dao
  }

  createUserRepository(): UserRepository {
    return InMemoryUserRepository.getInstance()
  }
}
