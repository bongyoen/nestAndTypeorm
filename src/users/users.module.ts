import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {Users} from "./entity/users.entity";
import {CmmnCl} from "../common/entity/cmmn_cl.entity";
import {CmmnDtlCl} from "../common/entity/cmmn_dtl_cl.entity";
import {UsersController} from "./users.controller";
import {UsersService} from "./users.service";


@Module({
    imports: [TypeOrmModule.forFeature([Users, CmmnCl, CmmnDtlCl])],
    exports: [TypeOrmModule],
    controllers: [UsersController],
    providers: [UsersService]
})
export class UsersModule {}