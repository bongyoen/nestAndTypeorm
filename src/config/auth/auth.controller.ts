import {Body, Controller, Post, Res, UnprocessableEntityException} from "@nestjs/common";
import {Response} from 'express';
import {UsersService} from "../../users/users.service";
import {AuthService} from "./auth.service";
import * as bcrypt from "bcrypt"
import {LoginInput} from "./auth.dto";

@Controller('auth')
export class AuthController {
    constructor(
        private readonly userService: UsersService, //
        private readonly authService: AuthService,
    ) {
    }

    @Post('login')
    async login(@Body() input: LoginInput, @Res() res: Response) {
        const {email, passwd} = input;
        //1. 이메일, 비밀번호 일치 유저 찾기
        const user = await this.userService.findOne(email);

        //2. 일치하는 유저 없으면 에러
        if (!user) {
            throw new UnprocessableEntityException('이메일이 없습니다.');
        }

        //3. 일치하는 유저가 있지만 비밀번호 틀린경우 에러
        const isAuth = await bcrypt.compare(passwd, user.passwd);

        if (!isAuth) {
            throw new UnprocessableEntityException('비밀번호가 일치하지 않습니다.');
        }

        //4. 모두 일치 유저가 있다면 JWT Refresh Token 쿠키에 발급
        this.authService.setRefreshToken({user, res});
        const jwt = this.authService.getAccessToken({user});
        //5. 모두 일치 유저가 있다면 JWT Access Token 발급
        return res.status(200).send(jwt);
    }
}