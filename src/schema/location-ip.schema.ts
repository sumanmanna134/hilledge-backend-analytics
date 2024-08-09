import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type LocationIpDocument = LocationIp & Document;
@Schema()
export class LocationIp {
  @Prop({ unique: true, required: true })
  ip: string;

  @Prop()
  city: string;

  @Prop()
  region: string;

  @Prop()
  country: string;

  @Prop()
  loc: string;

  @Prop()
  org: string;

  @Prop()
  postal: string;

  @Prop()
  timezone: string;

  @Prop({ default: 0 })
  visitCount: number;

  @Prop({ default: Date.now() })
  updatedAt: Date;
}

export const LocationIpSchema = SchemaFactory.createForClass(LocationIp);
