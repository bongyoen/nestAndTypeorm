import {ApiOperation, ApiProperty} from "@nestjs/swagger";

export class LoginInput {
    @ApiProperty()
    email: string;
    @ApiProperty()
    passwd: string;
}

export class ModifyPwCond {
    @ApiProperty()
    renewPw: string
    @ApiProperty()
    renewChkPw: string
}