import {
    Column,
    Entity,
    Generated,
    JoinColumn, ManyToOne,
    OneToMany,
    OneToOne,
    PrimaryColumn,
    PrimaryGeneratedColumn
} from "typeorm";
import {CmmnDtlCl} from "./cmmn_dtl_cl.entity";
import {Auditable} from "../../config/audit/auditable.entity";



@Entity()
export class CmmnCl extends Auditable {
    @PrimaryColumn({name: 'cl_code', length: 3})
    clCode: string;

    @Column({name: 'cl_code_alt', length: 255})
    clCodeAlt: string;

    @ManyToOne(() => CmmnCl)
    @JoinColumn({name: 'upper_cl_code'})
    upperClCode: CmmnCl;
}