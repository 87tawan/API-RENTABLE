import { Controller, Get, Post, Body, UseInterceptors, UploadedFile, Param , Put} from "@nestjs/common"
import { UsersServices } from "../services/user.service"
import {   DtoUser, DtoUserLogin } from "../dtos/dto.user"
import { FileInterceptor } from "@nestjs/platform-express"


@Controller("users")
export class UsersController {
  constructor(private readonly users: UsersServices) {}


  @Get() 
  FindAll() {
    return this.users.FindAll()
  }

  @Get("getbyid/:id") 
  FindOneById(@Param("id") id: string) {
      return this.users.FindOneById(id)
  }

  @Post("/register")
  Create(@Body() creatingUserData: DtoUser) {
    return this.users.Create(creatingUserData)
  }

  @Post("/login")
  Login(@Body() login: DtoUserLogin) {
    return this.users.Login(login)
  }

  @Put("newcontact/:id")
  newContact(@Param("id") id: string, @Body('contact') contact: string) {
    return this.users.newContact(id, contact)
}



  @Post("/newphoto")
  @UseInterceptors(FileInterceptor('file'))
  NewPhoto(@UploadedFile() file: Express.Multer.File, @Body() _id: string ) {
    return this.users.NewPhoto(file, _id)
  }



}