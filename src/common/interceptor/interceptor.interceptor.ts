import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable, tap } from 'rxjs';
import { RequestLog } from '../class/request.class';
import { HttpResult } from '../class/result.class';

@Injectable()
export class InterceptorInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    return next.handle().pipe(
      tap(() => {
        RequestLog.log(request);
      }),
      map((data) => {
        return HttpResult.success(
          data?.context ?? data,
          data?.message ?? '操作成功',
        );
      }),
    );
  }
}
