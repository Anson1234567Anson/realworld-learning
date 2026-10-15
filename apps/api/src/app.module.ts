import { Module } from '@nestjs/common';
import { HealthController } from './health.controller';
import { PrismaService } from './prisma.service';

// 之後每個功能（users、profiles、articles…）開自己嘅 module，再 import 入嚟。
@Module({ controllers: [HealthController], providers: [PrismaService] })
export class AppModule {}
