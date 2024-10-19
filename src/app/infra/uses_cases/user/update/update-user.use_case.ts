import { UserRepository } from '@infra/domain/respositories/users/user.repository';
import { UpdateUserDTO } from '@infra/framework/controllers/user/dto/update-user.dto';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { UseCase } from 'src/app/core/base/shared/interfaces/use.case';
import { UserRole } from 'src/app/core/base/shared/interfaces/user_role';

export interface UpdateUserUseCaseRequest{
    idUser: string;
    updateUserDTO: UpdateUserDTO;
}

export interface UpdateUserUseCaseResponse {
    id: string;
    role: UserRole;
    email?: string;
    names: string;
    lastName: string;
    phoneNumber?: string;
    cellPhoneNumber?: string;
    profileImage?: string;
}

@Injectable()
export class UpdateUserUseCase implements UseCase<UpdateUserUseCaseRequest, UpdateUserUseCaseResponse> {
    constructor(
        private readonly userRepository: UserRepository,
    ) { }

    async execute(
        request: UpdateUserUseCaseRequest,
    ): Promise<UpdateUserUseCaseResponse> {
        const { updateUserDTO, idUser} = request;

        const result = await this.userRepository.update(
            idUser,
            updateUserDTO
        );

        return {
            id: result.id,
            role: result.role as UserRole,
            names: result.names,
            lastName: result.lastName,
            phoneNumber: result.phoneNumber,
            cellPhoneNumber: result.cellPhoneNumber,
            profileImage: result.profileImage,
        };

    }
}