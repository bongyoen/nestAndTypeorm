import {Body, Controller, Delete, Get, Param, Post, Put, Logger} from '@nestjs/common';
import {Users} from "./entity/users.entity";
import {UsersService} from "./users.service";
import {ApiOperation, ApiTags} from "@nestjs/swagger";
import * as bcrypt from "bcrypt";
import {AppService} from "../app.service";
import {UserCreateCond} from "./users.dto";

@ApiTags("사용자 API")
@Controller('users')
export class UsersController {
    private readonly logger = new Logger(AppService.name);

    PASSWD_SALT = 10;

    constructor(private usersService: UsersService) {
    };

    @Get()
    @ApiOperation({summary: "모든회원 조회", description: "모든회원 정보를 조회한다."})
    findAll(): Promise<Users[]> {
        return this.usersService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string): string {
        return `This action returns a #${id} user`;
    }

    @Post()
    async create(@Body() cond: UserCreateCond) {
        let user = new Users();

        user.passwd = await bcrypt.hash(
            cond.passwd,
            this.PASSWD_SALT
        );
        user.name = cond.name
        user.email = cond.email
        user.userCl = "USC001"

        this.logger.debug(user);

        return this.usersService.create(user);
    }


    @Put(':id')
    update(@Param('id') id: number, @Body() user: Users) {
        this.usersService.update(id, user);
        return `This action updates a #${id} user`;
    }

    @Delete(':id')
    remove(@Param('id') id: number) {
        this.usersService.remove(id);
        return `This action removes a #${id} user`;
    }
}