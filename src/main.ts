import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe())

   const config = new DocumentBuilder()
    .setTitle('Authorization')
    .setDescription('The Auth API description')
    .setVersion('1.0')
    .addTag('Register & Login')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger_ozodbek', app, documentFactory);

  await app.listen(process.env.PORT ?? 3000, () => {console.log(`Server is running on ${process.env.PORT}`)});
}
bootstrap();
