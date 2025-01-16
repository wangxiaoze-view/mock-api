import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import * as kleur from 'kleur';
import { Logger } from '@nestjs/common';
import { AppService } from './app.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  // app.setGlobalPrefix(process.env.API_GLOBAL_PREFIX);
  app.use(
    helmet({
      contentSecurityPolicy: false,
    }),
  );

  await app.listen(process.env.PORT, () => {
    const commonService = new AppService();
    const localIpAddresses = commonService.getLocalIpAddresses();
    const runningInfo = `\n
      App running at:
        - Local:   ${kleur.green(`http://localhost:${process.env.PORT}${process.env.API_GLOBAL_PREFIX}/`)}
        - Network: ${kleur.green(`http://${localIpAddresses[0]}:${process.env.PORT}${process.env.API_GLOBAL_PREFIX}/`)}
      Docs running at:
        - Local:   ${kleur.green(`http://localhost:${process.env.PORT}${process.env.SWAGGER_PATH}/`)}
        - Network: ${kleur.green(`http://${localIpAddresses[0]}:${process.env.PORT}${process.env.SWAGGER_PATH}/`)}
    `;
    Logger.log(runningInfo);
  });
}
bootstrap();
