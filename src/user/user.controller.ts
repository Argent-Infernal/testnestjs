import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @UsePipes(new ValidationPipe())
    @Post()
    create(@Body() createUserDto: UserDto) {
        return this.userService.create(createUserDto);
    }

    @Get()
    findAll() {
        return this.userService.findAll();
    }

    @Get(':login')
    findOne(@Param('login') login: string) {
        return this.userService.findOne(login);
    }
    
    @UsePipes(new ValidationPipe())
    @Patch(':login')
    update(@Param('login') login: string, @Body() updateUserDto: UserDto) {
        return this.userService.update(login, updateUserDto);
    }

    @Delete(':login')
    remove(@Param('login') login: string) {
        return this.userService.remove(login);
    }
}
