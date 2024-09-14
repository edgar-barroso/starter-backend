import { UserDAO } from "../UserDAO";

export interface DAOFactory {
  createUserDAO(): UserDAO;
}
