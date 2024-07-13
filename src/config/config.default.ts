import { MidwayAppInfo } from '@midwayjs/core';
import { join } from 'path';
import { User } from '../entity/User';

export default (appInfo: MidwayAppInfo) => {
  return {
    keys: '1720596492516_771',
    koa: {
      port: 7001,
      globalPrefix: '/api',
    },
    typeorm: {
      dataSource: {
        default: {
          type: 'sqlite',
          database: join(__dirname, '../../database.sqlite'),
          synchronize: true,
          entities: [User],
          logging: ['info', 'warn', 'error'],
          // entities: [join(__dirname, '../entity/*.{ts,js}')],
        },
      },
    },
    jwt: {
      secret: 'test123456', // fs.readFileSync('xxxxx.key')
      sign: {
        // signOptions
        expiresIn: '2d', // https://github.com/vercel/ms
      },
    },
  };
};
