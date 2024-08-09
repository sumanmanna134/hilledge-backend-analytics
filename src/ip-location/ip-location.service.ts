import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { LocationIp, LocationIpDocument } from '../schema/location-ip.schema';
import { Model } from 'mongoose';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class IpLocationService {
  constructor(
    @InjectModel(LocationIp.name)
    private locationIpDocument: Model<LocationIpDocument>,
    private httpService: HttpService,
  ) {}

  async fetchAndSaveLocation(): Promise<any> {
    const httpResponse = await lastValueFrom(
      this.httpService.get('https://ipinfo.io/json'),
    );
    const locationData = httpResponse.data;
    console.log(locationData);
    const isLocationIpExist = await this.locationIpDocument.findOne({
      ip: locationData['ip'],
    });
    if (!isLocationIpExist) {
      const createdLocation = new this.locationIpDocument(locationData);
      return await createdLocation.save();
    }
    isLocationIpExist.visitCount += 1;
    return await isLocationIpExist.save();
  }
}
