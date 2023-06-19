import { Model } from 'mongoose';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {User} from "src/Users/models/user.schema"
import {  DtoUser, DtoUserLogin } from '../dtos/dto.user';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';


@Injectable() 
export class UsersServices {
  constructor(@InjectModel(User.name) private UserModel: Model<User>,
  private readonly jwtService: JwtService,
  private cloudinary: CloudinaryService

  ) {}

  FindAll() {
    return this.UserModel.find()
  }


  async FindOneById(id: string) {
    return this.UserModel.findOne({_id: id})
  }


  async Create(creatingUserData: DtoUser) {

    const emailExist = await this.UserModel.findOne({email: creatingUserData.email})

    if(emailExist) {
      throw new BadRequestException('Email already exist.');
    }

    const user =  new this.UserModel(creatingUserData)

 
    await user.save()

    return user
    
  }




  async Login(login: DtoUserLogin) {
    const userExist = await this.UserModel.findOne({email: login.email})
    
    
    if(!userExist) {
      throw new BadRequestException ("User not exist.")
    }

    const payload = {name: userExist.name, _id: userExist.id}

    const passwordCompare = await bcrypt.compare(login.password, userExist.password )
    
    if(!passwordCompare) {
      throw new BadRequestException ("Password is not correct.")
    }   

    return  {
      token: this.jwtService.sign(payload),
    }
  }

  async NewPhoto(file: Express.Multer.File, _id: string) {
    const user = await this.UserModel.findById(_id)

    const fileResponse = await this.cloudinary.uploadImage(file)
    user.photo = fileResponse.secure_url 

    await user.save()

    return user
  }

  async newContact(id: string, contact: string) {
    try {

      
      const user = await this.UserModel.findByIdAndUpdate({_id: id}, { contact }, { new: true });
   
      
      await user.save();
  
      return user;
    } catch (error) {
      // Handle any errors that occurred during the process
      console.log(error);
      throw new Error('Failed to update contact information');
    }
  }
  
}  