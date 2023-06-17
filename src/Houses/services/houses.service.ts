import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { DtoHouse } from '../dtos/dto.house';
import { House } from 'src/Houses/models/house.schema';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Injectable()
export class HousesServices {
  constructor(
    @InjectModel(House.name) private HouseModel: Model<House>,
    private cloudinary: CloudinaryService,
  ) {}

  FindAll() {
    return this.HouseModel.find();
  }

  async Create(file: Express.Multer.File, newHouseData: DtoHouse) {
    console.log(file);

    const fileResponse = await this.cloudinary.uploadImage(file);

    const house = new this.HouseModel({
      images: fileResponse.secure_url,
      ...newHouseData,
    });

    await house.save();
    return house;
  }

  async GetById(id: string) {
    const user = await this.HouseModel.findById({ _id: id });

    return user;
  }
}
