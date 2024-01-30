import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {BaseAPIDocument} from "./common/swagger/swagger.document";
import dotenv = require('dotenv');
import {Logger, ValidationPipe} from '@nestjs/common';
import * as path from "path";
import cookieParser from 'cookie-parser';

// .env 파일 설정을 위한 dotenv 모듈 사용
dotenv.config();

// 환경에 따라 .env 파일 경로 설정
if (process.env.NODE_ENV === 'local') {
    Logger.log('서버가 로컬 환경에서 동작합니다.');
    dotenv.config({path: path.join(__dirname, '../.local.env')});
}

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    // CORS 설정
    app.enableCors({
        origin: '*',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
        optionsSuccessStatus: 200,
    });

    // 글로벌 파이프 설정
    app.useGlobalPipes(
        new ValidationPipe({
            // whitelist: true,
            forbidNonWhitelisted: true,
            transform: true,
            disableErrorMessages: true,
        }),
    );

    // 쿠키 파서 사용
    app.use(cookieParser());

    // Swagger 문서 초기화
    new BaseAPIDocument().initializeOptions(app);

    // 서버 리스닝
    await app.listen(3000);
}

// 애플리케이션 실행
bootstrap();
