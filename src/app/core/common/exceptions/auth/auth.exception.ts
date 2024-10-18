import { HttpException, HttpStatus } from '@nestjs/common';
import { AuthMessages } from '../../../base/shared/messages/auth.messages';

export class AuthException extends HttpException {
  details?: Record<string, unknown>;

  private constructor(
    message?: string | '',
    status = HttpStatus.INTERNAL_SERVER_ERROR,
    details?: Record<string, unknown>,
  ) {
    super(message, status);
    this.details = details;
    HttpException.captureStackTrace(this, AuthException);
  }

  public static error(details?: Record<string, unknown>): AuthException {
    return new AuthException(
      AuthMessages.error,
      HttpStatus.INTERNAL_SERVER_ERROR,
      details,
    );
  }

  public static notFound(details?: Record<string, unknown>): AuthException {
    return new AuthException(
      AuthMessages.userNotFound,
      HttpStatus.NOT_FOUND,
      details,
    );
  }

  public static incorrectPassword(details?: Record<string, unknown>): AuthException {
    return new AuthException(
      AuthMessages.invalidPassword,
      HttpStatus.BAD_REQUEST,
      details,
    );
  }
}
