import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type HouseDocument = HydratedDocument<House>;

@Schema()
export class House {
  @Prop()
  images: string;

  @Prop()
  title: string;

  @Prop()
  apresentation: string;

  @Prop()
  description: string;

  @Prop()
  price: number;

  @Prop()
  type: string;

  @Prop()
  bathrooms: number;

  @Prop()
  rooms: number;

  @Prop()
  city: string;

  @Prop()
  state: string;

  @Prop()
  pets: string;

  @Prop({ default: Date.now() })
  created_at: Date;
}

export const HouseSchema = SchemaFactory.createForClass(House);
