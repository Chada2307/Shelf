import { Controller, Post, Body, Get, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import {UsersService} from "./users.service";

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService) {}

    @Post('register')
    async register(@Body() userData:any){
        return this.userService.register(userData);
    }

    @Get(':id')
    async findOne(@Param('id') id:string){
        return this.userService.findOne(parseInt(id,10));
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async remove(@Param('id') id:string){
        return this.userService.remove(parseInt(id,10));
    }
}
