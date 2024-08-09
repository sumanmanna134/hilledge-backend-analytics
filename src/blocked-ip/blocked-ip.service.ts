import { forwardRef, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BlockedIp, BlockedIpDocument } from '../schema/blocked-ip.schema';
import { Model } from 'mongoose';

@Injectable()
export class BlockedIpService {
  constructor(
    @InjectModel(BlockedIp.name)
    private blockedIpModel: Model<BlockedIpDocument>,
  ) {}

  async blockIp(ip: string): Promise<BlockedIp> {
    const blockedIp = new this.blockedIpModel({ ip });
    return blockedIp.save();
  }

  async isBlockedIp(ip: string): Promise<boolean> {
    const blockedIp = await this.blockedIpModel.findOne({ ip });
    return !!blockedIp;
  }
}
