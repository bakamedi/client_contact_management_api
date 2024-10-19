import { Injectable } from '@nestjs/common';
import { UseCase } from '../../../../core/base/shared/interfaces/use.case';
import { UserRepository } from '@infra/domain/respositories';
import { UserMessages } from 'src/app/core/base/shared/messages/user.messages';
import { UserException } from 'src/app/core/common/exceptions/user/user.exception';

export interface DeleteByIdUserUseCaseRequest {
    idUser: string;
}

@Injectable()
export class DeleteByIdUserUseCase implements UseCase<DeleteByIdUserUseCaseRequest, string> {
    constructor(
        private readonly userRespository: UserRepository,
    ) { }

    async execute(request: DeleteByIdUserUseCaseRequest): Promise<string> {
        const deleteUser = await this.userRespository.deleteById(request.idUser);
        if (!deleteUser) {
            throw UserException.deleteError();
        }
        return UserMessages.deleteSuccess;
    }
}
