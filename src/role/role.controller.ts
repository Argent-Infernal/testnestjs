import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleDto } from './dto/role.dto';

@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  async create(@Body() roleDto: RoleDto): Promise<{ success: boolean }> {
    return this.roleService.create(roleDto);
  }

  @Get()
  async findAll(): Promise<RoleDto[]> {
    return this.roleService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<RoleDto> {
    return this.roleService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() roleDto: RoleDto): Promise<{ success: boolean }> {
    return this.roleService.update(id, roleDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<{ success: boolean }> {
    return this.roleService.remove(id);
  }
}
