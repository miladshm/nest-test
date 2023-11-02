import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {HttpStatus, ValidationPipe} from "@nestjs/common";

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
    await app.listen(3000);
}
bootstrap();
