import { ValidationError } from "../error/ValidationError";

export class Name {
  private value: string;

  constructor(value: string) {
    this.value = this.validate(value);
  }

  validate(password: string): string {
    if (password.length < 6) throw new ValidationError("Name");
    return password;
  }

  getValue() {
    return this.value;
  }
}
