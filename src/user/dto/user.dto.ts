import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class UserDto {
    @IsString({message: 'Имя пользователя должно быть строкой'})
    @IsNotEmpty({message: 'Имя пользователя не может быть пустым'})
    name:string

    @IsString({message: 'Пароль должен быть строкой'})
    @IsNotEmpty({message: 'Пароль не может быть пустым'})
    password:string

    @IsArray({message: 'Роли должны быть в виде массива'})
    @IsOptional()
    roles: number[]
}
