import { HttpException } from '@nestjs/common';
import { HttpStatusCode } from '../enum /http.enum';

export class ApiException extends HttpException {
  private errCode: number;
  constructor(
    msg: string | Record<string, any>,
    errCode: HttpStatusCode = HttpStatusCode.OK,
  ) {
    switch (errCode) {
      // 没有权限访问
      case HttpStatusCode.UNAUTHORIZED:
        super(msg, HttpStatusCode.OK);
        this.errCode = HttpStatusCode.UNAUTHORIZED;
        break;
      // 登录失效
      case HttpStatusCode.FORBIDDEN:
        super(msg, HttpStatusCode.OK);
        this.errCode = HttpStatusCode.FORBIDDEN;
        break;
      // 资源不存在， 验证码，接口地址，图片资源等等
      case HttpStatusCode.NOT_FOUND:
        super(msg, HttpStatusCode.OK);
        this.errCode = HttpStatusCode.NOT_FOUND;
        break;
      // 其他归于服务器内部错误
      default:
        super(msg, errCode ?? HttpStatusCode.OK);
        this.errCode = HttpStatusCode.INTERNAL_SERVER_ERROR;
    }
  }
  getErrCode(): number {
    return this.errCode;
  }
}
