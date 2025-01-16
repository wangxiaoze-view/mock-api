export class HttpResult {
  readonly message: string;
  readonly status: number;
  readonly timestamp: string = new Date().toISOString();
  readonly context: unknown;
  constructor(
    context?: unknown,
    message: string = 'success',
    status: number = 200,
  ) {
    this.context = context;
    this.message = message;
    this.status = status;
  }

  static success(context: unknown, message = '操作成功') {
    return new HttpResult(context, message, 200);
  }

  static error(message = '操作失败', status = 500) {
    return new HttpResult(null, message, status);
  }
}
