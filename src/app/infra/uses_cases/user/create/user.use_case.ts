import { UserRepository } from '@infra/domain/respositories/users/user.repository';
import { CreateUserDTO } from '@infra/framework/controllers/user/dto/create-user.dto';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { UseCase } from 'src/app/core/base/shared/interfaces/use.case';
import { UserRole } from 'src/app/core/base/shared/interfaces/user_role';

export interface CreateUserUseCaseResponse {
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
export class CreateUserUseCase implements UseCase<CreateUserDTO, CreateUserUseCaseResponse> {
    constructor(
        private readonly userRepository: UserRepository,
    ) {}

    async execute(
        request: CreateUserDTO,
    ): Promise<CreateUserUseCaseResponse> {
        try {
            const userPrismaCreate: Prisma.UserCreateInput = {
                ...request,
            };

            const result = await this.userRepository.create(userPrismaCreate);

            return {
                id: result.id,
                role: result.role as UserRole, 
                names: result.names,
                lastName: result.lastName,
                phoneNumber: result.phoneNumber,
                cellPhoneNumber: result.cellPhoneNumber,
                profileImage: result.profileImage,
            };
        } catch (error) {
            // Manejo básico de errores
            throw new Error(`Failed to create user: ${error.message}`);
        }
    }
}