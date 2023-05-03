import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const cors = require('cors');

const corsOptions = {
  origin: '*',
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cors(corsOptions));
  app.setGlobalPrefix('api');
  await app.listen(3000);
}
bootstrap();
