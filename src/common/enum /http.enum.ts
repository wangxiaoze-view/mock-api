// 定义HTTP状态码的枚举，用于统一表示和处理HTTP请求的不同结果
export enum HttpStatusCode {
  // 2xx 状态码表示请求已成功处理
  OK = 200, // 请求成功
  CREATED = 201, // 请求已成功创建新的资源
  ACCEPTED = 202, // 请求已经接受，但未处理完成
  NO_CONTENT = 204, // 服务器已成功处理请求，但没有返回任何内容
  PARTIAL_CONTENT = 206, // 服务器已成功处理了部分范围请求

  // 3xx 状态码表示重定向
  MULTIPLE_CHOICES = 300, // 请求的目标有多个重定向地址
  MOVED_PERMANENTLY = 301, // 请求的资源已被永久移动到新的URI
  FOUND = 302, // 请求的资源临时移动到新的URI
  SEE_OTHER = 303, // 临时重定向，且应使用GET方法获取新的URI
  NOT_MODIFIED = 304, // 自上次请求以来，请求的资源未修改
  USE_PROXY = 305, // 访问资源应通过代理进行
  TEMPORARY_REDIRECT = 307, // 临时重定向
  PERMANENT_REDIRECT = 308, // 永久重定向

  // 4xx 状态码表示客户端错误
  BAD_REQUEST = 400, // 请求的语法错误或请求无法理解
  UNAUTHORIZED = 401, // 未授权访问
  PAYMENT_REQUIRED = 402, // 暂未使用，保留给将来可能的需求
  FORBIDDEN = 403, // 客户端没有足够的权限访问请求的资源
  NOT_FOUND = 404, // 未找到请求的资源
  METHOD_NOT_ALLOWED = 405, // 不允许使用此方法请求资源
  NOT_ACCEPTABLE = 406, // 无法使用请求的内容特性响应请求
  PROXY_AUTHENTICATION_REQUIRED = 407, // 通过代理服务器访问资源需要进行代理认证
  REQUEST_TIMEOUT = 408, // 请求超时
  CONFLICT = 409, // 请求的资源存在冲突

  // 更多的4xx状态码，表示客户端错误
  GONE = 410, // 之前可用的资源现已不可用，且将来也不会可用
  LENGTH_REQUIRED = 411, // 服务器拒绝在没有定义Content-Length头的情况下接受请求
  PRECONDITION_FAILED = 412, // 请求头中给出的条件不满足
  PAYLOAD_TOO_LARGE = 413, // 请求的实体太大
  URI_TOO_LONG = 414, // 请求的URI太长
  UNSUPPORTED_MEDIA_TYPE = 415, // 请求的媒体类型不受支持
  RANGE_NOT_SATISFIABLE = 416, // 请求的范围无效
  EXPECTATION_FAILED = 417, // 服务器无法满足期望头字段的要求

  UNPROCESSABLE_ENTITY = 422, // 请求的实体不可处理但可能是有效的
  TOO_MANY_REQUESTS = 429, // 发起的请求太多，太频繁

  // 5xx 状态码表示服务器错误
  INTERNAL_SERVER_ERROR = 500, // 服务器发生内部错误
  NOT_IMPLEMENTED = 501, // 服务器不支持请求的方法
  BAD_GATEWAY = 502, // 服务器作为网关或代理，从上游服务器收到无效响应
  SERVICE_UNAVAILABLE = 503, // 服务器目前无法使用（由于临时过载或维护）
  GATEWAY_TIMEOUT = 504, // 服务器作为网关或代理，但是没有及时从上游服务器收到请求
  HTTP_VERSION_NOT_SUPPORTED = 505, // 服务器不支持请求使用的HTTP版本

  // 表示未知的状态码
  UNKNOWN = 999,
}
