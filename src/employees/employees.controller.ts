import { Prisma } from '@prisma/client';
import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Ip } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { Throttle, SkipThrottle } from '@nestjs/throttler';
import { MyLoggerService } from 'src/my-logger/my-logger.service';

@SkipThrottle()
@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) { }

  private readonly logger = new MyLoggerService(EmployeesController.name);

  @Post()
  create(@Body() createdEmployee: Prisma.EmployeeCreateInput) {
    return this.employeesService.create(createdEmployee);
  }

  @SkipThrottle({ default: false })
  @Get()
  findAll(
    @Ip() ip: string,
    @Query('role') role?: 'INTERN' | 'ENGINEER' | 'ADMIN',
  ) {
    // we need to log the IP address of who ever calls this method
    // to get this we need something from NestJS
    this.logger.log(`Request for all employees\t${ip}`, EmployeesController.name);
    return this.employeesService.findAll(role);
  }

  @Throttle({ short: { ttl: 1000, limit: 1 } })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.employeesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatedEmployee: Prisma.EmployeeUpdateInput) {
    return this.employeesService.update(+id, updatedEmployee);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.employeesService.remove(+id);
  }
}
