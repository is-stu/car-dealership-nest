import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { CarsService } from './cars.service';
import { CreateCarDto, UpdateCarDto } from './dto';

@Controller('cars')
export class CarsController {
  constructor(
    @Inject(CarsService)
    private readonly carsService: CarsService,
  ) {}

  @Get()
  getAllCars() {
    return this.carsService.getAllCars();
  }

  @Get(':id')
  getCarById(@Param('id', ParseUUIDPipe) id: string) {
    const car = this.carsService.getCarById(id);

    if (!car) {
      throw new NotFoundException(`Car with id ${id} not found`);
    }
    return car;
  }

  @Post()
  createCar(@Body() createCarDto: CreateCarDto) {
    return this.carsService.createCar(createCarDto);
  }

  @Put(':id')
  updateCar(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateCarDto: UpdateCarDto,
  ) {
    return this.carsService.updateCar(id, updateCarDto);
  }

  @Patch()
  updatePartialCar() {}

  @Delete(':id')
  deleteCar(@Param('id', ParseUUIDPipe) id: string) {
    return this.carsService.deleteCar(id);
  }
}
