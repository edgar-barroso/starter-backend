import { UserRepository } from "@/domain/repository/UserRepository";
import { UserNotFound } from "../error/UserNotFound";

export interface GetUserInput {
  id:string
}

export interface GetUserOutput {
  name: string;
  email: string;
}

export class GetUser {
  constructor(private readonly userRepository: UserRepository) {}

  async execute({
    id
  }: GetUserInput): Promise<GetUserOutput> {
    const user = await this.userRepository.findById(id);
    if (!user) throw new UserNotFound();
    return { name: user.getName(), email: user.getEmail() };
  }
}
