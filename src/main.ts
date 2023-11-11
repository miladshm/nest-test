import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {HttpStatus, ValidationPipe} from "@nestjs/common";
import {HttpExceptionFilter} from "./common/filters/http-exception.filter";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe({
        errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        whitelist: true,
        transform: true,
        transformOptions: {
            enableImplicitConversion: true
        }
    }))
    app.useGlobalFilters(new HttpExceptionFilter())
    await app.listen(process.env.APP_PORT);
}
bootstrap();
