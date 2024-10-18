export abstract class BcryptRepository {
  abstract hash(hashString: string): string;
  abstract compare(password: string, hashPassword: string): boolean;
}
