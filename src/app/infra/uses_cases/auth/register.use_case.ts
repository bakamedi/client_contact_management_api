import { Injectable } from '@nestjs/common';

import { BcryptRepository } from '@infra/domain/respositories/bcrypt/bcrypt.repository';
import { UserRepository } from '@infra/domain/respositories/users/user.repository';
import { RegisterDTO } from '@infra/framework/controllers/auth/dto/register.dto';
import { Prisma, UserRole } from '@prisma/client';
import { UseCase } from 'src/app/core/base/shared/interfaces/use.case';
import { AuthService } from 'src/app/core/common/services/auth/auth.service';


export interface RegisterCaseResponse {
    name: string,
    lastName: string,
    profileImage: string,
    access_token: string;
    refresh_token: string;
}

@Injectable()
export class RegisterUseCase implements UseCase<RegisterDTO, RegisterCaseResponse> {
    constructor(
        private readonly userRepositoy: UserRepository,
        private readonly bcryptRepository: BcryptRepository,
        private readonly authServices: AuthService,
    ) { }

    async execute(
        request: RegisterDTO,
    ): Promise<RegisterCaseResponse> {
        const {
            email,
            names,
            lastName,
            password,
            role,
            phoneNumber,
            cellPhoneNumber,
            profileImage,
        } = request;

        const userPrismaCreate: Prisma.UserCreateInput = {
            email,
            names,
            lastName,
            role: UserRole.ADMIN,
            phoneNumber,
            cellPhoneNumber,
            profileImage,
            hashPassword: this.bcryptRepository.hash(password),
        };

        const result = await this.userRepositoy.create(userPrismaCreate);

        const credentials = await this.authServices.login(
            result,
        );

        return {
            name: result.names,
            lastName: result.lastName,
            profileImage: result.profileImage,
            access_token: credentials.access_token,
            refresh_token: credentials.refresh_token,
        };
    }
}
