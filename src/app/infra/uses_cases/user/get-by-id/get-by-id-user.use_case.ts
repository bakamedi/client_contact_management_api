import { UserRepository } from "@infra/domain/respositories";
import { Injectable } from "@nestjs/common";
import { UseCase } from "src/app/core/base/shared/interfaces/use.case";
import { UserRole } from "src/app/core/base/shared/interfaces/user_role";

export interface GetByIdUserUseCaseRequest{
    idUser: string;
}

export interface GetByIdUserUseCaseResponse {
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
export class GetByIdUserUseCase implements UseCase<GetByIdUserUseCaseRequest, GetByIdUserUseCaseResponse> {
    constructor(
        private readonly userRepository: UserRepository,
    ) { }

    async execute(
        request: GetByIdUserUseCaseRequest,
    ): Promise<GetByIdUserUseCaseResponse> {
        const { idUser} = request;

        const result = await this.userRepository.getById(
            idUser,
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