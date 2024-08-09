import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type BlockedIpDocument = BlockedIp & Document;
@Schema()
export class BlockedIp {
  @Prop({ required: true })
  ip: string;

  @Prop({ default: Date.now })
  blockedAt: Date;
}

export const BlockedIpSchema = SchemaFactory.createForClass(BlockedIp);
