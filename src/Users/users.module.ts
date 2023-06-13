import { Module } from "@nestjs/common"
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from "src/Users/models/user.schema"
import { UsersController } from "./controllers/user.controller";
import { UsersServices } from "./services/user.service";
import { JwtModule } from "@nestjs/jwt";


@Module({
  controllers: [UsersController],
  providers: [UsersServices],
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  JwtModule.register({
    secret: "cor", 
    signOptions: { expiresIn: '1h' }, 
  })
  
],
})

export class UserModule {}