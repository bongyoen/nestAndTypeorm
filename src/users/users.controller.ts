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

@ApiTags("사용자 API")
@Controller('users')
export class UsersController {


    constructor(private usersService: UsersService,
                private readonly mailService: MailService) {
    };

    @Post()
    async create(@Body() cond: UserCreateCond, @Res() res: Response) {
        let user = new Users();
        try {
            Logger.debug(this.mailService.sendMail())
        } catch (e) {
            Logger.debug(e)
        }
        user.passwd = await bcrypt.hash(
            cond.passwd,
            PASSWD_SALT
        );
        user.name = cond.name
        user.email = cond.email
        user.userCl = new CmmnDtlCl('USC002')

        try {
            await this.usersService.create(user);
            return res.status(200).send("회원가입되었습니다.");
        } catch (e) {
            return res.status(400).send('잘못된 회원정보입니다.');
        }
    }


    @Post("allUsers")
    @UseGuards(AuthGuard('access'))
    @ApiBearerAuth('access-token')
    @ApiOperation({summary: "모든 회원조회", description: "관리자 권한을 가지는 유저가 모든회원을 조회한다."})
    async getAllUsers(@Req() req: Request, @Res() res: Response) {
        const user = req.user as Users;
        if (user.userCl.clDtlCode !== "USC001") {
            throw new UnprocessableEntityException('권한이 존재하지 않습니다.');
        }
        const users = await this.usersService.findAll();
        return res.status(200).send(users);
    }
}