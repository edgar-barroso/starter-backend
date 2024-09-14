import { ValidationPipe } from "@nestjs/common";
import { HttpAdapterHost, NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { env } from "./env";
import { AllExceptionsFilter } from "./presentation/handler/all-exceptions-filter";
import { dataSource } from "./type-orm/dataSource";

async function bootstrap() {
  dataSource.initialize();
  const app = await NestFactory.create(AppModule);
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(env.PORT,'0.0.0.0');
  console.log("Server is running🚀!")
}
bootstrap();
