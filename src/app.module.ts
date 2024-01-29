import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {Cat} from "./cats/entity/cats.entity";
import {CatsModule} from './cats/cats.module';
import {AuditingSubscriber} from "./config/audit/entity-subscriber";
import {Users} from "./users/entity/users.entity";
import {CmmnCl} from "./common/entity/cmmn_cl.entity";
import {CmmnDtlCl} from "./common/entity/cmmn_dtl_cl.entity";
import {UsersModule} from "./users/users.module";

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: 'localhost',
            port: 3306,
            username: 'root',
            password: 'root',
            database: 'resourse',
            entities: [Cat, Users, CmmnCl, CmmnDtlCl],
            synchronize: true,

        }),
        CatsModule,
        UsersModule
    ],
    controllers: [AppController],
    providers: [AppService, AuditingSubscriber],
})
export class AppModule {
}
