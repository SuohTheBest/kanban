import { Configuration, App } from '@midwayjs/core';
import * as koa from '@midwayjs/koa';
import * as validate from '@midwayjs/validate';
import * as info from '@midwayjs/info';
import * as typeorm from '@midwayjs/typeorm';
import * as cors from '@koa/cors';
import * as jwt from '@midwayjs/jwt';

import { join } from 'path';
import { ReportMiddleware } from './middleware/report.middleware';
import { JwtMiddleware } from './middleware/jwt.middleware';
import * as upload from '@midwayjs/upload';
import * as fs from 'node:fs';

@Configuration({
  imports: [
    koa,
    validate,
    typeorm,
    jwt,
    cors,
    upload,
    {
      component: info,
      enabledEnvironment: ['local'],
    },
  ],
  importConfigs: [join(__dirname, './config')],
})
export class MainConfiguration {
  @App('koa')
  app: koa.Application;

  async onReady() {
    // add middleware
    this.app.useMiddleware([ReportMiddleware, JwtMiddleware]);
    this.app.use(
      cors({
        credentials: true,
        allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
        origin: '*',
      })
    );
    const uploadDir = this.app.getConfig('upload.baseDir');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    // add filter
    // this.app.useFilter([NotFoundFilter, DefaultErrorFilter]);
  }
}
