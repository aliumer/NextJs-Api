import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class EmployeesService {
  constructor(private readonly databaseService: DatabaseService) { }

  async create(createdEmployee: Prisma.EmployeeCreateInput) {
    return this.databaseService.employee.create({
      data: createdEmployee
    });
  }

  async findAll(role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
    if (role) return this.databaseService.employee.findMany({
      where: {
        role,
      }
    });
    return this.databaseService.employee.findMany();
  }

  async findOne(id: number) {
    return this.databaseService.employee.findUnique({
      where: {
        id,
      }
    });
  }

  async update(id: number, updatedEmployee: Prisma.EmployeeUpdateInput) {
    return this.databaseService.employee.update({
      where: {
        id
      },
      data: updatedEmployee
    });
  }

  async remove(id: number) {
    return this.databaseService.employee.delete({
      where: {
        id,
      }
    })
  }
}
