import {Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn} from "typeorm";
import {CmmnCl} from "./cmmn_cl.entity";
import {Auditable} from "../audit/auditable.entity";

@Entity()
export class CmmnDtlCl extends Auditable {


    @PrimaryColumn({length: 6})
    clDtlCode: string;

    @Column()
    clCodeDtlAlt: string;

    @ManyToOne(() => CmmnCl, {nullable: false})
    @JoinColumn({name: 'clCode'})
    clCode: CmmnCl

    constructor(usc001: string) {
        super();
        this.clDtlCode = usc001;
    }
}