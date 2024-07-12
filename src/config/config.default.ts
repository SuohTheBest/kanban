import { MidwayConfig } from '@midwayjs/core';
import { join } from 'path';
import { User } from '../entity/User';

export default {
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
} as MidwayConfig;
