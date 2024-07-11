import { MidwayConfig } from '@midwayjs/core';
import { join } from 'path';

export default {
  // use for cookie sign key, should change to your own and keep security
  keys: '1720596492516_771',
  koa: {
    port: 7001,
  },
  typeorm: {
    dataSource: {
      default: {
        type: 'sqlite',
        database: join(__dirname, '../../database.sqlite'),
        synchronize: true,
        logging: false,
        entities: [join(__dirname, '../entity/*.{ts,js}')],
      },
    },
  },
} as MidwayConfig;
