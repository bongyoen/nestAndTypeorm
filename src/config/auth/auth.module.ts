import {Module} from "@nestjs/common";
import {JwtModule} from "@nestjs/jwt";
import {TypeOrmModule} from "@nestjs/typeorm";
import {AuthService} from "./auth.service";
import {UsersService} from "../../users/users.service";
import {AuthController} from "./auth.controller";
import {Users} from "../../users/entity/users.entity";

@Module({
    imports: [
        JwtModule.register({}), //
        TypeOrmModule.forFeature([Users]), //유저 관련 DB 엑세스에 필요
    ],
    controllers: [AuthController],
    providers: [AuthService, UsersService],
})
export class AuthModule {
    //
}