import { User } from "@/domain/entity/User";
import { ValidationError } from "@/domain/error/ValidationError";

describe("User", () => {
  test("Deve ser possivel criar um usuário comum", () => {
    const name = "Jose Edgar Barroso Neto";
    const email = "joseedgar@test.com";
    const password = "123456";
    const user = User.create({ name, email, password });
    expect(user.getName()).toBe(name);
    expect(user.getEmail()).toBe(email);
    const isMatch = user.getPassword().matches(password);
    expect(isMatch).toBeTruthy();
  });

  test("Deve falhar ao validar email do usuário comum", () => {
    const name = "Jose Edgar Barroso Neto";
    const email = "joseedgar.com";
    const password = "123456";
    expect(() => User.create({ name, email, password })).toThrowError(
      ValidationError,
    );
  });

  test("Deve falhar ao validar senha do usuário comum", () => {
    const name = "Jose Edgar Barroso Neto";
    const email = "joseedgar@test.com";
    const password = "131-d2=1s";
    expect(() => User.create({ name, email, password })).toThrowError(
      ValidationError,
    );
  });
});
