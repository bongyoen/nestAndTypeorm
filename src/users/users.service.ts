import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {getConnection} from "typeorm";
import {Users} from "./entity/users.entity";

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

    findOne(id: string): Promise<Users> {
        // @ts-ignore
        return this.usersRepository.findOne(id);
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
}