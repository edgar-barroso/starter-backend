import { UnauthorizedError } from "@/application/error/UnauthorizedError";
import { UserAlreadyExistError } from "@/application/error/UserAlreadyExistError";
import { UserNotFound } from "@/application/error/UserNotFound";
import { ValidationError } from "@/domain/error/ValidationError";
import {
  ArgumentsHost,
  Catch
} from "@nestjs/common";
import { BaseExceptionFilter } from "@nestjs/core";

@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    if (exception instanceof UserAlreadyExistError) {
      response.status(409).json({ statusCode: 409, message: exception.message });
    } else if (exception instanceof ValidationError) {
      response.status(400).json({ statusCode: 400, message: exception.message });
    } else if (exception instanceof UnauthorizedError) {
      response.status(401).json({ statusCode: 401, message: exception.message });
    } else if (exception instanceof UserNotFound) {
      response.status(404).json({ statusCode: 404, message: exception.message });
    } else {
      super.catch(exception, host);
    }
  }
}
