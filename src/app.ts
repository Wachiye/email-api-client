/* eslint-disable @typescript-eslint/no-unused-vars */
import http, {Server} from 'http';
import cors from 'cors';
import express, {Application} from 'express';
import helmet from 'helmet';
import 'dotenv/config';
import registerRoutes from './routes';
import appConfig from './config/app.config';
import connectDb from './config/mongoose.config';
import { requestHandler } from './middleware/handler-wrapper';
import { AppError } from './common/common.interface';

export default class App {
  public express: Application = express();

  public httpServer: Server = new Server();

  public async init(): Promise<void> {
    await connectDb();

    this.express = express();
    this.httpServer = http.createServer(this.express);

    // add all global middleware like cors
    this.middleware();

    // register the all routes
    this.routes();
  }
  /**
   * here register your all routes
   */
  private routes(): void {
    this.express.use('/', registerRoutes());

    // route not found
    this.express.use('*', (_req, _res, _next) => {
      throw new AppError('Route not found',{status:405});
    });
  }

  /**
   * here you can apply your middlewares
   */
  private middleware(): void {
    // support application/json type post data
    // support application/x-www-form-urlencoded post data
    // Helmet can help protect your app from some well-known web vulnerabilities by setting HTTP headers appropriately.
    this.express.use(helmet({contentSecurityPolicy: false}));
    this.express.use(express.json({limit: '100mb'}));
    this.express.use(express.urlencoded({limit: '100mb', extended: true}));
    // add multiple cors options as per your use
    const corsOptions = {
      origin: appConfig.corsOrigin,
    };
    this.express.use(cors(corsOptions));
    this.express.use(requestHandler);
  }
}