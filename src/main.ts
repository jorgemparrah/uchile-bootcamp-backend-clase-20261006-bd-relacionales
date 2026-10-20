import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // PRUEBA
  app.enableCors();

  const configService = app.get<ConfigService>(ConfigService);

  const ambiente = configService.get<string>('NODE_ENV', 'NO DEFINIDO');
  const rutaSwagger = configService.get<string>('RUTA_SWAGGER', 'api');
  const config = new DocumentBuilder()
  .setTitle(`API de Eventos - ${ambiente}`)
  .setDescription('Gestionar eventos')
  .setVersion('1.0.0')
  .build();
  
  const document = SwaggerModule.createDocument(
    app, config,
  );
  
  SwaggerModule.setup(
    rutaSwagger,
    app,
    document,
  );
  
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    // whitelist: true,
    // forbidNonWhitelisted: true
  }));
  // app.useGlobalFilters(new HttpExceptionFilter());
  //if (!process.env.PORT) {
    //}
  const port = configService.get<number>('PORT', 3000);
  console.log("PUERTO", port);
  await app.listen(port);
}
bootstrap();
