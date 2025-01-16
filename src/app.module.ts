import {
  MiddlewareConsumer,
  Module,
  NestModule,
  ValidationPipe,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { ScheduleModule } from '@nestjs/schedule';
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { AllExceptionFilter } from './common/filter/all-exception.filter';
import { InterceptorInterceptor } from './common/interceptor/interceptor.interceptor';
import { SimAdminModule } from './sim-admin/sim-admin.module';
import { CorsMiddleware } from './common/middleware/cors.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env.production',
    }),

    // 速率限制
    // 官网推荐的插件，安全模块
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 10,
      },
    ]),
    // 定时任务
    ScheduleModule.forRoot(),

    SimAdminModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,

    // 校验守卫
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        transform: true, // 自动将请求体转换为 DTO 类型
        whitelist: true, // 忽略未定义的属性
        forbidNonWhitelisted: true, // 禁止未知字段
      }),
    },

    // 全局异常过滤器, 内部错误和参数校验错误
    {
      provide: APP_FILTER,
      useClass: AllExceptionFilter,
    },

    // 最后一步处理返回接口数据
    {
      provide: APP_INTERCEPTOR,
      useClass: InterceptorInterceptor,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CorsMiddleware).forRoutes('*');
  }
}
