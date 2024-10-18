import { Injectable } from '@nestjs/common';
import { UseCase } from '../../../core/base/shared/interfaces/use.case';
import { AuthService } from 'src/app/core/common/services/auth/auth.service';
import { UserRepository } from '@infra/domain/respositories/users/user.repository';

export interface RefreshTokenUseCaseRequest {
  idUser: number;
  refreshToken: string;
}

@Injectable()
export class RefreshTokenUseCase implements UseCase<RefreshTokenUseCaseRequest, any> {
  constructor(
    private readonly authService: AuthService,
    private readonly userRespository: UserRepository,
  ) { }

  async execute(request: RefreshTokenUseCaseRequest): Promise<any> {
  }
}
