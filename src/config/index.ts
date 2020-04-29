import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as config from 'config';

let projectConfig: any;
let projectPort = process.env.PORT || 3000;

// script needed to work around lib `config` problem in zit

if (process.env.NODE_ENV !== 'production') {
  const serverConfig = config.get<any>('server');
  const dbConfig = config.get<any>('db');

  projectConfig = {
    type: dbConfig.type,
    host: dbConfig.host,
    port: dbConfig.port,
    username: dbConfig.username,
    password: dbConfig.password,
    database: dbConfig.database,
    entities: [__dirname + '/../**/**/*.entity.{js,ts}'],
    synchronize: dbConfig.synchronize,
    useUnifiedTopology: true,
  };

  projectPort = serverConfig.port;
} else {
  projectConfig = {
    type: process.env.RDS_TYPE,
    host: process.env.RDS_HOSTNAME,
    port: process.env.RDS_PORT,
    username: process.env.RDS_USERNAME,
    password: process.env.RDS_PASSWORD,
    database: process.env.RDS_DB_NAME,
    entities: [__dirname + '/../**/**/*.entity.{js,ts}'],
    synchronize: process.env.TYPEORM_SYNC,
    useUnifiedTopology: true,
  };
}

export default {
  database: projectConfig as TypeOrmModuleOptions,
  port: projectPort,
};
