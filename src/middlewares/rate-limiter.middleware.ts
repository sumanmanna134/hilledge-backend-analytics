import { forwardRef, Inject, Injectable, NestMiddleware } from '@nestjs/common';
import { BlockedIpService } from '../blocked-ip/blocked-ip.service';
import { rateLimit } from 'express-rate-limit';
import { Request, Response } from 'express';
import { IpLocationService } from '../ip-location/ip-location.service';
import { IpLocationModule } from '../ip-location/ip-location.module';
import { ModuleRef } from '@nestjs/core';

@Injectable()
export class RateLimiterMiddleware implements NestMiddleware {
  private readonly limiter;
  constructor(
    private locationService: IpLocationService,
    private readonly blockedIpService: BlockedIpService,
  ) {
    this.limiter = rateLimit({
      windowMs: 2 * 60 * 1000,
      limit: 5,
      handler: async (req: Request, res: Response) => {
        console.log(req.ip);
        const locationData = await this.locationService.fetchAndSaveLocation();
        await this.blockedIpService.blockIp(locationData['ip']);
        res.status(429).send({
          message: 'Too many requests from this IP, please try again later.',
        });
      },
    });
  }
  async use(req: any, res: any, next: (error?: Error | any) => void) {
    console.log(
      req.headers['x-forwarded-for'] || req.socket.remoteAddress || '',
    );
    const locationData = await this.locationService.fetchAndSaveLocation();
    if (await this.blockedIpService.isBlockedIp(locationData['ip'])) {
      return res.status(429).send({
        message: 'This IP has been blocked due to excessive requests.',
      });
    }
    this.limiter(req, res, next);
  }
}
