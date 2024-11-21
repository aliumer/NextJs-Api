import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    ValidationPipe,
    Patch,
    Post,
    Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
// decorator
// users route defined in controller decorator.
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }
    /**
     * Any static route should become before dynamic route
     * PATCH /users/:id
     * DELETE /users:id
     */

    @Get() // GET /users or /users?rol=value&age=25
    findAll(@Query('role') role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
        return this.usersService.findAll(role);
    }

    @Get(':id') // param will be in url
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.usersService.findOne(id);
    }

    @Post()
    create(@Body(ValidationPipe) createUserDto: CreateUserDto) {
        return this.usersService.create(createUserDto);
    }

    @Patch(':id')
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body(ValidationPipe) updateUserDto: UpdateUserDto,
    ) {
        return this.usersService.update(id, updateUserDto);
    }

    @Delete(':id') // param will be in url
    delete(@Param('id', ParseIntPipe) id: number) {
        return this.usersService.delete(id);
    }
}
