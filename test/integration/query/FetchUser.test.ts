import { UserDAO } from "@/application/dao/UserDAO";
import { FetchUser } from "@/application/query/FetchUsers";
import { User } from "@/domain/entity/User";
import { UserRepository } from "@/domain/repository/UserRepository";
import { InMemoryFactory } from "@/infra/fatory/InMemory/InMemoryRepositoryFactory";

let sut: FetchUser;
let userRepository: UserRepository;
let daoRepository: UserDAO;
beforeEach(async () => {
  const factory = InMemoryFactory.getInstance()
  userRepository = factory.createUserRepository()
  daoRepository = factory.createUserDAO()
  sut = new FetchUser(daoRepository);
  for(let i = 0;i<200;i++){
    await userRepository.create(
      User.create({
        name:`john doe ${i+1}`,
        email:`johndoe${i+1}@gmail.com`,
        password:"123456"
      })
    )
  }
});

describe("FetchUser", () => {
  test("Deve ser possivel receber varios usuários", async () => {
    const expectUsers = []
    for(let i = 0;i<20;i++){
      expectUsers.push({ name:`john doe ${i+1}`,
        email:`johndoe${i+1}@gmail.com`})
    }
    const input = {
      page:1,
      pageLength:20
    };
    const output = await sut.execute(input);
    expect(output.users).toHaveLength(20)
    expect(output).toMatchObject({
      users:expectUsers
    })
  });

  test("Deve ser possivel receber os usuário da pagina 2", async () => {
    const expectUsers = []
    for(let i = 20;i<40;i++){
      expectUsers.push({ name:`john doe ${i+1}`,
        email:`johndoe${i+1}@gmail.com`})
    }
    const input = {
      page:2,
      pageLength:20
    };
    const output = await sut.execute(input);
    expect(output.users).toHaveLength(20)
    expect(output).toMatchObject({
      users:expectUsers
    })
  });

  test("Deve ser possivel receber o máximo de paginação permitido (50)", async () => {
    const expectUsers = []
    for(let i = 0;i<50;i++){
      expectUsers.push({ name:`john doe ${i+1}`,
        email:`johndoe${i+1}@gmail.com`})
    }
    const input = {
      page:1,
    };
    const output = await sut.execute(input);
    expect(output.users).toHaveLength(50)
    expect(output).toMatchObject({
      users:expectUsers
    })
  });

});
