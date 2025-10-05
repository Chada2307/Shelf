import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import {PrismaService} from "../prisma/prisma.service";

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) {}

    async register(data){
        const hashedPassword = await bcrypt.hash(data.password, 10);

        const existingUser = await this.prisma.user.findUnique({ where: { email:data.email } });
        if(existingUser){
            throw new BadRequestException('juz istnieje taki user');
        }

        return this.prisma.user.create({
            data:{
                email: data.email,
                username: data.username,
                password: hashedPassword,
            },
            select: {id: true, email:true, username: true, createdAt:true },
        });
    }

    async findOne(id:number){
        const user = await this.prisma.user.findUnique({
            where: { id },
            select: { id:true, email:true, username:true, createdAt:true, ratings: true}
        });

        if(!user){
            throw new NotFoundException(`User o id ${id} nie zostal znaleziony`);
        }
        return user;
    }
    async remove(id:number){
        return this.prisma.user.delete({where : {id}})
    }

    async findOneByEmail(email: string){
        const user = await this.prisma.user.findUnique({
            where: { email },
            select: {id: true, email:true, password: true}
        });
        if(!user){
            throw new NotFoundException(`User o id ${email} nie zostal znaleziony`);
        }
        return user;
    }
}
