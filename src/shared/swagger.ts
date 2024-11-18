import { INestApplication } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

const configure = (app: INestApplication) => {
    const swaggerConfig = new DocumentBuilder()
        .setTitle(`simple chat`)
        .setDescription("Web Services")
        .setVersion("1.0.0")
        .build();

    const document = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup("/docs", app, document);
};

export default { configure };
