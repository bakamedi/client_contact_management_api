import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { Strategies } from './strategies';
import { AuthService } from './auth.service';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: 'Adm1nSecre0991',
      signOptions: { expiresIn: '180m' },
    }),
  ],
  providers: [AuthService, Strategies],
  exports: [AuthService],
})
export class AuthModule {}
