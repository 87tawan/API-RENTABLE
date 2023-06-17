import { Controller, Get, Post, Body, UseInterceptors, UploadedFile, Param, Put } from '@nestjs/common';
import { UsersServices } from '../services/user.service';
import { DtoEditContact, DtoUser, DtoUserLogin } from '../dtos/dto.user';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('users')
export class UsersController {
  constructor(private readonly users: UsersServices) {}

  @Get()
  FindAll() {
    return this.users.FindAll();
  }

  @Get("/getbyid/:id")
  FindOneById(@Param("id") id: string) {
    return this.users.FindOneById(id);
  }

  @Post('/register')
  Create(@Body() creatingUserData: DtoUser) {
    return this.users.Create(creatingUserData);
  }

  @Post('/login')
  Login(@Body() login: DtoUserLogin) {
    return this.users.Login(login);
  }

  @Post("/newphoto/:id")
  @UseInterceptors(FileInterceptor("file"))
  newPhoto(@UploadedFile() file: Express.Multer.File, @Param("id") id: string) {
    return this.users.newPhoto(file, id)
  }


  @Put("/editcontact/:id") 
  editContact(@Param("id") id: string, @Body() contact: DtoEditContact) {
    return this.users.editContact(id, contact)
  }
}
