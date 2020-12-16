import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { GlobalGuard } from './modules/auth/guards/global.guard';
import { ObjectAndFieldTypeGuard } from './modules/auth/guards/objetAndFieldType.guard';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalGuards(
        new ObjectAndFieldTypeGuard(),
        new GlobalGuard(app.get(Reflector)),
    );
    app.useGlobalPipes(new ValidationPipe());
    app.useGlobalInterceptors(
        new ClassSerializerInterceptor(app.get(Reflector)),
    );
    await app.listen(4000);
}
bootstrap();
