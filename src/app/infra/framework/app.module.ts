import { DatabaseModule } from '@infra/data/prisma/database.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from 'src/app/core/common/services/auth/auth.module';
import { jwtConstants } from 'src/app/core/utils/jwt.config.util';
import { FrameworkModule } from './controllers/framework.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Esto hace que la configuración esté disponible globalmente
    }),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1h' },
    }),
    FrameworkModule,
    DatabaseModule,
    AuthModule,
  ],
})
export class AppModule { }
