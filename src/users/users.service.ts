import {Injectable, Logger} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {DataSource, ILike, Repository} from 'typeorm';
import {getConnection} from "typeorm";
import {Users} from "../common/entity/users.entity";

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(Users)
        private usersRepository: Repository<Users>,
    ) {
    }

    findAll(): Promise<Users[]> {
        return this.usersRepository.find();
    }

    async findByEmail(email: string): Promise<Users> {
        return this.usersRepository.findOne({
            where: {
                email: email
            },
            relations: ['userCl']
        })
    }

    async findByUserNo(userNo: number): Promise<Users> {
        return this.usersRepository.findOne({
            where: {
                userNo: userNo
            },
            relations: ['userCl']
        })
    }

    async create(user: Users): Promise<void> {
        await this.usersRepository.save(user);
    }

    async remove(id: number): Promise<void> {
        await this.usersRepository.delete(id);
    }

    async update(id: number, users: Users): Promise<void> {
        // @ts-ignore
        const existCat = await this.usersRepository.findOne(id);
        if (existCat) {
            await getConnection()
                .createQueryBuilder()
                .update(Users)
                .set({
                    name: users.name,
                    email: users.email,
                    userCl: users.userCl,
                    passwd: users.passwd,
                    renewToken: users.renewToken,
                })
                .where("id = :id", {id})
                .execute();
        }
    }

    async increaseLoginAttempts(user: Users): Promise<void> {
        const id = user.userNo;

        const existUser = await this.findByUserNo(id);

        if (existUser) {

            await this.usersRepository.update({
                    userNo: id
                },
                {
                    loginAttempts: user.loginAttempts,
                    lastAccessAt: user.lastAccessAt
                }
            )

        }
    }

    async defalutLoginAttempts(user: Users): Promise<void> {
        const id = user.userNo;

        const existUser = await this.findByUserNo(id);
        if (existUser) {

            await this.usersRepository.update({
                    userNo: id
                },
                {
                    loginAttempts: 0,
                    lastAccessAt: null
                }
            )

        }
    }

    async defalutAttemptsAndUpdateToken(user: Users): Promise<void> {
        const id = user.userNo;

        const existUser = await this.findByUserNo(id);
        if (existUser) {

            await this.usersRepository.update({
                    userNo: id
                },
                {
                    loginAttempts: 0,
                    lastAccessAt: null,
                    accessToken: user.accessToken,
                    renewToken: user.renewToken
                }
            )

        }
    }
}