import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';

import { LoginDTO } from './dto/login.dto';
import { ApiResponse } from '@nestjs/swagger';

import { RefreshTokenUseCase } from '@infra/uses_cases/auth/refresh-token.use_case';
import { Public } from 'src/app/core/common/decorators/public.decorator';
import { RegisterDTO } from './dto/register.dto';
import { LoginUseCase, RegisterUseCase } from '@infra/uses_cases';

@Public()
@Controller('auth')
export class AuthController {
  constructor(
    private readonly loginUseCase: LoginUseCase,
    private readonly registerUseCase: RegisterUseCase,
    private readonly refreshTokenUseCase: RefreshTokenUseCase,
  ) {}

  @Post('login')
  async login(@Body() loginDTO: LoginDTO) {
    return await this.loginUseCase.execute(loginDTO);
  }

  @Post('register')
  async register(@Body() registerDTO: RegisterDTO) {
    return await this.registerUseCase.execute(registerDTO);
  }


  @Post('refresh')
  //@UseGuards(RefreshTokenAuthGuard)
  @ApiResponse({
    status: 400,
    description: 'Auth User not found.',
  })
  @ApiResponse({
    status: 403,
    description: 'Incorrect password.',
  })
  async refreshTokens(
    @Request() req: any,
    @Body('refreshToken') refreshToken: string,
  ) {
    const idUser = req.user.sub;
    return this.refreshTokenUseCase.execute({
      idUser,
      refreshToken,
    });
  }
}
