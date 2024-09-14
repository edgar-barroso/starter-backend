import { UserRepository } from "@/domain/repository/UserRepository";
import { UserNotFound } from "../error/UserNotFound";

export interface DeleteUserInput {
  id:string;
}

export interface DeleteUserOutput {
  name: string;
  email: string;
}

export class DeleteUser {
  constructor(private readonly userRepository: UserRepository) {}

  async execute({
    id
  }: DeleteUserInput): Promise<DeleteUserOutput> {
    const user = await this.userRepository.findById(id);
    if (!user) throw new UserNotFound();
    const deletedUser =  await this.userRepository.delete(user)
    return { name: deletedUser.getName(), email: deletedUser.getEmail() };
  }
}
