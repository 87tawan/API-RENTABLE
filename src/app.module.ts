import { Module } from '@nestjs/common';
import { HouseModule } from './Houses/houses.module';
import { MongooseModule } from '@nestjs/mongoose';
import * as dotenv from 'dotenv';
import { UserModule } from './Users/users.module';

import { CloudinaryModule } from './cloudinary/cloudinary.module';

dotenv.config();

@Module({
  controllers: [],
  providers: [],
  imports: [
    HouseModule,
    UserModule,
    MongooseModule.forRoot(process.env.DATABASE_URL),
    CloudinaryModule,
  ],
})
export class AppModule {}
