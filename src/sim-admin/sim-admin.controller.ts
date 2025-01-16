import { Body, Controller, Get, Post, Request } from '@nestjs/common';
import { SimAdminService } from './sim-admin.service';
import { Request as _Request } from 'express';
import { mock, Random } from 'mockjs';
import { sim_admin_notice } from './config/sim-admin-notice';
import { SimLoginUser } from './dto/sim-admin';
import { sim_admin_user } from './config/sim-admin-config';
import { ApiException } from 'src/common/exception /api.exception';
import { HttpStatusCode } from 'src/common/enum /http.enum';

// sim-admin 系统，不做细致区分，用到的mock接口并不多
@Controller('sim-admin')
export class SimAdminController {
  constructor(private readonly simAdminService: SimAdminService) {}

  // 登录
  @Post('/login')
  findAll(@Body() body: SimLoginUser) {
    const { username, password } = body;
    const user = sim_admin_user[username];
    if (!user || username !== password) {
      throw new ApiException('用户名或密码错误', HttpStatusCode.BAD_REQUEST);
    }
    return { token: user.token };
  }

  // 获取用户信息
  @Get('/getUserInfo')
  getUserInfo(@Request() req: _Request) {
    const authorization: string = req.headers.authorization || '';
    const k = 'Bearer ';
    const userName = authorization
      .replace(k, '')
      .split('-token-')[0]
      .split('-')[1];
    if (!authorization.startsWith(k) || !userName) {
      throw new ApiException('登录失效', HttpStatusCode.UNAUTHORIZED);
    }
    const user = sim_admin_user[userName.toLocaleLowerCase()];

    return {
      id: Random.id(),
      userName,
      name: Random.cname(),
      emial: Random.email(),
      ip: Random.ip(),
      country: Random.county(true),
      roles: user.role,
      permissions: user.permission,
      avatar:
        'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    };
  }

  // 获取公告
  @Get('/getNoticeList')
  getNoticeList() {
    return sim_admin_notice;
  }

  // 模拟表格数据
  @Get('/getTotalData')
  getTotalData(@Request() req: _Request) {
    const count = 50;
    const data = mock({
      'list|10': [
        {
          'id|+1': 1,
          name: '@cname',
          'avatar|1': [
            'https://picsum.photos/50/50?random=1',
            'https://picsum.photos/50/50?random=2',
          ],
          'email|1': ['@email', '-'],
          'status|1': ['0', '1'],
          'createTime|1': ['@datetime', '-'],
          'updateTime|1': ['@datetime', '-'],
          'address|1': ['@county(true)', '-'],
        },
      ],
    });
    const page = req.query.page || 1;
    const pageSize = req.query.pageSize || 10;
    return {
      total: count,
      ...data,
      page,
      pageSize,
    };
  }

  // 模拟动态数据
  @Get('/getDynamic')
  getDynamic() {
    const data = [];
    for (let i = 0; i < 15; i++) {
      data.push({
        name: Random.cname(),
        avthor: `https://picsum.photos/50/50?random=${Random.guid()}`,
        title: Random.cname(),
        description: Random.cparagraph(1, 3),
        color: Random.color(),
        week: Random.natural(1, 7),
        date: Random.date(),
      });
    }
    return data;
  }
}
