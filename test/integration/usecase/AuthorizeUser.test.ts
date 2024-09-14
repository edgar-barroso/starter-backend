import { UnauthorizedError } from "@/application/error/UnauthorizedError";
import { UserNotFound } from "@/application/error/UserNotFound";
import { AuthorizeUser } from "@/application/usecase/AuthorizeUser";
import { User } from "@/domain/entity/User";
import { UserRepository } from "@/domain/repository/UserRepository";
import { InMemoryUserRepository } from "@/infra/repository/InMemory/InMemoryUserRepository";

let sut: AuthorizeUser;
let userRepository: UserRepository;
beforeEach(async () => {
  userRepository = new InMemoryUserRepository();
  sut = new AuthorizeUser(userRepository);
  await userRepository.create(
    User.create({
      email: "johndoe@gmail.com",
      name: "john doe",
      password: "johndoe1234",
    }),
  );
});

describe("AuthorizeUser", () => {
  test("Deve ser possivel autorizar um usuário", async () => {
    const input = { email: "johndoe@gmail.com", password: "johndoe1234" };
    const output = await sut.execute(input);
    expect(output).toMatchObject({ name: "john doe", email: input.email });
  });

  test("Deve levantar um erro ao tentar autorizar um usuário inexistente", async () => {
    const input = {
      email: "notexists@gmail.com",
      password: "notexistspassword",
    };
    expect(async () => await sut.execute(input)).rejects.toThrowError(
      UserNotFound,
    );
  });

  test("Deve levantar um erro ao tentar autorizar um usuário com senha inválida", async () => {
    const input = { email: "johndoe@gmail.com", password: "invalidPassword" };
    expect(async () => await sut.execute(input)).rejects.toThrowError(
      new UnauthorizedError("password"),
    );
  });
});
