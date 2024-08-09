import { Controller, Post } from '@nestjs/common';
import { IpLocationService } from './ip-location.service';

@Controller('location')
export class LocationController {
  constructor(private readonly locationService: IpLocationService) {}

  @Post('/')
  async create(): Promise<any> {
    return await this.locationService.fetchAndSaveLocation();
  }
}
