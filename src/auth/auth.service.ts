import {Injectable, Logger} from "@nestjs/common";
import {JwtService} from "@nestjs/jwt";
import * as process from "process";
import {Users} from "../common/entity/users.entity";
import {Response} from 'express';

// NestJS 서비스로 Injectable 데코레이터 추가
@Injectable()
export class AuthService {

    constructor(
        private readonly jwtService: JwtService,
    ) {
    }

    // 액세스 토큰 생성 함수
    getAccessToken({user}: { user: Users }): string {
        return this.jwtService.sign({
                email: user.email,
                userNo: user.userNo,
                userCl: user.userCl.clDtlCode
            },
            {
                secret: process.env.ACCESS_TOKEN_SECRET_KEY,
                expiresIn: '5m'
            }
        );
    }

    // 리프레시 토큰 설정 및 생성 함수
    setRefreshToken({user, res}: { user: Users, res: Response }): string {
        // 리프레시 토큰 생성
        const refreshToken = this.jwtService.sign(
            {
                email: user.email,
                userNo: user.userNo,
                userCl: user.userCl.clDtlCode
            },
            {
                secret: process.env.REFRESH_TOKEN_SECRET_KEY,
                expiresIn: '2w',
            },
        );
        // 응답 헤더에 리프레시 토큰 설정
        res.setHeader('Set-Cookie', `refreshToken=${refreshToken}`);
        return refreshToken;
    }
}
