import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export class BaseAPIDocument {
    public builder = new DocumentBuilder();

    public initializeOptions() {
        return this.builder
            .setTitle('nest Api')
            .setDescription('유저관리')
            .setVersion('1.0.0')
            .addTag('nest')
            .build();
    }
}