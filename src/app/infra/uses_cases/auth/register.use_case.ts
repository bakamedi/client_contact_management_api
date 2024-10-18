import { BcryptRepository } from '@infra/domain/respositories/bcrypt/bcrypt.repository';
import { UserRepository } from '@infra/domain/respositories/users/user.repository';

import { RegisterDTO } from '@infra/framework/controllers/auth/dto/register.dto';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { UseCase } from 'src/app/core/base/shared/interfaces/use.case';
import { AuthService } from 'src/app/core/common/services/auth/auth.service';


export interface RegisterCaseResponse {
    email: string;
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
            role,
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
            email: result.email,
            access_token: credentials.access_token,
            refresh_token: credentials.refresh_token,
        };
    }
}
