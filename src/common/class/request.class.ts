import { Logger } from '@nestjs/common';
import { Request } from 'express';
import * as kleur from 'kleur';
import { AppService } from 'src/app.service';

export class RequestLog {
  constructor() {}
  static log(request: Request, message = '') {
    const commonService = new AppService();
    const logOptions = {
      url: request.url,
      method: request.method,
      params: request.params,
      query: request.query,
      body: request.body,
      ip: commonService.getIp(request),
    };
    Logger.debug(
      `${kleur.yellow('[MOCK_API]')} ${kleur.blue(JSON.stringify(logOptions))}} ${kleur.red(message)}`,
    );
  }
}
