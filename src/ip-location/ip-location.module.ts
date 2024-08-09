import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Mongoose } from 'mongoose';
import { LocationIp, LocationIpSchema } from '../schema/location-ip.schema';
import { IpLocationService } from './ip-location.service';
import { HttpModule } from '@nestjs/axios';
import { LocationController } from './ip-location.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: LocationIp.name, schema: LocationIpSchema },
    ]),
    HttpModule,
  ],
  controllers: [LocationController],

  providers: [IpLocationService],
  exports: [IpLocationService],
})
export class IpLocationModule {}
