import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as bcrypt from 'bcrypt';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {

  @Prop() 
  photo: string;
  
  @Prop()
  name: string;

  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop({default: Date.now()})
  created_at: Date 

  @Prop() 
  contact: string 
  
}




export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre('save', async function (next: any)   {
  if (!this.isModified('password')) return next();
  this.password =  await bcrypt.hash(this.password, 10);
  next();
});