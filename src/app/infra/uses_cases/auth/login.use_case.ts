
import { LoginDTO } from '@infra/framework/controllers/auth/dto/login.dto';
import { Injectable } from '@nestjs/common';
import { AuthService } from 'src/app/core/common/services/auth/auth.service';
import { UseCase } from '../../../core/base/shared/interfaces/use.case';
import { AuthException } from 'src/app/core/common/exceptions/auth/auth.exception';
import { BcryptRepository, UserRepository } from '@infra/domain/respositories';
import { AuthMessages } from 'src/app/core/base/shared/messages/auth.messages';

@Injectable()
export class LoginUseCase implements UseCase<LoginDTO, any> {
  constructor(
    private readonly authService: AuthService,
    private readonly userRespository: UserRepository,
    private readonly bcryptRepository: BcryptRepository,
  ) {}

  async execute(request: LoginDTO): Promise<any> {
    const account = await this.userRespository.findByEmail(request.email);

    if (!account) {
      throw AuthException.notFound();
    }

    const isPasswordValid = this.bcryptRepository.compare(
      request.password,
      account.hashPassword,
    );

    if (!isPasswordValid) {
      throw AuthException.incorrectPassword();
    }

    return await this.authService.login(account);
  }
}
