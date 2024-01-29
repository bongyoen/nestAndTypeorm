import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {CmmnDtlCl} from "../../common/entity/cmmn_dtl_cl.entity";
import {Auditable} from "../../config/audit/auditable.entity";
import {ApiProperty} from "@nestjs/swagger";

@Entity()
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
    userCl: string;

    @ApiProperty()
    @Column()
    passwd: string;

    @ApiProperty()
    @Column({nullable: true})
    renewToken: string;
}