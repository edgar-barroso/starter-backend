import { Email } from "../valueObject/Email";
import { Name } from "../valueObject/Name";
import { Password } from "../valueObject/Password";
import { UniqueEntityId } from "../valueObject/UniqueEntityId";



interface CreateUserProps {
  name: string;
  email: string;
  password: string;
  createdAt?: Date;
  id?: string;
  isPasswordHash?:boolean
}
export class User {

  private id: UniqueEntityId;
  private name: Name;
  private email: Email;
  private password: Password;
  private createdAt: Date;

  private constructor(
    name: string,
    email: string,
    password: Password,
    id?: string,
    createdAt?: Date,
  ) {
    this.id = new UniqueEntityId(id);
    this.name = new Name(name);
    this.email = new Email(email);
    this.password = password
    this.createdAt = createdAt ?? new Date();
  }

  static create(input: CreateUserProps): User {
    const { name, email, password, createdAt, id ,isPasswordHash} = input;
    return new User(name, email,new Password(password,isPasswordHash), id,createdAt );
  }

  getName() {
    return this.name.getValue();
  }

  getEmail() {
    return this.email.getValue();
  }

  getPassword() {
    return this.password;
  }

  getId() {
    return this.id.getValue();
  }

  getCreatedAt(): Date {
    return this.createdAt;
  }

  setEmail(email: string) {
    this.email = new Email(email)
  }
  setName(name: string) {
    this.name = new Name(name)
  }
  setPassword(password: string) {
    this.password = new Password(password)
  }
}
