import {
    Body,
    Controller,
    Post,
    Logger,
    UseGuards,
    Req,
    Res,
    UnprocessableEntityException
} from '@nestjs/common';
import {Users} from "../common/entity/users.entity";
import {UsersService} from "./users.service";
import {ApiBearerAuth, ApiOperation, ApiTags} from "@nestjs/swagger";
import * as bcrypt from "bcrypt";
import {UserCreateCond} from "./users.dto";
import {PASSWD_SALT} from "../common/app_enum/use_yn_status.enum";
import {Request, Response} from "express";
import {AuthGuard} from "@nestjs/passport";
import {CmmnDtlCl} from "../common/entity/cmmn_dtl_cl.entity";
import {MailService} from "../common/mail/mail.service";

// Swagger 태그 설정 및 컨트롤러 라우트 설정
@ApiTags("사용자 API")
@Controller('users')
export class UsersController {

    constructor(
        private readonly usersService: UsersService,
    ) {
    };

    // 모든 회원 조회 엔드포인트
    @Post("allUsers")
    @UseGuards(AuthGuard('access'))
    @ApiBearerAuth('access-token')
    @ApiOperation({summary: "모든 회원조회", description: "관리자 권한을 가지는 유저가 모든회원을 조회한다."})
    async getAllUsers(@Req() req: Request, @Res() res: Response) {
        // 현재 로그인한 사용자 확인
        const userObj = req.user;
        const user = await this.usersService.findByUserNo(userObj['userNo']);

        // 사용자 권한 체크
        if (user.userCl.clDtlCode !== "USC001") {
            throw new UnprocessableEntityException('권한이 존재하지 않습니다.');
        }

        // 모든 회원 조회 및 응답
        const users = await this.usersService.findAll();
        return res.status(200).send(users);
    }
}
