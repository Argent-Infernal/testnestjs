import { Injectable } from '@nestjs/common';
import { RoleDto } from './dto/role.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class RoleService {
    constructor(private readonly prisma: PrismaService) {}

    async create(roleDto: RoleDto): Promise<{ success: boolean }> {
        await this.prisma.role.create({
            data: {
                name: roleDto.name,
            },
        });
        return { success: true };
    }

    async findAll(): Promise<RoleDto[]> {
        return this.prisma.role.findMany();
    }

    async findOne(id: number): Promise<RoleDto> {
        return this.prisma.role.findUnique({
            where: { id },
        });
    }

    async update(id: number, roleDto: RoleDto): Promise<{ success: boolean }> {
        await this.prisma.role.update({
            where: { id },
            data: {
                name: roleDto.name,
            },
        });
        return { success: true };
    }

    async remove(id: number): Promise<{ success: boolean }> {
        await this.prisma.role.delete({
            where: { id },
        });
        return { success: true };
    }
}