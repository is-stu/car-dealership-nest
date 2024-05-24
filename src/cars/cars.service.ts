import { v4 as uuid } from 'uuid';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Car } from './interfaces/car.interface';
import { CreateCarDto, UpdateCarDto } from './dto';

@Injectable()
export class CarsService {
  private cars: Car[] = [
    // {
    //   id: uuid(),
    //   brand: 'Toyota',
    //   model: 'Corolla',
    // },
    // {
    //   id: uuid(),
    //   brand: 'Honda',
    //   model: 'Civic',
    // },
    // {
    //   id: uuid(),
    //   brand: 'Ford',
    //   model: 'Mustang',
    // },
  ];

  getAllCars() {
    return this.cars;
  }

  getCarById(id: string) {
    const car = this.cars.find((car) => car.id === id);
    if (!car) {
      throw new NotFoundException(`Car with id ${id} not found`);
    }
    return this.cars.find((car) => car.id === id);
  }

  createCar(car: CreateCarDto) {
    const newCar: Car = {
      id: uuid(),
      ...car,
    };
    this.cars.push(newCar);
    return car;
  }

  updateCar(id: string, updateCarDto: UpdateCarDto) {
    const car = this.getCarById(id);
    if (car) {
      //esta logica tambien se puede realizar con un map y asi no es necesario filtrarlo y pushearlo
      this.cars = this.cars.filter((car) => car.id !== id);
      const newCar = {
        ...car,
        ...updateCarDto,
      };
      this.cars.push(newCar);
      return newCar;
    }
  }

  deleteCar(id: string) {
    const existedCar = this.getCarById(id);
    if (existedCar) {
      this.cars = this.cars.filter((car) => car.id !== existedCar.id);
    }
  }

  fillCarsWithSeedData(cars: Car[]) {
    this.cars = cars;
  }
}
