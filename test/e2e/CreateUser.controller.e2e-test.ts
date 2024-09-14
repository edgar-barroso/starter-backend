import { AllExceptionsFilter } from "@/presentation/handler/all-exceptions-filter";
import { UserModule } from "@/presentation/routes/user/user.module";
import { dataSource } from "@/type-orm/dataSource";
import { ORMUser } from "@/type-orm/entities/user.entity";
import { INestApplication, ValidationPipe } from "@nestjs/common";
import { HttpAdapterHost } from "@nestjs/core";
import { Test } from "@nestjs/testing";
import * as request from "supertest";

describe("CreateUserController", () => {
  let app: INestApplication;

  beforeAll(async () => {
    if (!dataSource.isInitialized) {
      await dataSource.initialize();
    }
    dataSource.getRepository(ORMUser).delete({});
    const moduleRef = await Test.createTestingModule({
      imports: [UserModule],
    }).compile();

    app = moduleRef.createNestApplication();
    const { httpAdapter } = app.get(HttpAdapterHost);
    app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });
  it(`/POST user`, () => {
    const input = {
      name: "john doe",
      email: "johndoe@gmail.com",
      password: "123456",
    };
    return request(app.getHttpServer())
      .post("/user/register")
      .send(input)
      .expect(201);
  });
  afterAll(async () => {
    if (dataSource.isInitialized) {
      await dataSource.destroy();
    }
    await app.close();
  });

  it("Deve falhar ao tentar cadastrar um usuário com email ja existente", async () => {
    const input = {
      name: "john doe",
      email: "johndoe@gmail.com",
      password: "123456",
    };
    return request(app.getHttpServer())
      .post("/user/register")
      .send(input)
      .expect(409);
  });

  it("Deve falhar ao tentar cadastrar um usuário com email inválido", async () => {
    const input = {
      name: "john doe",
      email: "InvalidEmail",
      password: "123456",
    };
    return request(app.getHttpServer())
      .post("/user/register")
      .send(input)
      .expect(400);
  });

  it("Deve falhar ao tentar cadastrar um usuário com nome inválido", async () => {
    const input = {
      name: "jodoe",
      email: "johndoe2@gmail.com",
      password: "123456",
    };
    return request(app.getHttpServer())
    .post("/user/register")
    .send(input)
    .expect(400);
  });

  it("Deve falhar ao tentar cadastrar um usuário com senha inválida", async () => {
    const input = {
      name: "john doe 2",
      email: "johndoe2@gmail.com",
      password: "12345",
    };
    return request(app.getHttpServer())
      .post("/user/register")
      .send(input)
      .expect(400);
  });
});
