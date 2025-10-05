import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy{

    constructor() {
        super({
            log: ['query', 'info', 'warn', 'error'],
        });
    }

    async onModuleInit(){
        await this.$connect();
        console.log('prisma client connected to db');
    }
    async onModuleDestroy(){
        await this.$disconnect();
        console.log('prisma client disconnected');
    }
    async enableShutdownHooks(app: any){
        this.$on('beforeExit' as any, async()=>{
            await app.close();
        })
    }
}
