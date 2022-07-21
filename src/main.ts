import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {NestExpressApplication} from '@nestjs/platform-express'
import  helmet from 'helmet'
import {ValidationPipe} from "@nestjs/common";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    (app as NestExpressApplication).use(helmet())


    app.useGlobalPipes(
        new ValidationPipe({
            disableErrorMessages:true,

            whitelist:true,
            forbidNonWhitelisted:true,

            transform:true,
            transformOptions:{
                enableImplicitConversion:true
            }
        })
    )


    await app.listen(3000);
}

bootstrap();
