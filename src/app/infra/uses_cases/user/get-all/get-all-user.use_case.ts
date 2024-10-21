import { Prisma } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { UseCase } from '../../../../core/base/shared/interfaces/use.case';
import { UserRepository } from '@infra/domain/respositories';

export interface GetAllUserUseCaseResponse {
  id: string;
  names: string;
  lastName: string;
  phoneNumber?: string;
  cellPhoneNumber?: string;
  profileImage?: string;
}

@Injectable()
export class GetAllUserUseCase implements UseCase<any, GetAllUserUseCaseResponse> {
  constructor(
    private readonly userRespository: UserRepository,
  ) {}

  async execute(): Promise<GetAllUserUseCaseResponse> {
    return await this.userRespository.getAll();
  }
}
