import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
    private users = [
        {
            id: 1,
            name: 'Naeem',
            email: 'test@yopmail.com',
            role: 'INTERN',
        },
        {
            id: 2,
            name: 'Ali',
            email: 'test@yopmail.com',
            role: 'ENGINEER',
        },
        {
            id: 3,
            name: 'Umair',
            email: 'test@yopmail.com',
            role: 'ENGINEER',
        },
        {
            id: 4,
            name: 'Umer',
            email: 'test@yopmail.com',
            role: 'ADMIN',
        },
        {
            id: 5,
            name: 'Baber',
            email: 'test@yopmail.com',
            role: 'INTERN',
        },
    ];
    findAll(role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
        if (role) {
            const roles = this.users.filter((u) => u.role === role);
            if (roles.length === 0) throw new NotFoundException('User Role Not Found');
            return roles;
        }
        return this.users;
    }

    findOne(id: number) {
        const user = this.users.find((u) => u.id === id);
        if (!user) throw new NotFoundException('User not found');
        return user;
    }

    create(createUserDto: CreateUserDto) {
        const usersByHighestId = [...this.users].sort((a, b) => (b.id - a.id));
        const newUser = {
            ...createUserDto,
            id: usersByHighestId[0].id + 1,
        };
        this.users.push(newUser);
        return newUser;
    }

    update(id: number, updatedUserDto: UpdateUserDto) {
        this.users = this.users.map((user) => {
            if (user.id === user.id) {
                return { ...user, ...updatedUserDto };
            }
            return user;
        });

        return this.findOne(id);
    }

    delete(id: number) {
        const removedUser = this.findOne(id);
        this.users = this.users.filter((u) => u.id !== id);

        return removedUser;
    }
}
