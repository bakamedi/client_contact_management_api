import { PrismaService } from '@infra/data/prisma/prisma.service';
import { Module } from '@nestjs/common';
import { DatabaseModule } from '@infra/data/prisma/database.module';
import { AuthModule } from 'src/app/core/common/services/auth/auth.module';

import { useCasesProviders } from '@infra/uses_cases/use-cases.providers';
import { indexControllers } from './controllers/index.controllers';

@Module({
  imports: [
    DatabaseModule,
    AuthModule
  ],
  controllers: [
    ...indexControllers,
  ],
  providers: [
    PrismaService,
    ...useCasesProviders,
  ],
})
export class FrameworkModule { }
