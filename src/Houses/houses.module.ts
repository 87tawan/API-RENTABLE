import { Module } from '@nestjs/common';
import { HousesController } from './controllers/houses.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { House, HouseSchema } from 'src/Houses/models/house.schema';
import { HousesServices } from './services/houses.service';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';

@Module({
  controllers: [HousesController],
  providers: [HousesServices],
  imports: [
    CloudinaryModule,
    MongooseModule.forFeature([{ name: House.name, schema: HouseSchema }]),
  ],
})
export class HouseModule {}
