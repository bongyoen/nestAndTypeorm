import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {BaseAPIDocument} from "./common/swagger/swagger.document";
import dotenv = require('dotenv');
import {Logger, ValidationPipe} from '@nestjs/common';
import * as path from "path";
import cookieParser from 'cookie-parser';

dotenv.config();

// 환경 별 .env 파일 동작 분기
if (process.env.NODE_ENV === 'local') {
    Logger.log('서버가 로컬 환경에서 동작합니다.');
    dotenv.config({path: path.join(__dirname, '../.local.env')});
}


async function bootstrap() {
    const app = await NestFactory.create(AppModule);


    app.enableCors({
        origin: '*',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
        optionsSuccessStatus: 200,
    });

    app.useGlobalPipes(
        new ValidationPipe({
            // whitelist: true,
            forbidNonWhitelisted: true,
            transform: true,
            disableErrorMessages: true,
        }),
    );

    app.use(cookieParser());

    new BaseAPIDocument().initializeOptions(app);

    await app.listen(3000);
}

bootstrap();
