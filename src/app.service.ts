import { Injectable } from '@nestjs/common';
import dayjs from 'dayjs';
import { networkInterfaces } from 'node:os';
import * as requestIp from 'request-ip';
import { Request } from 'express';

@Injectable()
export class AppService {
  constructor() {}
  /**
   * @description 获取本地IP地址列表
   * @returns 本地IP地址列表
   */
  getLocalIpAddresses(): string[] {
    const interfaces = networkInterfaces();
    const addresses: string[] = [];
    for (const iface of Object.values(interfaces)) {
      if (Array.isArray(iface)) {
        for (const info of iface) {
          if (!info.internal && info.family === 'IPv4') {
            addresses.push(info.address);
          }
        }
      }
    }
    return addresses;
  }

  /**
   * @description 格式化时间
   * @param date 时间
   * @param format 格式，默认YYYY-MM-DD HH:mm:ss
   * @returns
   */
  formatDate(date = new Date(), format = 'YYYY-MM-DD HH:mm:ss') {
    return dayjs(date).format(format);
  }

  /**
   * @description 格式化ip
   * @param ip ip地址
   * @returns
   */

  getIp(_requestIp: Request | string) {
    const _ip =
      typeof _requestIp === 'object'
        ? requestIp.getClientIp(_requestIp) || _requestIp.ip
        : _requestIp;
    return _ip.replace('::ffff:', '');
  }

  getHello(): string {
    return 'Hello World!';
  }
}
