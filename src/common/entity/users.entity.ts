import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique} from "typeorm";
import {Auditable} from "../audit/auditable.entity";
import {ApiProperty} from "@nestjs/swagger";
import {CmmnDtlCl} from "./cmmn_dtl_cl.entity";

@Entity()
@Unique(['email'])
export class Users extends Auditable {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    userNo: number;

    @ApiProperty()
    @Column({type: "varchar"})
    name: string;

    @ApiProperty()
    @Column({type: "varchar"})
    email: string;

    @ApiProperty()
    @ManyToOne(() => CmmnDtlCl, {nullable: false})
    @JoinColumn({name: 'userCl'})
    userCl: CmmnDtlCl;

    @ApiProperty()
    @Column()
    passwd: string;

    @ApiProperty()
    @Column({default: 0})
    loginAttempts: number;

    @ApiProperty()
    @Column({default: null})
    lastAccessAt: Date;

    @ApiProperty()
    @Column({nullable: true})
    renewToken: string;

    @ApiProperty()
    @Column({nullable: true})
    accessToken: string;
}