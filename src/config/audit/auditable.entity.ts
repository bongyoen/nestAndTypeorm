import {Column, CreateDateColumn, UpdateDateColumn} from "typeorm";
import {UseYnStatus} from "../app_enum/use_yn_status.enum";

export abstract class Auditable {
    @Column({default: 'anonymous'})
    createdBy: string;

    @Column({default: "anonymous"})
    updatedBy: string;

    @Column()
    @CreateDateColumn()
    createdAt: Date;

    @Column()
    @UpdateDateColumn()
    updatedAt: Date;

    @Column({type: 'enum', default: UseYnStatus.Y, enum: UseYnStatus, nullable: false})
    useYn: UseYnStatus;
}