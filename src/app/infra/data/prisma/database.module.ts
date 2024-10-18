import { Module } from '@nestjs/common';

import { JwtModule as Jwt } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PrismaService } from './prisma.service';
import { BcryptRepository, JwtTokenRepository, UserRepository } from '@infra/domain/respositories';
import { BcryptRepositoryImpl, JwtTokenRepositoryImpl, UserRepositoryImpl } from '../repositories_impl';

const repositoriesProviders = [
  { provide: JwtTokenRepository, useClass: JwtTokenRepositoryImpl },
  { provide: BcryptRepository, useClass: BcryptRepositoryImpl },
  { provide: UserRepository, useClass: UserRepositoryImpl },
];

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    Jwt.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          secret: configService.get('JWT_SECRET'),
        };
      },
    }),
  ],
  providers: [PrismaService, ...repositoriesProviders],
  exports: [PrismaService, ...repositoriesProviders],
})
export class DatabaseModule { }
