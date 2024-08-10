import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VisitorModule } from './visitor/visitor.module';
import { BlockedIpService } from './blocked-ip/blocked-ip.service';
import { RateLimiterMiddleware } from './middlewares/rate-limiter.middleware';
import { getModelToken, MongooseModule } from '@nestjs/mongoose';
import { BlockedIp, BlockedIpSchema } from './schema/blocked-ip.schema';
import { IpLocationModule } from './ip-location/ip-location.module';
import { IpLocationService } from './ip-location/ip-location.service';
import { LocationIp } from './schema/location-ip.schema';
import { Model } from 'mongoose';
import { HttpService } from '@nestjs/axios';

@Module({
  imports: [
    MongooseModule.forRoot(''),
    MongooseModule.forFeature([
      { name: BlockedIp.name, schema: BlockedIpSchema },
    ]),
    VisitorModule,
    IpLocationModule,
  ],
  controllers: [AppController],
  providers: [AppService, BlockedIpService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RateLimiterMiddleware).exclude('location').forRoutes('*');
  }
}
