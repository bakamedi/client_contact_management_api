import { BcryptRepository } from '@infra/domain/respositories/bcrypt/bcrypt.repository';
import { Injectable } from '@nestjs/common';

import * as bcrypt from 'bcrypt';

@Injectable()
export class BcryptRepositoryImpl implements BcryptRepository {
  rounds: number = 10;

  hash(hashString: string): string {
    return bcrypt.hashSync(hashString, this.rounds);
  }

  compare(password: string, hashPassword: string): boolean {
    return bcrypt.compareSync(password, hashPassword);
  }
}
