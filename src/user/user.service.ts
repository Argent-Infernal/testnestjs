import { Injectable } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { PrismaService } from 'src/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class UserService {
    constructor(private readonly prisma: PrismaService) {}

    async create(createUserDto: UserDto): Promise<{ success: boolean }> {
        const existingUser = await this.prisma.user.findUnique({
            where: { name: createUserDto.name },
        });
    
        if (existingUser) {
            throw new Error('Пользователь с таким именем уже существует');
        }
        console.log(createUserDto.roles)
        const user = await this.prisma.user.create({
            data: {
                password: createUserDto.password,
                name: createUserDto.name,
                roles: createUserDto.roles ? {
                    connect: createUserDto.roles.map(roleId => ({ id: roleId })),
                } : undefined,
            },
        });
    
        return { success: true };
    }

    async findAll(): Promise<User[]> {
        const users = await this.prisma.user.findMany({
            select: {
                login: true,
                name: true,
                password: true,
            }
        })

        return users
    }

    async findOne(login: string):Promise<User> {
        const user = await this.prisma.user.findUnique({
            where: {
                login
            },
            select: {
                login: true,
                name: true,
                password: true,
                roles: true
            }
        })

        return user
    }

    async update(login: string, updateUserDto: UserDto):Promise<{ success: boolean }> {
        await this.prisma.user.update({
            where: { login },
            data: {
                password: updateUserDto.password,
                name: updateUserDto.name,
                roles: updateUserDto.roles ? {
                    set: updateUserDto.roles.map(roleId => ({ id: roleId })),
                } : undefined,
            },
        });
      
        return { success: true };
    }

    async remove(login: string): Promise<{ success: boolean }> {
        await this.prisma.user.delete({
            where: { login },
        });
        return { success: true };
    }
}
