import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {AuditingSubscriber} from "./common/audit/entity-subscriber";
import {Users} from "./common/entity/users.entity";
import {UsersModule} from "./users/users.module";
import {AuthModule} from "./auth/auth.module";
import {ConfigModule} from "@nestjs/config";
import {MailModule} from './common/mail/mail.module';
import {CmmnCl} from "./common/entity/cmmn_cl.entity";
import {CmmnDtlCl} from "./common/entity/cmmn_dtl_cl.entity";

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: 'localhost',
            // host: 'mysql',
            port: 3306,
            username: 'root',
            password: 'root',
            database: 'resourse',
            entities: [Users, CmmnCl, CmmnDtlCl],
            synchronize: true,

        }),
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: `.${process.env.NODE_ENV}.env`
        }),
        UsersModule,
        AuthModule,
        MailModule,
    ],
    providers: [AuditingSubscriber],

})
export class AppModule {
}
