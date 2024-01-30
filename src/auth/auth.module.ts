import {Module} from "@nestjs/common";
import {JwtModule} from "@nestjs/jwt";
import {TypeOrmModule} from "@nestjs/typeorm";
import {AuthService} from "./auth.service";
import {UsersService} from "../users/users.service";
import {AuthController} from "./auth.controller";
import {Users} from "../common/entity/users.entity";
import * as process from "process";
import {PassportModule} from '@nestjs/passport';
import {MailService} from "../common/mail/mail.service";
import {JwtAccessStrategy} from "../common/jwt/jwt-access.strategy";
import {JwtRefreshStrategy} from "../common/jwt/jwt-refresh.strategy";

@Module({
    imports: [
        JwtModule.register({

        }), //
        TypeOrmModule.forFeature([Users]), //유저 관련 DB 엑세스에 필요,
        PassportModule,
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtRefreshStrategy, JwtAccessStrategy, UsersService],
    exports: [JwtAccessStrategy, JwtRefreshStrategy]


})
export class AuthModule {
    //
}