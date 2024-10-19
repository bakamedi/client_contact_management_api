import { HttpException, HttpStatus } from '@nestjs/common';
import { UserMessages } from 'src/app/core/base/shared/messages/user.messages';

export class UserException extends HttpException {
  details?: Record<string, unknown>;

  private constructor(
    message?: string | '',
    status = HttpStatus.INTERNAL_SERVER_ERROR,
    details?: Record<string, unknown>,
  ) {
    super(message, status);
    this.details = details;
    HttpException.captureStackTrace(this, UserException);
  }

  public static deleteSuccess(details?: Record<string, unknown>): UserException {
    return new UserException(
      UserMessages.deleteSuccess,
      HttpStatus.OK,
      details,
    );
  }

  public static deleteError(details?: Record<string, unknown>): UserException {
    return new UserException(
      UserMessages.deleteError,
      HttpStatus.INTERNAL_SERVER_ERROR,
      details,
    );
  }

  public static error(details?: Record<string, unknown>): UserException {
    return new UserException(
      UserMessages.error,
      HttpStatus.INTERNAL_SERVER_ERROR,
      details,
    );
  }

  public static notFound(details?: Record<string, unknown>): UserException {
    return new UserException(
      UserMessages.userNotFound,
      HttpStatus.NOT_FOUND,
      details,
    );
  }


}
