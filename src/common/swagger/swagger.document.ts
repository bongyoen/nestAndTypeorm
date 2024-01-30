import {DocumentBuilder, SwaggerCustomOptions, SwaggerModule} from '@nestjs/swagger';
import {INestApplication} from "@nestjs/common";

const swaggerCustomOptions: SwaggerCustomOptions = {
    swaggerOptions: {
        persistAuthorization: true,
    },
};

export class BaseAPIDocument {

    public initializeOptions(app: INestApplication) {
        const config = new DocumentBuilder()
            .setTitle('nest Api')
            .setDescription('유저관리')
            .setVersion('1.0.0')
            .addTag('nest')
            .addBearerAuth(
                {
                    type: "http",
                    scheme: "bearer",
                    name: "JWT",
                    in: "header"
                },
                "access-token"
            )
            .build();
        const document = SwaggerModule.createDocument(app, config);
        SwaggerModule.setup('api', app, document, swaggerCustomOptions);

    }
}