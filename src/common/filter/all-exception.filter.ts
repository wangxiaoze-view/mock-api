import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpResult } from '../class/result.class';
import { RequestLog } from '../class/request.class';
import { ApiException } from '../exception /api.exception';

@Catch()
export class AllExceptionFilter<T> implements ExceptionFilter {
  catch(exception: T, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const { status, result } = this.errorResult(exception);
    response.header('Content-Type', 'application/json; charset=utf-8');
    response.status(status).json(result);
    RequestLog.log(ctx.getRequest(), result.message);
  }

  errorResult(exception: unknown) {
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const code =
      exception instanceof ApiException
        ? (exception as ApiException).getErrCode()
        : status;

    let message: string;
    if (exception instanceof HttpException) {
      const response = exception.getResponse();
      message = (response as any).message ?? response;
    } else {
      message = `${exception}`;
    }

    const getMsg = message;
    if (Array.isArray(message)) {
      message = getMsg[0];
    } else {
      message = getMsg;
    }

    return {
      status: ![200, 500, 401].includes(status) ? 200 : status,
      result: HttpResult.error(message, code),
    };
  }
}
