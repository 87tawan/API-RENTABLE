import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/Users/models/user.schema';
import {  DtoEditContact, DtoUser, DtoUserLogin } from '../dtos/dto.user';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Injectable()
export class UsersServices {
  constructor(
    @InjectModel(User.name) private UserModel: Model<User>,
    private readonly jwtService: JwtService,
    private readonly cloudinary: CloudinaryService
  ) {}

  FindAll() {
    return this.UserModel.find();
  }

  async FindOneById(id: string) {
    const user =  await this.UserModel.findById({_id : id})
   
    return user
  }

  async Create(creatingUserData: DtoUser) {
    const user = new this.UserModel(creatingUserData);

    await user.save();

    return user;
  }

  
  async newPhoto (file: Express.Multer.File, id: string) {
    const fileResponse = await this.cloudinary.uploadImage(file)
    const user =  await this.UserModel.findById({_id : id})
    console.log(id)
    console.log(user)


     user.photo = fileResponse.secure_url

    await user.save()

    return user

}

  async editContact(id: string, contact: DtoEditContact) {
    const filter = {_id : id}
    
      const user = await this.UserModel.findByIdAndUpdate(filter, contact, {new: true})

      if(!user) {
        throw new Error("User not exist.")
      }

     
      return user
     
  }

  async Login(login: DtoUserLogin) {
    const userExist = await this.UserModel.findOne({ email: login.email });
    const payload = { name: userExist.name, _id: userExist.id };
    if (!userExist) {
      throw new Error('User not exist.');
    }

    const passwordCompare = await bcrypt.compare(
      login.password,
      userExist.password,
    );

    if (!passwordCompare) {
      throw new Error('Password is not correct.');
    }

    return {
      token: this.jwtService.sign(payload),
    };
  }
}
