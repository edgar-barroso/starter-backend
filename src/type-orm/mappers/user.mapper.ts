import { User } from "@/domain/entity/User";
import { ORMUser } from "../entities/user.entity";

export class UserMapper{
  constructor(){}

  toDomain(ormUser:ORMUser):User{
    const {id,email,name,passwordHash,createdAt} = ormUser
    return User.create({
      id,email,name,password:passwordHash,createdAt,isPasswordHash:true
    })
  }
  toPersistence(user:User):ORMUser{
    const ormUser:ORMUser = {
      id:user.getId(),
      email:user.getEmail(),
      name:user.getName(),
      passwordHash:user.getPassword().getValue(),
      createdAt:user.getCreatedAt()
    }
    return ormUser
  }
}