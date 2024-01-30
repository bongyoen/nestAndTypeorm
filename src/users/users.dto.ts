import {ApiProperty} from "@nestjs/swagger";
import {Column} from "typeorm";

export class UserCreateCond {
    @ApiProperty()
    passwd: string;

    @ApiProperty()
    name: string;

    @ApiProperty()
    email: string;
}

export class UserApproveCond {
    @ApiProperty()
    vrfctCode: number

    @ApiProperty()
    email: string
}