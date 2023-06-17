import {
  Controller,
  Get,
  Body,
  Post,
  Param,
  Put,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { HousesServices } from '../services/houses.service';
import { DtoHouse } from '../dtos/dto.house';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('houses')
export class HousesController {
  constructor(private readonly houses: HousesServices) {}

  @Get()
  FindAll() {
    return this.houses.FindAll();
  }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  Create(
    @UploadedFile() file: Express.Multer.File,
    @Body() newHouseData: DtoHouse,
  ) {
    return this.houses.Create(file, newHouseData);
  }

  @Get(':id')
  GetById(@Param('id') id: string) {
    return this.houses.GetById(id);
  }
}
