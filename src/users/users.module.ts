import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {Users} from "../common/entity/users.entity";
import {UsersController} from "./users.controller";
import {UsersService} from "./users.service";
import {CmmnCl} from "../common/entity/cmmn_cl.entity";
import {CmmnDtlCl} from "../common/entity/cmmn_dtl_cl.entity";
import {MailService} from "../common/mail/mail.service";


@Module({
    imports: [TypeOrmModule.forFeature([Users, CmmnCl, CmmnDtlCl])],
    exports: [TypeOrmModule],
    controllers: [UsersController],
    providers: [UsersService, MailService]
})
export class UsersModule {}