import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {Users} from "../common/entity/users.entity";
import {CmmnDtlCl} from "../common/entity/cmmn_dtl_cl.entity";

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(Users)
        private usersRepository: Repository<Users>,
    ) {
    }

    // 모든 사용자 조회 함수
    findAll(): Promise<Users[]> {
        return this.usersRepository.find();
    }

    // 이메일로 사용자 조회 함수
    async findByEmail(email: string): Promise<Users> {
        return this.usersRepository.findOne({
            where: {
                email: email
            },
            relations: ['userCl']
        });
    }

    // 사용자 번호로 사용자 조회 함수
    async findByUserNo(userNo: number): Promise<Users> {
        return this.usersRepository.findOne({
            where: {
                userNo: userNo
            },
            relations: ['userCl']
        });
    }

    // 사용자 생성 함수
    async create(user: Users): Promise<void> {
        await this.usersRepository.save(user);
    }

    // 사용자 정보 업데이트 함수
    async update(id: number, users: Users): Promise<void> {
        const existUser = await this.findByUserNo(id);

        if (existUser) {
            await this.usersRepository.update({
                userNo: id
            }, {
                name: users.name,
                email: users.email,
                userCl: users.userCl,
                passwd: users.passwd,
                renewToken: users.renewToken,
            });
        }
    }

    // 로그인 시도 횟수 증가 함수
    async increaseLoginAttempts(user: Users): Promise<void> {
        const id = user.userNo;
        const existUser = await this.findByUserNo(id);

        if (existUser) {
            await this.usersRepository.update({
                userNo: id
            }, {
                loginAttempts: user.loginAttempts,
                lastAccessAt: user.lastAccessAt
            });
        }
    }

    // 로그인 시도 횟수 초기화 함수
    async defalutLoginAttempts(user: Users): Promise<void> {
        const id = user.userNo;
        const existUser = await this.findByUserNo(id);

        if (existUser) {
            await this.usersRepository.update({
                userNo: id
            }, {
                loginAttempts: 0,
                lastAccessAt: null
            });
        }
    }

    // 로그인 시도 횟수 초기화 및 토큰 업데이트 함수
    async defalutAttemptsAndUpdateToken(user: Users): Promise<void> {
        const id = user.userNo;
        const existUser = await this.findByUserNo(id);

        if (existUser) {
            await this.usersRepository.update({
                userNo: id
            }, {
                loginAttempts: 0,
                lastAccessAt: null,
                accessToken: user.accessToken,
                renewToken: user.renewToken
            });
        }
    }

    async userApprove(user: Users) {
        const id = user.userNo;
        const existUser = await this.findByUserNo(id);

        if (existUser) {
            await this.usersRepository.update({
                userNo: id
            }, {
                vrfctCode: null,
                userCl: new CmmnDtlCl('USC002')
            });
        }
    }
}
