import {
    Body,
    Controller,
    Logger,
    Post,
    Req,
    Res,
    UnprocessableEntityException,
    UseGuards,
} from "@nestjs/common";
import {Response, Request} from 'express';
import {UsersService} from "../users/users.service";
import {AuthService} from "./auth.service";
import * as bcrypt from "bcrypt"
import {LoginInput, ModifyPwCond} from "./auth.dto";
import {ApiBearerAuth, ApiOperation, ApiTags} from "@nestjs/swagger";
import {PASSWD_SALT} from "../common/app_enum/use_yn_status.enum";
import {AuthGuard} from "@nestjs/passport";
import {UserApproveCond, UserCreateCond} from "../users/users.dto";
import {Users} from "../common/entity/users.entity";
import {MailService} from "../common/mail/mail.service";
import {CmmnDtlCl} from "../common/entity/cmmn_dtl_cl.entity";

// Swagger 태그 설정 및 컨트롤러 라우트 설정
@ApiTags("인증 API")
@Controller('auth')
export class AuthController {

    constructor(
        private readonly userService: UsersService,
        private readonly authService: AuthService,
        private readonly mailService: MailService
    ) {
    }

    // 로그인 엔드포인트
    @Post('login')
    @ApiOperation({summary: "로그인", description: "jwt 로그인을 진행"})
    async login(@Body() input: LoginInput, @Req() req: Request, @Res() res: Response) {

        // 입력값에서 이메일과 비밀번호 추출
        const {email, passwd} = input;

        // 이메일로 사용자 조회
        const user = await this.userService.findByEmail(email);

        // 사용자가 존재하지 않으면 예외 처리
        if (!user) {
            throw new UnprocessableEntityException('이메일이 없습니다.');
        }

        // 마지막 로그인 시간과 현재 시간 비교하여 로그인 시도 횟수 제한 확인
        const lastAccessAt = user.lastAccessAt;
        const now = new Date();

        if (user.loginAttempts >= 5) {
            lastAccessAt.setMinutes(lastAccessAt.getMinutes() + 5)
        }

        if (now < lastAccessAt) {
            user.loginAttempts = 0
            await this.userService.increaseLoginAttempts(user);
            throw new UnprocessableEntityException('로그인 접속 횟수가 초과하였습니다. 잠시 후 다시시도');
        }

        // 비밀번호 검증
        const isPw = await bcrypt.compare(input.passwd, user.passwd)

        if (!isPw) {
            // 비밀번호 불일치 시 로그인 시도 횟수 증가 및 예외 처리
            user.loginAttempts++
            user.lastAccessAt = new Date();

            await this.userService.increaseLoginAttempts(user);

            throw new UnprocessableEntityException('비밀번호가 일치하지 않습니다.');
        }

        // 토큰 발급 및 사용자 정보 업데이트
        const renewToken = this.authService.setRefreshToken({user, res});
        const accessToken = this.authService.getAccessToken({user});
        user.accessToken = accessToken;
        user.renewToken = renewToken;

        await this.userService.defalutAttemptsAndUpdateToken(user);
        return res.status(200).send(accessToken);
    }

    // 비밀번호 변경 엔드포인트
    @Post("modifyPw")
    @UseGuards(AuthGuard('access'))
    @ApiBearerAuth('access-token')
    @ApiOperation({summary: "비밀번호 변경", description: "jwt인증 후 사용자 비밀번호 변경"})
    async ModifyPw(@Body() cond: ModifyPwCond, @Req() req: Request, @Res() res: Response) {

        // 새로운 비밀번호와 비밀번호 확인 값이 일치하지 않으면 예외 처리
        if (cond.renewPw !== cond.renewChkPw) throw new UnprocessableEntityException('비밀번호가 일치하지 않습니다.');

        // 사용자 확인이 되지 않으면 예외 처리
        if (!req.user) throw new UnprocessableEntityException('회원을 확인할 수 없습니다.');

        // 사용자 조회 및 비밀번호 업데이트
        const user = await this.userService.findByUserNo(req.user["userNo"])

        if (!user) throw new UnprocessableEntityException('회원정보가 없습니다.');

        user.passwd = await bcrypt.hash(
            cond.renewPw,
            PASSWD_SALT
        );

        await this.userService.create(user);

        return res.status(200).send("비밀번호 변경완료");
    }

    // 토큰 재발급 엔드포인트
    @UseGuards(AuthGuard('refresh'))
    @ApiOperation({summary: "토큰재발급", description: "renewToken으로 재인증"})
    @Post("refresh")
    async restoreToken(@Req() req: Request, @Res() res: Response) {
        Logger.debug(JSON.stringify(req.user))

        // 예시 이메일로 사용자 조회
        const user = await this.userService.findByEmail("cyp@cyp.cyp");

        // 새로운 액세스 토큰 발급 및 응답
        const jwt = this.authService.getAccessToken({user});
        return res.status(200).send(jwt);
    }


    @ApiOperation({summary: "회원가입 승인", description: "사용자의 회원가입 승인"})
    @Post("createUserApprove")
    async createUserApprove(@Body() cond: UserApproveCond, @Res() res: Response) {

        const user = await this.userService.findByEmail(cond.email);

        if (!user) {
            throw new UnprocessableEntityException('없는 회원입니다.');
        }

        if (user.userCl.clDtlCode !== 'USC004') {
            throw new UnprocessableEntityException('승인신청 할 수 없는 회원입니다.');
        }

        if (user.vrfctCode !== cond.vrfctCode) {
            throw new UnprocessableEntityException('인증코드가 옳바르지 않습니다.');
        }

        await this.userService.userApprove(user)

        return res.status(200).send("회원가입되었습니다.");
    }

    // 회원가입 엔드포인트
    @Post("createUserApply")
    @ApiOperation({summary: "회원가입 신청", description: "사용자의 회원가입 신청"})
    async createUserApply(@Body() cond: UserCreateCond, @Res() res: Response) {
        // 새로운 사용자 생성
        const user = new Users();

        // 비밀번호 암호화 및 사용자 정보 설정
        user.passwd = await bcrypt.hash(
            cond.passwd,
            PASSWD_SALT
        );
        user.name = cond.name
        user.email = cond.email
        user.userCl = new CmmnDtlCl('USC004')
        user.vrfctCode = Math.floor(100000 + Math.random() * 900000);

        try {
            await this.mailService.sendMail(user.vrfctCode, cond.email)
            // 사용자 저장 및 응답
            await this.userService.create(user);
            return res.status(200).send("이메일로 인증코드가 발송되었습니다.");
        } catch (e) {
            // 저장 실패 시 예외 처리
            return res.status(400).send('잘못된 회원정보입니다.');
        }
    }
}