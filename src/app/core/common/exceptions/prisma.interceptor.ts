import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { PaginationDto } from '../../base/shared/dtos/pagination.dto';

export class ResponseFormat<T> {
  data: T;
}

@Injectable()
export class PrismaInterceptor<T>
  implements NestInterceptor<T, ResponseFormat<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<ResponseFormat<T>> {
    const request = context.switchToHttp().getRequest();
    const query = request.query;
    const paginationDto = new PaginationDto();
    paginationDto.page = Number(query.page) || 1;
    paginationDto.limit = Number(query.limit) || 10;

    request.pagination = paginationDto;

    return next.handle().pipe(
      map((data) => ({ data })), // Formatear la respuesta
      catchError((error) => {
        if (error instanceof PrismaClientKnownRequestError) {
          if (error.code === 'P2002') {
            return throwError(() => ({
              statusCode: 400,
              message: 'El email ya está en uso.',
            }));
          }
        }
        return throwError(() => error);
      }),
    );
  }
}
