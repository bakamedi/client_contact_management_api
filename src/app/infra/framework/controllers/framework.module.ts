import { PrismaService } from '@infra/data/prisma/prisma.service';
import { Module } from '@nestjs/common';
import { DatabaseModule } from '@infra/data/prisma/database.module';
import { AuthModule } from 'src/app/core/common/services/auth/auth.module';
import { AuthController } from '@infra/framework/controllers';
import { useCasesProviders } from '@infra/uses_cases/use-cases.providers';

@Module({
  imports: [
    DatabaseModule,
    AuthModule
  ],
  controllers: [
    AuthController,
  ],
  providers: [
    PrismaService,
    ...useCasesProviders,
  ],
})
export class FrameworkModule { }
